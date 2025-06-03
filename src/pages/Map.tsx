
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

interface Designer {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number];
  specialty: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  description: string;
  signature: string;
}

const designers: Designer[] = [
  {
    id: 'manish-malhotra',
    name: 'Manish Malhotra',
    city: 'Mumbai',
    country: 'India',
    coordinates: [72.8777, 19.0760],
    specialty: 'Bollywood Glamour & Bridal Couture',
    address: 'Khar West, Mumbai, Maharashtra 400052',
    phone: '+91 22 2648 0471',
    email: 'info@manishmalhotra.in',
    rating: 5.0,
    description: 'India\'s most celebrated fashion designer, known for transforming Bollywood fashion',
    signature: 'Intricate embroidery and contemporary silhouettes'
  },
  {
    id: 'sabyasachi',
    name: 'Sabyasachi Mukherjee',
    city: 'Kolkata',
    country: 'India',
    coordinates: [88.3639, 22.5726],
    specialty: 'Heritage Bridal & Traditional Wear',
    address: 'Park Street, Kolkata, West Bengal 700016',
    phone: '+91 33 2229 7243',
    email: 'contact@sabyasachi.com',
    rating: 5.0,
    description: 'Master of Indian heritage fashion with a modern twist',
    signature: 'Rich textiles and vintage-inspired designs'
  },
  {
    id: 'falguni-shane',
    name: 'Falguni Shane Peacock',
    city: 'Delhi',
    country: 'India',
    coordinates: [77.2090, 28.6139],
    specialty: 'Contemporary Glamour & Red Carpet',
    address: 'Defence Colony, New Delhi 110024',
    phone: '+91 11 4175 8900',
    email: 'info@falgunishanepeacock.com',
    rating: 4.9,
    description: 'International designers known for statement pieces and celebrity fashion',
    signature: 'Bold silhouettes and luxurious embellishments'
  }
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.2090, 20.5937], // Center on India
      zoom: 4,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add designer markers
    designers.forEach((designer) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'designer-marker';
      markerElement.innerHTML = `
        <div class="w-6 h-6 bg-pink-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      `;

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(designer.coordinates)
        .addTo(map.current!);

      // Add click event
      markerElement.addEventListener('click', () => {
        setSelectedDesigner(designer);
        map.current?.flyTo({
          center: designer.coordinates,
          zoom: 12,
          pitch: 60
        });
      });
    });

    // Add fog effect
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(255, 240, 245)',
        'horizon-blend': 0.1,
      });
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      setTimeout(initializeMap, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {showTokenInput ? (
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-4 text-center">
                Enter Mapbox Token
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Please enter your Mapbox public token to view the designer map
              </p>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Load Map
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Get your token at{' '}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                  mapbox.com
                </a>
              </p>
            </div>
          </div>
        ) : (
          <main className="relative">
            {/* Map Container */}
            <div className="relative h-screen">
              <div ref={mapContainer} className="absolute inset-0" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-pink-50/20" />
            </div>

            {/* Designer Info Panel */}
            {selectedDesigner && (
              <div className="absolute top-24 left-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 z-20 animate-scale-in">
                <button
                  onClick={() => setSelectedDesigner(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-gray-800">
                      {selectedDesigner.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedDesigner.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedDesigner.rating}
                      </span>
                    </div>
                  </div>

                  <div className="bg-pink-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-pink-800">
                      {selectedDesigner.specialty}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700">
                    {selectedDesigner.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{selectedDesigner.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-pink-500 flex-shrink-0" />
                      <a
                        href={`tel:${selectedDesigner.phone}`}
                        className="text-gray-700 hover:text-pink-600 transition-colors"
                      >
                        {selectedDesigner.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-pink-500 flex-shrink-0" />
                      <a
                        href={`mailto:${selectedDesigner.email}`}
                        className="text-gray-700 hover:text-pink-600 transition-colors"
                      >
                        {selectedDesigner.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600 italic">
                      Signature: {selectedDesigner.signature}
                    </p>
                  </div>

                  <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
                    Book Consultation
                  </button>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg z-20">
              <h4 className="font-medium text-gray-800 mb-2">Luxury Designers</h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Designer Location</span>
              </div>
            </div>
          </main>
        )}
      </div>

      <BottomNav activeTab="Map" />
    </div>
  );
};

export default Map;
