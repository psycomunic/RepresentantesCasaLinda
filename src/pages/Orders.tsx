import React, { useState, useEffect, useCallback } from 'react';
import { Search, Package, FileText, ChevronRight, RefreshCw, Clock, CheckCircle, Truck, Gift, XCircle, Factory, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

// ── Status Config ──────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending:       { label: 'Aguardando Aprovação', color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',      icon: <Clock size={11} /> },
    approved:      { label: 'Aprovado',             color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', icon: <CheckCircle size={11} /> },
    in_production: { label: 'Em Produção',          color: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',           icon: <Factory size={11} /> },
    shipped:       { label: 'Enviado',              color: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',   icon: <Truck size={11} /> },
    delivered:     { label: 'Entregue',             color: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',   icon: <Gift size={11} /> },
    cancelled:     { label: 'Cancelado',            color: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400',              icon: <XCircle size={11} /> },
    draft:         { label: 'Rascunho',             color: 'bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-white/50',             icon: <AlertCircle size={11} /> },
};

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_MAP[status] || STATUS_MAP.draft;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold ${cfg.color}`}>
            {cfg.icon} {cfg.label}
        </span>
    );
}

// ── Status Timeline (passos visuais) ──────────────────────────────────────────
const STATUS_STEPS = ['pending', 'approved', 'in_production', 'shipped', 'delivered'];

function StatusTimeline({ status }: { status: string }) {
    const currentIdx = STATUS_STEPS.indexOf(status);
    if (currentIdx === -1) return null;
    return (
        <div className="flex items-center gap-1 mt-3">
            {STATUS_STEPS.map((s, i) => {
                const cfg = STATUS_MAP[s];
                const done = i <= currentIdx;
                return (
                    <React.Fragment key={s}>
                        <div className={`flex flex-col items-center`} title={cfg.label}>
                            <div className={`w-2 h-2 rounded-full transition-colors ${done ? 'bg-brand-gold' : 'bg-zinc-300 dark:bg-white/10'}`} />
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                            <div className={`h-px flex-1 max-w-8 transition-colors ${i < currentIdx ? 'bg-brand-gold' : 'bg-zinc-300 dark:bg-white/10'}`} />
                        )}
                    </React.Fragment>
                );
            })}
            <span className="ml-2 text-[9px] text-zinc-400 dark:text-white/30 uppercase tracking-wider">
                {STATUS_MAP[status]?.label}
            </span>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export const Orders: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = useCallback(async (silent = false) => {
        try {
            if (!silent) setLoading(true); else setRefreshing(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('orders')
                .select('*, client:clients(*), items:order_items(*)')
                .eq('representative_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const filtered = orders.filter(o => {
        const name = (o.client_name || o.client?.company_name || '').toLowerCase();
        const id = o.id.toLowerCase();
        const mag = (o.magazord_order_id || '').toLowerCase();
        const matchSearch = name.includes(searchTerm.toLowerCase()) ||
            id.includes(searchTerm.toLowerCase()) ||
            mag.includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const statusCounts = Object.fromEntries(
        Object.keys(STATUS_MAP).map(s => [s, orders.filter(o => o.status === s).length])
    );

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display text-zinc-900 dark:text-white">Meus <span className="text-brand-gold">Pedidos</span></h2>
                    <p className="text-zinc-500 mt-1 text-sm">Histórico de pedidos e status de produção.</p>
                </div>
                <button
                    onClick={() => fetchOrders(true)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-xs uppercase tracking-widest font-bold text-zinc-500 hover:text-brand-gold hover:border-brand-gold transition-all"
                >
                    <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                    Atualizar
                </button>
            </div>

            {/* Filtros de Status */}
            <div className="flex gap-2 flex-wrap">
                {[{ key: 'all', label: 'Todos', count: orders.length }, ...Object.entries(STATUS_MAP).map(([k, v]) => ({ key: k, label: v.label, count: statusCounts[k] || 0 }))].map(f => (
                    <button key={f.key} onClick={() => setStatusFilter(f.key)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all ${statusFilter === f.key ? 'bg-brand-gold text-black' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-brand-gold'}`}
                    >
                        {f.label} {f.count > 0 && <span className="ml-1 opacity-60">{f.count}</span>}
                    </button>
                ))}
            </div>

            {/* Busca */}
            <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Buscar por cliente, ID ou nº Magazord..."
                    value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:border-brand-gold outline-none transition-all placeholder:text-zinc-400"
                />
            </div>

            {/* Lista */}
            <div className="space-y-3">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-2xl">
                        <Package className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-400 text-sm uppercase tracking-widest">Nenhum pedido encontrado</p>
                    </div>
                ) : (
                    filtered.map(order => {
                        const clientLabel = order.client_name || order.client?.company_name || 'Cliente não informado';
                        const numItems = order.items?.length ?? 0;
                        const hasMagazord = !!order.magazord_order_id;

                        return (
                            <div key={order.id}
                                className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 hover:border-brand-gold/30 rounded-2xl p-6 transition-all duration-200 shadow-sm dark:shadow-none"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                                    {/* Lado esquerdo */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                                            <p className="font-bold text-zinc-900 dark:text-white truncate">{clientLabel}</p>
                                            <StatusBadge status={order.status} />
                                            {hasMagazord && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                                                    <FileText size={9} /> Magazord #{order.magazord_order_id}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-[10px] text-zinc-400 dark:text-white/30 uppercase tracking-widest mb-2">
                                            <span>#{order.order_number || order.id.slice(0, 8)}</span>
                                            <span>·</span>
                                            <span>{new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            {numItems > 0 && <><span>·</span><span>{numItems} {numItems === 1 ? 'item' : 'itens'}</span></>}
                                        </div>

                                        {/* Timeline de progresso */}
                                        <StatusTimeline status={order.status} />

                                        {!hasMagazord && order.status === 'pending' && (
                                            <p className="mt-2 text-[10px] text-amber-500 uppercase tracking-widest">
                                                ⏳ Aguardando vinculação ao pedido Magazord pelo admin
                                            </p>
                                        )}
                                    </div>

                                    {/* Lado direito */}
                                    <div className="flex md:flex-col items-center md:items-end gap-6 md:gap-2 shrink-0">
                                        <div className="text-right">
                                            <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/30 mb-0.5">Total</p>
                                            <p className="text-xl font-display text-zinc-900 dark:text-white">
                                                {order.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
