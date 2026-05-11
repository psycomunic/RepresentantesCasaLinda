import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Search, Clock, Users, UserPlus, Eye, X, Building2, MapPin, Briefcase, FileText, Phone, Mail, Package, Edit2, User, Link, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile, Order } from '../types';

interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  estado: string;
  documento: string;
  core_status: string;
  segmentos: string[];
  regioes_atuacao: string;
  quantidade_lojistas: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [representatives, setRepresentatives] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'reps' | 'orders'>('leads');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedRep, setSelectedRep] = useState<Profile | null>(null);
  const [repLeadDetails, setRepLeadDetails] = useState<Lead | null>(null);
  const [loadingRepDetails, setLoadingRepDetails] = useState(false);
  const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);
  const [linkingOrderId, setLinkingOrderId] = useState<string | null>(null);
  const [magazordInput, setMagazordInput] = useState('');
  const [linkingSaving, setLinkingSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const { data, error } = await supabase
          .from('representantes_leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setLeads(data || []);
      } else if (activeTab === 'reps') {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .in('role', ['representative', 'retailer'])
          .order('full_name', { ascending: true });
        if (error) throw error;
        setRepresentatives(data || []);
      } else if (activeTab === 'orders') {
        const { data, error } = await supabase
          .from('orders')
          .select('*, client:clients(*), representative:profiles!representative_id(*)')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setOrders((data || []) as any);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
        
      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Erro ao atualizar status do pedido.');
    }
  };

  const handleLinkMagazord = async (orderId: string) => {
    if (!magazordInput.trim()) return;
    setLinkingSaving(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ magazord_order_id: magazordInput.trim(), status: 'in_production' })
        .eq('id', orderId);
      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId
        ? { ...o, magazord_order_id: magazordInput.trim(), status: 'in_production' as any }
        : o
      ));
      setLinkingOrderId(null);
      setMagazordInput('');
    } catch (err) {
      console.error('Erro ao vincular Magazord:', err);
      alert('Erro ao vincular pedido. Tente novamente.');
    } finally {
      setLinkingSaving(false);
    }
  };

  const handleApprove = async (id: string, lead: Lead) => {
    try {
      const { error } = await supabase
        .from('representantes_leads')
        .update({ status: 'approved' })
        .eq('id', id);
        
      if (error) throw error;
      
      setLeads(leads.map(l => l.id === id ? { ...l, status: 'approved' } : l));
      const message = `Olá, ${lead.nome}! Aprovamos o seu cadastro na Casa Linda Decorações. Seja muito bem-vindo(a) ao nosso Portal do Representante. Em breve enviaremos seus dados de acesso.`;
      navigator.clipboard.writeText(message);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
      
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: 'approved' });
      }
    } catch (err) {
      console.error('Error approving lead:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('representantes_leads')
        .update({ status: 'rejected' })
        .eq('id', id);
        
      if (error) throw error;
      setLeads(leads.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
      
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: 'rejected' });
      }
    } catch (err) {
      console.error('Error rejecting lead:', err);
    }
  };

  const openRepModal = async (rep: Profile) => {
    setSelectedRep(rep);
    setLoadingRepDetails(true);
    try {
      const { data, error } = await supabase
        .from('representantes_leads')
        .select('*')
        .eq('email', rep.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (!error && data) {
        setRepLeadDetails(data);
      } else {
        setRepLeadDetails(null);
      }
    } catch (err) {
      console.error('Error fetching rep lead details:', err);
      setRepLeadDetails(null);
    } finally {
      setLoadingRepDetails(false);
    }
  };

  const handleGenerateCatalog = async () => {
    setIsGeneratingCatalog(true);
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      const { pdf } = await import('@react-pdf/renderer');
      const { CatalogPDF } = await import('../components/CatalogPDF');
      
      const blob = await pdf(<CatalogPDF products={data || []} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Catalogo_CasaLinda_${new Date().getFullYear()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating catalog:', err);
      alert('Erro ao gerar catálogo. Verifique sua conexão e tente novamente.');
    } finally {
      setIsGeneratingCatalog(false);
    }
  };

  const filteredLeads = leads.filter(l =>
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.documento.includes(searchTerm)
  );
  
  const filteredReps = representatives.filter(r =>
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.cnpj && r.cnpj.includes(searchTerm)) ||
    (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredOrders = orders.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ((o.client_name || '') + (o.client?.company_name || '')).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.representative?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.magazord_order_id || '').includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white">Painel de Gestão</h2>
          <p className="text-sm text-zinc-500 dark:text-gray-400 mt-2">Gerencie leads e consulte as fichas de seus representantes aprovados.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={handleGenerateCatalog}
            disabled={isGeneratingCatalog}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-dark dark:bg-white text-brand-gold dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-200 rounded-lg transition-all shadow-[0_0_20px_rgba(197,160,89,0.15)] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] font-bold uppercase tracking-widest text-xs border border-brand-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingCatalog ? (
              <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FileText size={16} />
            )}
            {isGeneratingCatalog ? 'Gerando...' : 'Catálogo PDF'}
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-lg text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex border-b border-zinc-200 dark:border-white/10">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
            activeTab === 'leads' 
              ? 'text-brand-gold border-brand-gold' 
              : 'text-zinc-400 dark:text-white/40 border-transparent hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <UserPlus size={18} />
          Novos Cadastros
        </button>
        <button
          onClick={() => setActiveTab('reps')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
            activeTab === 'reps' 
              ? 'text-brand-gold border-brand-gold' 
              : 'text-zinc-400 dark:text-white/40 border-transparent hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Users size={18} />
          Representantes Ativos
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
            activeTab === 'orders' 
              ? 'text-brand-gold border-brand-gold' 
              : 'text-zinc-400 dark:text-white/40 border-transparent hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Package size={18} />
          Pedidos
        </button>
      </div>

      <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === 'leads' ? (
              <table className="w-full text-left text-sm text-zinc-600 dark:text-gray-400">
                <thead className="text-xs uppercase bg-zinc-50 dark:bg-white/5 font-bold text-zinc-500 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Nome / Atuação</th>
                    <th className="px-6 py-4">Local / Contato</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-900 dark:text-white">{lead.nome}</div>
                        <div className="text-xs text-brand-gold">Área: {lead.regioes_atuacao}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-zinc-800 dark:text-white">{lead.cidade} - {lead.estado}</div>
                        <div className="text-xs whitespace-nowrap">{lead.whatsapp} • {lead.email}</div>
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
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-1 text-xs text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
                          >
                            <Eye size={14} /> Ficha
                          </button>
                          {lead.status === 'pending' && (
                            <>
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
                            </>
                          )}
                        </div>
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
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                        Nenhum cadastro encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : activeTab === 'reps' ? (
              <table className="w-full text-left text-sm text-zinc-600 dark:text-gray-400">
                <thead className="text-xs uppercase bg-zinc-50 dark:bg-white/5 font-bold text-zinc-500 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4">Nome do Representante</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">CNPJ / Empresa</th>
                    <th className="px-6 py-4">Cargo</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                  {filteredReps.map((rep) => (
                    <tr key={rep.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-900 dark:text-white">{rep.full_name}</div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                        {rep.email}
                      </td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                        <div>{rep.cnpj || '-'}</div>
                        <div className="text-xs text-zinc-500 dark:text-white/50">{rep.company_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-brand-gold/10 text-brand-gold border-brand-gold/20">
                          {rep.role === 'representative' ? 'Representante' : 'Lojista'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => openRepModal(rep)}
                          className="px-3 py-1 text-xs text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-md transition-colors flex items-center gap-2 ml-auto"
                        >
                          <Eye size={14} /> Ficha Completa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                        Nenhum representante encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-600 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-zinc-50 dark:bg-white/5 font-bold text-zinc-500 dark:text-gray-300">
                    <tr>
                      <th className="px-5 py-4">#</th>
                      <th className="px-5 py-4">Cliente</th>
                      <th className="px-5 py-4">Representante</th>
                      <th className="px-5 py-4">Valor</th>
                      <th className="px-5 py-4">Magazord</th>
                      <th className="px-5 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-mono text-xs text-zinc-500">#{order.order_number || order.id.slice(0,6)}</div>
                          <div className="text-[10px] text-zinc-400">{new Date(order.created_at).toLocaleDateString('pt-BR')}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-zinc-900 dark:text-white">
                            {order.client_name || order.client?.company_name || '—'}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-zinc-700 dark:text-zinc-300">{order.representative?.full_name || '—'}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-brand-gold">
                            {order.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </div>
                        </td>

                        {/* Coluna Magazord */}
                        <td className="px-5 py-4">
                          {order.magazord_order_id ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded text-xs font-bold">
                              <FileText size={10} /> #{order.magazord_order_id}
                            </span>
                          ) : linkingOrderId === order.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={magazordInput}
                                onChange={e => setMagazordInput(e.target.value)}
                                placeholder="Nº Pedido"
                                className="w-24 px-2 py-1 text-xs border border-zinc-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/5 text-zinc-900 dark:text-white outline-none focus:border-brand-gold"
                                onKeyDown={e => e.key === 'Enter' && handleLinkMagazord(order.id)}
                              />
                              <button
                                onClick={() => handleLinkMagazord(order.id)}
                                disabled={linkingSaving}
                                className="px-2 py-1 bg-brand-gold text-black text-xs rounded-lg font-bold hover:bg-amber-500 transition-all disabled:opacity-50"
                              >
                                {linkingSaving ? <Loader2 size={12} className="animate-spin" /> : 'OK'}
                              </button>
                              <button onClick={() => setLinkingOrderId(null)} className="text-zinc-400 hover:text-red-400">
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setLinkingOrderId(order.id); setMagazordInput(''); }}
                              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-brand-gold transition-colors font-bold"
                            >
                              <Link size={11} /> Vincular
                            </button>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <select
                            value={order.status}
                            onChange={e => handleOrderStatusUpdate(order.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider border outline-none appearance-none cursor-pointer ${
                              order.status === 'approved'      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              order.status === 'in_production' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              order.status === 'shipped'       ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                              order.status === 'delivered'     ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                              order.status === 'cancelled'     ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}
                          >
                            <option value="pending">Aguardando</option>
                            <option value="approved">Aprovado</option>
                            <option value="in_production">Em Produção</option>
                            <option value="shipped">Enviado</option>
                            <option value="delivered">Entregue</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                          Nenhum pedido encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para Ficha Completa do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50/50 dark:bg-black/20">
              <div>
                <h3 className="text-2xl font-display text-zinc-900 dark:text-white">Ficha de Cadastro</h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 mt-1">Detalhes completos do lead</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                selectedLead.status === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                selectedLead.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
              }`}>
                {selectedLead.status === 'approved' && <CheckCircle2 size={24} />}
                {selectedLead.status === 'rejected' && <XCircle size={24} />}
                {selectedLead.status === 'pending' && <Clock size={24} />}
                <div>
                  <div className="font-bold uppercase tracking-widest text-sm">
                    Status: {selectedLead.status === 'approved' ? 'Aprovado' : selectedLead.status === 'rejected' ? 'Recusado' : 'Pendente de Análise'}
                  </div>
                  <div className="text-xs mt-1 opacity-80">Registrado em {new Date(selectedLead.created_at).toLocaleString()}</div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl">
                    <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <User size={14} /> Dados Pessoais
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Nome Completo</div>
                        <div className="text-zinc-900 dark:text-white font-medium">{selectedLead.nome}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">CPF / CNPJ</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.documento}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl">
                    <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <Phone size={14} /> Contato
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">WhatsApp</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.whatsapp}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">E-mail</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl">
                    <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <Briefcase size={14} /> Atuação Profissional
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Região de Atuação</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.regioes_atuacao}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Local Base</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.cidade} - {selectedLead.estado}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Tamanho da Carteira</div>
                        <div className="text-zinc-900 dark:text-white">{selectedLead.quantidade_lojistas} clientes</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl">
                    <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <FileText size={14} /> Detalhes
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Status CORE</div>
                        <div className="text-zinc-900 dark:text-white">
                          {selectedLead.core_status === 'sim' ? 'Ativo' : 
                           selectedLead.core_status === 'nao' ? 'Não possui' : 'Em regularização'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-gray-500 mb-2">Segmentos</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.segmentos.map(seg => (
                            <span key={seg} className="px-2 py-1 bg-zinc-200 dark:bg-white/10 rounded text-xs text-zinc-700 dark:text-white/80">
                              {seg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedLead.status === 'pending' && (
              <div className="p-6 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-black/20 flex justify-end gap-4">
                <button
                  onClick={() => handleReject(selectedLead.id)}
                  className="px-6 py-2.5 text-sm text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors font-bold uppercase tracking-widest"
                >
                  Recusar Cadastro
                </button>
                <button
                  onClick={() => handleApprove(selectedLead.id, selectedLead)}
                  className="px-6 py-2.5 text-sm bg-brand-gold text-black hover:bg-white rounded-lg transition-colors shadow-[0_0_20px_rgba(197,160,89,0.3)] font-bold uppercase tracking-widest"
                >
                  Aprovar Representante
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para Ficha Completa do Representante Ativo */}
      {selectedRep && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50/50 dark:bg-black/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-display text-lg italic shadow-xl">
                  {selectedRep.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'RP'}
                </div>
                <div>
                  <h3 className="text-2xl font-display text-zinc-900 dark:text-white">{selectedRep.full_name}</h3>
                  <p className="text-sm text-brand-gold uppercase tracking-widest font-bold mt-1">
                    {selectedRep.role === 'representative' ? 'Representante Ativo' : 'Lojista'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedRep(null); setRepLeadDetails(null); }}
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
              {loadingRepDetails ? (
                <div className="flex justify-center items-center h-32">
                  <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Info da Conta */}
                  <div className="space-y-6">
                    <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl">
                      <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                        <User size={14} /> Dados da Conta
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">E-mail de Acesso</div>
                          <div className="text-zinc-900 dark:text-white">{selectedRep.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Empresa / Razão Social</div>
                          <div className="text-zinc-900 dark:text-white">{selectedRep.company_name || 'Não informado'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">CNPJ Associado</div>
                          <div className="text-zinc-900 dark:text-white">{selectedRep.cnpj || 'Não informado'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Histórica do Lead (se houver) */}
                  <div className="space-y-6">
                    <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 p-5 rounded-xl h-full">
                      <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                        <Briefcase size={14} /> Dados de Cadastro Original
                      </h4>
                      {repLeadDetails ? (
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Região de Atuação Declarada</div>
                            <div className="text-zinc-900 dark:text-white">{repLeadDetails.regioes_atuacao}</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">WhatsApp de Contato</div>
                            <div className="text-zinc-900 dark:text-white">{repLeadDetails.whatsapp}</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Localização Base</div>
                            <div className="text-zinc-900 dark:text-white">{repLeadDetails.cidade} - {repLeadDetails.estado}</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Tamanho da Carteira</div>
                            <div className="text-zinc-900 dark:text-white">{repLeadDetails.quantidade_lojistas} clientes</div>
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500 dark:text-gray-500 mb-2">Segmentos Atendidos</div>
                            <div className="flex flex-wrap gap-2">
                              {repLeadDetails.segmentos.map(seg => (
                                <span key={seg} className="px-2 py-1 bg-zinc-200 dark:bg-white/10 rounded text-xs text-zinc-700 dark:text-white/80">
                                  {seg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                          <FileText size={32} className="text-white/10 mb-4" />
                          <p className="text-zinc-500 text-sm">Dados de candidatura original não encontrados para este e-mail.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

