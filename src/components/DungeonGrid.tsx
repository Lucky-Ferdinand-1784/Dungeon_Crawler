import type React from 'react';
import type { LevelData, Player, FloatingText } from '../types/game';
import { 
  PixelHero, 
  PixelEnemy, 
  PixelWall, 
  PixelStairs, 
  PixelChest, 
  PixelShrine 
} from './PixelSprites';
import { FloatingTextViewer } from './FloatingText';
import { GRID_SIZE } from '../utils/dungeonGenerator';

interface Props {
  levelData: LevelData;
  player: Player;
  floatingTexts: FloatingText[];
  isShaking: boolean;
  isHit: boolean;
  onTileClick?: (x: number, y: number) => void;
}

export const DungeonGrid: React.FC<Props> = ({
  levelData,
  player,
  floatingTexts,
  isShaking,
  isHit,
  onTileClick
}) => {
  return (
    <div className="relative flex items-center justify-center p-1 select-none">
      <div
        className={`relative grid grid-cols-9 gap-0.5 bg-slate-950 p-1.5 rounded-xl border-4 transition-colors duration-150 ${
          isShaking 
            ? 'border-red-600 bg-red-950/30 animate-shake' 
            : 'border-slate-800 shadow-2xl'
        }`}
        style={{
          width: 'min(92vw, 400px)',
          height: 'min(92vw, 400px)'
        }}
      >
        {/* Floating Combat Text Layer */}
        <FloatingTextViewer floatingTexts={floatingTexts} />

        {/* Tiles Rendering */}
        {Array.from({ length: GRID_SIZE }).map((_, y) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => {
            const isWall = levelData.walls.some(w => w.x === x && w.y === y);
            const isExit = levelData.exit.x === x && levelData.exit.y === y;
            const isHero = player.x === x && player.y === y;
            const enemy = levelData.enemies.find(e => e.x === x && e.y === y);
            const chest = levelData.chests.find(c => c.x === x && c.y === y);
            const shrine = levelData.shrines.find(s => s.x === x && s.y === y);

            // Distance from player (fog/lighting effect)
            const dist = Math.hypot(player.x - x, player.y - y);
            const isTorchLight = dist <= 3.8;

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => onTileClick && onTileClick(x, y)}
                className={`relative flex items-center justify-center rounded-sm overflow-hidden aspect-square transition-all ${
                  isWall
                    ? 'bg-slate-900'
                    : isTorchLight
                    ? 'bg-slate-900/90 hover:bg-slate-800'
                    : 'bg-slate-950 opacity-60'
                }`}
              >
                {/* Tile texture dots */}
                {!isWall && (
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:6px_6px]" />
                )}

                {/* Torch Glow Effect around player */}
                {isHero && (
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xs pointer-events-none" />
                )}

                {/* Wall entity */}
                {isWall && <PixelWall />}

                {/* Exit Stairs */}
                {isExit && !isHero && <PixelStairs />}

                {/* Chest */}
                {chest && !isHero && (
                  <PixelChest isOpened={chest.isOpened} />
                )}

                {/* Shrine */}
                {shrine && !isHero && (
                  <PixelShrine used={shrine.used} type={shrine.type} />
                )}

                {/* Enemy with Mini HP Bar */}
                {enemy && !isHero && (
                  <div className="w-full h-full relative flex flex-col items-center justify-center">
                    {/* Enemy HP Bar */}
                    <div className="absolute top-0.5 left-1 right-1 h-1 bg-red-950 border border-red-900 rounded overflow-hidden z-10">
                      <div
                        className={`h-full ${enemy.isBoss ? 'bg-purple-500' : 'bg-red-500'}`}
                        style={{
                          width: `${Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100))}%`
                        }}
                      />
                    </div>
                    {/* Enemy Sprite */}
                    <div className="w-4/5 h-4/5 mt-1">
                      <PixelEnemy type={enemy.type} />
                    </div>
                  </div>
                )}

                {/* Hero */}
                {isHero && (
                  <div className="w-full h-full p-0.5">
                    <PixelHero isHit={isHit} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
