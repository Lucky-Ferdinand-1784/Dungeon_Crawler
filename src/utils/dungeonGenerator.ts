import type { LevelData, TileCoordinate, Chest, Shrine, EnemyType, Enemy, Merchant } from '../types/game';
import { createEnemy } from '../data/enemies';
import { getRandomChestLoot, getMerchantStock } from '../data/items';

export const GRID_SIZE = 9;

export function generateLevel(floor: number): LevelData {
  const walls: TileCoordinate[] = [];
  const chests: Chest[] = [];
  const shrines: Shrine[] = [];
  let merchant: Merchant | null = null;

  // 1. Outer boundary walls
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1) {
        walls.push({ x, y });
      }
    }
  }

  // Buffer Zone around Player Spawn (1, 1) - guarantees player can move freely immediately
  const isSpawnZone = (x: number, y: number): boolean => {
    return x <= 2 && y <= 2;
  };

  // Buffer Zone around Exit (GRID_SIZE - 2, GRID_SIZE - 2) - guarantees exit is never blocked
  const isExitZone = (x: number, y: number): boolean => {
    return x >= GRID_SIZE - 3 && y >= GRID_SIZE - 3;
  };

  // Global BFS Flood Fill: verifies that 100% of walkable floor tiles are reachable from (1, 1)
  const isAllFloorsReachable = (currentWalls: TileCoordinate[]): boolean => {
    let totalFloorTiles = 0;
    for (let x = 1; x < GRID_SIZE - 1; x++) {
      for (let y = 1; y < GRID_SIZE - 1; y++) {
        if (!currentWalls.some(w => w.x === x && w.y === y)) {
          totalFloorTiles++;
        }
      }
    }

    const queue: [number, number][] = [[1, 1]];
    const visited = new Set<string>(['1,1']);

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        const key = `${nx},${ny}`;
        if (nx > 0 && nx < GRID_SIZE - 1 && ny > 0 && ny < GRID_SIZE - 1 && !visited.has(key)) {
          if (!currentWalls.some(w => w.x === nx && w.y === ny)) {
            visited.add(key);
            queue.push([nx, ny]);
          }
        }
      }
    }

    return visited.size === totalFloorTiles;
  };

  // 2. Internal Pillars Generation (Isolated 1x1 pillars, spacious corridors, never blocking paths)
  const isBossFloor = floor === 5 || floor === 10;
  // Non-boss floors get 3-4 isolated pillars; boss floors get 1-2 for maximum arena combat space
  const targetPillars = isBossFloor ? (Math.random() > 0.5 ? 2 : 1) : Math.floor(Math.random() * 2) + 3;

  // Candidate inner positions (between x=2..6, y=2..6)
  const candidatePool: TileCoordinate[] = [];
  for (let x = 2; x <= GRID_SIZE - 3; x++) {
    for (let y = 2; y <= GRID_SIZE - 3; y++) {
      if (!isSpawnZone(x, y) && !isExitZone(x, y)) {
        candidatePool.push({ x, y });
      }
    }
  }

  // Shuffle candidates
  for (let i = candidatePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidatePool[i], candidatePool[j]] = [candidatePool[j], candidatePool[i]];
  }

  let placedPillars = 0;
  for (const cand of candidatePool) {
    if (placedPillars >= targetPillars) break;

    // RULE: Isolated pillars - must not touch any other internal wall (orthogonally or diagonally)
    // This mathematically guarantees at least 1-2 open walkable tiles around EVERY obstacle!
    const isAdjacentToOtherWall = walls.some(w => {
      // Ignore boundary walls
      if (w.x === 0 || w.x === GRID_SIZE - 1 || w.y === 0 || w.y === GRID_SIZE - 1) return false;
      return Math.abs(w.x - cand.x) <= 1 && Math.abs(w.y - cand.y) <= 1;
    });

    if (!isAdjacentToOtherWall) {
      walls.push(cand);
      if (isAllFloorsReachable(walls)) {
        placedPillars++;
      } else {
        walls.pop(); // Revert immediately if any floor tile becomes unreachable
      }
    }
  }

  // Check occupancy for interactive entities
  const isOccupied = (x: number, y: number): boolean => {
    if (x === 1 && y === 1) return true; // Player spawn
    if (x === GRID_SIZE - 2 && y === GRID_SIZE - 2) return true; // Exit
    if (walls.some(w => w.x === x && w.y === y)) return true;
    if (chests.some(c => c.x === x && c.y === y)) return true;
    if (shrines.some(s => s.x === x && s.y === y)) return true;
    if (merchant && merchant.x === x && merchant.y === y) return true;
    return false;
  };

  const getEmptyTile = (avoidBufferZones = true): TileCoordinate => {
    let attempts = 0;
    while (attempts < 300) {
      attempts++;
      const x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      if (!isOccupied(x, y)) {
        if (avoidBufferZones && (isSpawnZone(x, y) || isExitZone(x, y))) {
          continue;
        }
        return { x, y };
      }
    }
    // Fallback safe tile
    return { x: 3, y: 3 };
  };

  // 3. Chests (1 or 2 per floor, placed with clear access)
  const chestCount = floor % 5 === 0 ? 2 : Math.random() > 0.3 ? 2 : 1;
  for (let i = 0; i < chestCount; i++) {
    const tile = getEmptyTile(true);
    chests.push({
      id: `chest-${floor}-${i}-${Date.now()}`,
      x: tile.x,
      y: tile.y,
      isOpened: false,
      item: getRandomChestLoot(floor),
      gold: Math.floor(Math.random() * 15) + 10 * floor
    });
  }

  // 4. Shrines (35% chance per floor, or guaranteed on floor 4 and 9)
  if (Math.random() < 0.4 || floor === 4 || floor === 9) {
    const tile = getEmptyTile(true);
    const shrineTypes: ('health' | 'strength' | 'fountain')[] = ['health', 'strength', 'fountain'];
    const sType = shrineTypes[Math.floor(Math.random() * shrineTypes.length)];
    const names = {
      health: 'Altar Pemulihan Suci',
      strength: 'Altar Kekuatan Kuno',
      fountain: 'Mata Air Kebijaksanaan'
    };
    shrines.push({
      id: `shrine-${floor}-${Date.now()}`,
      x: tile.x,
      y: tile.y,
      used: false,
      type: sType,
      name: names[sType]
    });
  }

  // 5. Traveling Merchant Spawn (Guaranteed on floors 2, 4, 7, and 60% chance on other non-boss floors)
  const shouldSpawnMerchant = !isBossFloor && (floor === 2 || floor === 4 || floor === 7 || Math.random() < 0.6);
  if (shouldSpawnMerchant) {
    const tile = getEmptyTile(true);
    const names = [
      'Garrick si Saudagar',
      'Milo sang Alkemis',
      'Barnaby Pedagang Kelana',
      'Zephyr Pembawa Berkah'
    ];
    const pickedName = names[Math.floor(Math.random() * names.length)];
    merchant = {
      id: `merchant-${floor}-${Date.now()}`,
      x: tile.x,
      y: tile.y,
      name: pickedName,
      greeting: 'Kebutuhan petualanganmu ada di sini! Pilihlah dengan bijak.',
      stock: getMerchantStock(floor)
    };
  }

  // 6. Enemy Spawning (Safe distance from spawn, never in exit buffer)
  const enemies: Enemy[] = [];
  const occupiedByEnemy = (x: number, y: number) => {
    return isOccupied(x, y) || enemies.some(e => e.x === x && e.y === y);
  };

  const getEnemyTile = (): TileCoordinate => {
    let attempts = 0;
    while (attempts < 300) {
      attempts++;
      const x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const distFromSpawn = Math.hypot(x - 1, y - 1);
      const isExit = x === GRID_SIZE - 2 && y === GRID_SIZE - 2;
      const inExitBuffer = isExitZone(x, y);
      if (!occupiedByEnemy(x, y) && distFromSpawn >= 3.0 && !isExit && !inExitBuffer) {
        return { x, y };
      }
    }
    return { x: 4, y: 4 };
  };

  // Boss Floors
  if (floor === 5) {
    // Boss Floor: Necromancer
    const bossTile = getEnemyTile();
    enemies.push(createEnemy('necromancer', bossTile.x, bossTile.y, floor));
    // 2 skeleton minions
    for (let i = 0; i < 2; i++) {
      const tile = getEnemyTile();
      enemies.push(createEnemy('skeleton', tile.x, tile.y, floor));
    }
  } else if (floor === 10) {
    // Final Boss Floor: Ancient Dragon!
    const bossTile = getEnemyTile();
    enemies.push(createEnemy('dragon', bossTile.x, bossTile.y, floor));
    for (let i = 0; i < 2; i++) {
      const tile = getEnemyTile();
      enemies.push(createEnemy('goblin', tile.x, tile.y, floor));
    }
  } else {
    // Normal floor enemies
    const enemyCount = Math.min(2 + Math.floor(floor / 2), 5);
    for (let i = 0; i < enemyCount; i++) {
      const tile = getEnemyTile();
      let enemyType: EnemyType = 'slime';

      if (floor === 1) {
        enemyType = 'slime';
      } else if (floor === 2) {
        enemyType = Math.random() > 0.4 ? 'bat' : 'slime';
      } else if (floor === 3) {
        enemyType = Math.random() > 0.5 ? 'goblin' : 'bat';
      } else if (floor === 4) {
        enemyType = Math.random() > 0.5 ? 'skeleton' : 'goblin';
      } else {
        const pool: EnemyType[] = ['slime', 'bat', 'goblin', 'skeleton'];
        enemyType = pool[Math.floor(Math.random() * pool.length)];
      }

      enemies.push(createEnemy(enemyType, tile.x, tile.y, floor));
    }
  }

  return {
    floor,
    walls,
    enemies,
    chests,
    shrines,
    merchant,
    exit: { x: GRID_SIZE - 2, y: GRID_SIZE - 2 }
  };
}
