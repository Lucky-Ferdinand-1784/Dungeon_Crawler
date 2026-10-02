import React, { useState } from 'react';
import type { Item, Merchant } from '../types/game';
import { ItemIcon, PixelMerchant } from './PixelSprites';
import { X, ShoppingBag, Coins, ArrowRightLeft, Sparkles, Check, AlertCircle } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  merchant: Merchant | null;
  playerGold: number;
  playerInventory: Item[];
  onClose: () => void;
  onBuyItem: (item: Item) => void;
  onSellItem: (item: Item) => void;
}

export const ShopModal: React.FC<Props> = ({
  isOpen,
  merchant,
  playerGold,
  playerInventory,
  onClose,
  onBuyItem,
  onSellItem
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [merchantMessage, setMerchantMessage] = useState<string>(
    merchant?.greeting || 'Selamat datang! Pilihlah bekal terbaik untuk penjelajahanmu!'
  );

  if (!isOpen || !merchant) return null;

  const handleBuy = (item: Item) => {
    if (playerGold < item.value) {
      sfx.playError();
      setMerchantMessage('Maaf kawan, koin emasmu belum mencukupi untuk barang ini!');
      return;
    }
    if (playerInventory.length >= 12) {
      sfx.playError();
      setMerchantMessage('Tasmu sudah penuh! Jual atau gunakan beberapa barang terlebih dahulu.');
      return;
    }

    sfx.playBuy();
    onBuyItem(item);
    setMerchantMessage(`Terima kasih! [${item.name}] sekarang menjadi milikmu. Semoga berguna!`);
    setSelectedItem(null);
  };

  const handleSell = (item: Item) => {
    const sellPrice = Math.max(1, Math.floor(item.value * 0.6));
    sfx.playSell();
    onSellItem(item);
    setMerchantMessage(`Barang bagus! Aku bayar ${sellPrice} koin emas untuk [${item.name}].`);
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div 
        className="pixel-box rounded-xl w-full max-w-md max-h-[92vh] overflow-y-auto flex flex-col p-4 gap-3 border-2 border-amber-500/70 shadow-2xl"
        style={{ maxWidth: '460px' }}
      >
        {/* Header with Merchant Avatar & Gold Counter */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-950 border border-emerald-600 rounded-md p-1 flex items-center justify-center">
              <PixelMerchant />
            </div>
            <div>
              <h3 className="pixel-font text-xs text-amber-300 flex items-center gap-1.5">
                <span>{merchant.name}</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-sans">
                  TOKO
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Pedagang Pengelana Dungeon</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Player Gold */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/50 px-2 py-1 rounded">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span className="mono-font text-sm text-yellow-300 font-bold">{playerGold} G</span>
            </div>

            <button 
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 border border-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Merchant Dialogue Bubble */}
        <div className="bg-slate-900/90 border border-emerald-900/80 rounded-lg p-2.5 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-emerald-200 italic leading-snug">
            "{merchantMessage}"
          </p>
        </div>

        {/* Tab Switcher: Beli vs Jual */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('buy');
              setSelectedItem(null);
            }}
            className={`py-1.5 px-3 rounded flex items-center justify-center gap-2 pixel-font text-[9px] transition-all cursor-pointer ${
              activeTab === 'buy'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BELI BARANG</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sell');
              setSelectedItem(null);
            }}
            className={`py-1.5 px-3 rounded flex items-center justify-center gap-2 pixel-font text-[9px] transition-all cursor-pointer ${
              activeTab === 'sell'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>JUAL BARANG ({playerInventory.length})</span>
          </button>
        </div>

        {/* Tab Content: BUY */}
        {activeTab === 'buy' && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="pixel-font text-[8px]">ETALASE TOKO ({merchant.stock.length} Barang)</span>
              <span className="mono-font text-slate-500">Kapasitas Tas: {playerInventory.length}/12</span>
            </div>

            {merchant.stock.length === 0 ? (
              <div className="p-6 bg-slate-900/60 rounded-lg text-center text-xs text-slate-500 border border-dashed border-slate-800">
                Semua barang dagangan telah habis diborong!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-1">
                {merchant.stock.map(item => {
                  const isSelected = selectedItem?.id === item.id;
                  const canAfford = playerGold >= item.value;
                  const isBagFull = playerInventory.length >= 12;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-2 rounded border-2 flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30'
                          : 'border-slate-800 bg-slate-900/90 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0">
                          <ItemIcon icon={item.icon} className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold leading-tight ${
                            item.rarity === 'legendary' ? 'text-amber-400' :
                            item.rarity === 'epic' ? 'text-purple-400' :
                            item.rarity === 'rare' ? 'text-cyan-400' :
                            item.rarity === 'uncommon' ? 'text-emerald-400' : 'text-slate-200'
                          }`}>
                            {item.name}
                          </h4>
                          <span className="text-[9px] text-slate-400 uppercase font-mono">
                            {item.rarity} • {
                              item.type === 'weapon' ? 'Senjata' :
                              item.type === 'armor' ? 'Zirah' :
                              item.type === 'accessory' ? 'Aksesoris' :
                              item.type === 'scroll' ? 'Gulungan' : 'Ramuan'
                            }
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`mono-font font-bold text-xs ${
                          canAfford ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {item.value} 🪙
                        </span>
                        {(!canAfford || isBagFull) && (
                          <span title={!canAfford ? 'Koin Kurang' : 'Tas Penuh'}>
                            <AlertCircle className="w-3 h-3 text-red-400" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: SELL */}
        {activeTab === 'sell' && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="pixel-font text-[8px]">BARANG DI TAS ({playerInventory.length}/12)</span>
              <span className="mono-font text-slate-500">Harga Jual = 60% Harga Normal</span>
            </div>

            {playerInventory.length === 0 ? (
              <div className="p-6 bg-slate-900/60 rounded-lg text-center text-xs text-slate-500 border border-dashed border-slate-800">
                Tasmu kosong! Kumpulkan item dari dungeon untuk dijual kepada pedagang.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-1">
                {playerInventory.map(item => {
                  const isSelected = selectedItem?.id === item.id;
                  const sellValue = Math.max(1, Math.floor(item.value * 0.6));

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-2 rounded border-2 flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/30'
                          : 'border-slate-800 bg-slate-900/90 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0">
                          <ItemIcon icon={item.icon} className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold leading-tight ${
                            item.rarity === 'legendary' ? 'text-amber-400' :
                            item.rarity === 'epic' ? 'text-purple-400' :
                            item.rarity === 'rare' ? 'text-cyan-400' :
                            item.rarity === 'uncommon' ? 'text-emerald-400' : 'text-slate-200'
                          }`}>
                            {item.name}
                          </h4>
                          <span className="text-[9px] text-slate-400 uppercase font-mono">
                            {item.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="mono-font font-bold text-xs text-emerald-400">
                          +{sellValue} 🪙
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Selected Item Details Preview & Transaction Button */}
        {selectedItem ? (
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <ItemIcon icon={selectedItem.icon} className="w-8 h-8" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{selectedItem.name}</h4>
                  <p className="text-[10px] text-slate-400 italic">"{selectedItem.description}"</p>
                </div>
              </div>
            </div>

            {/* Stat Badges */}
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              {selectedItem.atk && (
                <span className="bg-red-950 border border-red-700/60 text-red-300 px-1.5 py-0.2 rounded">
                  +{selectedItem.atk} ATK
                </span>
              )}
              {selectedItem.def && (
                <span className="bg-blue-950 border border-blue-700/60 text-blue-300 px-1.5 py-0.2 rounded">
                  +{selectedItem.def} DEF
                </span>
              )}
              {selectedItem.hpBonus && (
                <span className="bg-rose-950 border border-rose-700/60 text-rose-300 px-1.5 py-0.2 rounded">
                  +{selectedItem.hpBonus} Max HP
                </span>
              )}
              {selectedItem.critBonus && (
                <span className="bg-amber-950 border border-amber-700/60 text-amber-300 px-1.5 py-0.2 rounded">
                  +{Math.round(selectedItem.critBonus * 100)}% Crit
                </span>
              )}
              {selectedItem.dodgeBonus && (
                <span className="bg-cyan-950 border border-cyan-700/60 text-cyan-300 px-1.5 py-0.2 rounded">
                  +{Math.round(selectedItem.dodgeBonus * 100)}% Dodge
                </span>
              )}
              {selectedItem.healAmount && (
                <span className="bg-emerald-950 border border-emerald-700/60 text-emerald-300 px-1.5 py-0.2 rounded">
                  +{selectedItem.healAmount} HP
                </span>
              )}
              {selectedItem.manaAmount && (
                <span className="bg-indigo-950 border border-indigo-700/60 text-indigo-300 px-1.5 py-0.2 rounded">
                  +{selectedItem.manaAmount} MP
                </span>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              {activeTab === 'buy' ? (
                <button
                  onClick={() => handleBuy(selectedItem)}
                  disabled={playerGold < selectedItem.value || playerInventory.length >= 12}
                  className="pixel-btn pixel-btn-gold text-[9px] w-full py-2 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>BELI SEKARANG ({selectedItem.value} 🪙)</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSell(selectedItem)}
                  className="pixel-btn text-[9px] w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 border-emerald-400"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>JUAL KE PEDAGANG (+{Math.max(1, Math.floor(selectedItem.value * 0.6))} 🪙)</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/40 p-2.5 rounded border border-dashed border-slate-800 text-center text-xs text-slate-500 italic">
            Pilih barang di atas untuk melihat rincian dan melakukan transaksi.
          </div>
        )}
      </div>
    </div>
  );
};
