import { FarmCard } from "./FarmCard";
import { FarmButton } from "./FarmButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { WeatherPanel } from "./WeatherPanel";
import { FarmHealthStats } from "./FarmHealthStats";
import { InteractiveFarmMap } from "./InteractiveFarmMap";
import { 
  Gamepad2, 
  BarChart3, 
  Trophy, 
  Settings
} from "lucide-react";

interface FarmDashboardProps {
  onNavigate: (page: string) => void;
}

export const FarmDashboard = ({ onNavigate }: FarmDashboardProps) => {
  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 bounce-in">
        <h1 className="text-4xl font-kids font-bold text-primary">
          🌾 Your NASA Farm 🌾
        </h1>
        <p className="text-lg font-comic text-foreground/80">
          Welcome back, Space Farmer! Check your crops and animals!
        </p>
      </div>

      {/* Main Farm View */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Interactive Farm Map - Central Area */}
        <div className="lg:col-span-2">
          <FarmCard variant="default" className="relative overflow-hidden">
            <InteractiveFarmMap onNavigate={onNavigate} />
          </FarmCard>
        </div>

        {/* Farm Stats & Weather Panel */}
        <div className="space-y-6">
          {/* NASA Weather Panel */}
          <WeatherPanel />

          {/* Farm Health Stats */}
          <FarmHealthStats />

          {/* Quick Actions */}
          <FarmCard variant="default">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              🚀 Mission Control
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <FarmButton 
                variant="green" 
                size="sm" 
                onClick={() => onNavigate('games')}
                className="text-sm flex items-center gap-2"
                animation="bounce"
              >
                <AnimatedIcon Icon={Gamepad2} size={16} />
                Games
              </FarmButton>
              <FarmButton 
                variant="purple" 
                size="sm" 
                onClick={() => onNavigate('knowledge')}
                className="text-sm flex items-center gap-2"
                animation="float"
              >
                <AnimatedIcon Icon={BarChart3} size={16} />
                NASA Data
              </FarmButton>
              <FarmButton 
                variant="yellow" 
                size="sm" 
                onClick={() => onNavigate('rewards')}
                className="text-sm flex items-center gap-2"
                animation="wiggle"
              >
                <AnimatedIcon Icon={Trophy} size={16} />
                Rewards
              </FarmButton>
              <FarmButton 
                variant="orange" 
                size="sm" 
                onClick={() => onNavigate('settings')}
                className="text-sm flex items-center gap-2"
                animation="spin"
              >
                <AnimatedIcon Icon={Settings} size={16} />
                Settings
              </FarmButton>
            </div>

            {/* Daily Challenge */}
            <div className="mt-4 p-3 bg-gradient-rainbow rounded-xl text-white text-center">
              <div className="text-lg font-bold flex items-center justify-center gap-2">
                <span className="animate-bounce-slow">🌟</span>
                Daily Challenge
                <span className="animate-bounce-slow">🌟</span>
              </div>
              <p className="text-sm mt-1">Water all crops to earn 50 Space Points!</p>
              <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
                Progress: 3/4 crops watered 💧
              </div>
            </div>
          </FarmCard>
        </div>
      </div>
    </div>
  );
};