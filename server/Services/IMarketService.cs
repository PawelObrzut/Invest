using Invest.Api.Models.Market;

namespace Invest.Api.Services;

public interface IMarketService
{
    Task<List<StockQuoteDto>> GetQuotesAsync(
        IEnumerable<string> symbols,
        CancellationToken cancellationToken = default);

    Task<List<StockHistoryDto>> GetHistoryAsync(
        string symbol,
        CancellationToken cancellationToken = default);
}
