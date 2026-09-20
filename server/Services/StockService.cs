using Invest.Api.Models.Market;
using Invest.Api.Services;
using server.DTOs;

namespace server.Services;

public class StockService : IStockService
{
    private static readonly string[] DefaultSymbols =
    [
        "AAPL",
        "MSFT",
        "NVDA",
        "GOOGL"
    ];

    private readonly IMarketService _marketService;

    public StockService(IMarketService marketService)
    {
        _marketService = marketService;
    }

    public async Task<List<StockResponse>> GetQuotesAsync(IEnumerable<string>? symbols = null)
    {
        var requestedSymbols = symbols?.Where(symbol => !string.IsNullOrWhiteSpace(symbol))
            .Select(symbol => symbol.Trim().ToUpperInvariant())
            .Distinct()
            .ToArray();

        var quotes = await _marketService.GetQuotesAsync(requestedSymbols is { Length: > 0 }
            ? requestedSymbols
            : DefaultSymbols);

        return quotes.Select(MapQuote).ToList();
    }

    public async Task<List<StockResponse>> GetStockHistoryAsync(string symbol, TimePeriod period)
    {
        var history = await _marketService.GetHistoryAsync(symbol.Trim().ToUpperInvariant());
        var days = period switch
        {
            TimePeriod.Day => 1,
            TimePeriod.Week => 7,
            TimePeriod.Month => 30,
            TimePeriod.SixMonths => 180,
            _ => 7
        };

        var cutoff = DateTime.UtcNow.Date.AddDays(-days + 1);

        return history
            .Where(entry => DateTime.TryParse(entry.Date, out var date) && date.Date >= cutoff)
            .Select(entry => MapHistory(symbol, entry))
            .ToList();
    }

    private static StockResponse MapQuote(StockQuoteDto quote)
    {
        return new StockResponse
        {
            Symbol = quote.Symbol,
            CompanyName = string.IsNullOrWhiteSpace(quote.Name) ? quote.Symbol : quote.Name,
            Price = quote.Price,
            Change = quote.Change,
            ChangePercent = quote.ChangePercent,
            Currency = "USD"
        };
    }

    private static StockResponse MapHistory(string symbol, StockHistoryDto entry)
    {
        var change = entry.Close - entry.Open;
        var changePercent = entry.Open == 0 ? 0 : change / entry.Open * 100;

        return new StockResponse
        {
            Symbol = symbol,
            CompanyName = symbol,
            Price = entry.Close,
            Change = change,
            ChangePercent = changePercent,
            Currency = "USD"
        };
    }
}