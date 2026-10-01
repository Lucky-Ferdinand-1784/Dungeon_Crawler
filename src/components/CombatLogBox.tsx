import type React from 'react';
import type { CombatLog } from '../types/game';

interface Props {
  logs: CombatLog[];
}

export const CombatLogBox: React.FC<Props> = ({ logs }) => {
  const latestLog = logs[logs.length - 1];

  return (
    <div className="w-full max-w-lg mx-auto px-2" style={{ maxWidth: '480px' }}>
      <div className="bg-slate-950/80 border border-slate-800 rounded px-3 py-1.5 min-h-[32px] flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-amber-500 pixel-font text-[9px] select-none">▶</span>
          <p className="text-[11px] font-mono text-slate-200 truncate">
            {latestLog ? latestLog.text : 'Gunakan tombol arah / WASD / D-Pad untuk melangkah!'}
          </p>
        </div>
        {latestLog && (
          <span className="text-[9px] text-slate-500 font-mono pl-2 shrink-0">
            {latestLog.time}
          </span>
        )}
      </div>
    </div>
  );
};
