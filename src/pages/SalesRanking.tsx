import React, { useState } from 'react';
import { Trophy, TrendingUp, Medal, Plus, Search, Edit2, Save, X } from 'lucide-react';

interface RankItem {
    id: string;
    name: string;
    sales: number;
}

const INITIAL_MOCK_DATA: RankItem[] = [
    { id: '1', name: 'João Silva', sales: 154000.50 },
    { id: '2', name: 'Maria Souza', sales: 120500.00 },
    { id: '3', name: 'Carlos Ferreira', sales: 98000.00 },
    { id: '4', name: 'Ana Oliveira', sales: 85400.75 },
    { id: '5', name: 'Pedro Santos', sales: 72100.20 },
    { id: 'rep-123', name: 'Angelo Garcia', sales: 65000.00 },
    { id: '7', name: 'Fernanda Lima', sales: 45000.00 },
];

export const SalesRanking: React.FC = () => {
    const [representatives, setRepresentatives] = useState<RankItem[]>(INITIAL_MOCK_DATA);
    const [searchTerm, setSearchTerm] = useState('');

    // State for Add New Rep
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newSales, setNewSales] = useState('');

    // State for Editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editSalesValue, setEditSalesValue] = useState<string>('');

    // Sort representatives automatically when there's a change
    const sortedReps = [...representatives].sort((a, b) => b.sales - a.sales);
    const filteredReps = sortedReps.filter(rep => rep.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const top3 = sortedReps.slice(0, 3);
    const others = filteredReps.filter(rep => !top3.find(t => t.id === rep.id) || searchTerm !== ''); // If searching, show all in list

    const handleAddRep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newSales) return;

        const newRep: RankItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: newName,
            sales: parseFloat(newSales.replace(',', '.')),
        };

        setRepresentatives([...representatives, newRep]);
        setNewName('');
        setNewSales('');
        setShowAddForm(false);
    };

    const startEditing = (rep: RankItem) => {
        setEditingId(rep.id);
        setEditSalesValue(rep.sales.toString());
    };

    const saveEdit = (id: string) => {
        if (!editSalesValue) return;

        setRepresentatives(reprs => reprs.map(rep => {
            if (rep.id === id) {
                return { ...rep, sales: parseFloat(editSalesValue.replace(',', '.')) };
            }
            return rep;
        }));
        setEditingId(null);
    };

    const getMedalColor = (index: number) => {
        switch (index) {
            case 0: return 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]'; // Gold
            case 1: return 'text-zinc-300 drop-shadow-[0_0_15px_rgba(212,212,216,0.3)]';   // Silver
            case 2: return 'text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]';  // Bronze
            default: return 'text-zinc-500';
        }
    };

    const getPodiumHeight = (index: number) => {
        switch (index) {
            case 0: return 'h-48'; // 1st
            case 1: return 'h-36'; // 2nd
            case 2: return 'h-28'; // 3rd
            default: return 'h-20';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-display text-white italic flex items-center gap-3">
                        <Trophy className="text-brand-gold" />
                        Ranking de Vendas
                    </h2>
                    <p className="text-zinc-500 mt-1">Acompanhe e gerencie o faturamento da equipe de representantes.</p>
                </div>

                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-brand-gold transition-all rounded-xl font-bold text-xs uppercase tracking-widest"
                >
                    {showAddForm ? <X size={16} /> : <Plus size={16} />}
                    {showAddForm ? 'Cancelar' : 'Novo Representante'}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleAddRep} className="bg-[#121212] border border-brand-gold/20 p-6 rounded-2xl flex items-end gap-6 animate-in slide-in-from-top-4">
                    <div className="flex-1">
                        <label className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
                            Nome do Representante
                        </label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Ex: João Silva"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
                            Faturamento Inicial (R$)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={newSales}
                            onChange={(e) => setNewSales(e.target.value)}
                            placeholder="0.00"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-8 py-3 h-[46px] bg-brand-gold text-black hover:bg-white transition-all rounded-xl font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                    >
                        Adicionar
                    </button>
                </form>
            )}

            {/* Podium Section (Hidden when searching to not confuse ranking) */}
            {!searchTerm && top3.length > 0 && (
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.05)_0%,transparent_60%)]"></div>

                    <div className="relative z-10 flex items-end justify-center gap-4 sm:gap-8 h-64">

                        {/* 2nd Place */}
                        {top3[1] && (
                            <div className="flex flex-col items-center w-1/3 max-w-[200px] animate-in slide-in-from-bottom border-b-2 border-zinc-300/30">
                                <div className="text-center mb-4">
                                    <Medal size={32} className={`mx-auto mb-2 ${getMedalColor(1)}`} />
                                    <p className="text-white font-bold truncate w-full px-2" title={top3[1].name}>{top3[1].name}</p>
                                    <p className="text-xs text-brand-gold font-display mt-1">
                                        {top3[1].sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                                <div className={`w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-xl ${getPodiumHeight(1)} flex items-center justify-center border-t border-white/20 shadow-[0_-5px_30px_rgba(255,255,255,0.05)]`}>
                                    <span className="text-4xl font-display text-white/30 italic">2</span>
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
                                    <p className="text-white font-bold text-lg truncate w-full px-2" title={top3[0].name}>{top3[0].name}</p>
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
                                    <p className="text-white font-bold truncate w-full px-2" title={top3[2].name}>{top3[2].name}</p>
                                    <p className="text-xs text-brand-gold font-display mt-1">
                                        {top3[2].sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>
                                <div className={`w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-xl ${getPodiumHeight(2)} flex items-center justify-center border-t border-white/10 shadow-[0_-5px_30px_rgba(255,255,255,0.02)]`}>
                                    <span className="text-4xl font-display text-white/20 italic">3</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {/* List Section */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-display text-white">Tabela de Classificação Geral</h3>

                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar representante..."
                            className="w-full sm:w-72 pl-11 pr-4 py-3 bg-black border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-xs transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
                                <th className="px-8 py-4 font-bold text-center w-16">Pos</th>
                                <th className="px-8 py-4 font-bold">Representante</th>
                                <th className="px-8 py-4 font-bold text-right">Faturamento Total</th>
                                <th className="px-8 py-4 font-bold text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredReps.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-zinc-500">
                                        Nenhum representante encontrado.
                                    </td>
                                </tr>
                            ) : (
                                (searchTerm ? filteredReps : others).map((rep) => {
                                    const originalIndex = sortedReps.findIndex(r => r.id === rep.id);
                                    const isTop3 = originalIndex < 3;
                                    const isEditing = editingId === rep.id;

                                    return (
                                        <tr key={rep.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6 text-center">
                                                {isTop3 ? (
                                                    <Medal size={20} className={`mx-auto ${getMedalColor(originalIndex)}`} />
                                                ) : (
                                                    <span className="text-zinc-500 font-display italic text-lg">{originalIndex + 1}º</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 font-bold text-white">
                                                {rep.name}
                                                {originalIndex === 0 && <span className="ml-2 text-[8px] bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full uppercase tracking-widest font-bold">Líder</span>}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {isEditing ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={editSalesValue}
                                                            onChange={(e) => setEditSalesValue(e.target.value)}
                                                            className="w-32 px-3 py-2 bg-black border border-brand-gold rounded-lg focus:outline-none text-white text-sm text-right font-display"
                                                            autoFocus
                                                        />
                                                    </div>
                                                ) : (
                                                    <span className={`${isTop3 ? 'text-brand-gold font-bold text-lg' : 'text-zinc-300'} font-display`}>
                                                        {rep.sales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                {isEditing ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => saveEdit(rep.id)}
                                                            className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                                                            title="Salvar"
                                                        >
                                                            <Save size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 hover:text-white transition-all"
                                                            title="Cancelar"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => startEditing(rep)}
                                                        className="p-2 bg-white/5 text-zinc-400 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white border text-white transition-all mx-auto"
                                                        title="Editar Faturamento"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                )}
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
