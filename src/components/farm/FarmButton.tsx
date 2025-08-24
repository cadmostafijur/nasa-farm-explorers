import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const farmButtonVariants = cva(
  "farm-button relative overflow-hidden transition-all duration-300 font-comic",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-light text-primary-foreground",
        yellow: "bg-yellow hover:bg-yellow/90 text-black",
        orange: "bg-orange hover:bg-orange/90 text-white",
        green: "bg-green hover:bg-green/90 text-white",
        adventure: "bg-gradient-primary hover:shadow-glow text-primary-foreground",
        rainbow: "bg-gradient-rainbow hover:shadow-glow text-white",
        farm: "bg-gradient-farm hover:shadow-fun text-white",
        purple: "bg-purple hover:bg-purple/90 text-white",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-16 px-8 text-xl",
        xl: "h-20 px-12 text-2xl",
      },
      animation: {
        none: "",
        bounce: "hover:animate-bounce-slow",
        wiggle: "hover:animate-wiggle",
        float: "animate-float",
        glow: "animate-pulse-glow",
        spin: "hover:animate-spin-slow",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      animation: "none",
    },
  }
);

export interface FarmButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof farmButtonVariants> {}

const FarmButton = forwardRef<HTMLButtonElement, FarmButtonProps>(
  ({ className, variant, size, animation, ...props }, ref) => {
    return (
      <Button
        className={cn(farmButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

FarmButton.displayName = "FarmButton";

export { FarmButton, farmButtonVariants };