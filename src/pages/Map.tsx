import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

// Fix for default markers in Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
    coordinates: [19.0760, 72.8777],
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
    coordinates: [22.5726, 88.3639],
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
    coordinates: [28.6139, 77.2090],
    specialty: 'Contemporary Glamour & Red Carpet',
    address: 'Defence Colony, New Delhi 110024',
    phone: '+91 11 4175 8900',
    email: 'info@falgunishanepeacock.com',
    rating: 4.9,
    description: 'International designers known for statement pieces and celebrity fashion',
    signature: 'Bold silhouettes and luxurious embellishments'
  }
];

// Custom pink marker icon
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="10" fill="#ec4899" stroke="white" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [25, 25],
  iconAnchor: [12.5, 25],
  popupAnchor: [0, -25]
});

const Map = () => {
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 relative font-inter">
      {/* Fixed Pink Glow Background */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-pink-200/30 via-pink-100/20 to-transparent pointer-events-none z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        <main className="relative">
          {/* Map Container */}
          <div className="relative h-screen">
            <MapContainer
              center={[20.5937, 77.2090]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              className="z-10"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {designers.map((designer) => (
                <Marker
                  key={designer.id}
                  position={designer.coordinates}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedDesigner(designer)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-playfair font-semibold text-gray-800 mb-1">
                        {designer.name}
                      </h3>
                      <p className="text-sm text-pink-600 mb-2">{designer.specialty}</p>
                      <p className="text-xs text-gray-600">{designer.city}, {designer.country}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-pink-50/20 z-20" />
          </div>

          {/* Designer Info Panel */}
          {selectedDesigner && (
            <div className="absolute top-24 left-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 z-30 animate-scale-in">
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
          <div className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg z-30">
            <h4 className="font-medium text-gray-800 mb-2">Luxury Designers</h4>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Designer Location</span>
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeTab="Map" />
    </div>
  );
};

export default Map;
