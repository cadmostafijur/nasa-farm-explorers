import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCropProps {
  type: "corn" | "wheat" | "carrot" | "tomato";
  growth: number; // 0-100
  className?: string;
  onClick?: () => void;
}

export const AnimatedCrop = ({ type, growth, className, onClick }: AnimatedCropProps) => {
  const [isGrowing, setIsGrowing] = useState(false);

  useEffect(() => {
    if (growth > 0) {
      setIsGrowing(true);
      const timer = setTimeout(() => setIsGrowing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [growth]);

  const getCropEmoji = () => {
    const stages = Math.floor(growth / 25);
    switch (type) {
      case "corn":
        return ["🌱", "🌿", "🌽", "🌽"][stages] || "🌱";
      case "wheat":
        return ["🌱", "🌿", "🌾", "🌾"][stages] || "🌱";
      case "carrot":
        return ["🌱", "🥬", "🥕", "🥕"][stages] || "🌱";
      case "tomato":
        return ["🌱", "🌿", "🍅", "🍅"][stages] || "🌱";
      default:
        return "🌱";
    }
  };

  const getSize = () => {
    const baseSize = 32;
    const growthMultiplier = 0.5 + (growth / 100) * 0.5;
    return baseSize * growthMultiplier;
  };

  return (
    <div 
      className={cn(
        "inline-block cursor-pointer transform transition-all duration-500",
        isGrowing && "animate-bounce-slow scale-105",
        "hover:scale-110 hover:animate-wiggle",
        className
      )}
      onClick={onClick}
      style={{ fontSize: `${getSize()}px` }}
    >
      {getCropEmoji()}
      {growth > 80 && (
        <div className="absolute -top-1 -right-1 animate-bounce-slow">
          ✨
        </div>
      )}
    </div>
  );
};