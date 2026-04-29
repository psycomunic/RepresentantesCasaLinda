import React, { useState, useEffect } from 'react';
import { Search, Plus, Building2, MapPin, MoreVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Client } from '../types';

export const ClientManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [cnpj, setCnpj] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('representative_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveClient = async () => {
        if (!cnpj || !companyName || !deliveryAddress) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        try {
            setSaving(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const newClient = {
                representative_id: session.user.id,
                cnpj,
                company_name: companyName,
                delivery_address: deliveryAddress
            };

            const { data, error } = await supabase
                .from('clients')
                .insert([newClient])
                .select()
                .single();

            if (error) throw error;

            setClients([data, ...clients]);
            setIsModalOpen(false);
            setCnpj('');
            setCompanyName('');
            setDeliveryAddress('');
        } catch (error) {
            console.error('Error saving client:', error);
            alert('Erro ao salvar cliente.');
        } finally {
            setSaving(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cnpj.includes(searchTerm)
    );

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div>
                    <h2 className="text-4xl font-display text-white italic tracking-tighter">
                        Meus <span className="text-brand-gold">Clientes</span>
                    </h2>
                    <p className="text-white/40 mt-2 text-xs uppercase tracking-[0.2em]">Gestão de Carteira B2B</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 bg-brand-gold hover:bg-white text-black px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(197,160,89,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Novo Lojista
                </button>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative min-h-[400px]">
                <div className="p-8 border-b border-white/5 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-white/30 absolute left-6 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou CNPJ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-10 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold">Lojista</th>
                                <th className="px-6 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold hidden md:table-cell">Endereço de Entrega</th>
                                <th className="px-6 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold text-center">Data Cadastro</th>
                                <th className="px-10 py-6 text-[9px] uppercase tracking-[0.4em] text-brand-gold/50 font-bold text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="group hover:bg-white/[0.02] transition-colors duration-300">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold/80 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-base font-display text-white group-hover:text-brand-gold transition-colors">{client.company_name}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{client.cnpj}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8 hidden md:table-cell">
                                        <div className="flex items-start gap-3 text-white/50 group-hover:text-white/80 transition-colors">
                                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                            <p className="text-xs leading-relaxed max-w-xs">{client.delivery_address}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8 text-center">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/30 bg-white/5 px-3 py-1.5 rounded-full">
                                            {new Date(client.created_at).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 text-white/20 hover:text-brand-gold hover:bg-brand-gold/10 rounded-xl transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredClients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-10 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-30">
                                            <Building2 className="w-16 h-16 mb-6" />
                                            <p className="text-[12px] uppercase tracking-[0.4em] font-bold">Nenhum lojista encontrado</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-display text-white italic">Novo <span className="text-brand-gold">Lojista</span></h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mt-2">Cadastrar cliente na carteira</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">CNPJ</label>
                                <input 
                                    type="text" 
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                    placeholder="00.000.000/0000-00" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold/50" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">Razão Social / Nome Fantasia</label>
                                <input 
                                    type="text" 
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Ex: Casa Decor Comércio..." 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold/50" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">Endereço de Entrega Completo</label>
                                <textarea 
                                    rows={3} 
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Rua, Número, Bairro, Cidade - Estado" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold/50 resize-none" 
                                />
                            </div>

                            <div className="pt-8 flex gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/70 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSaveClient}
                                    disabled={saving}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-brand-gold text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)] disabled:opacity-50"
                                >
                                    {saving ? 'Salvando...' : 'Salvar Cadastro'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
