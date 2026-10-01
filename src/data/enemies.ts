import type { Enemy, EnemyType } from '../types/game';

interface EnemyTemplate {
  name: string;
  type: EnemyType;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  baseXp: number;
  baseGold: number;
  isBoss?: boolean;
}

export const ENEMY_TEMPLATES: Record<EnemyType, EnemyTemplate> = {
  slime: {
    name: 'Slime Berlendir',
    type: 'slime',
    baseHp: 6,
    baseAtk: 2,
    baseDef: 0,
    baseXp: 8,
    baseGold: 5
  },
  bat: {
    name: 'Kelelawar Beracun',
    type: 'bat',
    baseHp: 5,
    baseAtk: 3,
    baseDef: 0,
    baseXp: 10,
    baseGold: 6
  },
  goblin: {
    name: 'Goblin Penjarah',
    type: 'goblin',
    baseHp: 10,
    baseAtk: 4,
    baseDef: 1,
    baseXp: 16,
    baseGold: 18
  },
  skeleton: {
    name: 'Ksatria Kerangka',
    type: 'skeleton',
    baseHp: 14,
    baseAtk: 5,
    baseDef: 2,
    baseXp: 22,
    baseGold: 12
  },
  necromancer: {
    name: 'Tuan Necromancer',
    type: 'necromancer',
    baseHp: 36,
    baseAtk: 8,
    baseDef: 3,
    baseXp: 80,
    baseGold: 75,
    isBoss: true
  },
  dragon: {
    name: 'Naga Purba Neraka',
    type: 'dragon',
    baseHp: 80,
    baseAtk: 14,
    baseDef: 6,
    baseXp: 250,
    baseGold: 200,
    isBoss: true
  }
};

let enemyCounter = 0;

export function createEnemy(type: EnemyType, x: number, y: number, floor: number): Enemy {
  const tpl = ENEMY_TEMPLATES[type] || ENEMY_TEMPLATES.slime;
  enemyCounter++;

  // Scale with floor
  const floorMultiplier = 1 + (floor - 1) * 0.25;
  const hp = Math.round(tpl.baseHp * floorMultiplier);
  const atk = Math.round(tpl.baseAtk * (1 + (floor - 1) * 0.15));
  const def = Math.max(0, tpl.baseDef + Math.floor((floor - 1) / 3));
  const xpReward = Math.round(tpl.baseXp * floorMultiplier);
  const goldReward = Math.round(tpl.baseGold * (0.8 + Math.random() * 0.4) * floorMultiplier);

  return {
    id: `enemy-${type}-${Date.now()}-${enemyCounter}`,
    x,
    y,
    type,
    name: tpl.name,
    hp,
    maxHp: hp,
    atk,
    def,
    xpReward,
    goldReward,
    isBoss: Boolean(tpl.isBoss)
  };
}
