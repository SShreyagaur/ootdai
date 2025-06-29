
import { Home, Sparkles, Heart, MapPin, ShoppingBag, Palette } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface BottomNavProps {
  activeTab?: string;
}

const BottomNav = ({ activeTab }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/ai':
        return 'AI';
      case '/wishlist':
        return 'Wishlist';
      case '/map':
        return 'Map';
      case '/shop':
        return 'Shop';
      case '/styleit':
        return 'StyleIt';
      default:
        return 'Home';
    }
  };

  const currentTab = getActiveTab();

  const navItems = [
    { id: 'Home', icon: Home, label: 'Home', path: '/' },
    { id: 'AI', icon: Sparkles, label: 'AI', path: '/ai' },
    { id: 'Wishlist', icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { id: 'StyleIt', icon: Palette, label: 'Style It', path: '/styleit' },
    { id: 'Map', icon: MapPin, label: 'Map', path: '/map' },
    { id: 'Shop', icon: ShoppingBag, label: 'Shop', path: '/shop' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-pink-600' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
