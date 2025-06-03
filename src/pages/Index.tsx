
import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import FloatingAddButton from "../components/FloatingAddButton";
import OutfitCard from "../components/OutfitCard";
import { useToast } from "@/hooks/use-toast";

const outfits = [
  {
    id: 1,
    image: "/lovable-uploads/b374d91b-e45e-4183-992b-c173d8ab4170.png",
    likes: 234,
    isLiked: false,
    tags: ["Summer", "Casual", "Yellow", "Vest"],
    user: "StyleGuru",
    description: "Perfect summer casual look with yellow vest and denim shorts"
  },
  {
    id: 2,
    image: "/lovable-uploads/0a187387-44f3-45c9-802c-df1f1fe409ee.png",
    likes: 189,
    isLiked: false,
    tags: ["Tuesday", "Office", "Chic", "Trench"],
    user: "FashionDaily",
    description: "Tuesday office chic with cream trench and wide-leg denim"
  },
  {
    id: 3,
    image: "/lovable-uploads/80c97e5b-ca72-4e52-a1c9-cc639127684b.png",
    likes: 312,
    isLiked: true,
    tags: ["Brown", "Elegant", "Accessories"],
    user: "TrendSetter",
    description: "Elegant brown tones with luxury accessories"
  },
  {
    id: 4,
    image: "/lovable-uploads/1c15f918-2a02-4651-a417-d94ea553b9a0.png",
    likes: 156,
    isLiked: false,
    tags: ["Street Style", "Minimal", "Black & White"],
    user: "UrbanChic",
    description: "Minimalist street style in classic black and white"
  },
  {
    id: 5,
    image: "/lovable-uploads/7d5ad412-7ff9-4402-9c6c-2d6ad3adcb8d.png",
    likes: 278,
    isLiked: false,
    tags: ["Summer", "Floral", "Romantic"],
    user: "RomanticVibes",
    description: "Dreamy summer floral look by the water"
  },
  {
    id: 6,
    image: "/lovable-uploads/5f95102c-0c45-493f-be02-af2fa8dc8777.png",
    likes: 445,
    isLiked: true,
    tags: ["Bold", "Green", "Statement"],
    user: "ColorPop",
    description: "Bold green statement look that turns heads"
  },
  {
    id: 7,
    image: "/lovable-uploads/206d0354-8ae7-4012-9cbe-610c0b1aeead.png",
    likes: 203,
    isLiked: false,
    tags: ["Artistic", "Red", "Unique"],
    user: "ArtisticSoul",
    description: "Artistic red rose-inspired dress design"
  },
  {
    id: 8,
    image: "/lovable-uploads/2e03d297-f210-461d-b8f9-5a6784763120.png",
    likes: 167,
    isLiked: false,
    tags: ["Floral", "Garden", "Feminine"],
    user: "GardenParty",
    description: "Beautiful floral garden party ensemble"
  },
  {
    id: 9,
    image: "/lovable-uploads/176d2b4f-3d7f-43f1-99ae-f8e9126db858.png",
    likes: 298,
    isLiked: false,
    tags: ["Bohemian", "Colorful", "Artistic"],
    user: "BohoVibes",
    description: "Vibrant bohemian style with artistic prints"
  }
];

const Index = () => {
  const [likedOutfits, setLikedOutfits] = useState<number[]>([3, 6]);
  const { toast } = useToast();

  const handleLike = (outfitId: number) => {
    setLikedOutfits(prev => {
      const isLiked = prev.includes(outfitId);
      if (isLiked) {
        toast({
          title: "Removed from likes",
          description: "Outfit removed from your liked collection",
        });
        return prev.filter(id => id !== outfitId);
      } else {
        toast({
          title: "Added to likes",
          description: "Outfit saved to your liked collection",
        });
        return [...prev, outfitId];
      }
    });
  };

  const handleSave = (outfitId: number) => {
    toast({
      title: "Saved to wishlist",
      description: "Outfit added to your wishlist board",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Feed Content */}
        <main className="px-4 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">
                Discover Your Style
              </h1>
              <p className="text-gray-600 text-lg">
                Get inspired by the latest outfit trends and find your perfect look
              </p>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {outfits.map((outfit, index) => (
                <div key={outfit.id} className="break-inside-avoid">
                  <OutfitCard
                    outfit={{
                      ...outfit,
                      isLiked: likedOutfits.includes(outfit.id)
                    }}
                    onLike={() => handleLike(outfit.id)}
                    onSave={() => handleSave(outfit.id)}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <FloatingAddButton />
      <BottomNav activeTab="OOTD" />
    </div>
  );
};

export default Index;
