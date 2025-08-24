import { useState } from "react";
import { FarmCard } from "./FarmCard";
import { FarmButton } from "./FarmButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { X, Sprout, Heart, Droplets, Flower } from "lucide-react";

interface ActionPopupProps {
  type: "crops" | "animals" | "water" | "fertilizer";
  isOpen: boolean;
  onClose: () => void;
}

export const ActionPopup = ({ type, isOpen, onClose }: ActionPopupProps) => {
  const [actionInProgress, setActionInProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAction = async (action: string) => {
    setActionInProgress(true);
    
    // Simulate action with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setActionInProgress(false);
    setShowSuccess(true);
    
    // Auto-hide success message
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const getPopupContent = () => {
    switch (type) {
      case "crops":
        return {
          title: "🌱 Crop Management",
          color: "text-green",
          actions: [
            { name: "Plant Seeds", emoji: "🌰", description: "Plant new crops in empty plots", color: "green" },
            { name: "Water Crops", emoji: "💧", description: "Give your plants fresh water", color: "primary" },
            { name: "Harvest", emoji: "🌾", description: "Collect your fully grown crops", color: "yellow" }
          ]
        };
      case "animals":
        return {
          title: "🐄 Animal Care",
          color: "text-orange",
          actions: [
            { name: "Feed Animals", emoji: "🌾", description: "Give nutritious food to your animals", color: "yellow" },
            { name: "Health Check", emoji: "🩺", description: "Make sure all animals are healthy", color: "green" },
            { name: "Clean Barn", emoji: "🧹", description: "Keep the living space clean", color: "primary" }
          ]
        };
      case "water":
        return {
          title: "💧 Irrigation System",
          color: "text-primary",
          actions: [
            { name: "Turn On Sprinklers", emoji: "🚿", description: "Activate automatic watering", color: "primary" },
            { name: "Check Water Levels", emoji: "📊", description: "Monitor water storage tanks", color: "green" },
            { name: "Repair Pipes", emoji: "🔧", description: "Fix any broken irrigation pipes", color: "orange" }
          ]
        };
      case "fertilizer":
        return {
          title: "🌼 Fertilizer Management",
          color: "text-yellow",
          actions: [
            { name: "Apply Organic Fertilizer", emoji: "🍃", description: "Use natural compost for plants", color: "green" },
            { name: "Test Soil pH", emoji: "🧪", description: "Check if soil needs nutrients", color: "purple" },
            { name: "Spread Compost", emoji: "🗑️", description: "Add nutrient-rich compost", color: "yellow" }
          ]
        };
    }
  };

  const content = getPopupContent();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <FarmCard className="w-full max-w-md relative bounce-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-kids font-bold ${content.color} mb-2`}>
            {content.title}
          </h2>
          <p className="text-sm font-comic text-muted-foreground">
            Choose an action to improve your farm!
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green/10 border-2 border-green/20 rounded-2xl text-center bounce-in">
            <div className="text-4xl mb-2 animate-bounce-slow">🎉</div>
            <p className="font-bold text-green">Action completed successfully!</p>
            <p className="text-sm text-green/80">Your farm is looking better!</p>
          </div>
        )}

        {/* Action Loading */}
        {actionInProgress && (
          <div className="mb-6 p-4 bg-primary/10 border-2 border-primary/20 rounded-2xl text-center">
            <div className="text-4xl mb-2 animate-spin-slow">⚙️</div>
            <p className="font-bold text-primary">Working on it...</p>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: "60%"}}></div>
            </div>
          </div>
        )}

        {/* Actions */}
        {!showSuccess && !actionInProgress && (
          <div className="space-y-3">
            {content.actions.map((action, index) => (
              <FarmButton
                key={action.name}
                variant={action.color as any}
                size="md"
                className="w-full justify-start text-left p-4 h-auto"
                onClick={() => handleAction(action.name)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{action.emoji}</span>
                  <div>
                    <div className="font-bold">{action.name}</div>
                    <div className="text-sm opacity-80 font-normal">
                      {action.description}
                    </div>
                  </div>
                </div>
              </FarmButton>
            ))}
          </div>
        )}

        {/* Fun tip */}
        {!showSuccess && !actionInProgress && (
          <div className="mt-6 p-3 bg-yellow/10 rounded-xl text-center">
            <span className="text-xs font-comic text-muted-foreground">
              💡 Each action helps your farm grow stronger and healthier!
            </span>
          </div>
        )}
      </FarmCard>
    </div>
  );
};