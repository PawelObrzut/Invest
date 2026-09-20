namespace Invest.Api.Models.Market;

public class StockHistoryDto
{
	public string Symbol { get; set; } = string.Empty;
	public string Date { get; set; } = string.Empty;
	public decimal Open { get; set; }
	public decimal High { get; set; }
	public decimal Low { get; set; }
	public decimal Close { get; set; }
	public long Volume { get; set; }
}
