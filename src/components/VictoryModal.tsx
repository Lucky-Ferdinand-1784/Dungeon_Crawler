import type React from 'react';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  floor: number;
  bonusGold: number;
  onContinue: () => void;
}

export const VictoryModal: React.FC<Props> = ({
  isOpen,
  floor,
  bonusGold,
  onContinue
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div 
        className="pixel-box rounded-xl w-full max-w-sm flex flex-col items-center p-5 gap-3 border-2 border-amber-500/80 shadow-2xl text-center"
        style={{ maxWidth: '380px' }}
      >
        <div className="w-14 h-14 bg-amber-950/60 border-2 border-amber-500 rounded-full flex items-center justify-center animate-bounce">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>

        <h2 className="pixel-font text-sm text-amber-400 tracking-wider">
          LANTAI DIBERSIHKAN!
        </h2>

        <p className="text-xs text-slate-300">
          Kamu berhasil menemukan jalan turun ke Lantai {floor}!
        </p>

        <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 w-full flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Bonus Lantai: +{bonusGold} Koin Emas!</span>
        </div>

        <button
          onClick={onContinue}
          className="pixel-btn pixel-btn-gold w-full py-2.5 mt-2 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>LANJUT KE LANTAI {floor}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
