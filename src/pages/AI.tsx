
import { useState } from "react";
import { Sparkles, Wand2, Palette, Camera, Bot, Lightbulb, Upload, ImageIcon, Zap } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const aiFeatures = [
  {
    id: 1,
    icon: Camera,
    title: "Take Photo",
    description: "Capture your outfit and get AI-powered style analysis",
    color: "from-blue-500 to-cyan-500",
    action: "camera"
  },
  {
    id: 2,
    icon: Upload,
    title: "Upload Photo",
    description: "Upload existing photos for style recommendations",
    color: "from-green-500 to-emerald-500",
    action: "upload"
  },
  {
    id: 3,
    icon: Wand2,
    title: "Style Generator",
    description: "Generate personalized outfit combinations with AI",
    color: "from-purple-500 to-pink-500",
    action: "generate"
  },
  {
    id: 4,
    icon: Palette,
    title: "Color Matcher",
    description: "Find perfect color combinations for your wardrobe",
    color: "from-orange-500 to-red-500",
    action: "colors"
  },
  {
    id: 5,
    icon: Bot,
    title: "Style Assistant",
    description: "Chat with our AI stylist for personalized advice",
    color: "from-indigo-500 to-purple-500",
    action: "chat"
  },
  {
    id: 6,
    icon: Zap,
    title: "AI Generate",
    description: "Let AI create stunning outfits from scratch",
    color: "from-yellow-500 to-orange-500",
    action: "ai-create"
  }
];

const AI = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFeatureClick = (feature: typeof aiFeatures[0]) => {
    setSelectedFeature(feature.id);
    
    const actionMessages = {
      camera: { title: "Camera", description: "Opening camera to capture your outfit" },
      upload: { title: "Upload", description: "Select a photo from your gallery" },
      generate: { title: "Style Generator", description: "Creating personalized outfit combinations" },
      colors: { title: "Color Matcher", description: "Analyzing perfect color combinations" },
      chat: { title: "Style Assistant", description: "Starting conversation with AI stylist" },
      "ai-create": { title: "AI Generator", description: "Let AI create a style for you" }
    };

    const message = actionMessages[feature.action as keyof typeof actionMessages];
    toast(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* AI Content */}
        <main className="px-4 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-yellow-500 mr-2" />
                <h1 className="text-3xl font-playfair font-semibold text-gray-800">
                  AI Style Assistant
                </h1>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                All-in-one AI-powered fashion tools to discover, create, and perfect your style
              </p>
            </div>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedFeature === feature.id ? 'ring-2 ring-pink-300' : ''
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                      Try Now
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Coming Soon Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-3">
                More AI Features Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're working on exciting new AI-powered features to revolutionize your fashion experience
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Virtual Try-On", "Trend Prediction", "Smart Shopping", "Personal Stylist"].map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="AI" />
    </div>
  );
};

export default AI;
