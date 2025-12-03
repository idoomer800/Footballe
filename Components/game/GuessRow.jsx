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
    if (type === 'College')
      return compareColleges(guessValue, correctValue)

    if (guessValue === correctValue) {
      // For all fields, green if exact
      return 'exact';
    }
    if (type === 'Position') {
      // Yellow if same type (offense/defense/special)
      if (getPositionType(guessValue) === getPositionType(correctValue)) return 'close';
    }
    if (guessValue === -1 || correctValue === -1) return 'wrong'
    if (type === 'Age') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    } else if (type === 'Jersey') {
      if (Math.abs(guessValue - correctValue) <= 3) return 'close';
    } else if (type === 'Draft Year') {
      if (Math.abs(guessValue - correctValue) <= 5) return 'close';
    } else if (type === 'Draft Round') {
      if (Math.abs(guessValue - correctValue) <= 2) return 'close';
    } else if (type === 'Height') {
      if (Math.abs(parseHeight(guessValue) - parseHeight(correctValue)) <= 5) return 'close';
    } else if (type === 'Weight') {
      if (Math.abs(parseWeight(guessValue) - parseWeight(correctValue)) <= 5) return 'close';
    }
    return 'wrong';
  };

const collegeToState = {
  "Illinois": "Illinois",
  "Tennessee": "Tennessee",
  "Stanford": "California",
  "North Carolina": "North Carolina",
  "Ohio State": "Ohio",
  "Florida A&M": "Florida",
  "Oklahoma": "Oklahoma",
  "Washington": "Washington",
  "Arkansas": "Arkansas",
  "LSU": "Louisiana",
  "Purdue": "Indiana",
  "Vanderbilt": "Tennessee",
  "Iowa": "Iowa",
  "Western Illinois": "Illinois",
  "South Dakota State": "South Dakota",
  "Texas A&M": "Texas",
  "Miami (FL)": "Florida",
  "Virginia Tech": "Virginia",
  "New Mexico": "New Mexico",
  "Syracuse": "New York",
  "Wisconsin": "Wisconsin",
  "Georgia Tech": "Georgia",
  "USC": "California",
  "Marshall": "West Virginia",
  "Central Michigan": "Michigan",
  "Wesleyan University": "Connecticut",
  "South Carolina": "South Carolina",
  "Southern Miss": "Mississippi",
  "Cal Poly": "California",
  "Louisville": "Kentucky",
  "Mississippi Valley State": "Mississippi",
  "Notre Dame": "Indiana",
  "Wyoming": "Wyoming",
  "Texas Tech": "Texas",
  "Arizona": "Arizona",
  "West Alabama": "Alabama",
  "Oklahoma State": "Oklahoma",
  "Cincinnati": "Ohio",
  "Jackson State": "Mississippi",
  "Kent State": "Ohio",
  "Texas": "Texas",
  "Miami": "Florida",
  "Oregon": "Oregon",
  "Michigan State": "Michigan",
  "California": "California",
  "SMU": "Texas",
  "Troy": "Alabama",
  "Houston": "Texas",
  "Hawai'i": "Hawaii",
  "Oregon State": "Oregon",
  "Auburn": "Alabama",
  "Virginia": "Virginia",
  "Sacramento State": "California",
  "Western Michigan": "Michigan",
  "Idaho": "Idaho",
  "Ferris State": "Michigan",
  "Minnesota": "Minnesota",
  "Boston College": "Massachusetts",
  "NC State": "North Carolina",
  "BYU": "Utah",
  "Florida State": "Florida",
  "Alabama": "Alabama",
  "Michigan": "Michigan",
  "Louisiana Tech": "Louisiana",
  "Baylor": "Texas",
  "Penn State": "Pennsylvania",
  "Missouri": "Missouri",
  "Washington State": "Washington",
  "Ole Miss": "Mississippi",
  "Liberty": "Virginia",
  "Georgia": "Georgia",
  "Eastern Washington": "Washington",
  "Maryland": "Maryland"
};

const compareColleges = (x, y) => {
  if (x === y) return "exact";

  const stateX = collegeToState[x];
  const stateY = collegeToState[y];

  if (!stateX || !stateY) return "wrong"; // unknown school

  return stateX === stateY ? "close" : "wrong";
}

const parseHeight = (str) => {
  const match = str.match(/(\d+)'[\s]*(\d+)?/);
  if (!match) return null;

  const feet = parseInt(match[1], 10);
  const inches = parseInt(match[2] || "0", 10);

  return feet * 12 + inches;
}

const parseWeight = (str) => {
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

const getStatusColor = (status) => {
  if (status === 'exact') return 'bg-green-600 text-white';
  if (status === 'close') return 'text-white';
  return 'bg-gray-700 text-gray-300';
};

const parseNumber = (num) => {
  if (num === -1)
    return "-"
  return num
}

const imageSource = (name) => {
    const parts = name.trim().split(/\s+/).join("_");
    return `/player_images/${parts}.jpg`
  }

  const attributes = [
    { label: 'Position', value: guess.Position, correct: correctPlayer.Position, type: 'Position' },
    { label: 'Age', value: guess.Age, correct: correctPlayer.Age, type: 'Age' },
    { label: 'Height', value: guess.Height, correct: correctPlayer.Height, type: 'Height' },
    { label: 'Weight', value: guess.Weight, correct: correctPlayer.Weight, type: 'Weight' },
    { label: 'Active', value: guess.Active, correct: correctPlayer.Active, type: 'Active' },
    { label: 'College', value: guess.College, correct: correctPlayer.College, type: 'College' },
    { label: 'Jersey #', value: parseNumber(guess.Jersey), correct: correctPlayer.Jersey, type: 'jersey' },
    { label: 'Draft Year', value: parseNumber(guess["Draft Year"]), correct: correctPlayer["Draft Year"], type: 'Draft Year' },
    { label: 'Draft Round', value: parseNumber(guess["Draft Round"]), correct: correctPlayer["Draft Round"], type: 'Draft Round' },
    { label: 'Team', value: guess.Team, correct: correctPlayer.Team, type: 'Team' },
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
            src={imageSource(guess.Name)} 
            alt={guess.Name}
            className="w-20 h-20 rounded-lg object-cover"
            onError={e => { e.target.onerror = null; e.target.src = imageSource(guess.Name); }}
          />
          <div>
            <p className="font-bold text-white text-xl">{guess.Name}</p>
          </div>
        </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {attributes.map((attr, i) => {
            const status = getMatchStatus(attr.value, attr.correct, attr.type);
            // Determine if this attribute is numeric and should show an arrow
            const isNumeric = [
              'age', 'jersey', 'Draft Year', 'Draft Round', 'Height', 'Weight'
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
                className={`p-5 rounded-lg ${getStatusColor(status)} transition-all duration-300 text-center flex flex-col items-center`}
                style={status === 'close' ? { backgroundColor: 'rgb(184, 177, 5)' } : {}}
              >
                <div className="text-xs font-medium opacity-80 mb-1">{attr.label}</div>
                <div className="text-l font-bold">
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