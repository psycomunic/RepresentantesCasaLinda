import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Search, Clock } from 'lucide-react';
import { leadStore, LeadCaptureData } from '../lib/leadStore';

export const AdminDashboard: React.FC = () => {
    const [leads, setLeads] = useState<LeadCaptureData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        setLeads(leadStore.getLeads());
    }, []);

    const handleApprove = (id: string, lead: LeadCaptureData) => {
        if (leadStore.updateLeadStatus(id, 'approved')) {
            setLeads(leadStore.getLeads());
            const message = `Olá, ${lead.fullName}! Aprovamos o seu cadastro na Casa Linda Decorações. Seja muito bem-vindo(a) ao nosso Portal do Representante. Seguem seus dados de acesso...`;
            navigator.clipboard.writeText(message);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 3000);
        }
    };

    const handleReject = (id: string) => {
        if (leadStore.updateLeadStatus(id, 'rejected')) {
            setLeads(leadStore.getLeads());
        }
    };

    const filteredLeads = leads.filter(l =>
        l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.document.includes(searchTerm)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-display text-white">Painel Gestão de Vendedores</h2>
                    <p className="text-sm text-gray-400 mt-2">Aprove ou recuse os cadastros de novos representantes.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou CPF/CNPJ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none w-64"
                    />
                </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-white/5 font-bold text-gray-300">
                            <tr>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Nome / Atuação</th>
                                <th className="px-6 py-4">Documento</th>
                                <th className="px-6 py-4">Local / Contato</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{lead.fullName}</div>
                                        <div className="text-xs text-brand-gold">Área: {lead.role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                                        {lead.document}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white">{lead.city} - {lead.state}</div>
                                        <div className="text-xs whitespace-nowrap">{lead.phone} • {lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${lead.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            lead.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                            {lead.status === 'approved' && <CheckCircle2 size={12} />}
                                            {lead.status === 'rejected' && <XCircle size={12} />}
                                            {lead.status === 'pending' && <Clock size={12} />}
                                            {lead.status === 'approved' ? 'Aprovado' : lead.status === 'rejected' ? 'Recusado' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        {lead.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleReject(lead.id)}
                                                    className="px-3 py-1 text-xs text-red-400 hover:text-white hover:bg-red-500/20 rounded-md transition-colors"
                                                >
                                                    Recusar
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(lead.id, lead)}
                                                    className="px-3 py-1 text-xs bg-brand-gold text-black hover:bg-white rounded-md transition-colors shadow-lg font-bold uppercase tracking-wide"
                                                >
                                                    Aprovar
                                                </button>
                                            </div>
                                        )}
                                        {copiedId === lead.id && (
                                            <div className="text-[10px] text-green-400 mt-1 uppercase tracking-wider font-bold">
                                                Mensagem Copiada!
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhum cadastro encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
