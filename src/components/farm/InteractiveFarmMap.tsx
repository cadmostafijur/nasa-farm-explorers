import { useState, useEffect } from "react";
import { AnimatedCrop } from "./AnimatedCrop";
import { AnimatedAnimal } from "./AnimatedAnimal";
import { ActionPopup } from "./ActionPopup";
import farmHero from "@/assets/farm-hero.png";

interface InteractiveFarmMapProps {
  onNavigate: (page: string) => void;
}

export const InteractiveFarmMap = ({ onNavigate }: InteractiveFarmMapProps) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [crops, setCrops] = useState([
    { id: 1, type: "corn" as const, growth: 85, x: 20, y: 30 },
    { id: 2, type: "wheat" as const, growth: 65, x: 35, y: 25 },
    { id: 3, type: "carrot" as const, growth: 90, x: 50, y: 35 },
    { id: 4, type: "tomato" as const, growth: 45, x: 65, y: 28 }
  ]);

  const [animals, setAnimals] = useState([
    { id: 1, type: "cow" as const, health: 92, happiness: 85, x: 75, y: 60 },
    { id: 2, type: "chicken" as const, health: 88, happiness: 90, x: 80, y: 65 },
    { id: 3, type: "goat" as const, health: 95, happiness: 80, x: 70, y: 55 }
  ]);

  const [waterDroplets, setWaterDroplets] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [showIrrigation, setShowIrrigation] = useState(false);

  // Simulate crop growth
  useEffect(() => {
    const interval = setInterval(() => {
      setCrops(prev => prev.map(crop => ({
        ...crop,
        growth: Math.min(100, crop.growth + Math.random() * 2)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Water droplet animation
  useEffect(() => {
    if (showIrrigation) {
      const interval = setInterval(() => {
        const newDroplet = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 40 + 20
        };
        setWaterDroplets(prev => [...prev, newDroplet]);
        
        // Remove droplet after animation
        setTimeout(() => {
          setWaterDroplets(prev => prev.filter(d => d.id !== newDroplet.id));
        }, 2000);
      }, 300);

      // Stop irrigation after 5 seconds
      setTimeout(() => setShowIrrigation(false), 5000);

      return () => clearInterval(interval);
    }
  }, [showIrrigation]);

  const handleAreaClick = (area: string) => {
    if (area === "irrigation") {
      setShowIrrigation(true);
    }
    setActivePopup(area);
  };

  return (
    <div className="relative">
      {/* Farm Background */}
      <div className="relative w-full h-96 rounded-3xl overflow-hidden">
        <img 
          src={farmHero} 
          alt="Your Interactive Farm" 
          className="w-full h-full object-cover"
        />
        
        {/* Semi-transparent overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

        {/* Interactive Crops */}
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${crop.x}%`, top: `${crop.y}%` }}
          >
            <AnimatedCrop
              type={crop.type}
              growth={crop.growth}
              onClick={() => handleAreaClick("crops")}
            />
          </div>
        ))}

        {/* Interactive Animals */}
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${animal.x}%`, top: `${animal.y}%` }}
          >
            <AnimatedAnimal
              type={animal.type}
              health={animal.health}
              happiness={animal.happiness}
              onClick={() => handleAreaClick("animals")}
            />
          </div>
        ))}

        {/* Water Droplets */}
        {waterDroplets.map((droplet) => (
          <div
            key={droplet.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 text-2xl animate-bounce-slow"
            style={{ left: `${droplet.x}%`, top: `${droplet.y}%` }}
          >
            💧
          </div>
        ))}

        {/* Interactive Area Overlays */}
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4">
          {/* Crop Management Area */}
          <div 
            className="bg-green/10 hover:bg-green/20 rounded-2xl border-2 border-green/30 hover:border-green/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
            onClick={() => handleAreaClick("crops")}
          >
            <div className="text-center text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-3xl mb-1 animate-bounce-slow">🌱</div>
              <p className="font-bold text-sm">Manage Crops</p>
            </div>
          </div>

          {/* Animal Care Area */}
          <div 
            className="bg-orange/10 hover:bg-orange/20 rounded-2xl border-2 border-orange/30 hover:border-orange/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
            onClick={() => handleAreaClick("animals")}
          >
            <div className="text-center text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-3xl mb-1 animate-wiggle">🐄</div>
              <p className="font-bold text-sm">Care for Animals</p>
            </div>
          </div>

          {/* Irrigation Area */}
          <div 
            className="bg-primary/10 hover:bg-primary/20 rounded-2xl border-2 border-primary/30 hover:border-primary/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
            onClick={() => handleAreaClick("water")}
          >
            <div className="text-center text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-3xl mb-1 animate-bounce">💧</div>
              <p className="font-bold text-sm">Water System</p>
            </div>
          </div>

          {/* Fertilizer Area */}
          <div 
            className="bg-yellow/10 hover:bg-yellow/20 rounded-2xl border-2 border-yellow/30 hover:border-yellow/50 flex items-center justify-center cursor-pointer transition-all duration-300 group"
            onClick={() => handleAreaClick("fertilizer")}
          >
            <div className="text-center text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-3xl mb-1 animate-spin-slow">🌼</div>
              <p className="font-bold text-sm">Add Fertilizer</p>
            </div>
          </div>
        </div>

        {/* Farm Status Indicators */}
        <div className="absolute top-4 left-4 flex gap-2 z-30">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold flex items-center gap-1">
            🌱 {crops.filter(c => c.growth > 80).length}/{crops.length} Ready
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold flex items-center gap-1">
            🐄 {animals.filter(a => a.health > 80).length}/{animals.length} Healthy
          </div>
        </div>

        {/* Irrigation indicator */}
        {showIrrigation && (
          <div className="absolute top-4 right-4 z-30">
            <div className="bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold flex items-center gap-2 animate-pulse-glow">
              <span className="animate-bounce-slow">🚿</span>
              Irrigation Active
            </div>
          </div>
        )}
      </div>

      {/* Action Popups */}
      <ActionPopup
        type="crops"
        isOpen={activePopup === "crops"}
        onClose={() => setActivePopup(null)}
      />
      <ActionPopup
        type="animals"
        isOpen={activePopup === "animals"}
        onClose={() => setActivePopup(null)}
      />
      <ActionPopup
        type="water"
        isOpen={activePopup === "water"}
        onClose={() => setActivePopup(null)}
      />
      <ActionPopup
        type="fertilizer"
        isOpen={activePopup === "fertilizer"}
        onClose={() => setActivePopup(null)}
      />
    </div>
  );
};