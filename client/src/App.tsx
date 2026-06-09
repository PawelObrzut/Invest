import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { cn } from "./utilities/helpers";

import {
  LayoutDashboard,
  ChartPie,
  BriefcaseBusiness,
  SquareChevronRight,
  SquareChevronLeft,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
      isActive ? "text-mint-500 bg-blue-500" : "text-white hover:bg-blue-500",
    );

  return (
    <div className="bg-blue-800 h-screen">
      <aside
        className={cn(
          isExpanded ? "w-64" : "w-18",
          "fixed left-0 top-0 flex flex-col h-screen bg-blue-600 border-r border-blue-400 transition-[width] duration-300",
        )}
      >
        <div className="flex flex-col justify-center p-6 h-20 border-b border-blue-400 overflow-hidden">
          {isExpanded && (
            <>
              <h1 className="text-mint-500 text-2xl font-bold whitespace-nowrap">
                InvestApp
              </h1>
              <span className="text-xs text-grey-500 whitespace-nowrap">
                Lorem ipsum slogan
              </span>
            </>
          )}
        </div>

        <nav className="text-white flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard" className={navItemClass}>
                <span className="w-6 flex justify-center shrink-0">
                  <LayoutDashboard />
                </span>
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isExpanded ? "max-w-30 opacity-100" : "max-w-0 opacity-0",
                  )}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/markets" className={navItemClass}>
                <span className="w-6 flex justify-center shrink-0">
                  <ChartPie />
                </span>
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isExpanded ? "max-w-30 opacity-100" : "max-w-0 opacity-0",
                  )}
                >
                  Markets
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/portfolio" className={navItemClass}>
                <span className="w-6 flex justify-center shrink-0">
                  <BriefcaseBusiness />
                </span>
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isExpanded ? "max-w-30 opacity-100" : "max-w-0 opacity-0",
                  )}
                >
                  Portfolio
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="border-t border-blue-400 p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "ml-auto mr-2 flex justify-end items-center rounded-lg bg-blue-600 text-grey-500 hover:text-mint-500 transition-colors duration-200",
            )}
          >
            <span className="text-lg">
              {isExpanded ? <SquareChevronLeft /> : <SquareChevronRight />}
            </span>
          </button>
        </div>
      </aside>

      <main
        className={cn(
          "transition-all duration-300",
          isExpanded ? "ml-64" : "ml-18",
        )}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
