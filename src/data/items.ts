import type { Item } from '../types/game';

export const BASE_ITEMS: Record<string, Omit<Item, 'id'>> = {
  // --- WEAPONS ---
  rusty_dagger: {
    name: 'Belati Berkarat',
    description: 'Belati tua dengan tepi tumpul namun ringan digenggam.',
    type: 'weapon',
    rarity: 'common',
    value: 10,
    icon: 'dagger',
    atk: 2,
    critBonus: 0.05
  },
  iron_sword: {
    name: 'Pedang Besi Tempa',
    description: 'Pedang standar prajurit kerajaan. Cukup tajam dan seimbang.',
    type: 'weapon',
    rarity: 'common',
    value: 25,
    icon: 'sword',
    atk: 4
  },
  steel_broadsword: {
    name: 'Broadsword Baja',
    description: 'Bilah tebal yang mampu menembus sisik monster.',
    type: 'weapon',
    rarity: 'uncommon',
    value: 50,
    icon: 'sword',
    atk: 7
  },
  assassin_blade: {
    name: 'Bilah Bayangan',
    description: 'Ditempa dalam kegelapan. Memberikan peluang serangan kritikal tinggi.',
    type: 'weapon',
    rarity: 'rare',
    value: 100,
    icon: 'dagger',
    atk: 9,
    critBonus: 0.15
  },
  paladin_mace: {
    name: 'Gada Paladin',
    description: 'Senjata suci yang memancarkan aura perlindungan.',
    type: 'weapon',
    rarity: 'rare',
    value: 120,
    icon: 'mace',
    atk: 11,
    def: 2
  },
  flamebrand: {
    name: 'Flamebrand',
    description: 'Pedang membara dengan kobaran api abadi dari perut bumi.',
    type: 'weapon',
    rarity: 'epic',
    value: 220,
    icon: 'flame_sword',
    atk: 16,
    critBonus: 0.10
  },
  void_reaver: {
    name: 'Void Reaver',
    description: 'Pedang legendaris yang merobek ruang hampa, kekuatannya luar biasa!',
    type: 'weapon',
    rarity: 'legendary',
    value: 450,
    icon: 'legend_sword',
    atk: 24,
    critBonus: 0.20
  },

  // --- ARMORS ---
  leather_armor: {
    name: 'Baju Zirah Kulit',
    description: 'Pelindung ringan yang terbuat dari kulit binatang.',
    type: 'armor',
    rarity: 'common',
    value: 20,
    icon: 'armor_leather',
    def: 1,
    hpBonus: 3
  },
  chainmail_vest: {
    name: 'Rompi Rantai Besi',
    description: 'Rajutan cincin besi yang menahan tebasan tajam.',
    type: 'armor',
    rarity: 'uncommon',
    value: 55,
    icon: 'armor_chain',
    def: 3,
    hpBonus: 6
  },
  knight_plate: {
    name: 'Zirah Ksatria Kerajaan',
    description: 'Pelat baja kokoh dengan lambang singa keemasan.',
    type: 'armor',
    rarity: 'rare',
    value: 125,
    icon: 'armor_plate',
    def: 5,
    hpBonus: 12
  },
  dragon_scale: {
    name: 'Zirah Sisik Naga',
    description: 'Dibuat dari sisik naga merah yang tahan api dan hantaman keras.',
    type: 'armor',
    rarity: 'epic',
    value: 260,
    icon: 'armor_dragon',
    def: 8,
    hpBonus: 20,
    dodgeBonus: 0.05
  },
  aegis_immortal: {
    name: 'Aegis Para Dewa',
    description: 'Pelindung mistis legendaris yang memberkati pemakainya daya tahan tak terkalahkan.',
    type: 'armor',
    rarity: 'legendary',
    value: 500,
    icon: 'armor_god',
    def: 12,
    hpBonus: 35,
    dodgeBonus: 0.10
  },

  // --- ACCESSORIES ---
  copper_ring: {
    name: 'Cincin Tembaga',
    description: 'Cincin sederhana yang melancarkan refleks pemakainya.',
    type: 'accessory',
    rarity: 'common',
    value: 15,
    icon: 'ring',
    dodgeBonus: 0.03
  },
  berserker_charm: {
    name: 'Jimat Berserker',
    description: 'Membangkitkan amarah petarung, memperkuat serangan fisik.',
    type: 'accessory',
    rarity: 'uncommon',
    value: 60,
    icon: 'amulet',
    atk: 3,
    critBonus: 0.08
  },
  ring_of_shadows: {
    name: 'Cincin Siluman',
    description: 'Membuat langkahmu gesit tak kasat mata.',
    type: 'accessory',
    rarity: 'rare',
    value: 110,
    icon: 'ring',
    dodgeBonus: 0.12,
    critBonus: 0.05
  },
  titan_heart: {
    name: 'Jantung Titan',
    description: 'Relik kuno raksasa yang melipatgandakan ketangguhan fisik.',
    type: 'accessory',
    rarity: 'epic',
    value: 240,
    icon: 'amulet',
    hpBonus: 15,
    def: 2,
    atk: 2
  },
  dungeon_master_ring: {
    name: 'Cincin Penguasa Dungeon',
    description: 'Memancarkan aura mistis yang memanipulasi takdir penjelajah.',
    type: 'accessory',
    rarity: 'legendary',
    value: 480,
    icon: 'ring',
    atk: 5,
    def: 3,
    dodgeBonus: 0.10,
    critBonus: 0.15
  },

  // --- CONSUMABLES ---
  health_potion_minor: {
    name: 'Ramuan Darah Kecil',
    description: 'Memulihkan 6 HP seketika.',
    type: 'consumable',
    rarity: 'common',
    value: 15,
    icon: 'potion_red',
    healAmount: 6,
    effect: 'heal'
  },
  health_potion_large: {
    name: 'Ramuan Darah Murni',
    description: 'Memulihkan 15 HP seketika.',
    type: 'consumable',
    rarity: 'uncommon',
    value: 35,
    icon: 'potion_red_big',
    healAmount: 15,
    effect: 'heal'
  },
  full_elixir: {
    name: 'Elixir Kesembuhan Penuh',
    description: 'Memulihkan seluruh HP dan MP hingga batas maksimal!',
    type: 'consumable',
    rarity: 'rare',
    value: 75,
    icon: 'potion_purple',
    effect: 'full_heal'
  },
  mana_potion: {
    name: 'Ramuan Mana Kristal',
    description: 'Memulihkan 8 MP untuk menggunakan skill sihir.',
    type: 'consumable',
    rarity: 'common',
    value: 15,
    icon: 'potion_blue',
    manaAmount: 8,
    effect: 'mana'
  },
  mana_potion_large: {
    name: 'Ramuan Mana Murni',
    description: 'Memulihkan 16 MP untuk kelangsungan sihir berkelanjutan.',
    type: 'consumable',
    rarity: 'uncommon',
    value: 35,
    icon: 'potion_blue_big',
    manaAmount: 16,
    effect: 'mana'
  },
  bomb_scroll: {
    name: 'Bom Peledak Goblin',
    description: 'Dilemparkan untuk memusnahkan monster di sekitar dengan 18 damage!',
    type: 'consumable',
    rarity: 'uncommon',
    value: 40,
    icon: 'bomb',
    effect: 'bomb'
  },
  teleport_scroll: {
    name: 'Gulungan Teleportasi',
    description: 'Memindahkan seketika ke petak aman di dungeon saat terdesak.',
    type: 'scroll',
    rarity: 'rare',
    value: 50,
    icon: 'scroll',
    effect: 'teleport'
  },
  strength_tonic: {
    name: 'Tonik Kekuatan Murni',
    description: 'Minuman ajaib yang meningkatkan stat Kekuatan (STR) secara permanen +1!',
    type: 'consumable',
    rarity: 'rare',
    value: 90,
    icon: 'potion_orange',
    effect: 'str_boost'
  },
  agility_tonic: {
    name: 'Tonik Kelincahan Badai',
    description: 'Minuman ajaib yang meningkatkan stat Kelincahan (AGI) secara permanen +1!',
    type: 'consumable',
    rarity: 'rare',
    value: 90,
    icon: 'potion_green',
    effect: 'agi_boost'
  }
};

let itemCounter = 0;

export function createItem(key: keyof typeof BASE_ITEMS): Item {
  const base = BASE_ITEMS[key];
  itemCounter++;
  return {
    ...base,
    id: `item-${key}-${Date.now()}-${itemCounter}`
  };
}

export function getRandomChestLoot(floor: number): Item {
  const roll = Math.random();

  if (floor === 1) {
    const pool = ['rusty_dagger', 'leather_armor', 'copper_ring', 'health_potion_minor', 'mana_potion'];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return createItem(pick);
  }

  if (floor < 4) {
    if (roll < 0.35) {
      return createItem(Math.random() > 0.5 ? 'health_potion_minor' : 'mana_potion');
    }
    const pool = ['iron_sword', 'chainmail_vest', 'berserker_charm', 'bomb_scroll', 'health_potion_large'];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return createItem(pick);
  }

  if (floor < 7) {
    if (roll < 0.25) return createItem('health_potion_large');
    if (roll < 0.40) return createItem('teleport_scroll');
    const pool = ['steel_broadsword', 'knight_plate', 'ring_of_shadows', 'strength_tonic', 'agility_tonic', 'bomb_scroll'];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return createItem(pick);
  }

  // High floors
  if (roll < 0.25) return createItem('full_elixir');
  if (roll < 0.50) {
    const pool = ['flamebrand', 'dragon_scale', 'titan_heart', 'strength_tonic', 'agility_tonic'];
    return createItem(pool[Math.floor(Math.random() * pool.length)]);
  }

  // Super rare jackpot
  if (roll > 0.90) {
    return Math.random() > 0.5 ? createItem('void_reaver') : createItem('aegis_immortal');
  }

  const pool = ['assassin_blade', 'paladin_mace', 'dragon_scale', 'ring_of_shadows'];
  return createItem(pool[Math.floor(Math.random() * pool.length)]);
}

export function getMerchantStock(floor: number): Item[] {
  const stock: Item[] = [];

  // 1. Guaranteed Potions: HP and MP
  if (floor <= 3) {
    stock.push(createItem('health_potion_minor'));
    stock.push(createItem('mana_potion'));
  } else if (floor <= 6) {
    stock.push(createItem('health_potion_large'));
    stock.push(createItem('mana_potion_large'));
  } else {
    stock.push(createItem('health_potion_large'));
    stock.push(createItem('mana_potion_large'));
    stock.push(createItem('full_elixir'));
  }

  // 2. Weapon appropriate for floor
  if (floor <= 2) {
    stock.push(createItem('iron_sword'));
  } else if (floor <= 4) {
    stock.push(createItem('steel_broadsword'));
  } else if (floor <= 7) {
    stock.push(createItem(Math.random() > 0.5 ? 'assassin_blade' : 'paladin_mace'));
  } else {
    stock.push(createItem(Math.random() > 0.5 ? 'flamebrand' : 'void_reaver'));
  }

  // 3. Armor appropriate for floor
  if (floor <= 3) {
    stock.push(createItem('chainmail_vest'));
  } else if (floor <= 6) {
    stock.push(createItem('knight_plate'));
  } else {
    stock.push(createItem(Math.random() > 0.5 ? 'dragon_scale' : 'aegis_immortal'));
  }

  // 4. Tactical Consumables & Accessories
  const tacticalPool = ['bomb_scroll', 'teleport_scroll', 'copper_ring', 'berserker_charm'];
  if (floor >= 4) {
    tacticalPool.push('ring_of_shadows', 'strength_tonic', 'agility_tonic');
  }
  if (floor >= 7) {
    tacticalPool.push('titan_heart', 'dungeon_master_ring');
  }

  const pickTactical = tacticalPool[Math.floor(Math.random() * tacticalPool.length)] as keyof typeof BASE_ITEMS;
  stock.push(createItem(pickTactical));

  // 5. Bonus utility item
  if (floor >= 3 && Math.random() > 0.3) {
    const extraPick = Math.random() > 0.5 ? 'strength_tonic' : 'bomb_scroll';
    stock.push(createItem(extraPick));
  }

  return stock;
}

