import { useState, useEffect } from "react";
import { fetchPowerDaily } from "../../lib/nasa/power";
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

  // Simple helpers
  const mmToIn = (mm: number) => Number((mm / 25.4).toFixed(1));

  const [animateWeather, setAnimateWeather] = useState(false);

  useEffect(() => {
    const lat = 23.8103; // default; can be wired to map/geo later
    const lon = 90.4125;

    const loadRealtime = async () => {
      try {
        // Realtime current conditions from Open-Meteo (°C and mm)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto`;
        const res = await fetch(url);
        if (res.ok) {
          const d = await res.json();
          const tC = Math.round(d?.current?.temperature_2m ?? weather.temperature);
          const rh = Math.round(d?.current?.relative_humidity_2m ?? weather.humidity);
          const precipMm = typeof d?.current?.precipitation === "number" ? d.current.precipitation : 0;
          const rainIn = mmToIn(precipMm);
          setWeather(prev => ({
            ...prev,
            temperature: tC,
            humidity: rh,
            rainfall: rainIn,
            condition: tC >= 27 ? "sunny" : rainIn > 0.2 ? "rainy" : "cloudy"
          }));
        }
      } catch {
        // ignore and keep previous/mock values
      }

      // Also backfill daily context from POWER (optional, not blocking)
      try {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        const startDate = new Date(endDate.getTime());
        startDate.setDate(startDate.getDate() - 6);
        const yyyymmdd = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const resp = await fetchPowerDaily({ latitude: lat, longitude: lon, start: yyyymmdd(startDate), end: yyyymmdd(endDate) });
        const last = (resp.records || []).filter(r => r).slice(-1)[0];
        if (last && last.humidity != null) {
          setWeather(prev => ({ ...prev, humidity: Math.round(last.humidity as number) }));
        }
      } catch {}
    };

    // Initial load
    loadRealtime();

    // Refresh every 5 minutes
    const refresh = setInterval(loadRealtime, 5 * 60 * 1000);

    // Light animation pulse loop (kept from original)
    const pulse = setInterval(() => {
      setAnimateWeather(true);
      setTimeout(() => setAnimateWeather(false), 1000);
    }, 8000);

    return () => {
      clearInterval(refresh);
      clearInterval(pulse);
    };
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
    // temperature now interpreted as °C
    if (weather.temperature > 30) return "text-orange";
    if (weather.temperature > 24) return "text-yellow";
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
              {weather.temperature}°C
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