import { useState } from 'react';
import type { Item, PlayerEquipment } from '../types/game';
import { ItemIcon } from './PixelSprites';
import { X, Shield, Sword, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  inventory: Item[];
  equipment: PlayerEquipment;
  onClose: () => void;
  onEquip: (item: Item) => void;
  onUnequip: (slot: 'weapon' | 'armor' | 'accessory') => void;
  onUseItem: (item: Item) => void;
  onDropItem: (item: Item) => void;
}

export const InventoryModal: React.FC<Props> = ({
  isOpen,
  inventory,
  equipment,
  onClose,
  onEquip,
  onUnequip,
  onUseItem,
  onDropItem
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<'weapon' | 'armor' | 'accessory' | null>(null);

  if (!isOpen) return null;

  const handleSelectEquipped = (slot: 'weapon' | 'armor' | 'accessory') => {
    const item = equipment[slot];
    if (item) {
      setSelectedItem(item);
      setSelectedSlot(slot);
    }
  };

  const handleSelectInventory = (item: Item) => {
    setSelectedItem(item);
    setSelectedSlot(null);
  };

  const isEquippedSelected = selectedSlot !== null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div 
        className="pixel-box rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col p-4 gap-3 border-2 border-indigo-500/60 shadow-2xl"
        style={{ maxWidth: '440px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="pixel-font text-xs text-amber-300">INVENTORI & PERLENGKAPAN</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 border border-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Equipment Slots Section */}
        <div>
          <span className="text-[10px] text-slate-400 pixel-font mb-1.5 block">
            PERLENGKAPAN AKTIF
          </span>
          <div className="grid grid-cols-3 gap-2">
            {/* Weapon */}
            <div 
              onClick={() => handleSelectEquipped('weapon')}
              className={`p-2 rounded border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedSlot === 'weapon'
                  ? 'border-amber-400 bg-amber-950/30'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              }`}
            >
              <span className="text-[9px] text-slate-400 flex items-center gap-1 mb-1">
                <Sword className="w-3 h-3 text-red-400" /> Senjata
              </span>
              {equipment.weapon ? (
                <div className="flex flex-col items-center">
                  <ItemIcon icon={equipment.weapon.icon} className="w-7 h-7" />
                  <span className="text-[9px] text-center font-bold truncate max-w-full text-slate-200 mt-1">
                    {equipment.weapon.name}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono italic my-2">Kosong</span>
              )}
            </div>

            {/* Armor */}
            <div 
              onClick={() => handleSelectEquipped('armor')}
              className={`p-2 rounded border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedSlot === 'armor'
                  ? 'border-cyan-400 bg-cyan-950/30'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              }`}
            >
              <span className="text-[9px] text-slate-400 flex items-center gap-1 mb-1">
                <Shield className="w-3 h-3 text-blue-400" /> Zirah
              </span>
              {equipment.armor ? (
                <div className="flex flex-col items-center">
                  <ItemIcon icon={equipment.armor.icon} className="w-7 h-7" />
                  <span className="text-[9px] text-center font-bold truncate max-w-full text-slate-200 mt-1">
                    {equipment.armor.name}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono italic my-2">Kosong</span>
              )}
            </div>

            {/* Accessory */}
            <div 
              onClick={() => handleSelectEquipped('accessory')}
              className={`p-2 rounded border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedSlot === 'accessory'
                  ? 'border-purple-400 bg-purple-950/30'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              }`}
            >
              <span className="text-[9px] text-slate-400 flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Aksesoris
              </span>
              {equipment.accessory ? (
                <div className="flex flex-col items-center">
                  <ItemIcon icon={equipment.accessory.icon} className="w-7 h-7" />
                  <span className="text-[9px] text-center font-bold truncate max-w-full text-slate-200 mt-1">
                    {equipment.accessory.name}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono italic my-2">Kosong</span>
              )}
            </div>
          </div>
        </div>

        {/* Backpack Inventory Slots (12 slots) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-slate-400 pixel-font">
              ISI TAS ({inventory.length}/12)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Klik item untuk info / aksi
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            {Array.from({ length: 12 }).map((_, idx) => {
              const item = inventory[idx];
              const isSelected = selectedItem?.id === item?.id && !isEquippedSelected;

              return (
                <div
                  key={idx}
                  onClick={() => item && handleSelectInventory(item)}
                  className={`aspect-square rounded border-2 flex items-center justify-center relative cursor-pointer transition-all ${
                    item
                      ? isSelected
                        ? 'border-amber-400 bg-slate-800 scale-105 shadow-md'
                        : 'border-slate-700 bg-slate-900/90 hover:border-slate-500 hover:bg-slate-800'
                      : 'border-slate-800/80 bg-slate-950/50 cursor-default'
                  }`}
                >
                  {item ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <ItemIcon icon={item.icon} className="w-6 h-6" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-800 font-mono">{idx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Item Details & Actions Section */}
        {selectedItem ? (
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <ItemIcon icon={selectedItem.icon} className="w-8 h-8" />
                <div>
                  <h4 className={`text-xs font-bold ${
                    selectedItem.rarity === 'legendary' ? 'text-amber-400 font-extrabold' :
                    selectedItem.rarity === 'epic' ? 'text-purple-400' :
                    selectedItem.rarity === 'rare' ? 'text-cyan-400' :
                    selectedItem.rarity === 'uncommon' ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {selectedItem.name}
                  </h4>
                  <span className="text-[9px] text-slate-400 uppercase pixel-font">
                    {selectedItem.rarity} • {
                      selectedItem.type === 'weapon' ? 'Senjata' :
                      selectedItem.type === 'armor' ? 'Zirah' :
                      selectedItem.type === 'accessory' ? 'Aksesoris' :
                      selectedItem.type === 'scroll' ? 'Gulungan' : 'Ramuan'
                    }
                  </span>
                </div>
              </div>
              <span className="text-xs text-amber-400 mono-font font-bold">
                {selectedItem.value} 🪙
              </span>
            </div>

            <p className="text-[11px] text-slate-300 italic border-l-2 border-slate-600 pl-2">
              "{selectedItem.description}"
            </p>

            {/* Stat Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono">
              {selectedItem.atk && (
                <span className="bg-red-950/80 border border-red-700/60 text-red-300 px-2 py-0.5 rounded">
                  +{selectedItem.atk} ATK
                </span>
              )}
              {selectedItem.def && (
                <span className="bg-blue-950/80 border border-blue-700/60 text-blue-300 px-2 py-0.5 rounded">
                  +{selectedItem.def} DEF
                </span>
              )}
              {selectedItem.hpBonus && (
                <span className="bg-rose-950/80 border border-rose-700/60 text-rose-300 px-2 py-0.5 rounded">
                  +{selectedItem.hpBonus} Max HP
                </span>
              )}
              {selectedItem.critBonus && (
                <span className="bg-amber-950/80 border border-amber-700/60 text-amber-300 px-2 py-0.5 rounded">
                  +{Math.round(selectedItem.critBonus * 100)}% Crit
                </span>
              )}
              {selectedItem.dodgeBonus && (
                <span className="bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 px-2 py-0.5 rounded">
                  +{Math.round(selectedItem.dodgeBonus * 100)}% Dodge
                </span>
              )}
              {selectedItem.healAmount && (
                <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded">
                  +{selectedItem.healAmount} Pemulihan HP
                </span>
              )}
              {selectedItem.manaAmount && (
                <span className="bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 px-2 py-0.5 rounded">
                  +{selectedItem.manaAmount} Pemulihan MP
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              {isEquippedSelected ? (
                <button
                  onClick={() => {
                    if (selectedSlot) {
                      onUnequip(selectedSlot);
                      setSelectedItem(null);
                      setSelectedSlot(null);
                    }
                  }}
                  className="pixel-btn text-[9px] flex-1 py-1.5 bg-slate-700 hover:bg-slate-600"
                >
                  LEPAS PERLENGKAPAN
                </button>
              ) : (
                <>
                  {['weapon', 'armor', 'accessory'].includes(selectedItem.type) ? (
                    <button
                      onClick={() => {
                        onEquip(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="pixel-btn pixel-btn-primary text-[9px] flex-1 py-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> PAKAI PERLENGKAPAN
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onUseItem(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="pixel-btn pixel-btn-gold text-[9px] flex-1 py-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> GUNAKAN SEKARANG
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onDropItem(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="p-1.5 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 rounded cursor-pointer"
                    title="Buang Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 p-3 rounded-lg border border-dashed border-slate-800 text-center text-xs text-slate-500 italic">
            Pilih item dari slot perlengkapan atau tas di atas untuk melihat detail dan opsi aksi.
          </div>
        )}
      </div>
    </div>
  );
};
