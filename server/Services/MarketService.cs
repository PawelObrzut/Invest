using System.Text.Json;
using server.DTOs;

namespace server.Services;

public class MarketService : IMarketService
{
    public async Task<List<MarketResponse>> GetQuotesAsync(IEnumerable<string>? symbols = null)
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, "mock", "quotes.json");

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Mock quotes file not found.");
        }

        var json = await File.ReadAllTextAsync(filePath);

        var quotes = JsonSerializer.Deserialize<List<MarketResponse>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        quotes ??= new List<MarketResponse>();
 
        if (symbols != null && symbols.Any())
        {
            quotes = quotes
                .Where(q => symbols.Contains(q.Symbol, StringComparer.OrdinalIgnoreCase))
                .ToList();
        }

        return quotes;
    }
}