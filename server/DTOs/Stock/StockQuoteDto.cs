namespace Invest.Api.Models.Market;

public class StockQuoteDto
{
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal Change { get; set; }
    public decimal ChangePercent { get; set; }
    public long Volume { get; set; }
    public DateTime? LatestTradingDay { get; set; }
}