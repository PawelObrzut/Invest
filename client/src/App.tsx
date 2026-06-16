import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { cn } from "./utilities/helpers";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import useAuth from "./hooks/useAuth";
import AuthDialog from "./components/AuthDialog";
import UserWidget from "./components/UserWidget";

function App() {
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-blue-800 min-h-screen">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <main
        className={cn(
          "transition-all duration-300",
          isExpanded ? "ml-64" : "ml-18",
        )}
      >
        <UserWidget user={user} logout={logout} setIsModalOpen={setIsModalOpen} />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>

      <AuthDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
