
import { useState } from "react";
import { User, Users, Shirt, Palette, RotateCcw, Save, Share2, Heart, Sparkles, X } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ClothingItem {
  id: number;
  name: string;
  image: string;
  category: 'top' | 'bottom' | 'dress' | 'shoes' | 'accessories';
  brand: string;
  price: number;
}

interface StyledOutfit {
  top?: ClothingItem;
  bottom?: ClothingItem;
  dress?: ClothingItem;
  shoes?: ClothingItem;
  accessories?: ClothingItem;
}

const StyleIt = () => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [currentOutfit, setCurrentOutfit] = useState<StyledOutfit>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('tops');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<ClothingItem | null>(null);
  const { toast } = useToast();

  // Sample clothing items from wishlist and shop
  const clothingItems: ClothingItem[] = [
    {
      id: 1,
      name: "Floral Embroidered Top",
      image: "/lovable-uploads/c586921d-7c27-4b40-bc92-b3edd9b0a3ac.png",
      category: 'top',
      brand: "Boho Chic",
      price: 89.99
    },
    {
      id: 2,
      name: "Rose Applique Dress",
      image: "/lovable-uploads/2845e472-b8de-40de-8fbc-aa60ce676d92.png",
      category: 'dress',
      brand: "Romantic Rose",
      price: 156.00
    },
    {
      id: 3,
      name: "Tropical Print Set",
      image: "/lovable-uploads/5f92f4f7-5095-4e72-9d80-623fdc82905e.png",
      category: 'top',
      brand: "Island Vibes",
      price: 124.50
    },
    {
      id: 4,
      name: "Bohemian Mini Dress",
      image: "/lovable-uploads/d8133fc7-60f5-4eb3-b666-ec4368d76ef5.png",
      category: 'dress',
      brand: "Free Spirit",
      price: 98.00
    },
    {
      id: 5,
      name: "Embroidered Skirt",
      image: "/lovable-uploads/6118eec3-f694-4823-8138-93ab83074037.png",
      category: 'bottom',
      brand: "Folk Heritage",
      price: 142.99
    }
  ];

  const categories = [
    { id: 'tops', name: 'Tops', icon: Shirt },
    { id: 'bottoms', name: 'Bottoms', icon: Shirt },
    { id: 'dresses', name: 'Dresses', icon: Shirt },
    { id: 'shoes', name: 'Shoes', icon: Shirt },
    { id: 'accessories', name: 'Accessories', icon: Shirt }
  ];

  const getFilteredItems = (category: string) => {
    const categoryMap: { [key: string]: ClothingItem['category'] } = {
      'tops': 'top',
      'bottoms': 'bottom',
      'dresses': 'dress',
      'shoes': 'shoes',
      'accessories': 'accessories'
    };
    return clothingItems.filter(item => item.category === categoryMap[category]);
  };

  const handleItemSelect = (item: ClothingItem) => {
    setCurrentOutfit(prev => ({
      ...prev,
      [item.category]: item
    }));
    
    // Show sparkle animation
    const avatar = document.querySelector('.avatar-container');
    if (avatar) {
      avatar.classList.add('animate-pulse');
      setTimeout(() => {
        avatar.classList.remove('animate-pulse');
      }, 600);
    }

    toast({
      title: "✨ Item Added!",
      description: `${item.name} looks amazing on ${selectedGender === 'female' ? 'Barbie' : 'Ken'}!`,
    });
  };

  const handleRemoveItem = (category: ClothingItem['category']) => {
    setCurrentOutfit(prev => {
      const newOutfit = { ...prev };
      delete newOutfit[category];
      return newOutfit;
    });
    
    toast({
      title: "Item Removed",
      description: "Back to the wardrobe it goes!",
    });
  };

  const handleSaveOutfit = () => {
    toast({
      title: "💖 Outfit Saved!",
      description: "Your fabulous look has been saved to your collection",
    });
  };

  const handleShareOutfit = () => {
    toast({
      title: "📸 Outfit Shared!",
      description: "Your styling skills are now on display for everyone to see!",
    });
  };

  const handleResetOutfit = () => {
    setCurrentOutfit({});
    toast({
      title: "Fresh Start!",
      description: "Time for a new look!",
    });
  };

  const handleDragStart = (item: ClothingItem) => {
    setDraggedItem(item);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      handleItemSelect(draggedItem);
      handleDragEnd();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* StyleIt Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">
              ✨ Style It
            </h1>
            <p className="text-gray-600 mb-6">
              Dress up your avatar with fabulous outfits! Drag & drop or click to try on clothes
            </p>

            {/* Gender Selection */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Choose Your Model:</span>
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    selectedGender === 'female' 
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 transform scale-105' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  💖 Barbie
                </button>
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    selectedGender === 'male' 
                      ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 transform scale-105' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  🕺 Ken
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Styling Interface */}
        <div className="px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Avatar Display */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border-2 border-pink-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-playfair font-semibold text-gray-800 flex items-center gap-2">
                    {selectedGender === 'female' ? '💖 Barbie' : '🕺 Ken'} Avatar
                    <Sparkles className="h-4 w-4 text-pink-500" />
                  </h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleResetOutfit} className="hover:bg-pink-50">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleSaveOutfit} className="hover:bg-pink-50">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleShareOutfit} className="hover:bg-pink-50">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Avatar Visualization */}
                <div 
                  className={`avatar-container relative bg-gradient-to-br ${
                    selectedGender === 'female' 
                      ? 'from-pink-50 via-purple-50 to-rose-50' 
                      : 'from-blue-50 via-cyan-50 to-indigo-50'
                  } rounded-2xl p-8 h-96 flex items-center justify-center transition-all duration-500 ${
                    isDragging ? 'border-4 border-dashed border-pink-300 bg-pink-50' : ''
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute top-4 right-4 text-pink-200 text-2xl animate-pulse">✨</div>
                    <div className="absolute bottom-4 left-4 text-purple-200 text-xl animate-pulse">💫</div>
                    <div className="absolute top-1/2 left-2 text-pink-200 text-lg animate-pulse">🌟</div>
                  </div>

                  {/* Avatar Base */}
                  <div className={`relative w-32 h-72 ${
                    selectedGender === 'female' ? 'bg-pink-200' : 'bg-blue-200'
                  } rounded-full opacity-20 transition-all duration-300`}>
                    {/* Head */}
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 ${
                      selectedGender === 'female' ? 'bg-pink-300' : 'bg-blue-300'
                    } rounded-full opacity-30`} />
                  </div>

                  {/* Outfit Visualization */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    {/* Dress or Top/Bottom */}
                    {currentOutfit.dress ? (
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <img
                          src={currentOutfit.dress.image}
                          alt={currentOutfit.dress.name}
                          className="relative w-28 h-36 object-cover rounded-xl shadow-2xl border-2 border-white transform hover:scale-105 transition-all duration-300"
                        />
                        <button
                          onClick={() => handleRemoveItem('dress')}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transform hover:scale-110 transition-all duration-200 shadow-lg"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-md">
                          {currentOutfit.dress.name}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Top */}
                        {currentOutfit.top && (
                          <div className="relative group mb-2">
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <img
                              src={currentOutfit.top.image}
                              alt={currentOutfit.top.name}
                              className="relative w-24 h-20 object-cover rounded-lg shadow-2xl border-2 border-white transform hover:scale-105 transition-all duration-300"
                            />
                            <button
                              onClick={() => handleRemoveItem('top')}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transform hover:scale-110 transition-all duration-200 shadow-lg"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        
                        {/* Bottom */}
                        {currentOutfit.bottom && (
                          <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <img
                              src={currentOutfit.bottom.image}
                              alt={currentOutfit.bottom.name}
                              className="relative w-24 h-20 object-cover rounded-lg shadow-2xl border-2 border-white transform hover:scale-105 transition-all duration-300"
                            />
                            <button
                              onClick={() => handleRemoveItem('bottom')}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transform hover:scale-110 transition-all duration-200 shadow-lg"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Accessories */}
                    {currentOutfit.accessories && (
                      <div className="absolute top-2 right-2">
                        <img
                          src={currentOutfit.accessories.image}
                          alt={currentOutfit.accessories.name}
                          className="w-8 h-8 object-cover rounded-full shadow-lg border border-white"
                        />
                      </div>
                    )}

                    {/* Shoes */}
                    {currentOutfit.shoes && (
                      <div className="absolute bottom-2">
                        <img
                          src={currentOutfit.shoes.image}
                          alt={currentOutfit.shoes.name}
                          className="w-12 h-8 object-cover rounded-lg shadow-lg border border-white"
                        />
                      </div>
                    )}

                    {/* Empty State */}
                    {Object.keys(currentOutfit).length === 0 && (
                      <div className="text-center">
                        <div className="text-4xl mb-2">👗</div>
                        <p className="text-gray-400 text-sm">
                          Drag clothes here or<br />click "Try On" below!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Drop Zone Indicator */}
                  {isDragging && (
                    <div className="absolute inset-0 flex items-center justify-center bg-pink-100/80 rounded-2xl border-4 border-dashed border-pink-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✨</div>
                        <p className="text-pink-600 font-medium">Drop to try on!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Outfit Summary */}
                <div className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    Current Look
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {Object.entries(currentOutfit).map(([category, item]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="capitalize font-medium">{category}:</span>
                        <span className="text-pink-600">{item.name}</span>
                      </div>
                    ))}
                    {Object.keys(currentOutfit).length === 0 && (
                      <p className="text-gray-400 italic text-center py-2">
                        Ready for a makeover! 💄
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Clothing Selection */}
            <div className="lg:col-span-2">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-pink-600"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map(category => (
                  <TabsContent key={category.id} value={category.id} className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {getFilteredItems(category.id).map((item, index) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item)}
                          onDragEnd={handleDragEnd}
                          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing transform hover:scale-105 animate-fade-in group border-2 border-transparent hover:border-pink-200"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative overflow-hidden rounded-t-xl">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors transform hover:scale-110 duration-200">
                              <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500 transition-colors" />
                            </button>
                            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              {category.name.slice(0, -1)}
                            </div>
                          </div>
                          
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-800">
                                ${item.price}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleItemSelect(item)}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-xs px-3 py-1 transform hover:scale-105 transition-all duration-200 shadow-lg"
                              >
                                ✨ Try On
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {getFilteredItems(category.id).length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">👗</div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          No {category.name} Available
                        </h3>
                        <p className="text-gray-600">
                          Add some {category.name.toLowerCase()} to your wishlist or browse the shop
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab="StyleIt" />
    </div>
  );
};

export default StyleIt;
