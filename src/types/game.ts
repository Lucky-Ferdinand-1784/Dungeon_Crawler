export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'scroll';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  value: number; // gold value
  icon: string;
  // Stat bonuses
  atk?: number;
  def?: number;
  hpBonus?: number;
  critBonus?: number; // e.g. 0.05 for +5%
  dodgeBonus?: number; // e.g. 0.05 for +5%
  // Consumable effects
  healAmount?: number;
  manaAmount?: number;
  effect?: 'heal' | 'full_heal' | 'bomb' | 'teleport' | 'str_boost' | 'agi_boost';
}

export interface PlayerStats {
  str: number; // Strength: adds to physical damage
  def: number; // Defense: reduces incoming damage
  agi: number; // Agility: increases crit and dodge chances
  bonusHp?: number; // HP bonuses allocated from stat points
}

export interface PlayerEquipment {
  weapon: Item | null;
  armor: Item | null;
  accessory: Item | null;
}

export interface Player {
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  statPoints: number; // unallocated stat points
  gold: number;
  stats: PlayerStats;
  equipment: PlayerEquipment;
  inventory: Item[];
}

export type EnemyType = 'slime' | 'bat' | 'skeleton' | 'goblin' | 'necromancer' | 'dragon';

export interface Enemy {
  id: string;
  x: number;
  y: number;
  type: EnemyType;
  name: string;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  xpReward: number;
  goldReward: number;
  isBoss?: boolean;
}

export interface TileCoordinate {
  x: number;
  y: number;
}

export interface Chest {
  id: string;
  x: number;
  y: number;
  isOpened: boolean;
  item?: Item;
  gold?: number;
}

export interface Shrine {
  id: string;
  x: number;
  y: number;
  used: boolean;
  type: 'health' | 'strength' | 'fountain';
  name: string;
}

export interface LevelData {
  floor: number;
  walls: TileCoordinate[];
  enemies: Enemy[];
  chests: Chest[];
  shrines: Shrine[];
  exit: TileCoordinate;
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  type: 'damage' | 'crit' | 'heal' | 'dodge' | 'xp' | 'gold' | 'info';
}

export interface CombatLog {
  id: string;
  text: string;
  type: 'attack' | 'damage' | 'heal' | 'item' | 'levelup' | 'system';
  time: string;
}
