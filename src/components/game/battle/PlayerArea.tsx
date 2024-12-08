import { Shield, Zap } from 'lucide-react';
import { HealthBar } from '../ui/HealthBar';
import { ComboMeter } from '../ui/ComboMeter';
import { PowerUpList } from '../ui/PowerUpList';
import type { PowerUp } from '../../../types/game';

interface PlayerAreaProps {
  health: number;
  combo: number;
  powerUps: PowerUp[];
}

export function PlayerArea({ health, combo, powerUps }: PlayerAreaProps) {
  return (
    <div className="relative p-6 bg-black/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-center space-x-4 mb-4">
        <Shield className="w-8 h-8 text-blue-400" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-2">Your Battle Station</h2>
          <HealthBar value={health} maxValue={100} />
        </div>
      </div>

      <div className="space-y-4">
        <ComboMeter value={combo} />
        <PowerUpList items={powerUps} />
      </div>

      {combo >= 3 && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
      )}
    </div>
  );
}