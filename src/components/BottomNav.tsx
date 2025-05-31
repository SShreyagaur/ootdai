
import { Home, ShoppingBag, Map, Bookmark, Sparkles, Camera } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
}

const BottomNav = ({ activeTab }: BottomNavProps) => {
  const tabs = [
    { id: "OOTD", label: "OOTD", icon: Home, color: "text-pink-500" },
    { id: "Shop", label: "Shop", icon: ShoppingBag, color: "text-blue-500" },
    { id: "Map", label: "Map", icon: Map, color: "text-green-500" },
    { id: "Wishlist", label: "Wishlist", icon: Bookmark, color: "text-purple-500" },
    { id: "AI", label: "AI", icon: Sparkles, color: "text-yellow-500" },
    { id: "StyleIt", label: "StyleIt", icon: Camera, color: "text-indigo-500" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-100">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-pink-50 transform scale-105' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon
                  className={`h-5 w-5 mb-1 transition-colors ${
                    isActive ? tab.color : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? tab.color : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
