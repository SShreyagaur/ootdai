
import { useState, useRef } from "react";
import { Sparkles, Heart } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import AvatarCanvas from "../components/DressUp/AvatarCanvas";
import GenderSelector from "../components/DressUp/GenderSelector";
import ActionButtons from "../components/DressUp/ActionButtons";
import CategoryTabs from "../components/DressUp/CategoryTabs";
import { ClothingItem, AvatarState, ClothingCategory } from "../types/dressup";

const DressUp = () => {
  const [selectedGender, setSelectedGender] = useState<'barbie' | 'ken'>('barbie');
  const [avatarState, setAvatarState] = useState<AvatarState>({
    hairstyle: null,
    top: null,
    bottom: null,
    dress: null,
    shoes: null,
    accessories: []
  });
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory>('hairstyles');
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample clothing items - in a real app, these would come from an API
  const clothingItems: ClothingItem[] = [
    // Hairstyles
    {
      id: 'hair1',
      name: "Elegant Updo",
      category: 'hairstyles',
      image: "/lovable-uploads/487b111f-a7ae-4b3c-9465-30c2c4a55b35.png",
      gender: 'barbie',
      zIndex: 1
    },
    {
      id: 'hair2',
      name: "Classic Blonde",
      category: 'hairstyles',
      image: "/lovable-uploads/7ec8f711-ca81-44c1-a6a8-0f1e879d9437.png",
      gender: 'barbie',
      zIndex: 1
    },
    // Tops
    {
      id: 'top1',
      name: "Striped Bandeau",
      category: 'tops',
      image: "/lovable-uploads/7ec8f711-ca81-44c1-a6a8-0f1e879d9437.png",
      gender: 'barbie',
      zIndex: 3
    },
    {
      id: 'top2',
      name: "Blue Halter Top",
      category: 'tops',
      image: "/lovable-uploads/97c8b0c8-cab4-4e35-ab83-26633abc293b.png",
      gender: 'barbie',
      zIndex: 3
    },
    // Ken Items
    {
      id: 'ken-hair1',
      name: "Classic Ken Hair",
      category: 'hairstyles',
      image: "/lovable-uploads/ad03bd41-bae8-4f65-9278-64b6fe6e72d1.png",
      gender: 'ken',
      zIndex: 1
    },
    {
      id: 'ken-top1',
      name: "Blue Blazer",
      category: 'tops',
      image: "/lovable-uploads/ad03bd41-bae8-4f65-9278-64b6fe6e72d1.png",
      gender: 'ken',
      zIndex: 3
    }
  ];

  const categories: { id: ClothingCategory; name: string; icon: string }[] = [
    { id: 'hairstyles', name: 'Hair', icon: '💇‍♀️' },
    { id: 'tops', name: 'Tops', icon: '👕' },
    { id: 'bottoms', name: 'Bottoms', icon: '👖' },
    { id: 'dresses', name: 'Dresses', icon: '👗' },
    { id: 'shoes', name: 'Shoes', icon: '👠' },
    { id: 'accessories', name: 'Accessories', icon: '💎' }
  ];

  const handleItemDrop = (item: ClothingItem) => {
    setAvatarState(prev => {
      const newState = { ...prev };
      
      if (item.category === 'accessories') {
        newState.accessories = [...prev.accessories, item];
      } else if (item.category === 'dresses') {
        // Dress replaces both top and bottom
        newState.dress = item;
        newState.top = null;
        newState.bottom = null;
      } else if (item.category === 'tops' || item.category === 'bottoms') {
        // Top or bottom removes dress
        newState.dress = null;
        newState[item.category] = item;
      } else {
        newState[item.category] = item;
      }
      
      return newState;
    });

    toast({
      title: "Item Applied! ✨",
      description: `${item.name} has been added to your avatar`,
    });
  };

  const handleReset = () => {
    setAvatarState({
      hairstyle: null,
      top: null,
      bottom: null,
      dress: null,
      shoes: null,
      accessories: []
    });
    toast({
      title: "Avatar Reset",
      description: "All items have been removed",
    });
  };

  const handleDownload = async () => {
    // In a real implementation, this would capture the canvas and download it
    toast({
      title: "Download Started! 📸",
      description: "Your styled avatar is being prepared for download",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative font-inter">
      {/* Magical Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-pink-300 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-300 rounded-full animate-bounce opacity-40" />
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-50" />
        <div className="absolute bottom-60 right-10 w-5 h-5 bg-yellow-300 rounded-full animate-pulse opacity-60" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Page Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-pink-500" />
              <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dress Up Studio
              </h1>
            </div>
            <p className="text-gray-600 mb-6">
              Create magical looks for your avatar! Drag and drop items or click to apply them ✨
            </p>

            <GenderSelector 
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
            />
          </div>
        </div>

        {/* Main Interface */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Avatar Canvas */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-playfair font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    {selectedGender === 'barbie' ? 'Barbie' : 'Ken'}
                  </h3>
                  <ActionButtons 
                    onReset={handleReset}
                    onDownload={handleDownload}
                  />
                </div>

                <AvatarCanvas
                  ref={canvasRef}
                  avatarState={avatarState}
                  gender={selectedGender}
                  isDragging={isDragging}
                  onItemDrop={handleItemDrop}
                />
              </div>
            </div>

            {/* Clothing Panel */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                <CategoryTabs
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  categories={categories}
                  clothingItems={clothingItems}
                  selectedGender={selectedGender}
                  onItemSelect={handleItemDrop}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab="DressUp" />
    </div>
  );
};

export default DressUp;
