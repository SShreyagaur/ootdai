
import { Search, Bell, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/ai');
    toast({
      title: "AI Assistant",
      description: "Opening AI-powered style tools",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/a5d93b19-0cd5-4206-8e90-2569cb496910.png" 
              alt="OOTD Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search outfits, styles, trends..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button className="md:hidden p-2 rounded-full hover:bg-pink-50 transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* Add Button */}
            <button 
              onClick={handleAddClick}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
            </button>
            
            {/* Notification Button */}
            <button className="p-2 rounded-full hover:bg-pink-50 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profile */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
