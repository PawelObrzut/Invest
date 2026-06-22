using System.Text.Json;
using server.DTOs;

namespace server.Services;

public class StockService : IStockService
{
    public async Task<List<StockResponse>> GetQuotesAsync(IEnumerable<string>? symbols = null)
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, "mock", "quotes.json");

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Mock quotes file not found.");
        }

        var json = await File.ReadAllTextAsync(filePath);

        var quotes = JsonSerializer.Deserialize<List<StockResponse>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        quotes ??= new List<StockResponse>();
 
        if (symbols != null && symbols.Any())
        {
            quotes = quotes
                .Where(q => symbols.Contains(q.Symbol, StringComparer.OrdinalIgnoreCase))
                .ToList();
        }

        return quotes;
    }

    public async Task<List<StockResponse>> GetStockHistoryAsync(string symbol, TimePeriod period)
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, "mock", "stock-history.json");

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Mock stock history file not found.");
        }

        var json = await File.ReadAllTextAsync(filePath);

        var historyEntries = JsonSerializer.Deserialize<List<StockHistoryEntry>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        historyEntries ??= new List<StockHistoryEntry>();

        var match = historyEntries.FirstOrDefault(entry =>
            string.Equals(entry.Symbol, symbol, StringComparison.OrdinalIgnoreCase) &&
            string.Equals(entry.Period, period.ToString(), StringComparison.OrdinalIgnoreCase));

        return match?.History ?? new List<StockResponse>();
    }

    private sealed class StockHistoryEntry
    {
        public string Symbol { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public List<StockResponse> History { get; set; } = new List<StockResponse>();
    }
}