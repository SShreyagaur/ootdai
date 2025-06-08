
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
      
      // Initialize map
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe' as any,
        zoom: 1.5,
        center: [30, 15],
        pitch: 45,
      });

      // Add navigation controls
      map.addControl(
        new mapboxgl.default.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.on('style.load', () => {
        map.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

      // Sample fashion locations
      const fashionLocations = [
        { name: "Paris Fashion Week", coordinates: [2.3522, 48.8566] },
        { name: "Milan Fashion District", coordinates: [9.1900, 45.4642] },
        { name: "New York Fashion Week", coordinates: [-74.0059, 40.7128] },
        { name: "Tokyo Fashion Week", coordinates: [139.6917, 35.6895] },
        { name: "London Fashion Week", coordinates: [-0.1276, 51.5074] }
      ];

      // Add markers for fashion locations
      fashionLocations.forEach(location => {
        const popup = new mapboxgl.default.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-semibold text-gray-800">${location.name}</h3>
            <p class="text-sm text-gray-600">Fashion hotspot</p>
          </div>`
        );

        new mapboxgl.default.Marker({
          color: '#ec4899'
        })
          .setLngLat(location.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map);
      });

      // Rotation animation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.getCenter();
          center.lng -= distancePerSecond;
          map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.on('moveend', () => {
        spinGlobe();
      });

      // Start the globe spinning
      spinGlobe();

      setShowTokenInput(false);
      toast({
        title: "Map Loaded",
        description: "Fashion locations around the world are now visible",
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to load the map. Please check your Mapbox token.",
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
                  Fashion World Map
                </h1>
                <p className="text-gray-600">
                  Discover fashion hotspots and style inspiration from around the globe
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
                  To display the interactive world map, please enter your Mapbox access token.
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '500px' }}>
              <div ref={mapContainer} className="w-full h-full" />
              {showTokenInput && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive world map will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Fashion Locations Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                { name: "Paris", flag: "🇫🇷", description: "Fashion capital of the world" },
                { name: "Milan", flag: "🇮🇹", description: "Luxury fashion hub" },
                { name: "New York", flag: "🇺🇸", description: "Modern fashion trends" },
                { name: "Tokyo", flag: "🇯🇵", description: "Street fashion innovation" },
                { name: "London", flag: "🇬🇧", description: "Avant-garde fashion scene" },
              ].map((location, index) => (
                <div
                  key={location.name}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.flag}</span>
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
