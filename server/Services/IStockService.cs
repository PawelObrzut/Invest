using server.DTOs;

namespace server.Services;

public interface IStockService
{
    Task<List<StockResponse>> GetQuotesAsync(IEnumerable<string>? symbols);

    Task<List<StockResponse>> GetStockHistoryAsync(string symbol, TimePeriod period);
}