import { useState, useEffect } from "react";
import { FarmCard } from "./FarmCard";
import { AnimatedIcon } from "./AnimatedIcon";
import { Sprout, Droplets, Heart, Gauge } from "lucide-react";

interface HealthStats {
  cropGrowth: number;
  soilMoisture: number;
  animalHealth: number;
}

export const FarmHealthStats = () => {
  const [stats, setStats] = useState<HealthStats>({
    cropGrowth: 85,
    soilMoisture: 72,
    animalHealth: 92
  });

  const [animatedStat, setAnimatedStat] = useState<string | null>(null);

  useEffect(() => {
    // Simulate small stat changes
    const interval = setInterval(() => {
      setStats(prev => ({
        cropGrowth: Math.min(100, Math.max(0, prev.cropGrowth + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.min(100, Math.max(0, prev.soilMoisture + (Math.random() - 0.5) * 8)),
        animalHealth: Math.min(100, Math.max(0, prev.animalHealth + (Math.random() - 0.5) * 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const animateStat = (statName: string) => {
    setAnimatedStat(statName);
    setTimeout(() => setAnimatedStat(null), 1000);
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return "from-green to-green/80";
    if (value >= 60) return "from-yellow to-yellow/80";
    if (value >= 40) return "from-orange to-orange/80";
    return "from-red to-red/80";
  };

  const getStatEmoji = (statName: string, value: number) => {
    if (value >= 90) return "🌟";
    if (value >= 80) return "😊";
    if (value >= 60) return "🙂";
    if (value >= 40) return "😐";
    return "😟";
  };

  const ProgressBar = ({ 
    label, 
    value, 
    icon: Icon, 
    color, 
    statKey 
  }: { 
    label: string; 
    value: number; 
    icon: any; 
    color: string; 
    statKey: string; 
  }) => (
    <div 
      className="cursor-pointer group"
      onClick={() => animateStat(statKey)}
    >
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="flex items-center gap-2 font-comic">
          <AnimatedIcon 
            Icon={Icon} 
            size={16} 
            animation={animatedStat === statKey ? "bounce" : "none"} 
          />
          {label}
        </span>
        <div className="flex items-center gap-1">
          <span className="font-bold">{value}%</span>
          <span className="text-lg">{getStatEmoji(statKey, value)}</span>
        </div>
      </div>
      
      <div className="relative w-full bg-muted rounded-full h-4 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${getStatColor(value)} transition-all duration-1000 ease-out relative`}
          style={{ width: `${value}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          
          {/* Pulse effect when animated */}
          {animatedStat === statKey && (
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          )}
        </div>
        
        {/* Progress bar decorations */}
        {value > 90 && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 animate-bounce-slow">
            ✨
          </div>
        )}
      </div>
      
      {/* Improvement suggestions */}
      {value < 70 && (
        <div className="mt-1 text-xs text-muted-foreground font-comic animate-fade-in">
          {statKey === "cropGrowth" && "💡 Try fertilizing your crops!"}
          {statKey === "soilMoisture" && "💡 Your plants need more water!"}
          {statKey === "animalHealth" && "💡 Feed your animals more!"}
        </div>
      )}
    </div>
  );

  return (
    <FarmCard variant="activity">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-orange flex items-center gap-2">
          <AnimatedIcon Icon={Gauge} size={24} animation="bounce" />
          Farm Health
        </h3>
        <div className="flex gap-1">
          {stats.cropGrowth > 80 && <span className="animate-bounce-slow">🌟</span>}
          {stats.soilMoisture > 80 && <span className="animate-bounce-slow">💧</span>}
          {stats.animalHealth > 80 && <span className="animate-bounce-slow">❤️</span>}
        </div>
      </div>
      
      <div className="space-y-6">
        <ProgressBar
          label="Crop Growth"
          value={Math.round(stats.cropGrowth)}
          icon={Sprout}
          color="green"
          statKey="cropGrowth"
        />
        
        <ProgressBar
          label="Soil Moisture"
          value={Math.round(stats.soilMoisture)}
          icon={Droplets}
          color="primary"
          statKey="soilMoisture"
        />
        
        <ProgressBar
          label="Animal Health"
          value={Math.round(stats.animalHealth)}
          icon={Heart}
          color="yellow"
          statKey="animalHealth"
        />
      </div>

      {/* Overall farm status */}
      <div className="mt-6 p-3 bg-gradient-to-r from-primary/5 to-green/5 rounded-xl">
        <div className="text-center">
          <div className="text-2xl mb-1">
            {(stats.cropGrowth + stats.soilMoisture + stats.animalHealth) / 3 > 85 ? "🌟" : 
             (stats.cropGrowth + stats.soilMoisture + stats.animalHealth) / 3 > 70 ? "😊" : "🙂"}
          </div>
          <div className="text-sm font-comic text-muted-foreground">
            Overall Farm Score: {Math.round((stats.cropGrowth + stats.soilMoisture + stats.animalHealth) / 3)}%
          </div>
        </div>
      </div>
    </FarmCard>
  );
};