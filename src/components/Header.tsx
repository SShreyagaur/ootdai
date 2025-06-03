
import React, { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/206d0354-8ae7-4012-9cbe-610c0b1aeead.png" 
                alt="OOTD Logo" 
                className="h-8 w-auto"
              />
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search styles, designers..."
                  className="w-full pl-10 pr-4 py-2 bg-pink-50/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* User Menu */}
            <button
              onClick={handleAuthClick}
              className="flex items-center space-x-1 bg-pink-100 hover:bg-pink-200 rounded-full px-3 py-2 transition-colors"
            >
              {user ? (
                <>
                  <span className="text-xs text-pink-700 hidden sm:block">
                    {user.email?.split('@')[0]}
                  </span>
                  <LogOut className="h-4 w-4 text-pink-700" />
                </>
              ) : (
                <>
                  <User className="h-4 w-4 text-pink-700" />
                  <span className="text-xs text-pink-700 hidden sm:block">Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;
