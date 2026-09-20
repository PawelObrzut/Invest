using System.Text.Json;
using Invest.Api.Configuration;
using Invest.Api.Models.Market;
using Microsoft.Extensions.Options;

namespace Invest.Api.Services;

public class AlphaVantageMarketService: IMarketService
{
    private readonly HttpClient _httpClient;
    private readonly AlphaVantageOptions _options;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public AlphaVantageMarketService(
        HttpClient httpClient,
        IOptions<AlphaVantageOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<List<StockQuoteDto>> GetQuotesAsync(
        IEnumerable<string> symbols,
        CancellationToken cancellationToken = default)
    {
        EnsureApiKeyConfigured();
        var results = new List<StockQuoteDto>();

        foreach (var symbol in symbols)
        {
            var quote = await GetQuoteAsync(
                symbol,
                cancellationToken);

            if (quote != null)
            {
                results.Add(quote);
            }
        }

        return results;
    }

    public async Task<List<StockHistoryDto>> GetHistoryAsync(
        string symbol,
        CancellationToken cancellationToken = default)
    {
        EnsureApiKeyConfigured();
        var url =
            $"{_options.BaseUrl}" +
            $"?function=TIME_SERIES_DAILY" +
            $"&symbol={Uri.EscapeDataString(symbol)}" +
            $"&outputsize=compact" +
            $"&apikey={Uri.EscapeDataString(_options.ApiKey)}";

        using var response = await _httpClient.GetAsync(
            url,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync(
            cancellationToken);

        using var document = JsonDocument.Parse(json);

        if (document.RootElement.TryGetProperty(
                "Error Message",
                out var error))
        {
            throw new HttpRequestException(
                $"Alpha Vantage error: {error.GetString()}");
        }

        if (document.RootElement.TryGetProperty(
                "Note",
                out var note))
        {
            throw new HttpRequestException(
                $"Alpha Vantage rate limit: {note.GetString()}");
        }

        if (!document.RootElement.TryGetProperty(
                "Time Series (Daily)",
                out var timeSeries))
        {
            return [];
        }

        var results = new List<StockHistoryDto>();

        foreach (var day in timeSeries.EnumerateObject())
        {
            var values = day.Value;

            results.Add(new StockHistoryDto
            {
                Date = day.Name,
                Open = GetDecimal(values, "1. open"),
                High = GetDecimal(values, "2. high"),
                Low = GetDecimal(values, "3. low"),
                Close = GetDecimal(values, "4. close"),
                Volume = GetLong(values, "5. volume")
            });
        }

        return results
            .OrderBy(x => x.Date)
            .ToList();
    }

    private async Task<StockQuoteDto?> GetQuoteAsync(
        string symbol,
        CancellationToken cancellationToken)
    {
        var url =
            $"{_options.BaseUrl}" +
            $"?function=GLOBAL_QUOTE" +
            $"&symbol={Uri.EscapeDataString(symbol)}" +
            $"&apikey={Uri.EscapeDataString(_options.ApiKey)}";

        using var response = await _httpClient.GetAsync(
            url,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync(
            cancellationToken);

        using var document = JsonDocument.Parse(json);

        if (document.RootElement.TryGetProperty(
                "Error Message",
                out var error))
        {
            throw new HttpRequestException(
                $"Alpha Vantage error: {error.GetString()}");
        }

        if (document.RootElement.TryGetProperty(
                "Note",
                out var note))
        {
            throw new HttpRequestException(
                $"Alpha Vantage rate limit: {note.GetString()}");
        }

        if (!document.RootElement.TryGetProperty(
                "Global Quote",
                out var quote))
        {
            return null;
        }

        return new StockQuoteDto
        {
            Symbol = GetString(quote, "01. symbol"),
            Price = GetDecimal(quote, "05. price"),
            Change = GetDecimal(quote, "09. change"),
            ChangePercent = ParsePercent(
                GetString(quote, "10. change percent")),
            Volume = GetLong(quote, "06. volume"),
            LatestTradingDay = ParseDate(
                GetString(quote, "07. latest trading day"))
        };
    }

    private static string GetString(
        JsonElement element,
        string property)
    {
        return element.TryGetProperty(
            property,
            out var value)
            ? value.GetString() ?? string.Empty
            : string.Empty;
    }

    private static decimal GetDecimal(
        JsonElement element,
        string property)
    {
        var value = GetString(element, property);

        return decimal.TryParse(
            value,
            System.Globalization.NumberStyles.Any,
            System.Globalization.CultureInfo.InvariantCulture,
            out var result)
            ? result
            : 0;
    }

    private static long GetLong(
        JsonElement element,
        string property)
    {
        var value = GetString(element, property);

        return long.TryParse(
            value,
            out var result)
            ? result
            : 0;
    }

    private static decimal ParsePercent(string value)
    {
        return decimal.TryParse(
            value.Replace("%", ""),
            System.Globalization.NumberStyles.Any,
            System.Globalization.CultureInfo.InvariantCulture,
            out var result)
            ? result
            : 0;
    }

    private static DateTime? ParseDate(string value)
    {
        return DateTime.TryParse(
            value,
            out var result)
            ? result
            : null;
    }

    private void EnsureApiKeyConfigured()
    {
        if (string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            throw new InvalidOperationException(
                "AlphaVantage:ApiKey is not configured. Set the AlphaVantage__ApiKey environment variable or configure user secrets.");
        }
    }
}