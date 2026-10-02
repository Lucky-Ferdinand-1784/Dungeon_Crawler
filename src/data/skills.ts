import type { Skill } from '../types/game';

export const PLAYER_SKILLS: Skill[] = [
  {
    id: 'cleave',
    name: 'Tebasan Badai',
    description: 'Menebas semua musuh di sekeliling pahlawan (Area 360°) dengan 1.8x kekuatan fisik!',
    mpCost: 3,
    icon: 'cleave',
    type: 'cleave',
    shortcut: '1'
  },
  {
    id: 'fireball',
    name: 'Bola Api Pijar',
    description: 'Menembakkan bola api sihir ke musuh terdekat dalam jangkauan 4 petak dengan 2.5x kekuatan!',
    mpCost: 4,
    icon: 'fireball',
    type: 'fireball',
    range: 4,
    shortcut: '2'
  },
  {
    id: 'heal',
    name: 'Cahaya Penyembuh',
    description: 'Merapalkan mantra suci untuk memulihkan 12 HP secara instan tanpa item.',
    mpCost: 4,
    icon: 'holy_heal',
    type: 'heal',
    shortcut: '3'
  },
  {
    id: 'thunder',
    name: 'Petir Halilintar',
    description: 'Menghempaskan sambaran petir massal ke seluruh musuh di dungeon dengan 2.0x kekuatan!',
    mpCost: 6,
    icon: 'thunder',
    type: 'thunder',
    shortcut: '4'
  }
];
