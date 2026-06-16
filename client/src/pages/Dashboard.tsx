import ProtectedRoute from "../components/ProtectedRoute"

const Dashboard = () => {
  return (
    <main >
      <ProtectedRoute>
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Total Portfolio Value Section */}
        <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
          <p className="text-grey-500 text-sm font-semibold tracking-wide mb-2">TOTAL PORTFOLIO VALUE</p>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-5xl font-bold text-grey-100">$847,652.48</h2>
              <p className="text-mint-500 text-lg font-semibold mt-2">
                ↗ $12,847.32 <span className="text-grey-500 text-sm font-normal">(+1.54%)</span>
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

        {/* Portfolio Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { ticker: 'AAPL', company: 'Apple Inc.', price: '$178.45', change: '+2.34', changePercent: '+1.33%', trend: 'up' },
            { ticker: 'TSLA', company: 'Tesla Inc.', price: '$248.92', change: '+8.45', changePercent: '+3.51%', trend: 'up' },
            { ticker: 'NVDA', company: 'NVIDIA Corp.', price: '$895.32', change: '+12.67', changePercent: '+1.44%', trend: 'up' },
            { ticker: 'MSFT', company: 'Microsoft', price: '$412.87', change: '-3.21', changePercent: '-0.77%', trend: 'down' },
          ].map((stock) => (
            <div key={stock.ticker} className="bg-blue-600 rounded-lg p-5 border border-blue-500 hover:border-mint-500 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-grey-100">{stock.ticker}</h3>
                  <p className="text-grey-500 text-xs">{stock.company}</p>
                </div>
                <span className={`text-lg ${stock.trend === 'up' ? '↗ text-mint-500' : '↘ text-red-400'}`}>
                  {stock.trend === 'up' ? '↗' : '↘'}
                </span>
              </div>
              <p className="text-2xl font-bold text-grey-100 mb-1">{stock.price}</p>
              <p className={`text-sm font-semibold ${stock.trend === 'up' ? 'text-mint-500' : 'text-red-400'}`}>
                {stock.change} <span className="text-grey-500">({stock.changePercent})</span>
              </p>
            </div>
          ))}
        </section>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance Chart */}
          <section className="lg:col-span-2 bg-blue-600 rounded-lg p-6 border border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-grey-100">Portfolio Performance</h3>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '3M', '1Y', 'All'].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      period === '1D'
                        ? 'bg-mint-500 text-blue-800'
                        : 'text-grey-500 hover:text-mint-500'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            {/* Placeholder for MUI/DevExtreme Chart */}
            <div className="h-64 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
              <span className="text-grey-500 text-sm">Chart will be rendered here (MUI/DevExtreme)</span>
            </div>
          </section>

          {/* Top Movers Section */}
          <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
            <h3 className="text-xl font-semibold text-grey-100 mb-4">Top Movers</h3>
            
            <div className="mb-4">
              <p className="text-mint-500 text-xs font-semibold tracking-wide mb-3">GAINERS</p>
              <div className="space-y-3">
                {[
                  { ticker: 'TSLA', company: 'Tesla Inc.', price: '$248.92', change: '+3.51%' },
                  { ticker: 'NVDA', company: 'NVIDIA Corp.', price: '$895.32', change: '+1.44%' },
                  { ticker: 'AAPL', company: 'Apple Inc.', price: '$178.45', change: '+1.33%' },
                ].map((stock) => (
                  <div key={stock.ticker} className="flex items-center justify-between p-2 rounded hover:bg-blue-500 transition-colors cursor-pointer">
                    <div>
                      <p className="text-grey-100 text-sm font-semibold">↗ {stock.ticker}</p>
                      <p className="text-grey-500 text-xs">{stock.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-grey-100 text-sm font-semibold">{stock.price}</p>
                      <p className="text-mint-500 text-xs font-semibold">{stock.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-blue-400 pt-4">
              <p className="text-red-400 text-xs font-semibold tracking-wide mb-3">LOSERS</p>
              <div className="flex items-center justify-between p-2 rounded hover:bg-blue-500 transition-colors cursor-pointer">
                <div>
                  <p className="text-grey-100 text-sm font-semibold">↘ AMZN</p>
                  <p className="text-grey-500 text-xs">Amazon</p>
                </div>
                <div className="text-right">
                  <p className="text-grey-100 text-sm font-semibold">$178.23</p>
                  <p className="text-red-400 text-xs font-semibold">-2.15%</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Data Table Section */}
        <section className="bg-blue-600 rounded-lg p-6 border border-blue-500">
          <h3 className="text-xl font-semibold text-grey-100 mb-4">Holdings</h3>
          {/* Placeholder for MUI/DevExtreme Table */}
          <div className="h-80 bg-blue-500 rounded flex items-center justify-center border border-blue-400">
            <span className="text-grey-500 text-sm">Data table will be rendered here (MUI/DevExtreme)</span>
          </div>
        </section>
      </div>
      </ProtectedRoute>
    </main>
  )
}

export default Dashboard