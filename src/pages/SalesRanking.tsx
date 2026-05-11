import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Medal, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RankItem {
    id: string;
    name: string;
    sales: number;
}

// Apelidos de poder — determinísticos por ID
const CODENAMES = [
    'Apex', 'Vortex', 'Onyx', 'Cipher', 'Nova',
    'Axiom', 'Zenith', 'Lynx', 'Orion', 'Volt',
    'Nexus', 'Titan', 'Blaze', 'Raven', 'Pulse',
    'Echo', 'Kryon', 'Slate', 'Quasar', 'Specter',
];

function getCodename(id: string): string {
    // Soma simples dos char codes para escolher um apelido fixo por ID
    const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return CODENAMES[hash % CODENAMES.length];
}

export const SalesRanking: React.FC = () => {
    const [representatives, setRepresentatives] = useState<RankItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('total_amount, status, representative:profiles!representative_id(id, full_name)');

            if (error) throw error;
            
            const salesMap = new Map<string, RankItem>();
            
            (data || []).forEach((order: any) => {
                if (order.status === 'draft' || order.status === 'cancelled') return;
                
                const repId = order.representative?.id;
                const repName = order.representative?.full_name || 'Desconhecido';
                
                if (repId) {
                    if (!salesMap.has(repId)) {
                        salesMap.set(repId, { id: repId, name: repName, sales: 0 });
                    }
                    salesMap.get(repId)!.sales += order.total_amount;
                }
            });
            
            setRepresentatives(Array.from(salesMap.values()));
        } catch (error) {
            console.error('Error fetching ranking:', error);
        } finally {
            setLoading(false);
        }
    };

    const sortedReps = [...representatives].sort((a, b) => b.sales - a.sales);
    const filteredReps = sortedReps; // sem filtro por nome (apelidos anônimos)

    const top3 = sortedReps.slice(0, 3);
    const others = filteredReps.filter(rep => !top3.find(t => t.id === rep.id));

    const getMedalColor = (index: number) => {
        switch (index) {
            case 0: return 'text-yellow-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]';
            case 1: return 'text-zinc-400 drop-shadow-[0_0_15px_rgba(212,212,216,0.3)]';
            case 2: return 'text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]';
            default: return 'text-zinc-400';
        }
    };

    const getPodiumHeight = (index: number) => {
        switch (index) {
            case 0: return 'h-48';
            case 1: return 'h-36';
            case 2: return 'h-28';
            default: return 'h-20';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                    <h2 className="text-3xl font-display text-zinc-900 dark:text-white italic flex items-center gap-3">
                        <Trophy className="text-brand-gold" />
                        Ranking de Vendas
                    </h2>
                    <p className="text-zinc-500 mt-1">Acompanhe e gerencie o faturamento da equipe de representantes.</p>
                </div>

            {/* Podium Section */}
            {!searchTerm && top3.length > 0 && (
                <div className="bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-3xl p-12 mt-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.05)_0%,transparent_60%)]"></div>

                    <div className="relative z-10 flex items-end justify-center gap-4 sm:gap-8 h-[22rem]">

                        {/* 2nd Place */}
                        {top3[1] && (
                            <div className="flex flex-col items-center w-1/3 max-w-[200px] animate-in slide-in-from-bottom border-b-2 border-zinc-300 dark:border-zinc-300/30">
                                <div className="text-center mb-4">
                                    <Medal size={32} className={`mx-auto mb-2 ${getMedalColor(1)}`} />
                                    <p className="text-zinc-900 dark:text-white font-bold truncate w-full px-2 font-display italic tracking-wide">{getCodename(top3[1].id)}</p>
                                    <p className="text-xs text-brand-gold font-display mt-1">
                                        {top3[1].sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                                <div className={`w-full bg-gradient-to-t from-zinc-200 to-zinc-300 dark:from-white/5 dark:to-white/10 rounded-t-xl ${getPodiumHeight(1)} flex items-center justify-center border-t border-zinc-300 dark:border-white/20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]`}>
                                    <span className="text-4xl font-display text-zinc-400 dark:text-white/30 italic">2</span>
                                </div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {top3[0] && (
                            <div className="flex flex-col items-center w-1/3 max-w-[220px] animate-in slide-in-from-bottom border-b-2 border-yellow-400/50 relative z-10">
                                <div className="text-center mb-4">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-brand-gold/20 blur-xl rounded-full"></div>
                                        <Trophy size={48} className={`mx-auto mb-2 ${getMedalColor(0)} relative`} />
                                    </div>
                                    <p className="text-zinc-900 dark:text-white font-bold text-lg truncate w-full px-2 font-display italic tracking-wide">{getCodename(top3[0].id)}</p>
                                    <p className="text-sm text-brand-gold font-display mt-1 font-bold">
                                        {top3[0].sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                                <div className={`w-full bg-gradient-to-t from-brand-gold/10 to-brand-gold/30 rounded-t-xl ${getPodiumHeight(0)} flex items-center justify-center border-t-2 border-brand-gold shadow-[0_-10px_40px_rgba(197,160,89,0.15)]`}>
                                    <span className="text-6xl font-display text-brand-gold/50 italic">1</span>
                                </div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {top3[2] && (
                            <div className="flex flex-col items-center w-1/3 max-w-[200px] animate-in slide-in-from-bottom border-b-2 border-amber-600/30">
                                <div className="text-center mb-4">
                                    <Medal size={28} className={`mx-auto mb-2 ${getMedalColor(2)}`} />
                                    <p className="text-zinc-900 dark:text-white font-bold truncate w-full px-2 font-display italic tracking-wide">{getCodename(top3[2].id)}</p>
                                    <p className="text-xs text-brand-gold font-display mt-1">
                                        {top3[2].sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                                <div className={`w-full bg-gradient-to-t from-zinc-200 to-zinc-300 dark:from-white/5 dark:to-white/10 rounded-t-xl ${getPodiumHeight(2)} flex items-center justify-center border-t border-zinc-300 dark:border-white/10`}>
                                    <span className="text-4xl font-display text-zinc-400 dark:text-white/20 italic">3</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {/* List Section */}
            <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                <div className="p-8 border-b border-zinc-200 dark:border-white/5">
                    <h3 className="text-lg font-display text-zinc-900 dark:text-white">Tabela de Classificação Geral</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
                                <th className="px-8 py-4 font-bold text-center w-16">Pos</th>
                                <th className="px-8 py-4 font-bold">Agente</th>
                                <th className="px-8 py-4 font-bold text-right">Faturamento Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-12 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredReps.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-12 text-center text-zinc-400 dark:text-zinc-500">
                                        Nenhum representante encontrado.
                                    </td>
                                </tr>
                            ) : (
                                (searchTerm ? filteredReps : others).map((rep) => {
                                    const originalIndex = sortedReps.findIndex(r => r.id === rep.id);
                                    const isTop3 = originalIndex < 3;
                                    const codename = getCodename(rep.id);

                                    return (
                                        <tr key={rep.id} className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6 text-center">
                                                {isTop3 ? (
                                                    <Medal size={20} className={`mx-auto ${getMedalColor(originalIndex)}`} />
                                                ) : (
                                                    <span className="text-zinc-400 dark:text-zinc-500 font-display italic text-lg">{originalIndex + 1}º</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 font-bold text-zinc-900 dark:text-white font-display italic tracking-wide">
                                                {codename}
                                                {originalIndex === 0 && <span className="ml-2 text-[8px] bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full uppercase tracking-widest font-bold not-italic">Líder</span>}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`${isTop3 ? 'text-brand-gold font-bold text-lg' : 'text-zinc-600 dark:text-zinc-300'} font-display`}>
                                                    {rep.sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
