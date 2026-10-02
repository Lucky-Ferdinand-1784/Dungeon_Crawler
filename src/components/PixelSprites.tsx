import type React from 'react';
import type { EnemyType } from '../types/game';

export const PixelHero: React.FC<{ isHit?: boolean }> = ({ isHit }) => (
  <svg viewBox="0 0 16 16" className={`w-full h-full drop-shadow-md select-none transition-transform duration-100 ${isHit ? 'brightness-150 saturate-200 animate-wiggle' : ''}`}>
    {/* Cape */}
    <rect x="4" y="6" width="8" height="7" fill="#1e3a8a" />
    <rect x="3" y="8" width="10" height="5" fill="#1d4ed8" />
    
    {/* Body Armor */}
    <rect x="5" y="6" width="6" height="7" fill="#3b82f6" />
    <rect x="6" y="8" width="4" height="4" fill="#60a5fa" />
    <rect x="7" y="9" width="2" height="2" fill="#dbeafe" />

    {/* Face / Skin */}
    <rect x="5" y="3" width="6" height="4" fill="#fed7aa" />
    {/* Eyes */}
    <rect x="6" y="4" width="1" height="1" fill="#0f172a" />
    <rect x="9" y="4" width="1" height="1" fill="#0f172a" />
    
    {/* Knight Helmet / Golden Crown */}
    <rect x="5" y="1" width="6" height="2" fill="#ca8a04" />
    <rect x="4" y="2" width="8" height="2" fill="#eab308" />
    <rect x="7" y="1" width="2" height="1" fill="#fef08a" />

    {/* Broadsword in Hand */}
    <rect x="12" y="2" width="1" height="9" fill="#f1f5f9" />
    <rect x="11" y="2" width="1" height="2" fill="#94a3b8" />
    <rect x="11" y="9" width="3" height="1" fill="#64748b" />
    <rect x="12" y="10" width="1" height="2" fill="#78350f" />
    {/* Sword Sparkle */}
    <rect x="12" y="3" width="1" height="1" fill="#38bdf8" />

    {/* Boots */}
    <rect x="5" y="13" width="2" height="2" fill="#451a03" />
    <rect x="9" y="13" width="2" height="2" fill="#451a03" />
  </svg>
);

export const PixelEnemy: React.FC<{ type: EnemyType }> = ({ type }) => {
  switch (type) {
    case 'slime':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none animate-bounce-subtle">
          <rect x="5" y="5" width="6" height="2" fill="#22c55e" />
          <rect x="3" y="7" width="10" height="6" fill="#16a34a" />
          <rect x="2" y="9" width="12" height="5" fill="#15803d" />
          {/* Slime Highlight */}
          <rect x="4" y="7" width="2" height="2" fill="#86efac" />
          {/* Eyes */}
          <rect x="5" y="9" width="2" height="2" fill="#052e16" />
          <rect x="9" y="9" width="2" height="2" fill="#052e16" />
          <rect x="5" y="9" width="1" height="1" fill="#ffffff" />
          <rect x="9" y="9" width="1" height="1" fill="#ffffff" />
        </svg>
      );

    case 'bat':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none animate-pulse">
          {/* Wings */}
          <rect x="1" y="4" width="4" height="3" fill="#6b21a8" />
          <rect x="2" y="2" width="2" height="2" fill="#581c87" />
          <rect x="11" y="4" width="4" height="3" fill="#6b21a8" />
          <rect x="12" y="2" width="2" height="2" fill="#581c87" />
          {/* Body */}
          <rect x="5" y="4" width="6" height="7" fill="#3b0764" />
          {/* Ears */}
          <rect x="5" y="2" width="2" height="2" fill="#581c87" />
          <rect x="9" y="2" width="2" height="2" fill="#581c87" />
          {/* Glowing Red Eyes */}
          <rect x="6" y="5" width="1" height="1" fill="#ef4444" />
          <rect x="9" y="5" width="1" height="1" fill="#ef4444" />
          {/* Fangs */}
          <rect x="6" y="8" width="1" height="1" fill="#ffffff" />
          <rect x="9" y="8" width="1" height="1" fill="#ffffff" />
        </svg>
      );

    case 'goblin':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none">
          {/* Big Ears */}
          <rect x="2" y="4" width="2" height="3" fill="#84cc16" />
          <rect x="12" y="4" width="2" height="3" fill="#84cc16" />
          {/* Head */}
          <rect x="4" y="3" width="8" height="6" fill="#65a30d" />
          {/* Yellow Beady Eyes */}
          <rect x="5" y="5" width="2" height="2" fill="#facc15" />
          <rect x="9" y="5" width="2" height="2" fill="#facc15" />
          <rect x="6" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
          {/* Body with rag */}
          <rect x="4" y="9" width="8" height="4" fill="#78350f" />
          {/* Dagger */}
          <rect x="1" y="9" width="3" height="1" fill="#94a3b8" />
          <rect x="2" y="10" width="1" height="2" fill="#451a03" />
        </svg>
      );

    case 'skeleton':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none">
          {/* Skull */}
          <rect x="4" y="2" width="8" height="6" fill="#e2e8f0" />
          {/* Dark Eye Sockets with Red Glow */}
          <rect x="5" y="4" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="4" width="2" height="2" fill="#0f172a" />
          <rect x="6" y="5" width="1" height="1" fill="#ef4444" />
          <rect x="10" y="5" width="1" height="1" fill="#ef4444" />
          {/* Teeth */}
          <rect x="6" y="7" width="1" height="1" fill="#94a3b8" />
          <rect x="8" y="7" width="1" height="1" fill="#94a3b8" />
          {/* Ribs & Spine */}
          <rect x="7" y="8" width="2" height="5" fill="#cbd5e1" />
          <rect x="5" y="9" width="6" height="1" fill="#e2e8f0" />
          <rect x="5" y="11" width="6" height="1" fill="#e2e8f0" />
          {/* Rusty Bone Shield */}
          <rect x="2" y="8" width="3" height="5" fill="#64748b" />
          <rect x="3" y="9" width="1" height="3" fill="#cbd5e1" />
        </svg>
      );

    case 'necromancer':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-lg select-none animate-pulse">
          {/* Hood / Robe */}
          <rect x="4" y="1" width="8" height="4" fill="#3b0764" />
          <rect x="3" y="4" width="10" height="9" fill="#581c87" />
          <rect x="2" y="11" width="12" height="3" fill="#2e1065" />
          {/* Dark Face Cavity */}
          <rect x="5" y="3" width="6" height="4" fill="#000000" />
          {/* Glowing Purple Magic Eyes */}
          <rect x="6" y="4" width="1" height="1" fill="#c084fc" />
          <rect x="9" y="4" width="1" height="1" fill="#c084fc" />
          {/* Skull Staff */}
          <rect x="13" y="2" width="1" height="12" fill="#78350f" />
          <rect x="12" y="1" width="3" height="3" fill="#cbd5e1" />
          <rect x="13" y="2" width="1" height="1" fill="#000000" />
          {/* Purple Magic Aura */}
          <rect x="11" y="0" width="1" height="1" fill="#e879f9" />
          <rect x="14" y="3" width="1" height="1" fill="#c084fc" />
        </svg>
      );

    case 'dragon':
      return (
        <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-xl select-none animate-pulse">
          {/* Horns */}
          <rect x="2" y="1" width="2" height="3" fill="#facc15" />
          <rect x="12" y="1" width="2" height="3" fill="#facc15" />
          {/* Dragon Head */}
          <rect x="3" y="3" width="10" height="8" fill="#b91c1c" />
          <rect x="2" y="7" width="12" height="5" fill="#991b1b" />
          {/* Scales Highlight */}
          <rect x="5" y="4" width="6" height="2" fill="#dc2626" />
          {/* Blazing Eyes */}
          <rect x="4" y="6" width="2" height="2" fill="#fef08a" />
          <rect x="10" y="6" width="2" height="2" fill="#fef08a" />
          <rect x="5" y="7" width="1" height="1" fill="#ea580c" />
          <rect x="11" y="7" width="1" height="1" fill="#ea580c" />
          {/* Fire breath snort / Fangs */}
          <rect x="4" y="11" width="1" height="2" fill="#ffffff" />
          <rect x="7" y="11" width="2" height="2" fill="#f97316" />
          <rect x="11" y="11" width="1" height="2" fill="#ffffff" />
        </svg>
      );
  }
};

export const PixelChest: React.FC<{ isOpened?: boolean }> = ({ isOpened }) => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none">
    {isOpened ? (
      <>
        {/* Open Chest Body */}
        <rect x="3" y="7" width="10" height="6" fill="#78350f" />
        <rect x="2" y="6" width="12" height="2" fill="#ca8a04" />
        {/* Opened Lid tipped back */}
        <rect x="3" y="2" width="10" height="4" fill="#92400e" />
        <rect x="3" y="1" width="10" height="1" fill="#eab308" />
        {/* Gold Shine inside */}
        <rect x="5" y="6" width="6" height="3" fill="#facc15" />
        <rect x="7" y="7" width="2" height="2" fill="#fef08a" />
      </>
    ) : (
      <>
        {/* Closed Chest */}
        <rect x="3" y="5" width="10" height="8" fill="#78350f" />
        <rect x="2" y="4" width="12" height="4" fill="#92400e" />
        {/* Gold bands & latch */}
        <rect x="2" y="6" width="12" height="1" fill="#eab308" />
        <rect x="2" y="10" width="12" height="1" fill="#ca8a04" />
        <rect x="7" y="6" width="2" height="3" fill="#facc15" />
        <rect x="7" y="8" width="2" height="1" fill="#451a03" />
      </>
    )}
  </svg>
);

export const PixelShrine: React.FC<{ used?: boolean; type?: string }> = ({ used, type }) => {
  const glowColor = type === 'health' ? '#ef4444' : type === 'strength' ? '#f59e0b' : '#38bdf8';
  return (
    <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none">
      {/* Stone Pedestal */}
      <rect x="3" y="11" width="10" height="3" fill="#475569" />
      <rect x="4" y="7" width="8" height="4" fill="#64748b" />
      <rect x="5" y="4" width="6" height="3" fill="#94a3b8" />
      {/* Mystical Crystal Orb */}
      {!used ? (
        <>
          <circle cx="8" cy="3.5" r="2.5" fill={glowColor} className="animate-pulse" />
          <circle cx="7" cy="2.5" r="0.8" fill="#ffffff" />
        </>
      ) : (
        <circle cx="8" cy="3.5" r="2" fill="#334155" />
      )}
    </svg>
  );
};

export const PixelStairs: React.FC = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow select-none">
    <rect x="2" y="2" width="12" height="12" fill="#0f172a" />
    <rect x="3" y="10" width="10" height="3" fill="#94a3b8" />
    <rect x="4" y="7" width="8" height="3" fill="#64748b" />
    <rect x="5" y="4" width="6" height="3" fill="#475569" />
    <rect x="6" y="3" width="4" height="2" fill="#020617" />
    {/* Arrow indicator */}
    <rect x="7" y="5" width="2" height="2" fill="#38bdf8" />
  </svg>
);

export const PixelMerchant: React.FC = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md select-none animate-bounce-subtle">
    {/* Backpack on back */}
    <rect x="2" y="5" width="4" height="7" fill="#78350f" rx="1" />
    <rect x="2" y="4" width="3" height="2" fill="#92400e" />
    {/* Cloak / Hood */}
    <rect x="5" y="2" width="7" height="4" fill="#065f46" />
    <rect x="4" y="5" width="9" height="8" fill="#047857" />
    <rect x="3" y="11" width="11" height="3" fill="#064e3b" />
    {/* Dark Hood Opening */}
    <rect x="6" y="3" width="5" height="3" fill="#022c22" />
    {/* Friendly glowing yellow eyes / spectacles */}
    <rect x="7" y="4" width="1" height="1" fill="#facc15" />
    <rect x="9" y="4" width="1" height="1" fill="#facc15" />
    {/* Merchant Golden Lantern on Staff/Side */}
    <rect x="13" y="5" width="1" height="7" fill="#b45309" />
    <rect x="12" y="6" width="3" height="3" fill="#fbbf24" className="animate-pulse" />
    <rect x="13" y="7" width="1" height="1" fill="#ffffff" />
    {/* Coin purse on belt */}
    <rect x="8" y="9" width="3" height="3" fill="#d97706" rx="0.5" />
    <rect x="9" y="10" width="1" height="1" fill="#fef08a" />
  </svg>
);

export const PixelWall: React.FC = () => (
  <div className="w-full h-full bg-slate-900 border border-slate-700/80 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-600/40"></div>
    <div className="absolute top-2 left-1 w-3 h-2 bg-slate-800 border-b border-slate-700"></div>
    <div className="absolute top-2 right-1 w-4 h-2 bg-slate-800 border-b border-slate-700"></div>
    <div className="absolute bottom-1 left-2 w-5 h-2 bg-slate-800 border-t border-slate-700"></div>
    {/* Moss pixel */}
    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-emerald-700/50"></div>
  </div>
);

export const ItemIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = "w-6 h-6" }) => {
  switch (icon) {
    case 'sword':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="11" y="2" width="2" height="7" fill="#e2e8f0" />
          <rect x="9" y="8" width="5" height="1" fill="#94a3b8" />
          <rect x="12" y="9" width="1" height="3" fill="#78350f" />
        </svg>
      );
    case 'dagger':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="9" y="4" width="2" height="5" fill="#cbd5e1" />
          <rect x="8" y="8" width="4" height="1" fill="#64748b" />
          <rect x="9" y="9" width="2" height="2" fill="#451a03" />
        </svg>
      );
    case 'mace':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="10" y="2" width="4" height="4" fill="#cbd5e1" />
          <rect x="7" y="6" width="4" height="2" fill="#78350f" />
          <rect x="5" y="8" width="3" height="2" fill="#451a03" />
          <rect x="3" y="10" width="3" height="2" fill="#451a03" />
        </svg>
      );
    case 'flame_sword':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="11" y="2" width="2" height="7" fill="#f97316" />
          <rect x="10" y="3" width="1" height="4" fill="#facc15" />
          <rect x="9" y="8" width="5" height="1" fill="#ea580c" />
          <rect x="12" y="9" width="1" height="3" fill="#451a03" />
        </svg>
      );
    case 'legend_sword':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="11" y="1" width="2" height="8" fill="#a855f7" />
          <rect x="12" y="2" width="1" height="6" fill="#f472b6" />
          <rect x="8" y="8" width="7" height="1" fill="#c084fc" />
          <rect x="11" y="9" width="2" height="4" fill="#3b0764" />
        </svg>
      );
    case 'armor_leather':
    case 'armor_chain':
    case 'armor_plate':
    case 'armor_dragon':
    case 'armor_god':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="4" y="3" width="8" height="10" fill={
            icon === 'armor_god' ? '#eab308' :
            icon === 'armor_dragon' ? '#dc2626' :
            icon === 'armor_plate' ? '#94a3b8' :
            icon === 'armor_chain' ? '#64748b' : '#92400e'
          } rx="1" />
          <rect x="6" y="2" width="4" height="2" fill="#0f172a" />
          <rect x="7" y="6" width="2" height="4" fill="#ffffff" opacity="0.3" />
        </svg>
      );
    case 'ring':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="5" stroke="#facc15" strokeWidth="2" fill="none" />
          <rect x="7" y="2" width="2" height="2" fill="#38bdf8" />
        </svg>
      );
    case 'amulet':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <path d="M 4 3 L 8 8 L 12 3" stroke="#cbd5e1" strokeWidth="1" fill="none" />
          <rect x="6" y="8" width="4" height="5" fill="#ef4444" rx="1" />
          <rect x="7" y="9" width="2" height="2" fill="#fca5a5" />
        </svg>
      );
    case 'potion_red':
    case 'potion_red_big':
    case 'potion_blue':
    case 'potion_blue_big':
    case 'potion_purple':
    case 'potion_orange':
    case 'potion_green':
      {
        const color = 
          icon === 'potion_blue' || icon === 'potion_blue_big' ? '#3b82f6' :
          icon === 'potion_purple' ? '#a855f7' :
          icon === 'potion_orange' ? '#f97316' :
          icon === 'potion_green' ? '#22c55e' : '#ef4444';
        return (
          <svg viewBox="0 0 16 16" className={className}>
            <rect x="7" y="2" width="2" height="2" fill="#92400e" />
            <rect x="6" y="4" width="4" height="2" fill="#cbd5e1" />
            <rect x="4" y="6" width="8" height="7" fill={color} rx="1" />
            <rect x="5" y="7" width="2" height="2" fill="#ffffff" opacity="0.6" />
          </svg>
        );
      }
    case 'bomb':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="9" r="5" fill="#1e293b" />
          <rect x="8" y="3" width="1" height="2" fill="#78350f" />
          <rect x="9" y="2" width="2" height="2" fill="#f59e0b" />
          <rect x="6" y="7" width="2" height="2" fill="#ffffff" opacity="0.4" />
        </svg>
      );
    case 'scroll':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="4" y="3" width="8" height="10" fill="#fef3c7" rx="1" />
          <rect x="3" y="3" width="10" height="2" fill="#d97706" />
          <rect x="3" y="11" width="10" height="2" fill="#d97706" />
          <rect x="6" y="6" width="4" height="1" fill="#92400e" />
          <rect x="6" y="8" width="4" height="1" fill="#92400e" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="4" fill="#94a3b8" />
        </svg>
      );
  }
};

export const SkillIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = "w-5 h-5" }) => {
  switch (icon) {
    case 'cleave':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <path d="M 2 14 L 14 2 M 10 2 L 14 2 L 14 6" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 4 8 C 8 4 12 6 13 3" stroke="#fca5a5" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'fireball':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="5" fill="#ea580c" />
          <circle cx="8" cy="8" r="3" fill="#facc15" />
          <rect x="7" y="2" width="2" height="3" fill="#f97316" />
          <rect x="3" y="6" width="3" height="2" fill="#ef4444" />
          <rect x="11" y="7" width="3" height="2" fill="#ea580c" />
          <circle cx="7" cy="7" r="1.5" fill="#fff" />
        </svg>
      );
    case 'holy_heal':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <rect x="6" y="2" width="4" height="12" fill="#38bdf8" rx="1" />
          <rect x="2" y="6" width="12" height="4" fill="#38bdf8" rx="1" />
          <rect x="7" y="3" width="2" height="10" fill="#e0f2fe" />
          <rect x="3" y="7" width="10" height="2" fill="#e0f2fe" />
        </svg>
      );
    case 'thunder':
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <polygon points="9,1 3,9 8,9 7,15 13,7 8,7" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="4" fill="#818cf8" />
        </svg>
      );
  }
};

