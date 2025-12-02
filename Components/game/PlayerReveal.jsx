import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../src/Components/ui/card.jsx';
import { Trophy, Calendar, Ruler, Hash, Users, Award, ListOrdered, Activity, Badge, GraduationCap } from "lucide-react";

const imageSource = (name) => {
    const parts = name.trim().split(/\s+/).join("_");
    return `/player_images/${parts}.jpg`
  }

export default function PlayerReveal({ player, isWin }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
        <div className="relative">
          <div className="relative h-80 overflow-hidden">
            <img 
              src={imageSource(player.Name)} 
              alt={player.Name}
              className="w-full h-full object-cover"
              onError={e => { e.target.onerror = null; e.target.src = imageSource(player.Name); }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>
          
          <div className="absolute top-4 right-4">
            {isWin && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                You Won!
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-8">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-2"
          >
            {player.Name}
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mb-6"
          >
            {player.state_of_origin}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              alignItems: 'stretch',
              width: '100%'
            }}
          >
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0 w-full" style={{minWidth:0, flex:1}}>
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Age</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.age}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Hash className="w-4 h-4" />
                <span className="text-sm">Jersey #</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.Jersey}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Active</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.Active}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Badge className="w-4 h-4" />
                <span className="text-sm">Position</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.Position}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Award className="w-4 h-4" />
                <span className="text-sm">Draft Year</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player["Draft Year"]}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <ListOrdered className="w-4 h-4" />
                <span className="text-sm">Draft Round</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player["Draft Round"]}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Ruler className="w-4 h-4" />
                <span className="text-sm">Height</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.Height}"</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">Weight</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.Weight}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-gray-400 mb-2 min-w-0">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm">College</span>
              </div>
              <p className="text-2xl font-bold text-white min-w-0 whitespace-nowrap overflow-x-auto" style={{wordBreak: 'normal', overflowWrap: 'normal'}}>{player.College}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Team</span>
              </div>
              <p className="text-2xl font-bold text-white whitespace-normal">
                {player.Team}
              </p>
          </div>

          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}