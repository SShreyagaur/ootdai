
import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Filter } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { toast } = useToast();

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Dynamically import mapbox-gl to avoid SSR issues
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');

      // Set access token
      mapboxgl.default.accessToken = mapboxToken;
      
      // Initialize map with normal 2D view
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40], // Centered on New York area
        zoom: 9
      });

      // Add navigation controls
      map.addControl(
        new mapboxgl.default.NavigationControl(),
        'top-right'
      );

      // Add fullscreen control
      map.addControl(new mapboxgl.default.FullscreenControl());

      // Sample fashion locations
      const fashionLocations = [
        { 
          name: "SoHo Fashion District", 
          coordinates: [-74.0027, 40.7230],
          description: "Trendy boutiques and designer stores"
        },
        { 
          name: "Fifth Avenue Shopping", 
          coordinates: [-73.9776, 40.7614],
          description: "Luxury flagship stores"
        },
        { 
          name: "Brooklyn Fashion Scene", 
          coordinates: [-73.9442, 40.6782],
          description: "Indie designers and vintage shops"
        },
        { 
          name: "Williamsburg Vintage", 
          coordinates: [-73.9532, 40.7081],
          description: "Curated vintage collections"
        },
        { 
          name: "Chelsea Market Fashion", 
          coordinates: [-74.0063, 40.7424],
          description: "Local artisan boutiques"
        }
      ];

      // Add markers for fashion locations
      fashionLocations.forEach(location => {
        const popup = new mapboxgl.default.Popup({ 
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(
          `<div class="p-3">
            <h3 class="font-semibold text-gray-800 mb-1">${location.name}</h3>
            <p class="text-sm text-gray-600">${location.description}</p>
          </div>`
        );

        const marker = new mapboxgl.default.Marker({
          color: '#ec4899',
          scale: 0.8
        })
          .setLngLat(location.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map);

        // Show popup on hover
        marker.getElement().addEventListener('mouseenter', () => popup.addTo(map));
        marker.getElement().addEventListener('mouseleave', () => popup.remove());
      });

      setShowTokenInput(false);
      toast({
        title: "Map Loaded",
        description: "Fashion locations are now visible on the map",
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to load the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    } else {
      toast({
        title: "Token Required",
        description: "Please enter a valid Mapbox access token",
        variant: "destructive"
      });
    }
  };

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

            {/* Mapbox Token Input */}
            {showTokenInput && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 text-center">
                <MapPin className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-3">
                  Enter Mapbox Access Token
                </h2>
                <p className="text-gray-600 mb-4">
                  To display the interactive map, please enter your Mapbox access token.
                  You can get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">mapbox.com</a>
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <Button onClick={handleTokenSubmit} className="bg-gradient-to-r from-pink-500 to-purple-500">
                    Load Map
                  </Button>
                </div>
              </div>
            )}

            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative" style={{ height: '500px' }}>
              <div ref={mapContainer} className="w-full h-full" />
              {showTokenInput && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Fashion Locations Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                { name: "SoHo", icon: "🏪", description: "Designer boutiques and galleries" },
                { name: "Fifth Avenue", icon: "🏢", description: "Luxury flagship stores" },
                { name: "Brooklyn", icon: "🎨", description: "Indie fashion and vintage" },
                { name: "Williamsburg", icon: "👗", description: "Trendy local designers" },
                { name: "Chelsea", icon: "🛍️", description: "Market fashion finds" },
              ].map((location, index) => (
                <div
                  key={location.name}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="Map" />
    </div>
  );
};

export default Map;
