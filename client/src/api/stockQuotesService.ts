import apiClient from "./apiClient";
import type { StockQuote, TimePeriod } from "../types/stockQuotes.type";
import type { ServerResponse } from "../types/auth.type";

const api = {
  getQuotes: async (symbols?: string[]) =>
    apiClient.get<ServerResponse<StockQuote[]>>("/api/stocks/quotes", {
      params: {
        symbols,
      },
    }),

  getHistory: async (symbol: string, period: TimePeriod) =>
    apiClient.get<ServerResponse<StockQuote[]>>(
      `/api/stocks/quotes/${encodeURIComponent(symbol)}/history`,
      {
        params: {
          period,
        },
      }
    ),
};

export const stockQuotes = {
  quotes: async (symbols?: string[]): Promise<StockQuote[]> => {
    const response = await api.getQuotes(symbols);
    return response.data.data;
  },

  history: async (
    symbol: string,
    period: TimePeriod = "Week"
  ): Promise<StockQuote[]> => {
    const response = await api.getHistory(symbol, period);
    return response.data.data;
  },
};