import { useState, useEffect } from "react";
import { FarmCard } from "./FarmCard";
import { AnimatedIcon } from "./AnimatedIcon";
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: "sunny" | "cloudy" | "rainy";
}

export const WeatherPanel = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 75,
    humidity: 68,
    rainfall: 0.2,
    condition: "sunny"
  });

  const [animateWeather, setAnimateWeather] = useState(false);

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      setAnimateWeather(true);
      setTimeout(() => setAnimateWeather(false), 1000);
      
      // Slight random variations for realism
      setWeather(prev => ({
        ...prev,
        temperature: 75 + Math.floor(Math.random() * 10 - 5),
        humidity: 68 + Math.floor(Math.random() * 20 - 10),
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.5) * 0.1)
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <AnimatedIcon Icon={Sun} size={32} color="hsl(var(--yellow))" animation="spin" />;
      case "cloudy":
        return <AnimatedIcon Icon={Cloud} size={32} color="hsl(var(--primary))" animation="float" />;
      case "rainy":
        return <AnimatedIcon Icon={CloudRain} size={32} color="hsl(var(--primary))" animation="bounce" />;
      default:
        return <AnimatedIcon Icon={Sun} size={32} color="hsl(var(--yellow))" animation="spin" />;
    }
  };

  const getTemperatureColor = () => {
    if (weather.temperature > 80) return "text-orange";
    if (weather.temperature > 70) return "text-yellow";
    return "text-primary";
  };

  return (
    <FarmCard variant="stat" className={animateWeather ? "animate-pulse-glow" : ""}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          🛰️ NASA Weather
        </h3>
        {getWeatherIcon()}
      </div>
      
      <div className="space-y-4">
        {/* Temperature */}
        <div className="flex items-center justify-between group">
          <span className="flex items-center gap-2">
            <Thermometer size={20} className={getTemperatureColor()} />
            <span className="font-comic">Temperature</span>
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${getTemperatureColor()}`}>
              {weather.temperature}°F
            </span>
            {weather.temperature > 85 && <span className="animate-bounce-slow">🔥</span>}
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between group">
          <span className="flex items-center gap-2">
            <Droplets size={20} className="text-primary" />
            <span className="font-comic">Humidity</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary">
              {weather.humidity}%
            </span>
            {weather.humidity > 80 && (
              <div className="flex gap-1">
                <span className="animate-bounce-slow">💧</span>
                <span className="animate-bounce-slow" style={{animationDelay: "0.2s"}}>💧</span>
              </div>
            )}
          </div>
        </div>

        {/* Rainfall */}
        <div className="flex items-center justify-between group">
          <span className="flex items-center gap-2">
            <CloudRain size={20} className="text-blue-500" />
            <span className="font-comic">Rainfall</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-blue-500">
              {weather.rainfall.toFixed(1)}"
            </span>
            {weather.rainfall > 0.5 && (
              <div className="flex flex-col gap-0">
                {[...Array(3)].map((_, i) => (
                  <span 
                    key={i}
                    className="animate-bounce-slow text-xs leading-none"
                    style={{animationDelay: `${i * 0.1}s`}}
                  >
                    💧
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Weather condition indicator */}
        <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-yellow/10 rounded-xl">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-comic">Today's Forecast:</span>
            <span className="font-bold capitalize text-primary">
              {weather.condition === "sunny" && "☀️ Perfect for farming!"}
              {weather.condition === "cloudy" && "☁️ Great growing weather!"}
              {weather.condition === "rainy" && "🌧️ Natural watering day!"}
            </span>
          </div>
        </div>
      </div>
    </FarmCard>
  );
};