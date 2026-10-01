import type React from 'react';
import type { Player } from '../types/game';
import { 
  Volume2, 
  VolumeX, 
  Music, 
  Coins, 
  Trophy, 
  Backpack, 
  User, 
  Tv, 
  Sparkles,
  Heart,
  Zap
} from 'lucide-react';

interface Props {
  player: Player;
  floor: number;
  isMuted: boolean;
  isBgmOn: boolean;
  isCrtOn: boolean;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onToggleCrt: () => void;
  onOpenInventory: () => void;
  onOpenCharacter: () => void;
}

export const HUD: React.FC<Props> = ({
  player,
  floor,
  isMuted,
  isBgmOn,
  isCrtOn,
  onToggleMute,
  onToggleBgm,
  onToggleCrt,
  onOpenInventory,
  onOpenCharacter
}) => {
  const hpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const mpPercent = Math.max(0, Math.min(100, (player.mp / player.maxMp) * 100));
  const xpPercent = Math.max(0, Math.min(100, (player.xp / player.xpToNextLevel) * 100));

  return (
    <header className="w-full max-w-lg mx-auto flex flex-col gap-2 p-2 select-none" style={{ maxWidth: '480px' }}>
      {/* Top Banner & Quick Controls */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="pixel-font text-xs text-amber-400 font-bold tracking-wider">
            PIXEL RPG
          </span>
          <span className="text-[10px] bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 px-2 py-0.5 rounded font-mono">
            LANTAI {floor} {floor === 5 ? '⚠️ BOSS' : floor === 10 ? '🔥 FINAL BOSS' : ''}
          </span>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleCrt}
            className={`p-1.5 rounded border transition-all text-xs cursor-pointer ${
              isCrtOn 
                ? 'bg-emerald-950 border-emerald-600 text-emerald-400' 
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="Toggle Efek CRT Scanlines"
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleBgm}
            className={`p-1.5 rounded border transition-all text-xs cursor-pointer ${
              isBgmOn 
                ? 'bg-purple-950 border-purple-600 text-purple-300' 
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="Toggle Musik Chiptune BGM"
          >
            <Music className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded border transition-all text-xs cursor-pointer ${
              !isMuted 
                ? 'bg-blue-950 border-blue-600 text-blue-300' 
                : 'bg-slate-900 border-slate-700 text-red-400'
            }`}
            title="Toggle Efek Suara SFX"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Status Panel */}
      <div className="pixel-box p-2.5 rounded-lg flex flex-col gap-2">
        {/* Row 1: Level, Gold, High Floor */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded pixel-font text-[9px] font-bold">
              LV.{player.level}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span className="mono-font text-sm">{player.gold}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {player.statPoints > 0 && (
              <button
                onClick={onOpenCharacter}
                className="pixel-font text-[8px] bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded animate-pulse cursor-pointer flex items-center gap-1 border border-red-300"
              >
                <Sparkles className="w-2.5 h-2.5" /> +{player.statPoints} STAT!
              </button>
            )}

            <button
              onClick={onOpenInventory}
              className="pixel-btn text-[9px] py-1 px-2.5"
              title="Buka Inventori"
            >
              <Backpack className="w-3.5 h-3.5 text-amber-300" />
              <span>TAS ({player.inventory.length}/12)</span>
            </button>

            <button
              onClick={onOpenCharacter}
              className="pixel-btn text-[9px] py-1 px-2.5"
              title="Buka Status Karakter"
            >
              <User className="w-3.5 h-3.5 text-cyan-300" />
              <span>STAT</span>
            </button>
          </div>
        </div>

        {/* Row 2: Bars (HP, MP, XP) */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800">
          {/* HP Bar */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[10px] items-center">
              <span className="flex items-center gap-1 text-red-400 font-bold">
                <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" /> HP
              </span>
              <span className="mono-font text-slate-300">
                {player.hp}/{player.maxHp}
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill bg-gradient-to-r from-red-600 to-rose-400"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {/* MP Bar */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[10px] items-center">
              <span className="flex items-center gap-1 text-blue-400 font-bold">
                <Zap className="w-2.5 h-2.5 fill-blue-500 text-blue-500" /> MP
              </span>
              <span className="mono-font text-slate-300">
                {player.mp}/{player.maxMp}
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill bg-gradient-to-r from-blue-600 to-cyan-400"
                style={{ width: `${mpPercent}%` }}
              />
            </div>
          </div>

          {/* XP Bar */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[10px] items-center">
              <span className="flex items-center gap-1 text-purple-400 font-bold">
                <Trophy className="w-2.5 h-2.5 text-purple-400" /> XP
              </span>
              <span className="mono-font text-slate-300">
                {player.xp}/{player.xpToNextLevel}
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill bg-gradient-to-r from-purple-600 to-fuchsia-400"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
