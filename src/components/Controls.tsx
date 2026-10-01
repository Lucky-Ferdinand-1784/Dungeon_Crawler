import type React from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Hourglass, 
  FlaskConical, 
  Backpack 
} from 'lucide-react';

interface Props {
  disabled: boolean;
  onMove: (dx: number, dy: number) => void;
  onWaitTurn: () => void;
  onQuickHeal: () => void;
  onOpenInventory: () => void;
  hasPotion: boolean;
}

export const Controls: React.FC<Props> = ({
  disabled,
  onMove,
  onWaitTurn,
  onQuickHeal,
  onOpenInventory,
  hasPotion
}) => {
  return (
    <footer className="w-full max-w-lg mx-auto flex flex-col items-center gap-2 p-2 select-none" style={{ maxWidth: '480px' }}>
      {/* Quick Action Buttons Row */}
      <div className="flex items-center justify-center gap-2 w-full">
        <button
          onClick={onWaitTurn}
          disabled={disabled}
          className="pixel-btn text-[9px] py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
          title="Tunggu satu giliran (Spasi)"
        >
          <Hourglass className="w-3.5 h-3.5 text-cyan-400" />
          <span>TUNGGU [SPASI]</span>
        </button>

        <button
          onClick={onQuickHeal}
          disabled={disabled || !hasPotion}
          className={`pixel-btn text-[9px] py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5 ${
            hasPotion ? 'pixel-btn-danger' : 'opacity-40 cursor-not-allowed'
          }`}
          title="Gunakan Potion Cepat (H)"
        >
          <FlaskConical className="w-3.5 h-3.5 text-white" />
          <span>MINUM HP [H]</span>
        </button>

        <button
          onClick={onOpenInventory}
          disabled={disabled}
          className="pixel-btn text-[9px] py-1.5 px-3 flex-1 flex items-center justify-center gap-1.5"
          title="Buka Inventori (I)"
        >
          <Backpack className="w-3.5 h-3.5 text-amber-300" />
          <span>TAS [I]</span>
        </button>
      </div>

      {/* On-Screen D-Pad for Mobile Friendly Gameplay */}
      <div className="grid grid-cols-3 gap-1.5 w-44 pt-1">
        <div />
        <button
          onClick={() => onMove(0, -1)}
          disabled={disabled}
          aria-label="Atas"
          className="h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 active:translate-y-0.5 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow transition-all cursor-pointer disabled:opacity-40"
        >
          <ChevronUp className="w-6 h-6 text-slate-200" />
        </button>
        <div />

        <button
          onClick={() => onMove(-1, 0)}
          disabled={disabled}
          aria-label="Kiri"
          className="h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 active:translate-x-0.5 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow transition-all cursor-pointer disabled:opacity-40"
        >
          <ChevronLeft className="w-6 h-6 text-slate-200" />
        </button>

        <button
          onClick={() => onMove(0, 1)}
          disabled={disabled}
          aria-label="Bawah"
          className="h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 active:translate-y-0.5 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow transition-all cursor-pointer disabled:opacity-40"
        >
          <ChevronDown className="w-6 h-6 text-slate-200" />
        </button>

        <button
          onClick={() => onMove(1, 0)}
          disabled={disabled}
          aria-label="Kanan"
          className="h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 active:translate-x-0.5 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow transition-all cursor-pointer disabled:opacity-40"
        >
          <ChevronRight className="w-6 h-6 text-slate-200" />
        </button>
      </div>

      {/* Keyboard Hint Guide */}
      <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-mono">
        <span>⌨️ WASD / Panah</span>
        <span>•</span>
        <span>[I] Tas</span>
        <span>•</span>
        <span>[C] Stat</span>
        <span>•</span>
        <span>[Space] Tunggu</span>
      </div>
    </footer>
  );
};
