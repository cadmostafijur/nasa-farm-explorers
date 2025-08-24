import { FarmCard } from "./FarmCard";
import { FarmButton } from "./FarmButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { 
  Sprout, 
  Droplets, 
  Flower, 
  Heart, 
  Sun, 
  Cloud, 
  Thermometer,
  Gauge
} from "lucide-react";
import farmHero from "@/assets/farm-hero.png";

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
        {/* Farm Map - Central Area */}
        <div className="lg:col-span-2">
          <FarmCard variant="default" className="relative overflow-hidden">
            <div className="relative">
              <img 
                src={farmHero} 
                alt="Your Farm" 
                className="w-full h-80 object-cover rounded-2xl"
              />
              
              {/* Interactive Overlays */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full h-full p-8">
                  {/* Crop Area */}
                  <div 
                    className="bg-green/20 rounded-2xl border-2 border-green/40 flex items-center justify-center cursor-pointer hover:bg-green/30 transition-all"
                    onClick={() => onNavigate('crops')}
                  >
                    <div className="text-center text-white drop-shadow-lg">
                      <AnimatedIcon Icon={Sprout} size={48} animation="float" />
                      <p className="font-bold mt-2">Crops</p>
                    </div>
                  </div>

                  {/* Livestock Area */}
                  <div 
                    className="bg-orange/20 rounded-2xl border-2 border-orange/40 flex items-center justify-center cursor-pointer hover:bg-orange/30 transition-all"
                    onClick={() => onNavigate('livestock')}
                  >
                    <div className="text-center text-white drop-shadow-lg">
                      <AnimatedIcon Icon={Heart} size={48} animation="wiggle" />
                      <p className="font-bold mt-2">Animals</p>
                    </div>
                  </div>

                  {/* Irrigation Area */}
                  <div 
                    className="bg-primary/20 rounded-2xl border-2 border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-all"
                    onClick={() => onNavigate('irrigation')}
                  >
                    <div className="text-center text-white drop-shadow-lg">
                      <AnimatedIcon Icon={Droplets} size={48} animation="bounce" />
                      <p className="font-bold mt-2">Water</p>
                    </div>
                  </div>

                  {/* Fertilizer Area */}
                  <div 
                    className="bg-yellow/20 rounded-2xl border-2 border-yellow/40 flex items-center justify-center cursor-pointer hover:bg-yellow/30 transition-all"
                    onClick={() => onNavigate('fertilizer')}
                  >
                    <div className="text-center text-white drop-shadow-lg">
                      <AnimatedIcon Icon={Flower} size={48} animation="spin" />
                      <p className="font-bold mt-2">Fertilize</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FarmCard>
        </div>

        {/* Farm Stats & Weather Panel */}
        <div className="space-y-6">
          {/* NASA Weather Data */}
          <FarmCard variant="stat">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <AnimatedIcon Icon={Sun} size={24} animation="spin" />
              NASA Weather
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Thermometer size={16} className="text-orange" />
                  Temperature
                </span>
                <span className="font-bold text-orange">75°F</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cloud size={16} className="text-primary" />
                  Humidity
                </span>
                <span className="font-bold text-primary">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Droplets size={16} className="text-blue-500" />
                  Rainfall
                </span>
                <span className="font-bold text-blue-500">0.2"</span>
              </div>
            </div>
          </FarmCard>

          {/* Farm Health Stats */}
          <FarmCard variant="activity">
            <h3 className="text-xl font-bold text-orange mb-4 flex items-center gap-2">
              <AnimatedIcon Icon={Gauge} size={24} animation="bounce" />
              Farm Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Crop Growth</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Soil Moisture</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Animal Health</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </FarmCard>

          {/* Quick Actions */}
          <FarmCard variant="default">
            <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <FarmButton 
                variant="green" 
                size="sm" 
                onClick={() => onNavigate('games')}
                className="text-sm"
              >
                🎮 Games
              </FarmButton>
              <FarmButton 
                variant="purple" 
                size="sm" 
                onClick={() => onNavigate('knowledge')}
                className="text-sm"
              >
                📊 NASA Data
              </FarmButton>
              <FarmButton 
                variant="yellow" 
                size="sm" 
                onClick={() => onNavigate('rewards')}
                className="text-sm"
              >
                🏆 Rewards
              </FarmButton>
              <FarmButton 
                variant="orange" 
                size="sm" 
                onClick={() => onNavigate('settings')}
                className="text-sm"
              >
                ⚙️ Settings
              </FarmButton>
            </div>
          </FarmCard>
        </div>
      </div>
    </div>
  );
};