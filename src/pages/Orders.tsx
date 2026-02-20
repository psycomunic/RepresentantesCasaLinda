import React, { useState } from 'react';
import { Search, Filter, Eye, Package, FileText, ChevronRight } from 'lucide-react';
import { MOCK_ORDERS } from '../mockData';

export const Orders: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = MOCK_ORDERS.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.client?.company_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div>
                    <h2 className="text-5xl font-display text-white italic tracking-tighter">
                        Meus <span className="text-brand-gold">Pedidos</span>
                    </h2>
                    <p className="text-white/40 mt-3 text-xs uppercase tracking-[0.3em] font-bold">Histórico de Faturamento</p>
                </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="text"
                            placeholder="Buscar por número do pedido ou lojista..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:border-brand-gold/50 focus:bg-white/10 outline-none transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                        Status
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        Periodo
                    </button>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-brand-gold/20 rounded-2xl transition-all duration-300 cursor-pointer">

                            <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/10 transition-colors">
                                    <Package className="w-5 h-5 text-white/50 group-hover:text-brand-gold" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">{order.client?.company_name}</p>
                                        <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold ${order.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                                order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                                                    order.status === 'delivered' ? 'bg-purple-500/10 text-purple-400' :
                                                        order.status === 'draft' ? 'bg-white/10 text-white/50' :
                                                            'bg-brand-gold/10 text-brand-gold'
                                            }`}>
                                            {
                                                order.status === 'approved' ? 'Aprovado' :
                                                    order.status === 'pending' ? 'Pendente' :
                                                        order.status === 'shipped' ? 'Enviado' :
                                                            order.status === 'delivered' ? 'Entregue' :
                                                                order.status === 'draft' ? 'Rascunho' :
                                                                    'Cancelado'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest">
                                            <FileText className="w-3 h-3" /> {order.id}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 flex-row-reverse md:flex-row justify-between w-full md:w-auto">
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Total</p>
                                    <p className="text-xl font-display text-white group-hover:text-brand-gold transition-colors">
                                        R$ {order.total_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="text-right hidden md:block">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-1">Condição</p>
                                    <p className="text-xs text-white/70">{order.payment_terms}</p>
                                </div>

                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-brand-gold group-hover:text-black transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center opacity-30">
                                <Package className="w-16 h-16 mb-6" />
                                <p className="text-[12px] uppercase tracking-[0.4em] font-bold">Nenhum pedido encontrado</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
