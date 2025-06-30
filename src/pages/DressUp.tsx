
import { useState, useRef } from "react";
import { Download, RotateCcw, Sparkles, Heart } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AvatarCanvas from "../components/DressUp/AvatarCanvas";
import ClothingPanel from "../components/DressUp/ClothingPanel";
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
      } else if (item.category === 'dress') {
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

  const getFilteredItems = (category: ClothingCategory) => {
    return clothingItems.filter(item => 
      item.category === category && item.gender === selectedGender
    );
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

            {/* Avatar Selection */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Choose Avatar:</span>
              <div className="flex bg-white rounded-xl p-1 shadow-lg">
                <button
                  onClick={() => setSelectedGender('barbie')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedGender === 'barbie' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  <span className="text-2xl">👸</span>
                  <span className="font-medium">Barbie</span>
                </button>
                <button
                  onClick={() => setSelectedGender('ken')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedGender === 'ken' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-2xl">🤴</span>
                  <span className="font-medium">Ken</span>
                </button>
              </div>
            </div>
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
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleReset}
                      className="hover:bg-red-50 hover:border-red-200"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleDownload}
                      className="hover:bg-green-50 hover:border-green-200"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
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
                <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ClothingCategory)} className="w-full">
                  <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-pink-100 to-purple-100 p-1 rounded-2xl mb-6">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-xs font-medium hidden sm:block">{category.name}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map(category => (
                    <TabsContent key={category.id} value={category.id}>
                      <ClothingPanel
                        items={getFilteredItems(category.id)}
                        onItemSelect={handleItemDrop}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        category={category}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
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
