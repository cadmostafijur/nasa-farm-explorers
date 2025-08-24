import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  Icon: LucideIcon;
  className?: string;
  animation?: "wiggle" | "float" | "bounce" | "spin" | "none";
  size?: number;
  color?: string;
}

export const AnimatedIcon = ({ 
  Icon, 
  className, 
  animation = "none", 
  size = 24, 
  color = "currentColor" 
}: AnimatedIconProps) => {
  const animationClass = {
    wiggle: "hover:animate-wiggle",
    float: "animate-float",
    bounce: "hover:animate-bounce-slow",
    spin: "hover:animate-spin-slow",
    none: ""
  };

  return (
    <Icon 
      size={size} 
      color={color}
      className={cn(
        "animated-icon transition-all duration-300",
        animationClass[animation],
        className
      )} 
    />
  );
};