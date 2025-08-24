import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface FarmCardProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  variant?: "default" | "stat" | "activity" | "reward";
  onClick?: () => void;
}

export const FarmCard = ({ 
  children, 
  className, 
  animated = true, 
  variant = "default",
  onClick 
}: FarmCardProps) => {
  const variantStyles = {
    default: "farm-card",
    stat: "farm-card bg-gradient-to-br from-primary/5 to-primary-light/10 border-primary/20",
    activity: "farm-card bg-gradient-to-br from-yellow/10 to-orange/10 border-orange/20 hover:border-orange/40",
    reward: "farm-card bg-gradient-to-br from-green/10 to-primary/10 border-green/20 hover:border-green/40 animate-pulse-glow"
  };

  return (
    <Card 
      className={cn(
        variantStyles[variant],
        animated && "bounce-in",
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};