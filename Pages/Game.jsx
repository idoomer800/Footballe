import React, { useState, useEffect } from 'react';
import players from '../src/players.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target } from 'lucide-react';

import PlayerSearch from '../Components/game/PlayerSearch.jsx';
import GuessRow from '../Components/game/GuessRow.jsx';
import PlayerReveal from '../Components/game/PlayerReveal.jsx';
import ConfettiEffect from '../Components/game/ConfettiEffect.jsx';
import Touchdown from '../Components/game/Touchdown.jsx';

// The first day the app is active (set to 2025-07-01, more than 100 days before 2025-10-27)
const APP_START_DATE = new Date('2025-11-15');
const MAX_GUESSES = 10;

export default function Game() {
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [showConfetti, setShowConfetti] = useState(false);




  // Calculate days since launch and handle touchdown logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = today - APP_START_DATE;
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const isTouchdown = diffDays + 1 > players.length;
  const dailyPlayerIndex = isTouchdown ? players.length : diffDays + 1;
  const correctPlayer = players.find(p => p.id === dailyPlayerIndex);

  useEffect(() => {
    if (!correctPlayer) return;
    
    const savedData = localStorage.getItem(`football-guess-${dailyPlayerIndex}`);
    if (savedData) {
      try {
        const { guesses: savedGuesses, gameState: savedState } = JSON.parse(savedData);
        setGuesses(savedGuesses);
        setGameState(savedState);
      } catch (e) {
        console.error('Error loading saved game:', e);
      }
    }
  }, [correctPlayer, dailyPlayerIndex]);

  useEffect(() => {
    if (correctPlayer && guesses.length > 0) {
      localStorage.setItem(`football-guess-${dailyPlayerIndex}`, JSON.stringify({
        guesses,
        gameState
      }));
    }
  }, [guesses, gameState, correctPlayer, dailyPlayerIndex]);

  const handleGuess = (player) => {
    if (gameState !== 'playing' || guesses.length >= MAX_GUESSES) return;

    const newGuesses = [...guesses, player];
    setGuesses(newGuesses);
    console.log(correctPlayer)
    if (player.id === correctPlayer.id) {
      setGameState('won');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameState('lost');
    }
  };

  const handleBackToGuesses = () => {
    setGameState('playing');
  };

  if (isTouchdown) {
    return <Touchdown />;
  }
  // if (!correctPlayer) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
  //       <div className="text-white text-xl">Loading game...</div>
  //     </div>
  //   );
  // }




  const availablePlayers = players.filter(p => 
    !guesses.find(g => g.id === p.id)
  );

  const daysUntilTouchdown = isTouchdown ? 0 : Math.max(players.length - (diffDays), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 md:p-8">
      {showConfetti && <ConfettiEffect />}
      
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            Footbal<span className="text-blue-500">le</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Guess today's mystery Florida football star
          </p>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{daysUntilTouchdown} until touchdown!</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Target className="w-4 h-4" />
              <span className="text-sm">{Math.min(guesses.length + 1, MAX_GUESSES)}/{MAX_GUESSES} guesses</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <PlayerSearch 
                  players={availablePlayers}
                  onGuess={handleGuess}
                  disabled={gameState !== 'playing'}
                />
              </div>

              {guesses.length === 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-4 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded" />
                    <span className="text-gray-400">Exact match</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded" />
                    <span className="text-gray-400">Close</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded" />
                    <span className="text-gray-400">Wrong</span>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                {[...guesses].reverse().map((guess, index) => (
                  <GuessRow
                    key={guess.id} 
                    guess={guess}
                    correctPlayer={correctPlayer}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {(gameState === 'won' || gameState === 'lost') && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {gameState === 'lost' && (
                <div className="text-center mb-4">
                  <p className="text-2xl text-red-400 font-bold mb-2">Out of Guesses!</p>
                  <p className="text-gray-400">The answer was:</p>
                </div>
              )}

              <PlayerReveal player={correctPlayer} isWin={gameState === 'won'} />

              {gameState === 'won' && (
                <div className="text-center">
                  <p className="text-2xl text-green-400 font-bold mb-2">
                    🎉 Solved in {guesses.length} guess{guesses.length !== 1 ? 'es' : ''}!
                  </p>
                </div>
              )}

              {guesses.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Your Guesses</h3>
                  <div className="space-y-3">
                    {[...guesses].reverse().slice(gameState === 'won' ? 1 : 0).map((guess, index) => (
                      <GuessRow
                        key={guess.id} 
                        guess={guess}
                        correctPlayer={correctPlayer}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
