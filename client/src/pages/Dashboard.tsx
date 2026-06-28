import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "../components/ProtectedRoute";
import DataCard from "../components/DataCard";
import { useStocks } from "../hooks/useStocks";
import { stockQuotes } from "../api/stockQuotesService";
import type { StockQuote, TimePeriod } from "../types/stockQuotes.type";

const periods: TimePeriod[] = ["Day", "Week", "Month", "SixMonths"];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Week");

  const { data: quotes, isLoading, isError } = useStocks();

  useEffect(() => {
    if (!selectedSymbol && quotes?.length) {
      setSelectedSymbol(quotes[0].symbol);
    }
  }, [quotes, selectedSymbol]);

  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useQuery<StockQuote[]>({
    queryKey: ["stockHistory", selectedSymbol, selectedPeriod],
    queryFn: () => stockQuotes.history(selectedSymbol ?? "", selectedPeriod),
    enabled: Boolean(selectedSymbol),
  });

  const selectedStock = useMemo(
    () => quotes?.find((quote) => quote.symbol === selectedSymbol) ?? quotes?.[0],
    [quotes, selectedSymbol]
  );

  const totalValue = useMemo(
    () => quotes?.reduce((sum, quote) => sum + quote.price, 0) ?? 0,
    [quotes]
  );

  const totalChange = useMemo(
    () => quotes?.reduce((sum, quote) => sum + quote.change, 0) ?? 0,
    [quotes]
  );

  const averageChangePercent = useMemo(() => {
    if (!quotes?.length) return 0;
    return quotes.reduce((sum, quote) => sum + quote.changePercent, 0) / quotes.length;
  }, [quotes]);

  const historyPoints = useMemo(() => {
    if (!history?.length) return [];

    const prices = history.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    return history.map((item, index) => {
      const x = 10 + (index * 80) / Math.max(history.length - 1, 1);
      const y = 80 - ((item.price - minPrice) / range) * 60;
      return `${x},${y}`;
    });
  }, [history]);

  const chartPath = historyPoints.length > 0 ? `M${historyPoints.join(" L")}` : "";

  const gainers = quotes
    ? [...quotes].sort((a, b) => b.changePercent - a.changePercent).slice(0, 3)
    : [];

  const losers = quotes
    ? [...quotes].sort((a, b) => a.changePercent - b.changePercent).slice(0, 3)
    : [];

  return (
    <div>
      <section className="flex flex-col gap-2 px-8 py-6">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <h2 className="text-lg font-semibold text-grey-500">Real-time market data and portfolio analytics</h2>
      </section>

      <ProtectedRoute
        fallback={
          <div className="text-mint-500 flex items-center justify-center h-screen">
            Please sign in to view your dashboard
          </div>
        }
      >
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
            <p className="text-grey-500 text-sm font-semibold tracking-wide mb-2">TOTAL PORTFOLIO VALUE</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-5xl font-bold text-grey-100">{formatCurrency(totalValue)}</h2>
                <p className={`text-lg font-semibold mt-2 ${totalChange >= 0 ? "text-mint-500" : "text-red-400"}`}>
                  {totalChange >= 0 ? "↗" : "↘"} {formatCurrency(totalChange)}{' '}
                  <span className="text-grey-500 text-sm font-normal">
                    ({averageChangePercent >= 0 ? "+" : ""}{averageChangePercent.toFixed(2)}%)
                  </span>
                </p>
                <p className="text-grey-500 text-xs mt-1">Today's change</p>
              </div>
              <div className="flex gap-2">
                <button className="px-6 py-2 bg-mint-500 text-blue-800 font-semibold rounded hover:bg-opacity-90 transition-opacity">
                  Buy
                </button>
                <button className="px-6 py-2 bg-transparent text-grey-100 border border-grey-500 font-semibold rounded hover:bg-blue-500 transition-colors">
                  Sell
                </button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-full text-grey-200">Loading portfolio...</div>
            ) : isError ? (
              <div className="col-span-full text-red-300">Unable to load stock quotes.</div>
            ) : quotes?.length ? (
              quotes.map((stock) => {
                const trend = stock.change >= 0 ? "up" : "down";

                return (
                  <DataCard
                    key={stock.symbol}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    header={{ title: stock.symbol, subtitle: stock.companyName }}
                    value={formatCurrency(stock.price)}
                    details={[
                      {
                        label: "Change",
                        value: `${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)} (${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent.toFixed(2)}%)`,
                        color: trend === "up" ? "mint" : "error",
                      },
                    ]}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-grey-200">No portfolio data available.</div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-blue-600 rounded-lg p-6 border border-blue-500">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-grey-100">Portfolio Performance</h3>
                  <p className="text-grey-500 text-sm">
                    {selectedStock ? `${selectedStock.companyName} (${selectedStock.symbol})` : "Select a stock to view history"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        selectedPeriod === period
                          ? "bg-mint-500 text-blue-800"
                          : "text-grey-500 hover:text-mint-500"
                      }`}
                    >
                      {period === "SixMonths" ? "6M" : period}
                    </button>
                  ))}
                </div>
              </div>

              {isHistoryLoading ? (
                <div className="h-64 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
                  <span className="text-grey-500 text-sm">Loading history...</span>
                </div>
              ) : isHistoryError ? (
                <div className="h-64 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
                  <span className="text-red-300 text-sm">Unable to load history.</span>
                </div>
              ) : history?.length ? (
                <div className="h-64 bg-blue-500 rounded border border-blue-400 p-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M10 90 L90 90"
                      stroke="#4b5563"
                      strokeWidth="0.5"
                      fill="none"
                    />
                    <path
                      d="M10 10 L10 90"
                      stroke="#4b5563"
                      strokeWidth="0.5"
                      fill="none"
                    />
                    <path
                      d={chartPath}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {historyPoints.map((point, index) => (
                      <circle
                        key={`${point}-${index}`}
                        cx={point.split(",")[0]}
                        cy={point.split(",")[1]}
                        r="2.5"
                        fill="#10b981"
                      />
                    ))}
                  </svg>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-grey-100">
                    <div>
                      <p className="text-grey-400">Current</p>
                      <p className="font-semibold">{formatCurrency(history[history.length - 1].price)}</p>
                    </div>
                    <div>
                      <p className="text-grey-400">Change</p>
                      <p className={`font-semibold ${history[history.length - 1].change >= 0 ? "text-mint-500" : "text-red-400"}`}>
                        {history[history.length - 1].change >= 0 ? "+" : ""}{history[history.length - 1].change.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
                  <span className="text-grey-500 text-sm">No history available.</span>
                </div>
              )}
            </section>

            <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
              <h3 className="text-xl font-semibold text-grey-100 mb-4">Top Movers</h3>
              <div className="mb-4">
                <p className="text-mint-500 text-xs font-semibold tracking-wide mb-3">GAINERS</p>
                <div className="space-y-3">
                  {gainers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-2 rounded hover:bg-blue-500 transition-colors cursor-pointer">
                      <div>
                        <p className="text-grey-100 text-sm font-semibold">↗ {stock.symbol}</p>
                        <p className="text-grey-500 text-xs">{stock.companyName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-grey-100 text-sm font-semibold">{formatCurrency(stock.price)}</p>
                        <p className="text-mint-500 text-xs font-semibold">{stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-blue-400 pt-4">
                <p className="text-red-400 text-xs font-semibold tracking-wide mb-3">LOSERS</p>
                {losers.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-2 rounded hover:bg-blue-500 transition-colors cursor-pointer">
                    <div>
                      <p className="text-grey-100 text-sm font-semibold">↘ {stock.symbol}</p>
                      <p className="text-grey-500 text-xs">{stock.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-grey-100 text-sm font-semibold">{formatCurrency(stock.price)}</p>
                      <p className="text-red-400 text-xs font-semibold">{stock.changePercent < 0 ? "" : "+"}{stock.changePercent.toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
            <h3 className="text-xl font-semibold text-grey-100 mb-4">Holdings</h3>
            <div className="h-80 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
              <span className="text-grey-500 text-sm">Data table will be rendered here (MUI/DevExtreme)</span>
            </div>
          </section>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
