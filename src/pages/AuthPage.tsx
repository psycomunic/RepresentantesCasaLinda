import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { leadStore } from '../lib/leadStore';

interface AuthPageProps {
    onLogin: () => void;
    onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
    const [view, setView] = useState<'login' | 'register'>('login');

    // Registration Typeform state
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        document: '',
        state: '',
        city: '',
        email: '',
        phone: '',
    });

    const handleNext = () => {
        if (step < 5) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        leadStore.addLead(formData);
        setSubmitted(true);
    };

    // View: Successfully Registered
    if (submitted) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-1000">
                <div className="max-w-md text-center border border-white/10 p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl relative">
                    <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                        <CheckCircle2 className="w-8 h-8 text-black" />
                    </div>
                    <h2 className="text-3xl font-display text-white mb-4 italic">Solicitação em Análise</h2>
                    <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                        Nossa diretoria comercial está revisando seu cadastro.
                        <strong> Retornaremos no seu WhatsApp.</strong>
                    </p>
                    <button
                        onClick={onBack}
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-white transition-colors"
                    >
                        Voltar ao Início
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-brand-gold selection:text-black">
            {/* Background flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors font-bold z-10"
            >
                <ArrowLeft size={16} /> Voltar
            </button>

            <div className="w-full max-w-lg relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-display text-white tracking-tighter mb-2">Casa Linda</h1>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold">Portal do Representante</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 rounded-[2.5rem]">
                    {/* Toggle View */}
                    {!submitted && (
                        <div className="flex bg-white/5 p-1 rounded-xl mb-8">
                            <button
                                onClick={() => {
                                    setView('login');
                                    setStep(0);
                                }}
                                className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${view === 'login' ? 'bg-brand-gold text-black shadow-md' : 'text-white/40 hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setView('register')}
                                className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${view === 'register' ? 'bg-brand-gold text-black shadow-md' : 'text-white/40 hover:text-white'}`}
                            >
                                Criar Conta
                            </button>
                        </div>
                    )}

                    {/* Login Form */}
                    {view === 'login' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Seu E-mail"
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-white placeholder:text-white/20"
                                />
                                <input
                                    type="password"
                                    placeholder="Sua Senha"
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-white placeholder:text-white/20"
                                />
                            </div>
                            <button
                                onClick={onLogin}
                                className="w-full py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_40px_rgba(197,160,89,0.2)]"
                            >
                                ENTRAR
                            </button>
                            <div className="text-center">
                                <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                                    Esqueci minha senha
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Register Form (Typeform Style) */}
                    {view === 'register' && (
                        <form onSubmit={handleRegisterSubmit} className="space-y-5">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-display text-white italic tracking-tight">Análise de <span className="text-brand-gold">Perfil</span></h3>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2 font-bold leading-relaxed">Apenas para Representantes e Vendedores Externos</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
                                <div
                                    className="h-full bg-brand-gold transition-all duration-500 ease-out"
                                    style={{ width: `${((step + 1) / 6) * 100}%` }}
                                ></div>
                            </div>

                            {/* Step 0: Nome */}
                            {step === 0 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Para começar, qual seu Nome Completo? *</label>
                                    <input
                                        required
                                        autoFocus
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        onKeyDown={e => e.key === 'Enter' && formData.fullName && handleNext()}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                                        placeholder="Seu nome"
                                    />
                                    <button type="button" onClick={handleNext} disabled={!formData.fullName} className="w-full py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all mt-4 disabled:opacity-50 flex justify-center items-center gap-2">
                                        AVANÇAR <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}

                            {/* Step 1: Área de Atuação */}
                            {step === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Qual sua área de atuação? *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {['Lojista', 'Representante', 'Arquiteto/Designer', 'Outro'].map(role => (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => { setFormData({ ...formData, role }); handleNext(); }}
                                                className={`p-4 rounded-xl border text-sm transition-all text-left ${formData.role === role ? 'bg-brand-gold/10 border-brand-gold text-brand-gold' : 'bg-white/5 border-white/10 text-white hover:border-brand-gold/50'}`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                    <button type="button" onClick={handlePrev} className="text-white/40 hover:text-white text-xs flex items-center gap-1 mt-4 transition-colors">
                                        <ArrowLeft size={14} /> Voltar
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Documento */}
                            {step === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Seu CPF ou CNPJ *</label>
                                    <input
                                        required
                                        autoFocus
                                        type="text"
                                        value={formData.document}
                                        onChange={e => setFormData({ ...formData, document: e.target.value })}
                                        onKeyDown={e => e.key === 'Enter' && formData.document && handleNext()}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                    />
                                    <div className="flex gap-4">
                                        <button type="button" onClick={handlePrev} className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all"><ArrowLeft size={16} /></button>
                                        <button type="button" onClick={handleNext} disabled={!formData.document} className="flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                                            AVANÇAR <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Localização */}
                            {step === 3 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">De onde você é? *</label>
                                    <div className="flex gap-4">
                                        <div className="w-1/3">
                                            <input
                                                required
                                                autoFocus
                                                type="text"
                                                maxLength={2}
                                                value={formData.state}
                                                onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20 text-center"
                                                placeholder="UF"
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                required
                                                type="text"
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                onKeyDown={e => e.key === 'Enter' && formData.state && formData.city && handleNext()}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                                                placeholder="Cidade"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={handlePrev} className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all"><ArrowLeft size={16} /></button>
                                        <button type="button" onClick={handleNext} disabled={!formData.state || !formData.city} className="flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                                            AVANÇAR <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Email */}
                            {step === 4 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Seu melhor E-mail *</label>
                                    <input
                                        required
                                        autoFocus
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        onKeyDown={e => e.key === 'Enter' && formData.email && handleNext()}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                                        placeholder="seu@email.com.br"
                                    />
                                    <div className="flex gap-4">
                                        <button type="button" onClick={handlePrev} className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all"><ArrowLeft size={16} /></button>
                                        <button type="button" onClick={handleNext} disabled={!formData.email.includes('@')} className="flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                                            AVANÇAR <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: WhatsApp */}
                            {step === 5 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Para finalizar, seu WhatsApp (Com DDD) *</label>
                                    <input
                                        required
                                        autoFocus
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                                        placeholder="(11) 99999-9999"
                                    />
                                    <div className="flex gap-4">
                                        <button type="button" onClick={handlePrev} className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all"><ArrowLeft size={16} /></button>
                                        <button type="submit" disabled={!formData.phone} className="group flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_40px_rgba(197,160,89,0.3)] disabled:opacity-50 flex justify-center items-center gap-2">
                                            FINALIZAR <CheckCircle2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-center text-[10px] text-white/30 font-medium pt-2">Seus dados estão seguros. Não enviamos spam.</p>
                                </div>
                            )}

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};
