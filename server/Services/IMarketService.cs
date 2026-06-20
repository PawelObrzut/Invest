using server.DTOs;

namespace server.Services;

public interface IMarketService
{
    Task<List<MarketResponse>> GetQuotesAsync(IEnumerable<string>? symbols);
}