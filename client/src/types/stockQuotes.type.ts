export type TimePeriod = "Day" | "Week" | "Month" | "SixMonths";

export type StockQuote = {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
};
