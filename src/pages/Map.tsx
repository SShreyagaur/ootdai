
import { MapPin, Search, Filter, Navigation } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";

const Map = () => {
  // Sample fashion locations
  const fashionLocations = [
    { 
      name: "SoHo Fashion District", 
      address: "SoHo, New York, NY",
      description: "Trendy boutiques and designer stores",
      icon: "🏪"
    },
    { 
      name: "Fifth Avenue Shopping", 
      address: "Fifth Avenue, New York, NY",
      description: "Luxury flagship stores",
      icon: "🏢"
    },
    { 
      name: "Brooklyn Fashion Scene", 
      address: "Brooklyn, NY",
      description: "Indie designers and vintage shops",
      icon: "🎨"
    },
    { 
      name: "Williamsburg Vintage", 
      address: "Williamsburg, Brooklyn, NY",
      description: "Curated vintage collections",
      icon: "👗"
    },
    { 
      name: "Chelsea Market Fashion", 
      address: "Chelsea Market, New York, NY",
      description: "Local artisan boutiques",
      icon: "🛍️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Map Content */}
        <main className="px-4 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-playfair font-semibold text-gray-800 mb-2">
                  Fashion Map
                </h1>
                <p className="text-gray-600">
                  Discover local fashion stores and shopping destinations
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Interactive Map Container */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6" style={{ height: '500px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fashion Locations Map"
              />
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-playfair font-semibold text-gray-800">
                  Quick Navigation
                </h2>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Fashion District", "Shopping Centers", "Boutiques", "Vintage Stores", "Designer Outlets", "Local Markets"].map((area) => (
                  <Button
                    key={area}
                    variant="ghost"
                    className="justify-start h-auto p-3 text-left hover:bg-pink-50"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="text-sm">{area}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Fashion Locations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fashionLocations.map((location, index) => (
                <div
                  key={location.name}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in cursor-pointer hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{location.address}</p>
                      <p className="text-sm text-gray-600">{location.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs text-pink-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="bg-white rounded-xl p-4 shadow-md mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Map Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <span>Fashion Stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span>Shopping Centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>Vintage Shops</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Designer Boutiques</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="Map" />
    </div>
  );
};

export default Map;
