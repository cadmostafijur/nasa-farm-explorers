import { FarmButton } from "./FarmButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { Sparkles, Tractor, Sprout } from "lucide-react";
import nasaLogo from "@/assets/nasa-farm-logo.png";

interface SplashScreenProps {
  onStartAdventure: () => void;
}

export const SplashScreen = ({ onStartAdventure }: SplashScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-sky">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 animate-float">
        <AnimatedIcon Icon={Sparkles} size={40} color="hsl(var(--yellow))" animation="wiggle" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <AnimatedIcon Icon={Tractor} size={50} color="hsl(var(--orange))" animation="float" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <AnimatedIcon Icon={Sprout} size={45} color="hsl(var(--green))" animation="bounce" />
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 bounce-in">
        {/* App Logo */}
        <div className="relative">
          <img 
            src={nasaLogo} 
            alt="NASA Farm Explorers Logo" 
            className="w-48 h-48 mx-auto animate-float drop-shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 animate-bounce-slow">
            <AnimatedIcon Icon={Sparkles} size={30} color="hsl(var(--yellow))" />
          </div>
        </div>

        {/* App Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-kids font-bold text-primary drop-shadow-lg">
            NASA Farm
          </h1>
          <h2 className="text-5xl font-kids font-bold text-orange drop-shadow-lg">
            Explorers
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-xl font-comic text-foreground/80 max-w-md mx-auto leading-relaxed">
          🚀 Explore sustainable farming with NASA satellite data! 
          <br />
          🌱 Grow crops, care for animals, and save our planet!
        </p>

        {/* Start Button */}
        <div className="pt-8">
          <FarmButton 
            variant="adventure" 
            size="xl" 
            animation="glow"
            onClick={onStartAdventure}
            className="relative"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sprout size={32} />
              Start Adventure!
              <Sparkles size={32} />
            </span>
          </FarmButton>
        </div>

        {/* Fun tagline */}
        <p className="text-sm font-comic text-muted-foreground animate-pulse">
          ✨ Ready to become a space farmer? ✨
        </p>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};