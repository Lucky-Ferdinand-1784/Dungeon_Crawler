import type React from 'react';
import type { Player } from '../types/game';
import { PixelHero } from './PixelSprites';
import { X, Shield, Sword, Heart, Zap, Sparkles, Plus, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  player: Player;
  onClose: () => void;
  onAllocateStat: (stat: 'str' | 'def' | 'agi' | 'hp') => void;
}

export const CharacterModal: React.FC<Props> = ({
  isOpen,
  player,
  onClose,
  onAllocateStat
}) => {
  if (!isOpen) return null;

  // Calculate combat stats
  const weaponAtk = player.equipment.weapon?.atk || 0;
  const accessoryAtk = player.equipment.accessory?.atk || 0;
  const totalAtk = 2 + (player.stats.str * 2) + weaponAtk + accessoryAtk;

  const armorDef = player.equipment.armor?.def || 0;
  const accessoryDef = player.equipment.accessory?.def || 0;
  const weaponDef = player.equipment.weapon?.def || 0;
  const totalDef = player.stats.def + armorDef + accessoryDef + weaponDef;

  const weaponCrit = player.equipment.weapon?.critBonus || 0;
  const accessoryCrit = player.equipment.accessory?.critBonus || 0;
  const totalCrit = Math.min(75, Math.round((0.05 + (player.stats.agi * 0.03) + weaponCrit + accessoryCrit) * 100));

  const armorDodge = player.equipment.armor?.dodgeBonus || 0;
  const accessoryDodge = player.equipment.accessory?.dodgeBonus || 0;
  const totalDodge = Math.min(50, Math.round(((player.stats.agi * 0.02) + armorDodge + accessoryDodge) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div 
        className="pixel-box rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col p-4 gap-3 border-2 border-indigo-500/60 shadow-2xl"
        style={{ maxWidth: '440px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="pixel-font text-xs text-cyan-300">LEMBAR STATUS KSATRIA</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 border border-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Card Overview */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
          <div className="w-16 h-16 bg-slate-950 p-2 rounded-lg border-2 border-indigo-500/50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
            <PixelHero />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="pixel-font text-xs text-amber-400 font-bold">Ksatria Dungeon</h3>
            <span className="text-xs text-slate-300 font-mono">
              Tingkat: <span className="text-cyan-400 font-bold">Level {player.level}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              XP Saat Ini: {player.xp} / {player.xpToNextLevel}
            </span>
          </div>
        </div>

        {/* Stat Points Available Alert */}
        {player.statPoints > 0 ? (
          <div className="bg-amber-950/60 border-2 border-amber-500/80 p-2.5 rounded-lg flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="pixel-font text-[9px] text-amber-300">
                Tersedia {player.statPoints} Poin Stat!
              </span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono">Tingkatkan stat di bawah</span>
          </div>
        ) : null}

        {/* Core Attributes Allocation (STR, DEF, AGI, Max HP) */}
        <div>
          <span className="text-[10px] text-slate-400 pixel-font mb-2 block">
            ATRIBUT DASAR & UPGRADE
          </span>
          <div className="flex flex-col gap-2">
            {/* STR */}
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <Sword className="w-3.5 h-3.5" /> KEKUATAN (STR)
                </span>
                <span className="text-[10px] text-slate-400">
                  +{player.stats.str * 2} Bonus Damage Fisik
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pixel-font text-xs text-slate-100">{player.stats.str}</span>
                {player.statPoints > 0 && (
                  <button
                    onClick={() => onAllocateStat('str')}
                    className="p-1 px-2 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] pixel-font cursor-pointer border border-red-400"
                    title="Tambah STR"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* DEF */}
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> PERTAHANAN (DEF)
                </span>
                <span className="text-[10px] text-slate-400">
                  -{player.stats.def} Pengurangan Damage Monster
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pixel-font text-xs text-slate-100">{player.stats.def}</span>
                {player.statPoints > 0 && (
                  <button
                    onClick={() => onAllocateStat('def')}
                    className="p-1 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] pixel-font cursor-pointer border border-blue-400"
                    title="Tambah DEF"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* AGI */}
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> KELINCAHAN (AGI)
                </span>
                <span className="text-[10px] text-slate-400">
                  +{player.stats.agi * 3}% Peluang Crit, +{player.stats.agi * 2}% Hindaran
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pixel-font text-xs text-slate-100">{player.stats.agi}</span>
                {player.statPoints > 0 && (
                  <button
                    onClick={() => onAllocateStat('agi')}
                    className="p-1 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] pixel-font cursor-pointer border border-emerald-400"
                    title="Tambah AGI"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Max HP Upgrade */}
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> MAKSIMAL NYAWA (HP)
                </span>
                <span className="text-[10px] text-slate-400">
                  Darah maksimal saat ini: {player.maxHp} HP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pixel-font text-xs text-slate-100">{player.maxHp}</span>
                {player.statPoints > 0 && (
                  <button
                    onClick={() => onAllocateStat('hp')}
                    className="p-1 px-2 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] pixel-font cursor-pointer border border-rose-400"
                    title="Tambah +4 Max HP"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Combat Stats */}
        <div>
          <span className="text-[10px] text-slate-400 pixel-font mb-2 block">
            STATISTIK PERTARUNGAN TOTAL
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">Total Attack:</span>
              <span className="text-red-400 font-bold">{totalAtk} ATK</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">Total Defense:</span>
              <span className="text-blue-400 font-bold">{totalDef} DEF</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">Critical Hit:</span>
              <span className="text-amber-400 font-bold">{totalCrit}%</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">Evasion (Dodge):</span>
              <span className="text-cyan-400 font-bold">{totalDodge}%</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="pixel-btn pixel-btn-primary py-2 mt-1"
        >
          KEMBALI KE PENJELAJAHAN
        </button>
      </div>
    </div>
  );
};
