import { Bot, Brain } from 'lucide-react';
import { HealthBar } from '../ui/HealthBar';
import type { AIMood } from '../../../types/game';

interface AIOpponentProps {
  health: number;
  level: number;
  mood: AIMood;
}

export function AIOpponent({ health, level, mood }: AIOpponentProps) {
  return (
    <div className="relative p-6 bg-black/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-center space-x-4 mb-4">
        <Bot className="w-8 h-8 text-red-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Language Master</h2>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">Level {level}</span>
            </div>
          </div>
          <HealthBar value={health} maxValue={100} />
        </div>
      </div>

      <div className="absolute -bottom-3 right-4 transform translate-y-full">
        <div className="relative">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-800 rotate-45" />
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-white text-sm">{getMoodMessage(mood)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMoodMessage(mood: AIMood): string {
  switch (mood) {
    case 'impressed':
      return "Impressive skills! But can you keep up?";
    case 'challenging':
      return "Let's make this more interesting...";
    case 'encouraging':
      return "Don't give up! Try again!";
    default:
      return "Show me what you've got!";
  }
}