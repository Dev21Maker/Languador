import { useState } from 'react';
import { Menu, X, Languages, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Languages className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">LinguaQuest</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/learn" className="text-gray-700 hover:text-blue-600 transition">Learn</Link>
            <Link to="/practice" className="text-gray-700 hover:text-blue-600 transition">Practice</Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 transition">Leaderboard</Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Admin
            </Link>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/learn"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Learn
              </Link>
              <Link 
                to="/practice"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Practice
              </Link>
              <Link 
                to="/leaderboard"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Leaderboard
              </Link>
              <Link 
                to="/admin"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4">
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search lessons, topics, or phrases..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}