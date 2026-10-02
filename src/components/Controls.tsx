import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Hourglass, 
  FlaskConical, 
  Sparkles,
  Backpack 
} from 'lucide-react';

interface Props {
  disabled: boolean;
  onMove: (dx: number, dy: number) => void;
  onWaitTurn: () => void;
  onQuickHeal: () => void;
  onQuickMana: () => void;
  onOpenInventory: () => void;
  hasPotion: boolean;
  hasManaPotion: boolean;
}

export const Controls: React.FC<Props> = ({
  disabled,
  onMove,
  onWaitTurn,
  onQuickHeal,
  onQuickMana,
  onOpenInventory,
  hasPotion,
  hasManaPotion
}) => {
  return (
    <footer className="w-full max-w-lg mx-auto flex flex-col items-center gap-2 p-2 select-none" style={{ maxWidth: '480px' }}>
      {/* Quick Action Buttons Row */}
      <div className="grid grid-cols-4 gap-1.5 w-full">
        <button
          onClick={onWaitTurn}
          disabled={disabled}
          className="pixel-btn text-[8px] py-1.5 px-2 flex items-center justify-center gap-1"
          title="Tunggu satu giliran (Spasi)"
        >
          <Hourglass className="w-3 h-3 text-cyan-400" />
          <span>TUNGGU</span>
        </button>

        <button
          onClick={onQuickHeal}
          disabled={disabled || !hasPotion}
          className={`pixel-btn text-[8px] py-1.5 px-2 flex items-center justify-center gap-1 ${
            hasPotion ? 'pixel-btn-danger' : 'opacity-40 cursor-not-allowed'
          }`}
          title="Gunakan Potion Darah Cepat (H)"
        >
          <FlaskConical className="w-3 h-3 text-white" />
          <span>HP [H]</span>
        </button>

        <button
          onClick={onQuickMana}
          disabled={disabled || !hasManaPotion}
          className={`pixel-btn text-[8px] py-1.5 px-2 flex items-center justify-center gap-1 ${
            hasManaPotion ? 'bg-blue-600 hover:bg-blue-500 border-blue-400 text-white shadow' : 'opacity-40 cursor-not-allowed'
          }`}
          title="Gunakan Potion Mana Cepat (M)"
        >
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span>MP [M]</span>
        </button>

        <button
          onClick={onOpenInventory}
          disabled={disabled}
          className="pixel-btn text-[8px] py-1.5 px-2 flex items-center justify-center gap-1"
          title="Buka Inventori (I)"
        >
          <Backpack className="w-3 h-3 text-amber-300" />
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
      <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] text-slate-400 font-mono text-center">
        <span>⌨️ WASD/Panah</span>
        <span>•</span>
        <span>[1-4] Skill</span>
        <span>•</span>
        <span>[H] HP</span>
        <span>•</span>
        <span>[M] MP</span>
        <span>•</span>
        <span>[T] Toko</span>
        <span>•</span>
        <span>[I] Tas</span>
        <span>•</span>
        <span>[Space] Tunggu</span>
      </div>
    </footer>
  );
};
