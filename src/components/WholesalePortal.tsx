import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

const WholesalePortal: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, cartTotals } = useCart();
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sync local input state with global cart (handles initial load and updates from other components)
  React.useEffect(() => {
    const qtys: Record<string, number> = {};
    items.forEach(item => { qtys[item.id] = item.quantity; });
    setLocalQuantities(qtys);
  }, [items]);

  const handleQtyChange = (product: Product, val: string) => {
    const qty = parseInt(val) || 0;
    const finalQty = Math.max(0, qty);
    setLocalQuantities(prev => ({ ...prev, [product.id]: finalQty }));
    updateQuantity(product.id, finalQty);
  };

  const calculateDiscount = (qty: number) => {
    if (qty >= 50) return 0.15;
    if (qty >= 20) return 0.10;
    if (qty >= 10) return 0.05;
    return 0;
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl font-display text-white italic tracking-tighter">Coleção <span className="text-brand-gold">Atacado</span></h2>
          <p className="text-white/30 mt-3 text-xs uppercase tracking-[0.3em] font-bold">Curadoria Exclusiva para Lojistas</p>
        </div>

        <div className="flex gap-4">
          <div className="px-8 py-5 bg-white/[0.02] border border-brand-gold/10 rounded-3xl flex items-center gap-10 shadow-2xl backdrop-blur-md">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3">Tabela de Descontos</p>
              <div className="flex gap-4">
                <span className="text-[10px] bg-brand-gold/10 px-3 py-1.5 rounded-full text-brand-gold border border-brand-gold/20">+10: 5%</span>
                <span className="text-[10px] bg-brand-gold/10 px-3 py-1.5 rounded-full text-brand-gold border border-brand-gold/20">+20: 10%</span>
                <span className="text-[10px] bg-brand-gold px-3 py-1.5 rounded-full text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.4)]">+50: 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/[0.01] rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold">Item</th>
                  <th className="px-6 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold text-center">SKU</th>
                  <th className="px-6 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold">Unitário</th>
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold text-right">Qtd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                    <tr>
                        <td colSpan={4} className="px-10 py-12 text-center text-brand-gold">
                            <div className="flex justify-center items-center">
                                <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </td>
                    </tr>
                ) : products.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="px-10 py-12 text-center text-zinc-500">
                            Nenhum produto cadastrado.
                        </td>
                    </tr>
                ) : (
                products.map((product) => {
                  const qty = localQuantities[product.id] || 0;
                  const disc = calculateDiscount(qty);
                  return (
                    <tr key={product.id} className="group hover:bg-brand-gold/[0.02] transition-all duration-500">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <img src={product.image_url} alt="" className="w-16 h-20 object-cover rounded-2xl bg-gray-900 border border-white/5 group-hover:border-brand-gold/30 transition-all duration-700" />
                          <div>
                            <p className="text-sm font-display text-white italic group-hover:text-brand-gold transition-colors">{product.name}</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-8 text-center">
                        <span className="text-[9px] font-mono text-brand-gold/40 bg-brand-gold/5 px-3 py-1.5 rounded-full border border-brand-gold/10">{product.sku}</span>
                      </td>
                      <td className="px-6 py-8">
                        <p className="text-sm font-bold text-white/80 tracking-tight">R$ {product.wholesale_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex flex-col items-end gap-3">
                          <input
                            type="number"
                            min="0"
                            className="w-20 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-center text-white focus:border-brand-gold/40 focus:bg-white/10 outline-none transition-all"
                            value={qty || ''}
                            placeholder="0"
                            onChange={(e) => handleQtyChange(product, e.target.value)}
                          />
                          {disc > 0 && (
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded animate-pulse">-{disc * 100}% aplicado</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-white/10 p-10 sticky top-36 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold/40 mb-10 border-b border-white/5 pb-6 italic text-center">Draft de Pedido</h3>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40 font-medium">
                <span>Volume Total</span>
                <span className="text-white font-bold">{cartTotals.totalItems} un</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40 font-medium">
                <span>Preço Bruto</span>
                <span className="text-white font-bold">R$ {cartTotals.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-brand-gold font-medium">
                <span>Descontos</span>
                <span className="text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">- R$ {cartTotals.discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 mb-12">
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold mb-4">Total Faturado</span>
                <span className="text-4xl font-display text-brand-gold italic tracking-tighter drop-shadow-[0_0_15px_rgba(197,160,89,0.4)]">R$ {cartTotals.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              disabled={cartTotals.totalItems === 0}
              className={`w-full py-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-700 ${cartTotals.totalItems > 0
                  ? 'bg-brand-gold text-black hover:bg-white shadow-[0_10px_40px_rgba(197,160,89,0.3)] hover:scale-[1.02]'
                  : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
                }`}
            >
              FECHAR PEDIDO BLACK LABEL
            </button>

            <p className="text-[8px] text-brand-gold/30 text-center mt-8 uppercase tracking-[0.5em] font-bold">
              Analysis by Commercial Intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesalePortal;
