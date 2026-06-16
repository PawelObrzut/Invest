import React, { useState } from "react";

import {
  LayoutDashboard,
  ChartPie,
  BriefcaseBusiness,
  SquareChevronRight,
  SquareChevronLeft,
  DollarSign,
} from "lucide-react";
import { cn } from "../utilities/helpers";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Markets",
    path: "/markets",
    icon: ChartPie,
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: BriefcaseBusiness,
  },
];

type SidebarProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
      isActive
        ? "text-mint-500 bg-blue-500 border-l-4 border-mint-500"
        : "text-white hover:bg-blue-500",
    );

  return (
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
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink to={path} className={navItemClass}>
                <span className="w-6 flex justify-center shrink-0">
                  <Icon />
                </span>

                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isExpanded ? "max-w-30 opacity-100" : "max-w-0 opacity-0",
                  )}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          ))}
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
  );
};

export default Sidebar;
