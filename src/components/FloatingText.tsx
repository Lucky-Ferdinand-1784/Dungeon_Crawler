import type React from 'react';
import type { FloatingText as FloatingTextType } from '../types/game';

interface Props {
  floatingTexts: FloatingTextType[];
}

export const FloatingTextViewer: React.FC<Props> = ({ floatingTexts }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {floatingTexts.map(item => {
        // Calculate position percentage based on grid size 9
        const leftPercent = (item.x + 0.5) * (100 / 9);
        const topPercent = (item.y + 0.3) * (100 / 9);

        let colorClass = 'text-white';
        let prefix = '';

        if (item.type === 'damage') {
          colorClass = 'text-red-400 font-bold';
        } else if (item.type === 'crit') {
          colorClass = 'text-amber-300 font-extrabold text-xs shadow-red-500';
          prefix = 'CRIT! ';
        } else if (item.type === 'heal') {
          colorClass = 'text-emerald-400 font-bold';
          prefix = '+';
        } else if (item.type === 'dodge') {
          colorClass = 'text-cyan-300 font-semibold';
        } else if (item.type === 'xp') {
          colorClass = 'text-purple-400 font-semibold';
          prefix = '+';
        } else if (item.type === 'gold') {
          colorClass = 'text-yellow-400 font-semibold';
          prefix = '+';
        }

        return (
          <div
            key={item.id}
            className={`absolute floating-text-anim pixel-font text-[9px] drop-shadow-md select-none transform -translate-x-1/2 -translate-y-1/2 ${colorClass}`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            {prefix}{item.text}
          </div>
        );
      })}
    </div>
  );
};
