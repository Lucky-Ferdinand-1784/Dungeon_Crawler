import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import type {
  Player,
  LevelData,
  FloatingText,
  CombatLog,
  Item,
  TileCoordinate,
  Enemy
} from './types/game';
import { generateLevel, GRID_SIZE } from './utils/dungeonGenerator';
import { createItem } from './data/items';
import { sfx } from './utils/audio';

import { HUD } from './components/HUD';
import { DungeonGrid } from './components/DungeonGrid';
import { Controls } from './components/Controls';
import { CombatLogBox } from './components/CombatLogBox';
import { InventoryModal } from './components/InventoryModal';
import { CharacterModal } from './components/CharacterModal';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';

const INITIAL_PLAYER: Player = {
  x: 1,
  y: 1,
  hp: 20,
  maxHp: 20,
  mp: 10,
  maxMp: 10,
  level: 1,
  xp: 0,
  xpToNextLevel: 20,
  statPoints: 0,
  gold: 15,
  stats: {
    str: 1,
    def: 0,
    agi: 1,
    bonusHp: 0
  },
  equipment: {
    weapon: createItem('rusty_dagger'),
    armor: createItem('leather_armor'),
    accessory: null
  },
  inventory: [
    createItem('health_potion_minor'),
    createItem('mana_potion')
  ]
};

export default function App() {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);
  const [floor, setFloor] = useState<number>(1);
  const [highFloor, setHighFloor] = useState<number>(1);
  const [levelData, setLevelData] = useState<LevelData>(() => generateLevel(1));
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [combatLogs, setCombatLogs] = useState<CombatLog[]>([]);
  
  // UI & States
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isCharacterOpen, setIsCharacterOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmOn, setIsBgmOn] = useState<boolean>(false);
  const [isCrtOn, setIsCrtOn] = useState<boolean>(true);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isHit, setIsHit] = useState<boolean>(false);

  const floatingIdRef = useRef<number>(0);
  const logIdRef = useRef<number>(0);

  // Helper to add combat log
  const addLog = useCallback((text: string, type: CombatLog['type'] = 'system') => {
    logIdRef.current++;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setCombatLogs(prev => [...prev.slice(-15), {
      id: `log-${logIdRef.current}`,
      text,
      type,
      time: timeStr
    }]);
  }, []);

  // Helper to add floating text
  const addFloatingText = useCallback((x: number, y: number, text: string, type: FloatingText['type']) => {
    floatingIdRef.current++;
    const id = `ft-${floatingIdRef.current}`;
    setFloatingTexts(prev => [...prev, { id, x, y, text, type }]);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(item => item.id !== id));
    }, 1100);
  }, []);

  // Audio toggles
  const handleToggleMute = () => {
    sfx.init();
    const nextVal = !isMuted;
    sfx.setMuted(nextVal);
    setIsMuted(nextVal);
  };

  const handleToggleBgm = () => {
    sfx.init();
    const state = sfx.toggleBGM();
    setIsBgmOn(state);
  };

  const handleToggleCrt = () => {
    setIsCrtOn(prev => !prev);
  };

  // Stat Calculations
  const getPlayerCombatStats = useCallback((p: Player) => {
    const weaponAtk = p.equipment.weapon?.atk || 0;
    const accessoryAtk = p.equipment.accessory?.atk || 0;
    const totalAtk = 2 + (p.stats.str * 2) + weaponAtk + accessoryAtk;

    const armorDef = p.equipment.armor?.def || 0;
    const accessoryDef = p.equipment.accessory?.def || 0;
    const weaponDef = p.equipment.weapon?.def || 0;
    const totalDef = p.stats.def + armorDef + accessoryDef + weaponDef;

    const weaponCrit = p.equipment.weapon?.critBonus || 0;
    const accessoryCrit = p.equipment.accessory?.critBonus || 0;
    const critChance = Math.min(0.75, 0.05 + (p.stats.agi * 0.03) + weaponCrit + accessoryCrit);

    const armorDodge = p.equipment.armor?.dodgeBonus || 0;
    const accessoryDodge = p.equipment.accessory?.dodgeBonus || 0;
    const dodgeChance = Math.min(0.50, (p.stats.agi * 0.02) + armorDodge + accessoryDodge);

    return { totalAtk, totalDef, critChance, dodgeChance };
  }, []);

  // Check and apply Level Up
  const checkLevelUp = useCallback((currentXp: number, currentLevel: number, currentXpReq: number, currentStatPoints: number) => {
    let newXp = currentXp;
    let newLevel = currentLevel;
    let newXpReq = currentXpReq;
    let newStatPoints = currentStatPoints;
    let leveledUp = false;

    while (newXp >= newXpReq) {
      newXp -= newXpReq;
      newLevel += 1;
      newXpReq = Math.round(newXpReq * 1.55);
      newStatPoints += 2;
      leveledUp = true;
    }

    if (leveledUp) {
      sfx.playLevelUp();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // safe
      }
      addLog(`🌟 NAIK LEVEL! Sekarang Level ${newLevel}! Dapatkan +2 Poin Stat!`, 'levelup');
    }

    return { newXp, newLevel, newXpReq, newStatPoints, leveledUp };
  }, [addLog]);

  // Restart Game
  const handleRestart = () => {
    sfx.init();
    setFloor(1);
    setPlayer(INITIAL_PLAYER);
    setLevelData(generateLevel(1));
    setIsGameOver(false);
    setIsVictoryModalOpen(false);
    setFloatingTexts([]);
    setCombatLogs([]);
    addLog('Dungeon baru dimulai! Taklukkan kedalaman lantai!', 'system');
  };

  // Turn-based Enemy movement
  const executeEnemyTurn = useCallback((
    currentEnemies: Enemy[], 
    playerPos: TileCoordinate, 
    walls: TileCoordinate[], 
    exitPos: TileCoordinate,
    playerState: Player
  ): { nextEnemies: Enemy[]; resultingHp: number; playerDefeated: boolean } => {
    let currentHp = playerState.hp;
    let isDead = false;
    const { totalDef, dodgeChance } = getPlayerCombatStats(playerState);

    const enemyPositions: { id: string; x: number; y: number }[] = currentEnemies.map(e => ({
      id: e.id,
      x: e.x,
      y: e.y
    }));

    const movedEnemies = currentEnemies.map(enemy => {
      if (isDead) return enemy;

      const diffX = playerPos.x - enemy.x;
      const diffY = playerPos.y - enemy.y;
      const isAdjacent = Math.abs(diffX) + Math.abs(diffY) === 1;

      // Enemy Attack Player if adjacent
      if (isAdjacent) {
        // Player Dodge Check
        if (Math.random() < dodgeChance) {
          sfx.playStep();
          addFloatingText(playerPos.x, playerPos.y, 'DODGE!', 'dodge');
          addLog(`💨 Gerakan lincah! Kamu menghindar dari serangan ${enemy.name}!`, 'attack');
          return enemy;
        }

        // Enemy hits player
        const damage = Math.max(1, enemy.atk - totalDef);
        currentHp = Math.max(0, currentHp - damage);

        sfx.playHit();
        setIsShaking(true);
        setIsHit(true);
        setTimeout(() => setIsShaking(false), 220);
        setTimeout(() => setIsHit(false), 250);

        addFloatingText(playerPos.x, playerPos.y, `-${damage}`, 'damage');
        addLog(`💥 ${enemy.name} menyerangmu dengan ${damage} damage!`, 'damage');

        if (currentHp <= 0) {
          isDead = true;
        }

        return enemy;
      }

      // Enemy AI: Pathfind step closer to player
      let stepX = 0;
      let stepY = 0;

      if (Math.abs(diffX) >= Math.abs(diffY)) {
        stepX = diffX > 0 ? 1 : -1;
      } else {
        stepY = diffY > 0 ? 1 : -1;
      }

      const targetX = enemy.x + stepX;
      const targetY = enemy.y + stepY;

      // Collision checks with walls, exit, or other enemies
      const blockedByWall = walls.some(w => w.x === targetX && w.y === targetY);
      const isExit = targetX === exitPos.x && targetY === exitPos.y;
      const blockedByEnemy = enemyPositions.some(
        ep => ep.id !== enemy.id && ep.x === targetX && ep.y === targetY
      );
      const isPlayerTile = targetX === playerPos.x && targetY === playerPos.y;

      if (!blockedByWall && !isExit && !blockedByEnemy && !isPlayerTile) {
        const posEntry = enemyPositions.find(ep => ep.id === enemy.id);
        if (posEntry) {
          posEntry.x = targetX;
          posEntry.y = targetY;
        }
        return { ...enemy, x: targetX, y: targetY };
      }

      return enemy;
    });

    return { nextEnemies: movedEnemies, resultingHp: currentHp, playerDefeated: isDead };
  }, [getPlayerCombatStats, addFloatingText, addLog]);

  // Player Movement & Combat Handler
  const movePlayer = useCallback((dx: number, dy: number) => {
    if (isGameOver || isVictoryModalOpen || isInventoryOpen || isCharacterOpen) return;
    sfx.init();

    const newX = player.x + dx;
    const newY = player.y + dy;

    // Boundary & Wall Collision
    if (levelData.walls.some(w => w.x === newX && w.y === newY)) {
      return;
    }

    let updatedPlayer = { ...player };
    let currentEnemies = [...levelData.enemies];
    let currentChests = [...levelData.chests];
    let currentShrines = [...levelData.shrines];

    // --- 1. ENEMY ENCOUNTER ---
    const enemyIdx = currentEnemies.findIndex(e => e.x === newX && e.y === newY);
    if (enemyIdx !== -1) {
      const enemy = currentEnemies[enemyIdx];
      const { totalAtk, critChance } = getPlayerCombatStats(player);

      // Roll Crit
      const isCrit = Math.random() < critChance;
      const damage = isCrit ? Math.round(totalAtk * 1.8) : Math.max(1, totalAtk - enemy.def);

      const remainingHp = enemy.hp - damage;

      if (isCrit) {
        sfx.playCrit();
        addFloatingText(newX, newY, `${damage}`, 'crit');
        addLog(`⚡ SERANGAN KRITIKAL! Menebas ${enemy.name} dengan ${damage} damage!`, 'attack');
      } else {
        sfx.playHit();
        addFloatingText(newX, newY, `-${damage}`, 'damage');
        addLog(`⚔️ Menyerang ${enemy.name} dengan ${damage} damage.`, 'attack');
      }

      if (remainingHp <= 0) {
        // Enemy Defeated
        currentEnemies.splice(enemyIdx, 1);
        const earnedGold = enemy.goldReward;
        const earnedXp = enemy.xpReward;

        updatedPlayer.gold += earnedGold;
        updatedPlayer.xp += earnedXp;

        addFloatingText(newX, newY, `${earnedGold}G`, 'gold');
        addFloatingText(player.x, player.y, `${earnedXp}XP`, 'xp');
        addLog(`💀 ${enemy.name} musnah! (+${earnedGold} Emas, +${earnedXp} XP)`, 'system');

        // Level Up check
        const lvlRes = checkLevelUp(
          updatedPlayer.xp, 
          updatedPlayer.level, 
          updatedPlayer.xpToNextLevel, 
          updatedPlayer.statPoints
        );
        updatedPlayer.xp = lvlRes.newXp;
        updatedPlayer.level = lvlRes.newLevel;
        updatedPlayer.xpToNextLevel = lvlRes.newXpReq;
        updatedPlayer.statPoints = lvlRes.newStatPoints;
        if (lvlRes.leveledUp) {
          updatedPlayer.hp = updatedPlayer.maxHp;
          updatedPlayer.mp = updatedPlayer.maxMp;
        }

        // Boss defeat victory check
        if (enemy.isBoss && floor === 10) {
          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch {
            // safe
          }
          addLog('👑 NAGA PURBA BERHASIL DITAKLUKKAN! ANDA MEMENANGKAN GAME!', 'system');
        }
      } else {
        // Enemy Damaged but Alive
        currentEnemies[enemyIdx] = { ...enemy, hp: remainingHp };
      }

      // Execute enemy turn counter-attacks
      const enemyTurnResult = executeEnemyTurn(
        currentEnemies, 
        { x: player.x, y: player.y }, 
        levelData.walls, 
        levelData.exit, 
        updatedPlayer
      );

      updatedPlayer.hp = enemyTurnResult.resultingHp;

      if (enemyTurnResult.playerDefeated) {
        sfx.playGameOver();
        setIsGameOver(true);
        addLog('💀 Nyawa ksatria telah habis! Anda gugur di dalam dungeon!', 'damage');
      }

      setPlayer(updatedPlayer);
      setLevelData(prev => ({ ...prev, enemies: enemyTurnResult.nextEnemies }));
      return;
    }

    // --- 2. CHEST INTERACTION ---
    const chestIdx = currentChests.findIndex(c => c.x === newX && c.y === newY);
    if (chestIdx !== -1 && !currentChests[chestIdx].isOpened) {
      const chest = currentChests[chestIdx];
      currentChests[chestIdx] = { ...chest, isOpened: true };
      sfx.playChest();

      if (chest.gold) {
        updatedPlayer.gold += chest.gold;
        addFloatingText(newX, newY, `+${chest.gold}G`, 'gold');
        addLog(`📦 Membuka peti harta karun! Menemukan ${chest.gold} koin emas!`, 'item');
      }

      if (chest.item) {
        if (updatedPlayer.inventory.length < 12) {
          updatedPlayer.inventory = [...updatedPlayer.inventory, chest.item];
          addLog(`✨ Memperoleh barang: [${chest.item.name}]!`, 'item');
        } else {
          addLog(`⚠️ Tas sudah penuh! [${chest.item.name}] tertinggal di peti.`, 'system');
        }
      }

      setLevelData(prev => ({ ...prev, chests: currentChests }));
    }

    // --- 3. SHRINE INTERACTION ---
    const shrineIdx = currentShrines.findIndex(s => s.x === newX && s.y === newY);
    if (shrineIdx !== -1 && !currentShrines[shrineIdx].used) {
      const shrine = currentShrines[shrineIdx];
      currentShrines[shrineIdx] = { ...shrine, used: true };

      if (shrine.type === 'health') {
        sfx.playHeal();
        updatedPlayer.hp = updatedPlayer.maxHp;
        addFloatingText(newX, newY, 'FULL HP', 'heal');
        addLog(`🕊️ ${shrine.name} menyembuhkan seluruh lukamu hingga penuh!`, 'heal');
      } else if (shrine.type === 'strength') {
        sfx.playLevelUp();
        updatedPlayer.stats.str += 1;
        addFloatingText(newX, newY, '+1 STR', 'info');
        addLog(`💪 ${shrine.name} memberkati ototmu dengan kekuatan permanen (+1 STR)!`, 'system');
      } else {
        sfx.playCoin();
        updatedPlayer.gold += 40;
        addFloatingText(newX, newY, '+40G', 'gold');
        addLog(`🪙 ${shrine.name} melimpahkan berkah rezeki (+40 Koin Emas)!`, 'system');
      }

      setLevelData(prev => ({ ...prev, shrines: currentShrines }));
    }

    // --- 4. EXIT / NEXT FLOOR ---
    if (newX === levelData.exit.x && newY === levelData.exit.y) {
      sfx.playStairs();
      const bonusGold = 20 + floor * 10;
      updatedPlayer.gold += bonusGold;
      const nextFloor = floor + 1;
      setFloor(nextFloor);
      if (nextFloor > highFloor) setHighFloor(nextFloor);

      updatedPlayer.x = 1;
      updatedPlayer.y = 1;

      // Slight HP & MP rest recovery on descending
      updatedPlayer.hp = Math.min(updatedPlayer.maxHp, updatedPlayer.hp + 3);
      updatedPlayer.mp = Math.min(updatedPlayer.maxMp, updatedPlayer.mp + 2);

      setPlayer(updatedPlayer);
      setLevelData(generateLevel(nextFloor));
      setIsVictoryModalOpen(true);
      addLog(`🚪 Menuruni tangga menuju Lantai ${nextFloor}! Bonus +${bonusGold} Emas!`, 'system');
      return;
    }

    // --- 5. NORMAL MOVE ---
    sfx.playStep();
    updatedPlayer.x = newX;
    updatedPlayer.y = newY;

    // Enemies move toward player
    const enemyTurnResult = executeEnemyTurn(
      currentEnemies, 
      { x: newX, y: newY }, 
      levelData.walls, 
      levelData.exit, 
      updatedPlayer
    );

    updatedPlayer.hp = enemyTurnResult.resultingHp;

    if (enemyTurnResult.playerDefeated) {
      sfx.playGameOver();
      setIsGameOver(true);
      addLog('💀 Nyawa ksatria telah habis! Anda gugur di dalam dungeon!', 'damage');
    }

    setPlayer(updatedPlayer);
    setLevelData(prev => ({ ...prev, enemies: enemyTurnResult.nextEnemies }));
  }, [
    player, 
    levelData, 
    floor, 
    highFloor, 
    isGameOver, 
    isVictoryModalOpen, 
    isInventoryOpen, 
    isCharacterOpen,
    getPlayerCombatStats, 
    checkLevelUp, 
    executeEnemyTurn, 
    addFloatingText, 
    addLog
  ]);

  // Item Usage Handler
  const handleUseItem = useCallback((item: Item) => {
    sfx.init();
    let updatedPlayer = { ...player };
    const itemIndex = updatedPlayer.inventory.findIndex(i => i.id === item.id);
    if (itemIndex === -1) return;

    if (item.effect === 'heal') {
      const heal = item.healAmount || 5;
      updatedPlayer.hp = Math.min(updatedPlayer.maxHp, updatedPlayer.hp + heal);
      sfx.playHeal();
      addFloatingText(player.x, player.y, `+${heal} HP`, 'heal');
      addLog(`🧪 Meminum [${item.name}]! Memulihkan ${heal} HP.`, 'heal');
    } else if (item.effect === 'full_heal') {
      updatedPlayer.hp = updatedPlayer.maxHp;
      updatedPlayer.mp = updatedPlayer.maxMp;
      sfx.playHeal();
      addFloatingText(player.x, player.y, 'FULL HEAL', 'heal');
      addLog(`🧪 Meminum [${item.name}]! Seluruh HP dan MP pulih maksimal!`, 'heal');
    } else if (item.effect === 'bomb') {
      sfx.playBomb();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      // Deal 16 damage to all nearby enemies (distance <= 2)
      let slainCount = 0;
      const bombDmg = 16;

      const remainingEnemies: Enemy[] = [];
      levelData.enemies.forEach(enemy => {
        const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (dist <= 2.2) {
          const remHp = enemy.hp - bombDmg;
          addFloatingText(enemy.x, enemy.y, `-${bombDmg}`, 'damage');
          if (remHp <= 0) {
            slainCount++;
            updatedPlayer.gold += enemy.goldReward;
            updatedPlayer.xp += enemy.xpReward;
          } else {
            remainingEnemies.push({ ...enemy, hp: remHp });
          }
        } else {
          remainingEnemies.push(enemy);
        }
      });

      setLevelData(prev => ({ ...prev, enemies: remainingEnemies }));
      addLog(`💥 MELEDAK! Bom Goblin menghanguskan musuh di sekitar! (${slainCount} musuh musnah)`, 'attack');

      // Check level up from bomb XP
      const lvlRes = checkLevelUp(
        updatedPlayer.xp, 
        updatedPlayer.level, 
        updatedPlayer.xpToNextLevel, 
        updatedPlayer.statPoints
      );
      updatedPlayer.xp = lvlRes.newXp;
      updatedPlayer.level = lvlRes.newLevel;
      updatedPlayer.xpToNextLevel = lvlRes.newXpReq;
      updatedPlayer.statPoints = lvlRes.newStatPoints;
    } else if (item.effect === 'teleport') {
      sfx.playStairs();
      // Find empty tile
      let tries = 0;
      let targetX = 2;
      let targetY = 2;
      while (tries < 100) {
        tries++;
        const rx = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
        const ry = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
        const wall = levelData.walls.some(w => w.x === rx && w.y === ry);
        const enemy = levelData.enemies.some(e => e.x === rx && e.y === ry);
        if (!wall && !enemy) {
          targetX = rx;
          targetY = ry;
          break;
        }
      }
      updatedPlayer.x = targetX;
      updatedPlayer.y = targetY;
      addFloatingText(targetX, targetY, 'BLINK!', 'dodge');
      addLog(`✨ Berteleportasi secara ajaib melintasi dimensi ke petak (${targetX}, ${targetY})!`, 'system');
    } else if (item.effect === 'str_boost') {
      sfx.playLevelUp();
      updatedPlayer.stats = { ...updatedPlayer.stats, str: updatedPlayer.stats.str + 1 };
      addFloatingText(player.x, player.y, '+1 STR', 'info');
      addLog(`💪 Meneguk [${item.name}]! Kekuatan permanen bertambah +1 STR!`, 'system');
    } else if (item.effect === 'agi_boost') {
      sfx.playLevelUp();
      updatedPlayer.stats = { ...updatedPlayer.stats, agi: updatedPlayer.stats.agi + 1 };
      addFloatingText(player.x, player.y, '+1 AGI', 'info');
      addLog(`⚡ Meneguk [${item.name}]! Kelincahan permanen bertambah +1 AGI!`, 'system');
    }

    // Remove consumed item immutably
    updatedPlayer.inventory = updatedPlayer.inventory.filter((_, idx) => idx !== itemIndex);
    setPlayer(updatedPlayer);
  }, [player, levelData, checkLevelUp, addFloatingText, addLog]);

  // Quick Heal shortcut ('H')
  const handleQuickHeal = useCallback(() => {
    const potionIdx = player.inventory.findIndex(item => item.effect === 'heal' || item.effect === 'full_heal');
    if (potionIdx === -1) {
      addLog('⚠️ Tidak ada ramuan penyembuh di dalam tas!', 'system');
      return;
    }
    const potion = player.inventory[potionIdx];
    handleUseItem(potion);
  }, [player.inventory, addLog, handleUseItem]);

  // Wait / Rest Turn action (Spacebar)
  const handleWaitTurn = useCallback(() => {
    if (isGameOver || isVictoryModalOpen || isInventoryOpen || isCharacterOpen) return;
    sfx.playStep();

    let updatedPlayer = { ...player };
    // Regenerate 1 MP on wait
    if (updatedPlayer.mp < updatedPlayer.maxMp) {
      updatedPlayer.mp = Math.min(updatedPlayer.maxMp, updatedPlayer.mp + 1);
    }

    const enemyTurnResult = executeEnemyTurn(
      levelData.enemies, 
      { x: player.x, y: player.y }, 
      levelData.walls, 
      levelData.exit, 
      updatedPlayer
    );

    updatedPlayer.hp = enemyTurnResult.resultingHp;

    if (enemyTurnResult.playerDefeated) {
      sfx.playGameOver();
      setIsGameOver(true);
      addLog('💀 Nyawa ksatria telah habis! Anda gugur di dalam dungeon!', 'damage');
    }

    setPlayer(updatedPlayer);
    setLevelData(prev => ({ ...prev, enemies: enemyTurnResult.nextEnemies }));
    addLog('⌛ Menunggu 1 giliran untuk memulihkan napas dan fokus...', 'system');
  }, [
    isGameOver, 
    isVictoryModalOpen, 
    isInventoryOpen, 
    isCharacterOpen, 
    player, 
    levelData, 
    executeEnemyTurn, 
    addLog
  ]);

  // Equip Item Handler
  const handleEquip = (item: Item) => {
    sfx.init();
    sfx.playEquip();

    let updatedEquipment = { ...player.equipment };
    let updatedInventory = player.inventory.filter(i => i.id !== item.id);

    if (item.type === 'weapon') {
      if (updatedEquipment.weapon) {
        updatedInventory.push(updatedEquipment.weapon);
      }
      updatedEquipment.weapon = item;
    } else if (item.type === 'armor') {
      if (updatedEquipment.armor) {
        updatedInventory.push(updatedEquipment.armor);
      }
      updatedEquipment.armor = item;
    } else if (item.type === 'accessory') {
      if (updatedEquipment.accessory) {
        updatedInventory.push(updatedEquipment.accessory);
      }
      updatedEquipment.accessory = item;
    }

    // Recalculate Max HP bonus from equipment, preserving allocated HP from level-ups
    const hpBonus = (updatedEquipment.armor?.hpBonus || 0) + (updatedEquipment.accessory?.hpBonus || 0);
    const baseHp = 20 + ((player.level - 1) * 2) + (player.stats.bonusHp || 0);
    const newMaxHp = baseHp + hpBonus;

    setPlayer(prev => ({
      ...prev,
      equipment: updatedEquipment,
      inventory: updatedInventory,
      maxHp: newMaxHp,
      hp: Math.min(newMaxHp, prev.hp)
    }));

    addLog(`🛡️ Memakai perlengkapan: [${item.name}]`, 'item');
  };

  // Unequip Item Handler
  const handleUnequip = (slot: 'weapon' | 'armor' | 'accessory') => {
    sfx.init();
    const item = player.equipment[slot];
    if (!item) return;

    if (player.inventory.length >= 12) {
      addLog('⚠️ Tas sudah penuh! Tidak dapat melepas perlengkapan.', 'system');
      return;
    }

    sfx.playEquip();
    let updatedEquipment = { ...player.equipment, [slot]: null };
    let updatedInventory = [...player.inventory, item];

    // Recalculate Max HP bonus from equipment, preserving allocated HP from level-ups
    const hpBonus = (updatedEquipment.armor?.hpBonus || 0) + (updatedEquipment.accessory?.hpBonus || 0);
    const baseHp = 20 + ((player.level - 1) * 2) + (player.stats.bonusHp || 0);
    const newMaxHp = baseHp + hpBonus;

    setPlayer(prev => ({
      ...prev,
      equipment: updatedEquipment,
      inventory: updatedInventory,
      maxHp: newMaxHp,
      hp: Math.min(newMaxHp, prev.hp)
    }));

    addLog(`Melepas [${item.name}] dan menyimpannya di dalam tas.`, 'item');
  };

  // Drop Item Handler
  const handleDropItem = (item: Item) => {
    setPlayer(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i.id !== item.id)
    }));
    addLog(`🗑️ Membuang [${item.name}] dari tas.`, 'system');
  };

  // Stat Allocation Handler (Level Up)
  const handleAllocateStat = (stat: 'str' | 'def' | 'agi' | 'hp') => {
    if (player.statPoints <= 0) return;
    sfx.playLevelUp();

    setPlayer(prev => {
      const newStats = { ...prev.stats };
      let newMaxHp = prev.maxHp;
      let newHp = prev.hp;

      if (stat === 'str') newStats.str += 1;
      if (stat === 'def') newStats.def += 1;
      if (stat === 'agi') newStats.agi += 1;
      if (stat === 'hp') {
        newStats.bonusHp = (newStats.bonusHp || 0) + 4;
        newMaxHp += 4;
        newHp += 4;
      }

      return {
        ...prev,
        stats: newStats,
        maxHp: newMaxHp,
        hp: newHp,
        statPoints: prev.statPoints - 1
      };
    });

    addLog(`✨ Berhasil mengalokasikan poin stat ke ${stat.toUpperCase()}!`, 'levelup');
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling on arrows/space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyI') {
        setIsInventoryOpen(prev => !prev);
        return;
      }

      if (e.code === 'KeyC') {
        setIsCharacterOpen(prev => !prev);
        return;
      }

      if (e.code === 'KeyH') {
        handleQuickHeal();
        return;
      }

      if (e.code === 'Space') {
        handleWaitTurn();
        return;
      }

      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        movePlayer(0, -1);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        movePlayer(0, 1);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        movePlayer(-1, 0);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        movePlayer(1, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, handleWaitTurn, handleQuickHeal]);

  const hasPotion = player.inventory.some(i => i.effect === 'heal' || i.effect === 'full_heal');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center py-2 px-1 relative select-none">
      {/* CRT Scanline Filter Overlay */}
      {isCrtOn && <div className="crt-overlay" />}

      {/* Top HUD */}
      <HUD
        player={player}
        floor={floor}
        isMuted={isMuted}
        isBgmOn={isBgmOn}
        isCrtOn={isCrtOn}
        onToggleMute={handleToggleMute}
        onToggleBgm={handleToggleBgm}
        onToggleCrt={handleToggleCrt}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenCharacter={() => setIsCharacterOpen(true)}
      />

      {/* Combat Event Log Box */}
      <CombatLogBox logs={combatLogs} />

      {/* Center Dungeon Grid */}
      <main className="my-auto py-1">
        <DungeonGrid
          levelData={levelData}
          player={player}
          floatingTexts={floatingTexts}
          isShaking={isShaking}
          isHit={isHit}
        />
      </main>

      {/* Bottom Controls & D-Pad */}
      <Controls
        disabled={isGameOver || isVictoryModalOpen}
        onMove={movePlayer}
        onWaitTurn={handleWaitTurn}
        onQuickHeal={handleQuickHeal}
        onOpenInventory={() => setIsInventoryOpen(true)}
        hasPotion={hasPotion}
      />

      {/* Modals */}
      <InventoryModal
        isOpen={isInventoryOpen}
        inventory={player.inventory}
        equipment={player.equipment}
        onClose={() => setIsInventoryOpen(false)}
        onEquip={handleEquip}
        onUnequip={handleUnequip}
        onUseItem={handleUseItem}
        onDropItem={handleDropItem}
      />

      <CharacterModal
        isOpen={isCharacterOpen}
        player={player}
        onClose={() => setIsCharacterOpen(false)}
        onAllocateStat={handleAllocateStat}
      />

      <GameOverModal
        isOpen={isGameOver}
        floor={floor}
        highFloor={highFloor}
        player={player}
        onRestart={handleRestart}
      />

      <VictoryModal
        isOpen={isVictoryModalOpen}
        floor={floor}
        bonusGold={20 + (floor - 1) * 10}
        onContinue={() => setIsVictoryModalOpen(false)}
      />
    </div>
  );
}
