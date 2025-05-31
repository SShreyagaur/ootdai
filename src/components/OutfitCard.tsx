
import { useState } from "react";
import { Heart, Bookmark, Share2, ShoppingBag } from "lucide-react";

interface Outfit {
  id: number;
  image: string;
  likes: number;
  isLiked: boolean;
  tags: string[];
  user: string;
  description: string;
}

interface OutfitCardProps {
  outfit: Outfit;
  onLike: () => void;
  onSave: () => void;
  delay?: number;
}

const OutfitCard = ({ outfit, onLike, onSave, delay = 0 }: OutfitCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group animate-scale-in mb-4"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={outfit.image}
          alt={outfit.description}
          className={`w-full h-auto object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-3 right-3 flex space-x-2">
            <button 
              onClick={onSave}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            >
              <Bookmark className="h-4 w-4 text-gray-700" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm">
              <Share2 className="h-4 w-4 text-gray-700" />
            </button>
          </div>
          
          <div className="absolute bottom-3 right-3">
            <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg">
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {outfit.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {outfit.description}
        </p>

        {/* User and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {outfit.user[0]}
              </span>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {outfit.user}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onLike}
              className="flex items-center space-x-1 group"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  outfit.isLiked
                    ? 'text-pink-500 fill-pink-500'
                    : 'text-gray-400 group-hover:text-pink-500'
                }`}
              />
              <span className="text-sm text-gray-600">{outfit.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
