
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { ClothingItem, ClothingCategory } from "../../types/dressup";

interface ClothingPanelProps {
  items: ClothingItem[];
  onItemSelect: (item: ClothingItem) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  category: { id: ClothingCategory; name: string; icon: string };
}

const ClothingPanel = ({ items, onItemSelect, onDragStart, onDragEnd, category }: ClothingPanelProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleDragStart = (e: React.DragEvent, item: ClothingItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    onDragStart();
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">{category.icon}</div>
        <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">
          Coming Soon!
        </h3>
        <p className="text-gray-600">
          More {category.name.toLowerCase()} will be available soon ✨
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-xl font-playfair font-semibold text-gray-800">
          {category.name}
        </h3>
        <Sparkles className="h-5 w-5 text-yellow-500" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragEnd={onDragEnd}
            onClick={() => onItemSelect(item)}
            className="group relative bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in border border-pink-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  favorites.has(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                }`} 
              />
            </button>

            {/* Item Image */}
            <div className="relative aspect-square rounded-t-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Item Info */}
            <div className="p-4">
              <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                {item.name}
              </h4>
              
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Apply
              </Button>
            </div>

            {/* Drag Hint */}
            <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 shadow-lg">
                Drag & Drop or Click!
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothingPanel;
