
import { forwardRef } from "react";
import { AvatarState } from "../../types/dressup";

interface AvatarCanvasProps {
  avatarState: AvatarState;
  gender: 'barbie' | 'ken';
  isDragging: boolean;
  onItemDrop: (item: any) => void;
}

const AvatarCanvas = forwardRef<HTMLDivElement, AvatarCanvasProps>(
  ({ avatarState, gender, isDragging, onItemDrop }, ref) => {
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const itemData = e.dataTransfer.getData('application/json');
      if (itemData) {
        const item = JSON.parse(itemData);
        onItemDrop(item);
      }
    };

    const baseAvatarImage = gender === 'barbie' 
      ? "/lovable-uploads/7ec8f711-ca81-44c1-a6a8-0f1e879d9437.png"
      : "/lovable-uploads/6ba15a48-a7a2-4291-a689-de2b2aee8e59.png";

    return (
      <div
        ref={ref}
        className={`relative w-full h-96 bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 rounded-2xl overflow-hidden transition-all duration-300 ${
          isDragging ? 'ring-4 ring-pink-300 ring-opacity-50 scale-105' : ''
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Drop Zone Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-pink-200/30 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
            <div className="text-center">
              <div className="text-4xl mb-2">✨</div>
              <p className="text-pink-600 font-medium">Drop item here!</p>
            </div>
          </div>
        )}

        {/* Avatar Layers */}
        <div className="absolute inset-0 flex items-end justify-center">
          
          {/* Base Avatar */}
          <div className="relative w-48 h-80">
            
            {/* Background Elements (Hair behind head) */}
            {avatarState.hairstyle && (
              <img
                src={avatarState.hairstyle.image}
                alt="Hairstyle"
                className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
                style={{ zIndex: avatarState.hairstyle.zIndex }}
              />
            )}
            
            {/* Base Body */}
            <img
              src={baseAvatarImage}
              alt={`${gender} avatar`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 2 }}
            />
            
            {/* Clothing Layers */}
            {avatarState.dress && (
              <img
                src={avatarState.dress.image}
                alt="Dress"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                style={{ zIndex: avatarState.dress.zIndex }}
              />
            )}
            
            {!avatarState.dress && (
              <>
                {avatarState.top && (
                  <img
                    src={avatarState.top.image}
                    alt="Top"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    style={{ zIndex: avatarState.top.zIndex }}
                  />
                )}
                
                {avatarState.bottom && (
                  <img
                    src={avatarState.bottom.image}
                    alt="Bottom"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    style={{ zIndex: avatarState.bottom.zIndex }}
                  />
                )}
              </>
            )}
            
            {/* Shoes */}
            {avatarState.shoes && (
              <img
                src={avatarState.shoes.image}
                alt="Shoes"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                style={{ zIndex: avatarState.shoes.zIndex }}
              />
            )}
            
            {/* Accessories */}
            {avatarState.accessories.map((accessory, index) => (
              <img
                key={`${accessory.id}-${index}`}
                src={accessory.image}
                alt={accessory.name}
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                style={{ zIndex: accessory.zIndex + index }}
              />
            ))}
          </div>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-4 left-4 text-yellow-300 animate-pulse">✨</div>
        <div className="absolute top-8 right-6 text-pink-300 animate-bounce">💫</div>
        <div className="absolute bottom-8 left-6 text-purple-300 animate-ping">⭐</div>
      </div>
    );
  }
);

AvatarCanvas.displayName = 'AvatarCanvas';

export default AvatarCanvas;
