import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

export const Commissions: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('orders')
                .select('*, client:clients(*)')
                .eq('representative_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const commissions = orders.map((order) => {
        const isPaid = order.status === 'delivered';
        return {
            id: `comm-${order.id}`,
            order_id: order.id.slice(0, 8),
            client_name: order.client?.company_name || 'Desconhecido',
            amount: order.total_amount * 0.12,
            status: isPaid ? 'paid' : 'pending',
            date: new Date(order.created_at),
            expected_date: new Date(new Date(order.created_at).getTime() + 30 * 24 * 60 * 60 * 1000)
        };
    });

    const totalCommissions = commissions.reduce((acc, curr) => acc + curr.amount, 0);
    const paidCommissions = commissions.filter(c => c.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
    const pendingCommissions = commissions.filter(c => c.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
            <div className="mb-12">
                <h2 className="text-5xl font-display text-zinc-900 dark:text-white italic tracking-tighter">
                    Minhas <span className="text-brand-gold">Comissões</span>
                </h2>
                <p className="text-zinc-500 dark:text-white/40 mt-3 text-xs uppercase tracking-[0.3em] font-bold">Extrato Financeiro B2B</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-sm dark:shadow-none">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <DollarSign className="w-12 h-12 text-zinc-900 dark:text-white" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/40 font-bold mb-4">Total Acumulado</p>
                    <p className="text-4xl font-display text-zinc-900 dark:text-white">
                        <span className="text-xl text-zinc-400 dark:text-white/50 mr-2">R$</span>
                        {totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <ArrowUpRight className="w-12 h-12 text-emerald-500" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-500/70 font-bold mb-4">Liberado / Pago</p>
                    <p className="text-4xl font-display text-emerald-700 dark:text-emerald-400">
                        <span className="text-xl text-emerald-500/50 mr-2">R$</span>
                        {paidCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="bg-brand-gold/5 dark:bg-brand-gold/10 border border-brand-gold/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <Clock className="w-12 h-12 text-brand-gold" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/70 font-bold mb-4">A Receber</p>
                    <p className="text-4xl font-display text-brand-gold italic tracking-tight">
                        <span className="text-xl text-brand-gold/50 mr-2">R$</span>
                        {pendingCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm dark:shadow-none">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-zinc-200 dark:border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-white/60">Extrato Detalhado</h3>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-[10px] uppercase tracking-widest font-bold text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors">Meses Anteriores</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : commissions.length === 0 ? (
                        <div className="py-10 text-center text-zinc-400 dark:text-zinc-500 text-sm">
                            Nenhuma comissão encontrada.
                        </div>
                    ) : (
                    commissions.map((comm) => (
                        <div key={comm.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-zinc-50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/[0.04] border border-zinc-200 dark:border-white/5 rounded-2xl transition-all duration-300">

                            <div className="flex items-center gap-6 mb-4 md:mb-0">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${comm.status === 'paid' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                                    {comm.status === 'paid' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-gold transition-colors">{comm.client_name}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-white/40 uppercase tracking-widest">
                                            <FileText className="w-3 h-3" /> {comm.order_id}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-white/20"></span>
                                        <span className="text-[10px] text-zinc-400 dark:text-white/40 uppercase tracking-widest">
                                            Gerado em {comm.date.toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end md:items-center gap-8 md:gap-12 flex-row-reverse md:flex-row">
                                <div className="text-right">
                                    <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ${comm.status === 'paid' ? 'text-emerald-600 dark:text-emerald-500/70' : 'text-brand-gold/70'}`}>
                                        {comm.status === 'paid' ? 'Pago' : 'Previsão'}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-white/60 font-medium">
                                        {comm.status === 'paid' ? comm.date.toLocaleDateString('pt-BR') : comm.expected_date.toLocaleDateString('pt-BR')}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className={`text-xl font-display ${comm.status === 'paid' ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-gold'}`}>
                                        + R$ {comm.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/30 font-bold mt-1">12% Cms</p>
                                </div>
                            </div>

                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
};
