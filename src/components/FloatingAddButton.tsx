
import { useState } from "react";
import { Plus, Camera, Image, Palette, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FloatingAddButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Camera,
      label: "Take Photo",
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        toast({
          title: "Camera",
          description: "Opening camera to capture your outfit",
        });
      }
    },
    {
      icon: Image,
      label: "Upload Photo",
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        toast({
          title: "Upload",
          description: "Select a photo from your gallery",
        });
      }
    },
    {
      icon: Palette,
      label: "Create Style",
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        toast({
          title: "Style Creator",
          description: "Opening style creation tool",
        });
      }
    },
    {
      icon: Sparkles,
      label: "AI Generate",
      color: "bg-yellow-500 hover:bg-yellow-600",
      action: () => {
        toast({
          title: "AI Generator",
          description: "Let AI create a style for you",
        });
      }
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end">
      {/* Quick Action Buttons */}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-4 animate-fade-in">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                className={`${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center gap-3 group`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pr-2">
                  {action.label}
                </span>
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      )}

      {/* Main + Button */}
      <button
        onClick={toggleExpanded}
        className={`bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingAddButton;
