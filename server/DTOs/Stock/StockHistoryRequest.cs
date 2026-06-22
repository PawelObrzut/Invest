public class StockHistoryRequest
{
    public string Symbol { get; set; } = string.Empty;
    public TimePeriod Period { get; set; }
}

public enum TimePeriod
{
    Day,
    Week,
    Month, 
    SixMonths,
}
