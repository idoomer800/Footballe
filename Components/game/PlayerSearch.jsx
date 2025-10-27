import React, { useState, useRef, useEffect } from 'react';
import { Input } from "../../src/Components/ui/input.jsx";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerSearch({ players, onGuess, disabled }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredPlayers = searchTerm.trim() 
    ? players.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredPlayers.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && filteredPlayers[selectedIndex]) {
      e.preventDefault();
      handleSelectPlayer(filteredPlayers[selectedIndex]);
    }
  };

  const handleSelectPlayer = (player) => {
    onGuess(player);
    setSearchTerm('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="relative max-w-md" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/3 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search player name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => searchTerm && setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="pl-10 pr-4 h-14 text-lg bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
        />
      </div>

      <AnimatePresence>
        {showDropdown && filteredPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
          >
            {filteredPlayers.map((player, index) => (
              <button
                key={player.id}
                onClick={() => handleSelectPlayer(player)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                  index === selectedIndex ? 'bg-gray-800' : ''
                } ${index !== filteredPlayers.length - 1 ? 'border-b border-gray-800' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {player.image_url && (
                    <img 
                      src={player.image_url} 
                      alt={player.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-white">{player.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
