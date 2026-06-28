
const Markets = () => {
  return (
    <div>
      <section className="flex flex-col gap-2 px-8 py-6">
        <h1 className="text-4xl font-bold text-white">Markets</h1>
        <h2 className="text-lg font-semibold text-grey-500">Real-time market data and portfolio analytics</h2>
      </section>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        <section className="bg-blue-600 rounded-lg p-6 mr-20 border border-blue-500">
          <p className="text-grey-500 text-sm font-semibold tracking-wide mb-2 uppercase">Example only</p>
          <div className="flex items-end justify-between">
            <div className="w-full">
              <div className="flex justify-between ">
                <h2 className="text-4xl font-bold text-grey-100">$1,000.00</h2>
                <h2 className="text-4xl font-bold text-grey-100">Log in or create an account.</h2>
              </div>
              <p className="text-mint-500 text-lg font-semibold mt-2">
                ↗ $100.00 <span className="text-grey-500 text-sm font-normal">(+1.00%)</span>
              </p>
              <p className="text-grey-500 text-xs mt-1">Today's change</p>
            </div>
          </div>
        </section>

        <section>
          
        </section>
      </div>


    </div>
  )
}

export default Markets