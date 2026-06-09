import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string; // Placeholder - will be replaced with lucide icon
  active?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
  { id: 'markets', label: 'Markets', icon: '📈' },
  { id: 'portfolio', label: 'Portfolio', icon: '💼' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`fixed left-80 top-0 h-screen bg-blue-800 border-r border-blue-400 transition-all duration-300 z-50 flex flex-col ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="border-b border-blue-400 p-4">
        <div className="flex items-center justify-between">
          <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-2xl font-bold text-mint-500">InvestPro</h1>
            <span className="text-xs text-grey-500">Professional Trading</span>
          </div>
          <div className={`text-2xl ${!isExpanded ? 'mx-auto' : ''}`}>📊</div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              item.active
                ? 'bg-blue-600 text-mint-500 border-l-4 border-mint-500'
                : 'text-grey-500 hover:bg-blue-600 hover:text-mint-500'
            } ${isExpanded ? '' : 'justify-center px-2'}`}
            title={!isExpanded ? item.label : undefined}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isExpanded && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="border-t border-blue-400 p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-grey-500 hover:text-mint-500 transition-colors duration-200"
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          <span className="text-lg">{isExpanded ? '◀' : '▶'}</span>
          {isExpanded && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
