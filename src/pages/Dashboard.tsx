import React, { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, TrendingUp, Package, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BrazilMap } from '../components/BrazilMap';
import { Order, Profile } from '../types';

const MOCK_PERFORMANCE_DATA = [
    { day: '01', sales: 4500, comissao: 450 },
    { day: '05', sales: 7200, comissao: 720 },
    { day: '10', sales: 2100, comissao: 210 },
    { day: '15', sales: 8900, comissao: 890 },
    { day: '20', sales: 12400, comissao: 1240 },
    { day: '25', sales: 15800, comissao: 1580 },
    { day: '30', sales: 22500, comissao: 2250 },
];

export const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [representatives, setRepresentatives] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch Orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('*, client:clients(*)')
                .order('created_at', { ascending: false });
                
            if (ordersError) throw ordersError;
            setOrders(ordersData || []);

            // Fetch Leads
            const { data: leadsData, error: leadsError } = await supabase
                .from('representantes_leads')
                .select('*');
                
            if (leadsError) throw leadsError;
            setLeads(leadsData || []);

            // Fetch Representatives
            const { data: repsData, error: repsError } = await supabase
                .from('profiles')
                .select('*')
                .in('role', ['representative', 'retailer']);
                
            if (repsError) throw repsError;
            setRepresentatives(repsData || []);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const montlyGoal = 500000;
    
    const currentSales = orders.reduce((acc, order) => acc + order.total_amount, 0);
    const COMMISSION_STATUSES = ['approved', 'in_production', 'shipped', 'delivered'];
    const currentCommission = orders
        .filter(o => COMMISSION_STATUSES.includes(o.status))
        .reduce((acc, order) => acc + (order.total_amount * 0.12), 0);
    const progressPercentage = Math.min((currentSales / montlyGoal) * 100, 100);
    
    const averageTicket = orders.length > 0 ? currentSales / orders.length : 0;

    // Build chart data from orders
    const chartDataMap = new Map<string, number>();
    orders.forEach(order => {
        const day = new Date(order.created_at).getDate().toString().padStart(2, '0');
        chartDataMap.set(day, (chartDataMap.get(day) || 0) + order.total_amount);
    });

    const chartData = Array.from(chartDataMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([day, sales]) => ({ day, sales, comissao: sales * 0.12 }));

    // Calculate role distribution
    const roleStats = representatives.reduce((acc, rep) => {
        acc[rep.role === 'representative' ? 'Representante' : 'Lojista'] = (acc[rep.role === 'representative' ? 'Representante' : 'Lojista'] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
            <div className="mb-12">
                <h2 className="text-4xl font-display text-zinc-900 dark:text-white italic tracking-tighter">
                    Dashboard <span className="text-brand-gold">Comercial</span>
                </h2>
                <p className="text-zinc-500 dark:text-white/40 mt-2 text-xs uppercase tracking-[0.2em]">Visão Geral de Desempenho</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Metric Card 1 */}
                <div className="bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-sm dark:shadow-none transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                        <DollarSign className="w-8 h-8 text-brand-gold" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/40 font-bold mb-2">Vendas do Mês</p>
                    <p className="text-3xl font-display text-zinc-900 dark:text-white mt-1">
                        <span className="text-xl text-zinc-400 dark:text-white/50 inline-block mr-1">R$</span>
                        {currentSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>+15% vs mês anterior</span>
                    </div>
                </div>

                {/* Metric Card 2 */}
                <div className="bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-sm dark:shadow-none transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Package className="w-8 h-8 text-brand-gold" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/40 font-bold mb-2">Pedidos Realizados</p>
                    <p className="text-3xl font-display text-zinc-900 dark:text-white mt-1">{orders.length}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500 dark:text-white/30 font-medium">
                        <span>Ticket médio: R$ {averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                {/* Metric Card 3 */}
                <div className="bg-brand-gold/5 dark:bg-brand-gold/10 border border-brand-gold/30 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-colors duration-500">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-2">Comissão Acumulada</p>
                    <p className="text-3xl font-display text-brand-gold mt-1 italic tracking-tight">
                        <span className="text-xl text-brand-gold/50 inline-block mr-1">R$</span>
                        {currentCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[10px] text-brand-gold/70 font-medium">
                        <span>Liberação em 05/03</span>
                        <span className="px-2 py-0.5 bg-brand-gold/20 rounded text-brand-gold">Pendente</span>
                    </div>
                </div>

                {/* Metric Card 4 */}
                <div className="bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-500">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/40 font-bold mb-2">Meta Mensal</p>
                    <div className="flex justify-between items-baseline mb-3">
                        <p className="text-xl font-display text-zinc-900 dark:text-white mt-1">
                            R$ {montlyGoal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </p>
                        <span className="text-[10px] text-brand-gold font-bold">{Math.round(progressPercentage)}%</span>
                    </div>

                    <div className="w-full bg-zinc-200 dark:bg-black/50 h-2 rounded-full overflow-hidden mt-2">
                        <div
                            className="bg-brand-gold h-full shadow-[0_0_10px_rgba(197,160,89,0.5)] transition-all duration-1000"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm dark:shadow-none transition-colors duration-500">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-white/60 mb-8">Evolução de Vendas</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.length > 0 ? chartData : MOCK_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C5A059" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `R$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', borderRadius: '1rem', color: 'var(--theme-text)' }}
                                    itemStyle={{ color: '#C5A059' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#C5A059"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders List */}
                <div className="bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm dark:shadow-none transition-colors duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-white/60">Últimos Pedidos</h3>
                        <button className="text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-gold/80 transition-colors">Ver todos</button>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex justify-between items-center group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-[10px] text-zinc-500 dark:text-white/50 group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors">
                                        {order.client?.company_name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-brand-gold transition-colors">
                                            {order.client?.company_name}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 dark:text-white/40 uppercase tracking-wider mt-1">{order.id.slice(0, 8)} - {new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">R$ {(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    <p className={`text-[9px] uppercase tracking-widest mt-1 ${order.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-gold'}`}>{order.status === 'approved' ? 'Aprovado' : 'Em Processamento'}</p>
                                </div>
                            </div>
                        ))}
                        {!loading && orders.length === 0 && (
                            <div className="py-10 text-center text-zinc-500 text-sm">Nenhum pedido encontrado.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Leads Map & Roles Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 min-h-[400px] shadow-sm dark:shadow-none transition-colors duration-500">
                    <BrazilMap leads={leads} />
                </div>

                <div className="bg-white dark:bg-white/[0.01] border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm dark:shadow-none transition-colors duration-500">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-white/60 mb-8">Perfil dos Leads</h3>
                    <div className="space-y-4">
                        {Object.entries(roleStats).sort((a, b) => b[1] - a[1]).map(([role, count]) => (
                            <div key={role} className="flex justify-between items-center group">
                                <span className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-brand-gold transition-colors">{role}</span>
                                <span className="text-sm font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">{count}</span>
                            </div>
                        ))}
                        {Object.keys(roleStats).length === 0 && (
                            <p className="text-sm text-zinc-500 dark:text-white/40 italic">Nenhum lead captado ainda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
