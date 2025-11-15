import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuessRow({ guess, correctPlayer, index }) {
  // Helper to group positions
  const getPositionType = (position) => {
    const offense = ["Quarterback", "Running Back", "Wide Receiver", "Tight End", "Offensive Lineman"];
    const defense = ["Linebacker", "Cornerback", "Safety", "Defensive End"];
    const special = ["Kicker"];
    if (offense.includes(position)) return 'offense';
    if (defense.includes(position)) return 'defense';
    if (special.includes(position)) return 'special';
    return 'other';
  };

  const getMatchStatus = (guessValue, correctValue, type) => {
    if (guessValue === correctValue) {
      // For all fields, green if exact
      return 'exact';
    }
    if (type === 'position_group') {
      // Yellow if same type (offense/defense/special)
      if (getPositionType(guessValue) === getPositionType(correctValue)) return 'close';
    }
    if (type === 'year_of_birth') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    } else if (type === 'jersi_number') {
      if (Math.abs(guessValue - correctValue) <= 3) return 'close';
    } else if (type === 'nfl_draft_year') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    } else if (type === 'nfl_draft_round') {
      if (Math.abs(guessValue - correctValue) <= 2) return 'close';
    } else if (type === 'height') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    } else if (type === 'weight') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    }
    return 'wrong';
  };

  const getStatusColor = (status) => {
  if (status === 'exact') return 'bg-green-600 text-white';
  if (status === 'close') return 'text-white';
  return 'bg-gray-700 text-gray-300';
  };

const imageSource = (name) => {
    const parts = name.trim().split(/\s+/).join("_");
    return `/player_images/${parts}.jpg`
  }

  const attributes = [
    { label: 'College', value: guess.college, correct: correctPlayer.college, type: 'college' },
    { label: 'Year of Birth', value: guess.year_of_birth, correct: correctPlayer.year_of_birth, type: 'year_of_birth' },
    { label: 'Jersi #', value: guess.jersi_number, correct: correctPlayer.jersi_number, type: 'jersi_number' },
    { label: 'Position', value: guess.position_group, correct: correctPlayer.position_group, type: 'position_group' },
    { label: 'Draft Year', value: guess.nfl_draft_year, correct: correctPlayer.nfl_draft_year, type: 'nfl_draft_year' },
    { label: 'Draft Round', value: guess.nfl_draft_round, correct: correctPlayer.nfl_draft_round, type: 'nfl_draft_round' },
    { label: 'Height', value: `${guess.height}"`, correct: correctPlayer.height, type: 'height' },
    { label: 'Weight', value: `${guess.weight}lb`, correct: correctPlayer.weight, type: 'weight' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={imageSource(guess.name)} 
            alt={guess.name}
            className="w-20 h-20 rounded-lg object-cover"
            onError={e => { e.target.onerror = null; e.target.src = imageSource(guess.name); }}
          />
          <div>
            <p className="font-bold text-white text-xl">{guess.name}</p>
          </div>
        </div>

  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {attributes.map((attr, i) => {
            const status = getMatchStatus(attr.value, attr.correct, attr.type);
            // Determine if this attribute is numeric and should show an arrow
            const isNumeric = [
              'year_of_birth', 'jersi_number', 'nfl_draft_year', 'nfl_draft_round', 'height', 'weight'
            ].includes(attr.type);
            // Extract numeric value for comparison
            let guessNum = attr.value;
            let correctNum = attr.correct;
            if (typeof guessNum === 'string' && guessNum.match(/^\d+/)) guessNum = parseInt(guessNum);
            if (typeof correctNum === 'string' && correctNum.match(/^\d+/)) correctNum = parseInt(correctNum);
            let arrow = null;
            if (isNumeric && guessNum !== correctNum) {
              if (guessNum > correctNum) {
                arrow = <ChevronDown className="inline w-4 h-4 text-gray-300 ml-1 align-middle" title="Too high" />;
              } else if (guessNum < correctNum) {
                arrow = <ChevronUp className="inline w-4 h-4 text-gray-300 ml-1 align-middle" title="Too low" />;
              }
            }
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className={`p-3 rounded-lg ${getStatusColor(status)} transition-all duration-300 text-center`}
                style={status === 'close' ? { backgroundColor: 'rgb(184, 177, 5)' } : {}}
              >
                <div className="text-xs font-medium opacity-80 mb-1">{attr.label}</div>
                <div className="text-sm font-bold">
                  {attr.value}
                  {arrow}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}