import { useState } from "react";
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("landing");
  };

  const navigateTo = (page) => {
    // expect a page string like 'landing' or 'home'
    setCurrentPage(page);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "landing" && (
        <LandingPage
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNavigateHome={navigateTo}
        />
      )}
      {currentPage === "home" && <HomePage onLogout={handleLogout} />}
    </div>
  );
}

export default App;
