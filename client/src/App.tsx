import { useState, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { cn } from "./utilities/helpers";
import { Avatar, IconButton } from "@mui/material";

import {
  LayoutDashboard,
  ChartPie,
  BriefcaseBusiness,
  SquareChevronRight,
  SquareChevronLeft,
  DollarSign,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import useAuth from "./hooks/useAuth";
import AuthDialog from "./components/AuthDialog";

function App() {
  const { user } = useAuth();
  
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
      isActive
        ? "text-mint-500 bg-blue-500 border-l-4 border-mint-500"
        : "text-white hover:bg-blue-500",
    );

  return (
    <div className="bg-blue-800 min-h-screen">
      <aside
        className={cn(
          isExpanded ? "w-64" : "w-18",
          "fixed left-0 top-0 flex flex-col h-screen bg-blue-600 border-r border-blue-400 transition-[width] duration-300",
        )}
      >
        <div className="flex h-26 border-b border-blue-400 pt-10 px-6">
          <DollarSign
            className="text-mint-500 scale-150 font-bold shrink-0"
            strokeWidth={3}
          />
          {isExpanded && (
            <div className="transition-all duration-300 overflow-hidden">
              <h1
                className={cn(
                  "text-mint-500 text-2xl font-bold whitespace-nowrap transition-opacity duration-200",
                  isExpanded ? "opacity-100" : "opacity-0",
                )}
              >
                nVesT+
              </h1>
              <span
                className={cn(
                  "text-xs text-grey-500 whitespace-nowrap relative -top-3 transition-opacity duration-200",
                  isExpanded ? "opacity-100" : "opacity-0",
                )}
              >
                Be a Trader.
              </span>
            </div>
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

      {/* {isAuthenticated && ( */}
        <main
          className={cn(
            "transition-all duration-300",
            isExpanded ? "ml-64" : "ml-18",
          )}
        >
          <header className="fixed top-6 right-6 z-50 flex items-center gap-4">
            {/* {user && ( */}
              {(
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-medium">
                  {user?.name}
                </span>
                <IconButton
                  ref={avatarButtonRef}
                  onClick={() => setIsModalOpen(true)}
                  sx={{
                    width: 44,
                    height: 44,
                    backgroundColor: "#14b8a6",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0d9488",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      backgroundColor: "#14b8a6",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </div>
            )}
          </header>

          <Routes>
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                  <Dashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/markets"
              element={
                // <ProtectedRoute>
                  <Markets />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/portfolio"
              element={
                // <ProtectedRoute>
                  <Portfolio />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      {/* )} */}

      {/* {!isAuthenticated && location.pathname === "/" && ( */}
        {/* <main className="w-full h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">Welcome to nVesT+</h1>
            <p className="text-grey-500 text-lg mb-8">Be a Trader. Sign in to get started.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              ref={avatarButtonRef}
              className="flex cursor-pointer items-center justify-center rounded-full w-20 h-20 hover:scale-110 transition-scale duration-300 mx-auto"
              style={{ backgroundColor: "#14b8a6" }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#14b8a6",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                +
              </Avatar>
            </button>
          </div>
        </main> */}
      {/* )} */}

      <AuthDialog 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
    </div>
  );
}

export default App;
