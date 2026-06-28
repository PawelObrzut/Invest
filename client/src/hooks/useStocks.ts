import { useQuery } from "@tanstack/react-query";
import { stockQuotes } from "../api/stockQuotesService";
import type { StockQuote } from "../types/stockQuotes.type";

export function useStocks(symbols?: string[]) {
  return useQuery<StockQuote[]>({
    queryKey: ["stocks", symbols ?? []],
    queryFn: () => stockQuotes.quotes(symbols),
  });
}
