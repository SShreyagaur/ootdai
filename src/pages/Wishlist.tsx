
import { useState } from "react";
import { Plus, Heart, MoreVertical, Grid, List } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WishlistBoard {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  coverImage: string;
  isSecret: boolean;
}

const Wishlist = () => {
  const [boards, setBoards] = useState<WishlistBoard[]>([
    {
      id: 1,
      name: "Summer Vibes",
      description: "Light and breezy outfits for warm weather",
      itemCount: 12,
      coverImage: "/lovable-uploads/176d2b4f-3d7f-43f1-99ae-f8e9126db858.png",
      isSecret: false
    },
    {
      id: 2,
      name: "Work Wardrobe",
      description: "Professional looks for the office",
      itemCount: 8,
      coverImage: "/lovable-uploads/5f95102c-0c45-493f-be02-af2fa8dc8777.png",
      isSecret: false
    },
    {
      id: 3,
      name: "Evening Elegance",
      description: "Sophisticated outfits for special occasions",
      itemCount: 5,
      coverImage: "/lovable-uploads/2e03d297-f210-461d-b8f9-5a6784763120.png",
      isSecret: true
    }
  ]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleCreateBoard = () => {
    toast({
      title: "Create Board",
      description: "Opening board creation form",
    });
  };

  const handleBoardClick = (board: WishlistBoard) => {
    toast({
      title: board.name,
      description: `Opening board with ${board.itemCount} items`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Wishlist Content */}
        <main className="px-4 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">
                  My Wishlists
                </h1>
                <p className="text-gray-600">
                  Organize your favorite styles into boards
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Create Board Button */}
                <Button
                  onClick={handleCreateBoard}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Board
                </Button>
              </div>
            </div>

            {/* Boards Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {boards.map((board, index) => (
                <div
                  key={board.id}
                  onClick={() => handleBoardClick(board)}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in ${
                    viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Cover Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={board.coverImage}
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          {board.isSecret && (
                            <span className="bg-gray-800/70 text-white px-2 py-1 rounded-full text-xs">
                              Secret
                            </span>
                          )}
                          <button className="bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors">
                            <MoreVertical className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Board Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-playfair font-semibold text-gray-800 mb-1">
                          {board.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {board.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">
                            {board.itemCount} items
                          </span>
                          <Heart className="h-4 w-4 text-pink-500" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <img
                        src={board.coverImage}
                        alt={board.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-playfair font-semibold text-gray-800">
                            {board.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {board.isSecret && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                Secret
                              </span>
                            )}
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">
                          {board.description}
                        </p>
                        <span className="text-gray-500 text-sm">
                          {board.itemCount} items
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="Wishlist" />
    </div>
  );
};

export default Wishlist;
