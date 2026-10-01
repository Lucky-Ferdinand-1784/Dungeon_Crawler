import type { LevelData, TileCoordinate, Chest, Shrine, EnemyType, Enemy } from '../types/game';
import { createEnemy } from '../data/enemies';
import { getRandomChestLoot } from '../data/items';

export const GRID_SIZE = 9;

export function generateLevel(floor: number): LevelData {
  const walls: TileCoordinate[] = [];
  const chests: Chest[] = [];
  const shrines: Shrine[] = [];

  const isOccupied = (x: number, y: number): boolean => {
    if (x === 1 && y === 1) return true; // Player spawn
    if (x === GRID_SIZE - 2 && y === GRID_SIZE - 2) return true; // Exit
    if (walls.some(w => w.x === x && w.y === y)) return true;
    if (chests.some(c => c.x === x && c.y === y)) return true;
    if (shrines.some(s => s.x === x && s.y === y)) return true;
    return false;
  };

  const getEmptyTile = (): TileCoordinate => {
    let attempts = 0;
    while (attempts < 200) {
      attempts++;
      const x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      if (!isOccupied(x, y)) {
        return { x, y };
      }
    }
    return { x: 2, y: 2 };
  };

  // Outer boundary walls
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1) {
        walls.push({ x, y });
      }
    }
  }

  // BFS reachability check
  const isReachable = (startX: number, startY: number, targetX: number, targetY: number): boolean => {
    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<string>([`${startX},${startY}`]);
    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      if (cx === targetX && cy === targetY) return true;
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        const key = `${nx},${ny}`;
        if (nx > 0 && nx < GRID_SIZE - 1 && ny > 0 && ny < GRID_SIZE - 1 && !visited.has(key)) {
          if (!walls.some(w => w.x === nx && w.y === ny)) {
            visited.add(key);
            queue.push([nx, ny]);
          }
        }
      }
    }
    return false;
  };

  // Internal pillars and maze walls (avoid blocking spawn & exit)
  const obstacleCount = Math.floor(GRID_SIZE * 0.7);
  for (let i = 0; i < obstacleCount; i++) {
    const tile = getEmptyTile();
    const isExitTile = tile.x === GRID_SIZE - 2 && tile.y === GRID_SIZE - 2;
    if (tile.x + tile.y > 3 && !isExitTile) {
      walls.push(tile);
      if (!isReachable(1, 1, GRID_SIZE - 2, GRID_SIZE - 2)) {
        walls.pop(); // Undo if wall blocks path to stairs
      }
    }
  }

  // Chests (1 or 2 per floor)
  const chestCount = floor % 5 === 0 ? 2 : Math.random() > 0.3 ? 2 : 1;
  for (let i = 0; i < chestCount; i++) {
    const tile = getEmptyTile();
    chests.push({
      id: `chest-${floor}-${i}-${Date.now()}`,
      x: tile.x,
      y: tile.y,
      isOpened: false,
      item: getRandomChestLoot(floor),
      gold: Math.floor(Math.random() * 15) + 10 * floor
    });
  }

  // Shrines (35% chance per floor, or guaranteed on floor 4 and 9)
  if (Math.random() < 0.4 || floor === 4 || floor === 9) {
    const tile = getEmptyTile();
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

  // Determine enemy spawns based on floor
  const enemies: Enemy[] = [];
  const occupiedByEnemy = (x: number, y: number) => {
    return isOccupied(x, y) || enemies.some(e => e.x === x && e.y === y);
  };

  const getEnemyTile = (): TileCoordinate => {
    let attempts = 0;
    while (attempts < 200) {
      attempts++;
      const x = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      if (!occupiedByEnemy(x, y) && x + y > 3) {
        return { x, y };
      }
    }
    return { x: 3, y: 3 };
  };

  // Special Boss Floors!
  if (floor === 5) {
    // Boss Floor: Necromancer
    const bossTile = getEnemyTile();
    enemies.push(createEnemy('necromancer', bossTile.x, bossTile.y, floor));
    // Plus 2 skeleton minions
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
    exit: { x: GRID_SIZE - 2, y: GRID_SIZE - 2 }
  };
}
