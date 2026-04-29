import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Building2, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Client } from '../types';

export const CheckoutFlow: React.FC = () => {
    const navigate = useNavigate();
    const { items, cartTotals, selectedClient, setClient, paymentTerm, setPaymentTerm, clearCart } = useCart();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [clients, setClients] = useState<Client[]>([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoadingClients(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('representative_id', session.user.id)
                .order('company_name', { ascending: true });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoadingClients(false);
        }
    };

    if (items.length === 0 && step !== 3) {
        return (
            <div className="max-w-4xl mx-auto py-32 text-center">
                <h2 className="text-3xl font-display text-white italic">Seu carrinho está <span className="text-brand-gold">vazio</span></h2>
                <button
                    onClick={() => navigate('/catalogo')}
                    className="mt-8 px-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase tracking-widest font-bold transition-all"
                >
                    Voltar ao Catálogo
                </button>
            </div>
        );
    }

    const handleFinishOrder = async () => {
        if (!selectedClient || !paymentTerm || isSubmitting) return;

        try {
            setIsSubmitting(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            // 1. Create the Order
            const newOrder = {
                representative_id: session.user.id,
                client_id: selectedClient.id,
                total_amount: cartTotals.totalAmount,
                discount_amount: cartTotals.discountAmount,
                payment_terms: paymentTerm,
                status: 'pending'
            };

            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([newOrder])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create the Order Items
            const orderItemsToInsert = items.map(item => ({
                order_id: orderData.id,
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.wholesale_price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItemsToInsert);

            if (itemsError) throw itemsError;

            setStep(3);
            setTimeout(() => {
                clearCart();
            }, 2000);
        } catch (error) {
            console.error('Error finishing order:', error);
            alert('Houve um erro ao processar seu pedido. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-1000">
            <div className="mb-12 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => step > 1 && step < 3 ? setStep((s) => (s - 1) as 1 | 2) : navigate('/catalogo')}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-gold mb-6 transition-colors font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </button>
                    <h2 className="text-4xl font-display text-white italic tracking-tighter">
                        Finalizar <span className="text-brand-gold">Pedido</span>
                    </h2>
                </div>

                {step < 3 && (
                    <div className="flex gap-4">
                        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]' : 'bg-white/10'}`} />
                        <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]' : 'bg-white/10'}`} />
                        <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-brand-gold' : 'bg-white/10'}`} />
                    </div>
                )}
            </div>

            {step === 1 && (
                <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold flex items-center gap-3 mb-8">
                            <Building2 className="w-5 h-5" />
                            1. Selecione o Lojista
                        </h3>

                        {loadingClients ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : clients.length === 0 ? (
                            <div className="text-center py-10 opacity-50">
                                <Building2 className="w-12 h-12 mx-auto mb-4" />
                                <p className="text-[12px] uppercase tracking-[0.2em] text-white">Nenhum cliente cadastrado.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {clients.map(client => (
                                    <div
                                        key={client.id}
                                        onClick={() => setClient(client)}
                                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedClient?.id === client.id
                                                ? 'bg-brand-gold/10 border-brand-gold/50 shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                                                : 'bg-white/5 border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        <p className="font-display text-lg text-white group-hover:text-brand-gold transition-colors">{client.company_name}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{client.cnpj}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => navigate('/clientes')}
                            className="mt-6 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors underline"
                        >
                            + Cadastrar novo cliente
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => setStep(2)}
                            disabled={!selectedClient}
                            className={`px-12 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${selectedClient
                                    ? 'bg-brand-gold text-black hover:bg-white hover:scale-[1.02] shadow-[0_10px_40px_rgba(197,160,89,0.3)]'
                                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                                }`}
                        >
                            Avançar para Pagamento
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2rem] p-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold flex items-center gap-3 mb-8">
                            <CreditCard className="w-5 h-5" />
                            2. Condição de Pagamento e Resumo
                        </h3>

                        <div className="space-y-4 mb-12">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">Selecione o Prazo</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['PIX à vista', 'Boleto 30', 'Boleto 30/60', 'Boleto 30/60/90'].map(term => (
                                    <div
                                        key={term}
                                        onClick={() => setPaymentTerm(term)}
                                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${paymentTerm === term
                                                ? 'bg-brand-gold border-brand-gold text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                                            }`}
                                    >
                                        <span className="text-xs">{term}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-6">Itens do Pedido</p>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-white/5 rounded-2xl p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image_url} alt="" className="w-12 h-16 object-cover rounded-lg" />
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.name}</p>
                                                <p className="text-[10px] text-white/40">{item.quantity} un x R$ {item.wholesale_price.toLocaleString('pt-BR')}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-white">R$ {(item.quantity * item.wholesale_price).toLocaleString('pt-BR')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-brand-gold/5 backdrop-blur-2xl rounded-[3rem] border border-brand-gold/20 p-10 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-6 italic text-center">Faturamento: {selectedClient?.company_name}</p>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/60">
                                    <span>Bruto</span>
                                    <span>R$ {cartTotals.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest text-brand-gold">
                                    <span>Descontos</span>
                                    <span>- R$ {cartTotals.discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-brand-gold/20 mb-10 flex flex-col items-center">
                                <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold mb-2">Total a Pagar</span>
                                <span className="text-3xl font-display text-brand-gold italic">R$ {cartTotals.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>

                            <button
                                onClick={handleFinishOrder}
                                disabled={!paymentTerm || isSubmitting}
                                className={`w-full py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${paymentTerm && !isSubmitting
                                        ? 'bg-brand-gold text-black hover:bg-white hover:scale-[1.02] shadow-[0_10px_40px_rgba(197,160,89,0.4)]'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                                    }`}
                            >
                                {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="max-w-xl mx-auto py-20 text-center animate-in zoom-in-95 duration-700">
                    <div className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-brand-gold/20 rounded-full animate-ping" />
                        <CheckCircle2 className="w-12 h-12 text-brand-gold" />
                    </div>
                    <h2 className="text-4xl font-display text-white italic mb-4">Pedido <span className="text-brand-gold">Recebido!</span></h2>
                    <p className="text-white/50 text-sm mb-12 leading-relaxed">
                        O pedido para <strong>{selectedClient?.company_name}</strong> foi gerado com sucesso sob o pagamento <strong>{paymentTerm}</strong>. O faturamento será processado em breve.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/pedidos')}
                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
                        >
                            Ver Pedidos
                        </button>
                        <button
                            onClick={() => navigate('/catalogo')}
                            className="px-8 py-4 rounded-2xl bg-brand-gold text-black text-[10px] uppercase tracking-widest font-bold hover:bg-white shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all"
                        >
                            Novo Pedido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

