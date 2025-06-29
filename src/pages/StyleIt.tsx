
import { useState } from "react";
import { User, Users, Shirt, Palette, RotateCcw, Save, Share2, Heart } from "lucide-react";
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
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your outfit`,
    });
  };

  const handleRemoveItem = (category: ClothingItem['category']) => {
    setCurrentOutfit(prev => {
      const newOutfit = { ...prev };
      delete newOutfit[category];
      return newOutfit;
    });
  };

  const handleSaveOutfit = () => {
    toast({
      title: "Outfit Saved",
      description: "Your styled outfit has been saved to your collection",
    });
  };

  const handleShareOutfit = () => {
    toast({
      title: "Outfit Shared",
      description: "Your outfit has been shared with the community",
    });
  };

  const handleResetOutfit = () => {
    setCurrentOutfit({});
    toast({
      title: "Outfit Reset",
      description: "Your outfit has been cleared",
    });
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
              Style It
            </h1>
            <p className="text-gray-600 mb-6">
              Mix and match your favorite pieces on virtual avatars
            </p>

            {/* Gender Selection */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Choose Avatar:</span>
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    selectedGender === 'female' ? 'bg-pink-100 text-pink-600' : 'text-gray-600'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Barbie
                </button>
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    selectedGender === 'male' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Ken
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
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-playfair font-semibold text-gray-800">
                    {selectedGender === 'female' ? 'Barbie' : 'Ken'} Avatar
                  </h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleResetOutfit}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleSaveOutfit}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleShareOutfit}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Avatar Visualization */}
                <div className="relative bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl p-8 h-96 flex items-end justify-center">
                  {/* Avatar Base */}
                  <div className={`relative w-32 h-80 ${
                    selectedGender === 'female' ? 'bg-pink-200' : 'bg-blue-200'
                  } rounded-full opacity-30`}>
                    {/* Head */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 ${
                      selectedGender === 'female' ? 'bg-pink-300' : 'bg-blue-300'
                    } rounded-full`} />
                  </div>

                  {/* Outfit Visualization */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {currentOutfit.dress && (
                      <div className="relative">
                        <img
                          src={currentOutfit.dress.image}
                          alt={currentOutfit.dress.name}
                          className="w-24 h-32 object-cover rounded-lg shadow-lg"
                        />
                        <button
                          onClick={() => handleRemoveItem('dress')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    
                    {!currentOutfit.dress && (
                      <>
                        {currentOutfit.top && (
                          <div className="relative mb-2">
                            <img
                              src={currentOutfit.top.image}
                              alt={currentOutfit.top.name}
                              className="w-20 h-16 object-cover rounded-lg shadow-lg"
                            />
                            <button
                              onClick={() => handleRemoveItem('top')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        )}
                        
                        {currentOutfit.bottom && (
                          <div className="relative">
                            <img
                              src={currentOutfit.bottom.image}
                              alt={currentOutfit.bottom.name}
                              className="w-20 h-16 object-cover rounded-lg shadow-lg"
                            />
                            <button
                              onClick={() => handleRemoveItem('bottom')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Current Outfit Summary */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Current Outfit</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {Object.entries(currentOutfit).map(([category, item]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="capitalize">{category}:</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    ))}
                    {Object.keys(currentOutfit).length === 0 && (
                      <p className="text-gray-400 italic">No items selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Clothing Selection */}
            <div className="lg:col-span-2">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
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
                          onClick={() => handleItemSelect(item)}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-40 object-cover rounded-t-xl"
                            />
                            <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                              <Heart className="h-4 w-4 text-gray-600" />
                            </button>
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
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-xs px-3 py-1"
                              >
                                Try On
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {getFilteredItems(category.id).length === 0 && (
                      <div className="text-center py-12">
                        <Palette className="h-12 w-12 mx-auto text-gray-400 mb-4" />
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
