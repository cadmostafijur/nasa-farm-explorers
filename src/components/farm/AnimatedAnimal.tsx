import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedAnimalProps {
  type: "cow" | "chicken" | "goat" | "pig";
  health: number; // 0-100
  happiness: number; // 0-100
  className?: string;
  onClick?: () => void;
}

export const AnimatedAnimal = ({ type, health, happiness, className, onClick }: AnimatedAnimalProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Random movement animation
    const moveInterval = setInterval(() => {
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 1000);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    // Show hearts when happiness is high
    if (happiness > 80) {
      setShowHearts(true);
      const timer = setTimeout(() => setShowHearts(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [happiness]);

  const getAnimalEmoji = () => {
    const healthyVariant = health > 70;
    switch (type) {
      case "cow":
        return healthyVariant ? "🐄" : "🐮";
      case "chicken":
        return healthyVariant ? "🐓" : "🐔";
      case "goat":
        return healthyVariant ? "🐐" : "🐐";
      case "pig":
        return healthyVariant ? "🐷" : "🐽";
      default:
        return "🐄";
    }
  };

  const getSize = () => {
    const baseSize = 36;
    const healthMultiplier = 0.7 + (health / 100) * 0.3;
    return baseSize * healthMultiplier;
  };

  return (
    <div 
      className={cn(
        "relative inline-block cursor-pointer transform transition-all duration-1000",
        isMoving && "translate-x-2 animate-wiggle",
        "hover:scale-110 hover:animate-bounce-slow",
        className
      )}
      onClick={onClick}
      style={{ fontSize: `${getSize()}px` }}
    >
      {getAnimalEmoji()}
      
      {/* Health indicator */}
      {health < 50 && (
        <div className="absolute -top-1 -right-1 animate-pulse">
          😷
        </div>
      )}
      
      {/* Happiness hearts */}
      {showHearts && (
        <div className="absolute -top-2 -right-2 animate-bounce-slow">
          💕
        </div>
      )}
      
      {/* Movement dust cloud effect */}
      {isMoving && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 animate-fade-in text-xs">
          💨
        </div>
      )}
    </div>
  );
};