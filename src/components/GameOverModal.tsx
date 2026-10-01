import type React from 'react';
import { RotateCcw, Skull, Trophy, Coins, Award } from 'lucide-react';
import type { Player } from '../types/game';

interface Props {
  isOpen: boolean;
  floor: number;
  highFloor: number;
  player: Player;
  onRestart: () => void;
}

export const GameOverModal: React.FC<Props> = ({
  isOpen,
  floor,
  highFloor,
  player,
  onRestart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div 
        className="pixel-box rounded-xl w-full max-w-sm flex flex-col items-center p-5 gap-3 border-2 border-red-600/80 shadow-2xl text-center"
        style={{ maxWidth: '380px' }}
      >
        <div className="w-14 h-14 bg-red-950/60 border-2 border-red-500 rounded-full flex items-center justify-center animate-bounce">
          <Skull className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="pixel-font text-base text-red-500 tracking-wider">
          GAME OVER
        </h2>

        <p className="text-xs text-slate-300">
          Ksatria gugur di dalam kegelapan dungeon yang tak berujung.
        </p>

        {/* Run Summary Stats */}
        <div className="w-full bg-slate-900/90 rounded-lg p-3 border border-slate-800 flex flex-col gap-2 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-cyan-400" /> Lantai Dicapai:
            </span>
            <span className="text-cyan-400 font-bold text-sm">Lantai {floor}</span>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" /> Level Karakter:
            </span>
            <span className="text-purple-400 font-bold text-sm">Level {player.level}</span>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-yellow-400" /> Emas Terkumpul:
            </span>
            <span className="text-yellow-400 font-bold text-sm">{player.gold} 🪙</span>
          </div>

          <div className="flex justify-between items-center text-slate-400 border-t border-slate-800 pt-1.5 mt-0.5">
            <span>Rekor Lantai Tertinggi:</span>
            <span className="text-amber-400 font-bold">Lantai {highFloor}</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="pixel-btn pixel-btn-danger w-full py-2.5 mt-2 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> MAIN LAGI
        </button>
      </div>
    </div>
  );
};
