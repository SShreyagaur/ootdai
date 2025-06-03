
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import OutfitCard from "../components/OutfitCard";

const Index = () => {
  const outfits = [
    {
      id: 1,
      image: "/lovable-uploads/176d2b4f-3d7f-43f1-99ae-f8e9126db858.png",
      user: "Emma Chen",
      avatar: "/lovable-uploads/7d5ad412-7ff9-4402-9c6c-2d6ad3adcb8d.png",
      likes: 234,
      description: "Casual chic for weekend brunch",
      tags: ["casual", "weekend", "brunch"]
    },
    {
      id: 2,
      image: "/lovable-uploads/5f95102c-0c45-493f-be02-af2fa8dc8777.png",
      user: "Sophia Rodriguez",
      avatar: "/lovable-uploads/80c97e5b-ca72-4e52-a1c9-cc639127684b.png",
      likes: 189,
      description: "Business casual with a pop of color",
      tags: ["business", "professional", "colorful"]
    },
    {
      id: 3,
      image: "/lovable-uploads/2e03d297-f210-461d-b8f9-5a6784763120.png",
      user: "Maya Patel",
      avatar: "/lovable-uploads/b374d91b-e45e-4183-992b-c173d8ab4170.png",
      likes: 156,
      description: "Elegant evening look",
      tags: ["elegant", "evening", "formal"]
    },
    {
      id: 4,
      image: "/lovable-uploads/1c15f918-2a02-4651-a417-d94ea553b9a0.png",
      user: "Lisa Wang",
      avatar: "/lovable-uploads/206d0354-8ae7-4012-9cbe-610c0b1aeead.png",
      likes: 312,
      description: "Summer vibes with layers",
      tags: ["summer", "layers", "trendy"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Hero Section */}
        <section className="px-4 pt-8 pb-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4 animate-fade-in">
              Today's Style
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Inspiration</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover amazing outfits and share your style with the community
            </p>
          </div>
        </section>

        {/* Outfit Grid */}
        <main className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {outfits.map((outfit, index) => (
                <div 
                  key={outfit.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <OutfitCard {...outfit} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="OOTD" />
    </div>
  );
};

export default Index;
