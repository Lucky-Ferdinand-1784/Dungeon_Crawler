import React, { useState } from 'react';
import type { Skill } from '../types/game';
import { PLAYER_SKILLS } from '../data/skills';
import { SkillIcon } from './PixelSprites';
import { Zap } from 'lucide-react';

interface Props {
  playerMp: number;
  disabled: boolean;
  onUseSkill: (skill: Skill) => void;
}

export const SkillBar: React.FC<Props> = ({
  playerMp,
  disabled,
  onUseSkill
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-1 select-none">
      {/* Skill Bar Buttons Grid */}
      <div className="grid grid-cols-4 gap-1.5 w-full">
        {PLAYER_SKILLS.map((skill) => {
          const hasMp = playerMp >= skill.mpCost;
          const isUsable = !disabled && hasMp;

          return (
            <button
              key={skill.id}
              onClick={() => isUsable && onUseSkill(skill)}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              disabled={!isUsable}
              className={`relative flex flex-col items-center justify-center p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                isUsable
                  ? 'bg-slate-900 border-indigo-500/80 hover:border-indigo-400 hover:bg-slate-800 active:scale-95 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 opacity-40 cursor-not-allowed'
              }`}
              title={`${skill.name} (${skill.mpCost} MP) - [${skill.shortcut}]`}
            >
              {/* Shortcut Key Badge */}
              <span className="absolute top-0.5 left-1 text-[8px] mono-font text-slate-400 font-bold bg-slate-950/80 px-1 rounded border border-slate-700">
                {skill.shortcut}
              </span>

              {/* MP Cost Badge */}
              <div className="absolute top-0.5 right-1 flex items-center text-[8px] mono-font text-cyan-300 font-bold">
                <Zap className="w-2 h-2 text-cyan-400" />
                <span>{skill.mpCost}</span>
              </div>

              {/* Skill Icon */}
              <div className="mt-2.5 mb-0.5 flex items-center justify-center">
                <SkillIcon icon={skill.icon} className="w-5 h-5 drop-shadow" />
              </div>

              {/* Skill Name */}
              <span className="text-[8px] pixel-font text-slate-200 truncate max-w-full">
                {skill.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Skill Tooltip info if hovered */}
      {hoveredSkill && (
        <div className="w-full bg-slate-900/95 border border-indigo-500/60 rounded px-2 py-1 flex items-center justify-between text-[10px] animate-fadeIn">
          <div className="flex items-center gap-1.5 text-indigo-300">
            <span className="font-bold">[{hoveredSkill.shortcut}] {hoveredSkill.name}</span>
            <span className="text-slate-400 font-sans italic text-[9px] truncate max-w-[240px]">
              - {hoveredSkill.description}
            </span>
          </div>
          <span className="mono-font text-cyan-400 font-bold shrink-0">
            {hoveredSkill.mpCost} MP
          </span>
        </div>
      )}
    </div>
  );
};
