import { useState } from "react";
import { SplashScreen } from "@/components/farm/SplashScreen";
import { FarmDashboard } from "@/components/farm/FarmDashboard";
import KnowledgePage from "./KnowledgePage";
import GamesPage from "./GamesPage";

export default function FarmApp() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "dashboard" | "knowledge" | string>("splash");

  const handleStartAdventure = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentScreen(page);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onStartAdventure={handleStartAdventure} />;
      case "dashboard":
        return <FarmDashboard onNavigate={handleNavigate} />;
      case "knowledge":
        return <KnowledgePage onBack={() => setCurrentScreen("dashboard")} />;
      case "games":
        return <GamesPage onBack={() => setCurrentScreen("dashboard")} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-kids font-bold text-primary">
                Coming Soon! 🚧
              </h1>
              <p className="text-xl font-comic text-foreground/80">
                The {currentScreen} page is under construction!
              </p>
              <button 
                onClick={() => setCurrentScreen("dashboard")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary-light transition-colors"
              >
                Back to Farm 🏠
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="w-full">{renderCurrentScreen()}</div>;
}