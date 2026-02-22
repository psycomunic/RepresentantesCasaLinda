import React, { useState } from 'react';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Image, Layers, Frame, Palette, Maximize, Monitor, Sparkles, Zap, Brush, Calculator, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { leadStore } from '../lib/leadStore';

interface LeadCapturePageProps {
  onLoginClick: () => void;
}

const LeadCapturePage: React.FC<LeadCapturePageProps> = ({ onLoginClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const [calcValue, setCalcValue] = useState<number>(15000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Typeform state
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    document: '',
    state: '',
    city: '',
    email: '',
    phone: '',
  });

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    leadStore.addLead(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-8 animate-in fade-in zoom-in duration-1000">
        <div className="max-w-md text-center border border-white/10 p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl">
          <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(197,160,89,0.4)]">
            <CheckCircle2 className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-display text-white mb-4 italic">Solicitação em Análise</h2>
          <p className="text-gray-400 leading-relaxed mb-8 text-sm">
            Nossa diretoria comercial está revisando seu CNPJ para garantir a exclusividade na sua região.
            <strong> Retornaremos no seu WhatsApp em até 2 horas úteis.</strong>
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-white transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-gold selection:text-black font-sans">

      {/* Alert Banner */}
      <div className="bg-brand-gold text-black text-center py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4">
        Vagas limitadas por região: Apenas 1 representante Premium aprovado por cidade.
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-2xl bg-black/60 border-b border-white/5 transition-all">
        <div className="flex flex-col">
          <span className="text-2xl font-display tracking-tighter text-white">Casa Linda</span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Black Label Atacado</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
          <a href="#vantagens" className="hover:text-brand-gold transition-colors">Vantagens</a>
          <a href="#depoimentos" className="hover:text-brand-gold transition-colors">Resultados</a>
          <a href="#faq" className="hover:text-brand-gold transition-colors">Dúvidas</a>
        </div>
        <button
          onClick={onLoginClick}
          className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
        >
          Portal do Representante
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[1000px] h-[600px] bg-brand-gold/[0.08] lg:bg-brand-gold/[0.05] rounded-full blur-[100px] lg:blur-[120px] -z-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left pt-10 lg:pt-0">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[9px] uppercase tracking-[0.3em] font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
                Seja um Representante Oficial
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display text-white leading-[0.9] tracking-tighter">
                Venda a Maior <br className="hidden sm:block" /> <span className="italic text-brand-gold">do Brasil.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              A Casa Linda Decorações é a maior fábrica de quadros e espelhos do país. Forme sua carteira de lojistas com obras de alto padrão e receba <strong>comissões acima da média do mercado</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-12">
              <div className="flex -space-x-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="Consultor" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" alt="Consultor" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=100&h=100" alt="Consultor" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark bg-brand-gold flex items-center justify-center text-black text-xs font-bold">+150</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1 justify-center sm:justify-start mb-1 text-brand-gold">
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Representantes Faturando<br />Todos os meses</p>
              </div>
            </div>

            <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            {/* Decorative element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/20 to-transparent opacity-50 blur-2xl rounded-full"></div>

            <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 rounded-[2.5rem] relative z-10 w-full max-w-lg mx-auto lg:mr-0">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display text-white italic tracking-tight">Análise de <span className="text-brand-gold">Perfil</span></h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-3 font-bold">Apenas para Representantes e Vendedores Externos (CORE não obrigatório)</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

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
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-white/5 bg-black/50 py-10 overflow-hidden hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Casa_e_Jardim_logo.svg/2560px-Casa_e_Jardim_logo.svg.png" alt="Featured" className="h-6 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Casa_Vogue_logo.png" alt="Featured" className="h-5 object-contain invert" />
          <img src="https://logodownload.org/wp-content/uploads/2019/07/casacor-logo-0.png" alt="Featured" className="h-8 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Forbes_logo.svg/2560px-Forbes_logo.svg.png" alt="Featured" className="h-7 object-contain invert" />
        </div>
      </section>

      {/* Value Proposition */}
      <section id="vantagens" className="py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Por que representar a Casa Linda?</h2>
            <h3 className="text-4xl sm:text-5xl font-display text-white italic tracking-tight">Qualidade Incomparável.</h3>
            <p className="text-gray-400 font-light text-lg">Nós não brigamos por preço nos marketplaces. Nosso foco é entregar o mais alto padrão e a maior variedade de quadros e espelhos do Brasil, para que você construa uma carteira de lojistas recorrentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <TrendingUp className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Comissões Agressivas</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Valorizamos o representante de verdade. Trabalhamos com comissões significativamente acima da média do mercado para premiar quem traz grandes resultados e veste nossa camisa.</p>
            </div>

            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group text-center md:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full"></div>
              <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <Shield className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Exclusividade Territorial</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Sua região, suas vendas. Nós mapeamos as praças com inteligência e garantimos atuação fechada para os nossos representantes de alta performance evitarem conflitos.</p>
            </div>

            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <Truck className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Pós-venda Sem Dores de Cabeça</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Nossas embalagens em madeira e papelão triplo garantem que 99.8% das peças cheguem intactas. Feche vendas maiores sem medo de devoluções por problemas no transporte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Materials Section */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Acabamento Premium</h2>
            <h3 className="text-3xl md:text-5xl font-display italic text-white">Materiais de Padrão Galeria</h3>
            <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Trabalhamos com materiais de padrão galeria para garantir durabilidade e impacto visual em todas as vendas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-[#121212] p-8 md:p-12 rounded-2xl text-center hover:-translate-y-2 transition-all duration-500 border border-white/5">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-brand-gold/20 mb-6 overflow-hidden shadow-[0_0_20px_rgba(197,160,89,0.2)] group-hover:border-brand-gold transition-all">
                <img src="/images/papel-fotografico.jpg" alt="Papel Fotográfico" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="text-xl font-display text-white mb-4">Papel Fotográfico</h4>
              <p className="text-zinc-400 text-sm leading-relaxed font-light tracking-wide">Nitidez máxima e cores vibrantes.</p>
            </div>
            <div className="group relative bg-[#121212] p-8 md:p-12 rounded-2xl text-center hover:-translate-y-2 transition-all duration-500 border border-white/5">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-brand-gold/20 mb-6 overflow-hidden shadow-[0_0_20px_rgba(197,160,89,0.2)] group-hover:border-brand-gold transition-all">
                <img src="/images/vinil-fotografico.jpg" alt="Vinil Fotográfico Texturizado" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="text-xl font-display text-white mb-4">Vinil Fotográfico Texturizado</h4>
              <p className="text-zinc-400 text-sm leading-relaxed font-light tracking-wide">Versatilidade e resistência com excelente acabamento.</p>
            </div>
            <div className="group relative bg-[#121212] p-8 md:p-12 rounded-2xl text-center hover:-translate-y-2 transition-all duration-500 border border-white/5">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-brand-gold/20 mb-6 overflow-hidden shadow-[0_0_20px_rgba(197,160,89,0.2)] group-hover:border-brand-gold transition-all">
                <img src="/images/canvas-museologico.jpg" alt="Canvas Museológico 100% Algodão" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="text-xl font-display text-white mb-4">Canvas Museológico 100% Algodão</h4>
              <p className="text-zinc-400 text-sm leading-relaxed font-light tracking-wide">A textura da tela de pintura com máxima qualidade de conservação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-black border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {[
              "Sem exclusividade",
              "Sem metas obrigatórias",
              "Comissão acompanhada em dashboard"
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 group text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm md:text-base text-zinc-200 uppercase tracking-widest font-bold group-hover:text-white transition-colors max-w-[200px] md:max-w-none leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Liberdade Criativa</h2>
                <h3 className="text-3xl md:text-5xl font-display italic text-white leading-tight">Personalização Total <br /> para Seus Projetos</h3>
              </div>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Oferecemos um acervo completo de artes em altíssima resolução e mais de <span className="text-white border-b border-brand-gold/50">250 modelos de molduras</span> para que cada detalhe reflita a identidade do seu projeto ou cliente lojista.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 items-start group">
                  <div className="p-3 rounded-lg bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-display text-lg mb-1">Acervo Exclusivo</h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">Artes em Alta Resolução</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="p-3 rounded-lg bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors">
                    <Frame size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-display text-lg mb-1">Molduras Premium</h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">+250 Opções de Acabamento</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1000&auto=format&fit=crop" alt="Acervo de Artes" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-64 bg-black/60 p-6 border-l-4 border-brand-gold backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-2 text-brand-gold">
                    <Maximize size={16} />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Qualidade Ultra HD</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">Impressão fine art com fidelidade de cor e detalhes impressionantes.</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferencial Elite */}
      <section className="py-16 md:py-24 px-6 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16 text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold">Diferencial Elite</h2>
              <h3 className="text-4xl md:text-6xl font-display italic text-white leading-tight">Sua marca em primeiro plano. <br /> Nosso acervo como suporte.</h3>
              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
                Desenvolvemos um ecossistema exclusivo para que você tenha o controle total. Gere propostas imersivas em segundos, personalizadas com a <span className="text-white border-b border-brand-gold">identidade da sua representação</span>.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Zap />, title: "Comissão Superior", desc: "Repasse de 15% a 20% em cada indicação." },
                { icon: <Monitor />, title: "Portal White Label", desc: "Propostas PDF com a sua marca e assinatura." },
                { icon: <Sparkles />, title: "Produção Própria", desc: "Acesso a obras exclusivas de artistas nacionais." }
              ].map((item, i) => (
                <div key={i} className="bg-[#121212] border border-white/5 p-8 rounded-2xl group hover:bg-white/10 transition-all text-left">
                  <div className="flex flex-col gap-6 items-center text-center">
                    <div className="text-brand-gold group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h5 className="text-sm font-bold uppercase tracking-widest text-white">{item.title}</h5>
                      <p className="text-[11px] text-zinc-500 mt-2 uppercase tracking-wider leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher Casa Linda */}
      <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-24 space-y-6">
            <h3 className="text-3xl md:text-6xl font-display italic text-white">Por que representantes escolhem a Casa Linda</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Sparkles size={24} />, title: "Quadros Exclusivos", desc: "Artistas internos e obras registradas/patenteadas, garantindo exclusividade total da marca." },
              { icon: <Zap size={24} />, title: "Produção Artesanal", desc: "Cada quadro é feito à mão e reproduzido em impressão de última geração FULL HD 4K." },
              { icon: <Shield size={24} />, title: "Canvas Autêntico", desc: "Tecido 100% algodão padrão museu. Textura artística e proteção para longevidade." }
            ].map((item, i) => (
              <div key={i} className="bg-[#121212] border border-white/5 p-8 rounded-2xl space-y-6 group hover:-translate-y-2 transition-all duration-500 text-brand-gold">
                <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <h4 className="text-lg font-display text-white tracking-wide">{item.title}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSO ARTISTA */}
      <section className="py-12 md:py-24 bg-[#0a0a0a] relative overflow-hidden px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl rotate-2 hover:rotate-0 transition-all duration-700 overflow-hidden group">
                <img src="/images/rod-artist.jpg" className="w-full h-[450px] md:h-[600px] object-cover rounded-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" alt="Artista Rod" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <p className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Residente Casa Linda</p>
                  <h4 className="text-4xl font-display text-white italic">Rod</h4>
                </div>
              </div>
            </div>
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold">A Mão por Trás da Obra</h2>
                <h3 className="text-5xl md:text-7xl font-display italic text-white">Nosso Artista</h3>
              </div>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Rod é artista residente da Casa Linda, com obras autorais desenvolvidas exclusivamente para oferecer diferenciais aos lojistas. Suas criações unem <span className="text-white italic">autenticidade</span>, <span className="text-white italic">sofisticação</span> e <span className="text-white italic">controle criativo</span>, permitindo obras sob medida alinhadas ao conceito de exclusividade.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                <div className="space-y-2">
                  <p className="text-brand-gold text-[10px] uppercase tracking-widest font-bold">Projetos Personalizados</p>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed">Criações artísticas sob medida para seu parceiro lojista.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-brand-gold text-[10px] uppercase tracking-widest font-bold">Selo Autoral</p>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed">Cada peça carrega a essência e assinatura do artista.</p>
                </div>
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-6 border border-brand-gold/30 text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brand-gold hover:text-black transition-all group rounded-xl">
                <span className="flex items-center gap-4">Conhecer Acervo Autoral <Brush size={14} /></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMA DE REPRESENTANTES Section */}
      <section id="programa" className="py-24 bg-brand-dark px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Transparência Total</h2>
            <h3 className="text-3xl md:text-5xl font-display text-white">Programa de Representantes Casa Linda</h3>
            <p className="text-zinc-500 text-sm font-light max-w-2xl mx-auto leading-relaxed">
              Uma estrutura desenhada para refletir a realidade das vendas B2B, com metas acessíveis e evolução automática.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 bg-[#121212] border border-white/5 p-8 md:p-12 rounded-2xl">
              <h4 className="text-xl font-display text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-gold"></span>
                Tabela de Progressão Mensal
              </h4>
              <div className="space-y-1">
                {[
                  { range: "Até R$ 5.999", percent: "15%" },
                  { range: "De R$ 6.000 a R$ 11.999", percent: "16%" },
                  { range: "De R$ 12.000 a R$ 19.999", percent: "17%" },
                  { range: "De R$ 20.000 a R$ 29.999", percent: "18%" },
                  { range: "De R$ 30.000 a R$ 39.999", percent: "19%" },
                  { range: "A partir de R$ 40.000", percent: "20%", highlight: true }
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center p-4 rounded border border-white/5 transition-all hover:bg-white/5 ${row.highlight ? 'bg-brand-gold/10 border-brand-gold/30' : 'bg-transparent'}`}>
                    <span className={`text-xs md:text-sm uppercase tracking-wider font-bold ${row.highlight ? 'text-white' : 'text-zinc-400'}`}>{row.range}</span>
                    <span className={`text-xl font-bold font-display ${row.highlight ? 'text-brand-gold' : 'text-zinc-200'}`}>{row.percent}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#121212] border border-white/5 p-8 md:p-10 border-t-4 border-brand-gold rounded-2xl">
                <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-6">Regras Importantes</h4>
                <ul className="space-y-4">
                  {[
                    "Comissão sobre vendas confirmadas no mês.",
                    "Progressão automática e reavaliada mensalmente.",
                    "Sem penalidades se o volume diminuir.",
                    "Sem metas mínimas obrigatórias.",
                    "Condições especiais para projetos de alto volume."
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-400 font-light leading-relaxed">
                      <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#121212] border border-white/5 p-8 md:p-10 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart size={80} strokeWidth={1} className="text-brand-gold" />
                </div>
                <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">Compromisso Casa Linda</h4>
                <p className="text-zinc-200 text-sm leading-relaxed font-light">
                  Acreditamos em parcerias de longo prazo. Criamos esta estrutura para incentivar seu crescimento constante e recompensar sua recorrência de forma justa e sustentável.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Ganhos */}
      <section id="comissao" className="py-24 bg-[#0a0a0a] px-6 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Rentabilidade Exclusiva</h3>
            <h2 className="text-5xl md:text-7xl font-display text-white">Onde o lucro <br /> abraça a arte.</h2>
            <p className="text-zinc-500 font-light text-lg">
              Nosso modelo de negócio foi desenhado para profissionais de elite. Enquanto o mercado oferece 10%, a Casa Linda garante <span className="text-white font-bold">até 20%</span>.
            </p>
            <div className="flex items-center gap-6 p-8 bg-[#121212] border-l-4 border-brand-gold rounded-r-2xl border-y border-r border-white/5">
              <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-full text-brand-gold">
                <Calculator size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Potencial de Ganho</p>
                <p className="text-sm text-zinc-200">Simule agora o retorno de suas próximas vendas.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full bg-[#121212] border border-white/5 p-12 md:p-16 relative rounded-2xl">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Volume de Vendas (Mês)</span>
                  <span className="text-4xl font-display text-brand-gold">{formatCurrency(calcValue)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={calcValue}
                  onChange={(e) => setCalcValue(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-brand-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-10 pt-10 border-t border-white/5">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Retorno Estimado (15% a 20%)</p>
                  <p className="text-5xl font-display text-white">{formatCurrency(calcValue * 0.15)} a {formatCurrency(calcValue * 0.2)}</p>
                </div>
                <div className="opacity-40">
                  <p className="text-[10px] uppercase tracking-widest font-bold">Lojista Comum (10%)</p>
                  <p className="text-3xl font-display text-zinc-400">{formatCurrency(calcValue * 0.1)}</p>
                </div>
              </div>

              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full py-6 mt-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-brand-gold transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] rounded-xl">
                QUERO ME TORNAR REPRESENTANTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold mb-4">Time de Elite</h2>
            <h3 className="text-3xl sm:text-5xl font-display text-white italic tracking-tight">O que dizem os representantes.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] relative">
              <div className="text-brand-gold/20 text-6xl font-display absolute top-6 right-8">"</div>
              <div className="flex items-center gap-1 mb-6 text-brand-gold">
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
              </div>
              <p className="text-lg text-white font-light italic leading-relaxed mb-8">
                "Eu já tinha uma boa carteira no ramo moveleiro, mas quando incluí a Casa Linda, minha média de comissão mensal dobrou. Eles entregam um produto que os lojistas amam exibir na vitrine principal."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Roberto M.</p>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest mt-1 font-bold">Representante - Região Sul</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] relative">
              <div className="text-brand-gold/20 text-6xl font-display absolute top-6 right-8">"</div>
              <div className="flex items-center gap-1 mb-6 text-brand-gold">
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold" />
              </div>
              <p className="text-lg text-white font-light italic leading-relaxed mb-8">
                "O portal digital simplificou muito as coisas. Consigo apresentar todo o catálogo na visita, gerar o faturamento no boleto ali na mesa com a arquiteta, e a comissão sempre cai certinho e acima do mercado."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Amanda C.</p>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest mt-1 font-bold">Representante Comercial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-brand-dark px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Dúvidas Frequentes</h2>
            <h3 className="text-4xl font-display text-white">Perguntas Comuns</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Quais lojistas posso atender?", a: "Você tem liberdade para prospectar e atender lojas de móveis refinados, lojas de decoração de alto padrão e galerias que valorizem nosso nível de acabamento, desde que respeite a exclusividade territorial." },
              { q: "Posso vender quadros e espelhos sob medida?", a: "Sim, esse é um dos nossos maiores diferenciais. Produzimos tamanhos personalizados para que o lojista atenda projetos específicos dos clientes finais dele." },
              { q: "Como funciona a comissão em carteira ativa?", a: "Toda compra recorrente do lojista na sua carteira gera comissão para você, enquanto o cliente estiver ativo sob seu atendimento contínuo. Queremos que você construa uma carteira sólida a longo prazo." },
              { q: "Como acompanho minhas comissões e pedidos?", a: "Através do Portal B2B. Lá você visualiza todos os pedidos dos seus lojistas, o status de entrega e a projeção de repasse da sua comissão com total transparência." },
              { q: "Qual a periodicidade dos pagamentos?", a: "Os valores são liberados de acordo com os pagamentos recebidos dos boletos dos lojistas mensais, garantindo fluxo regular conforme o recebimento da fábrica." },
              { q: "Existem metas ou volumes mínimos para me manter?", a: "Nosso sistema avalia o engajamento e a qualidade da prospecção para graduar os níveis de comissão (até 20%), nosso foco é manter representantes consistentes na equipe com boa margem, não focamos apenas em quem 'vende mais'." },
              { q: "A Casa Linda faz a entrega diretamente na loja?", a: "Sim. A nossa logística cuidará do transporte seguro cobrindo quase todo território nacional, para que as obras cheguem protegidas diretamente no CD ou loja do cliente." }
            ].map((faq, i) => (
              <div key={i} className={`bg-[#121212] overflow-hidden transition-all duration-500 rounded-xl border ${openFaq === i ? 'border-brand-gold/30' : 'border-white/5'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left group">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${openFaq === i ? 'text-brand-gold' : 'text-zinc-300 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-brand-gold' : 'text-zinc-600'}`}>
                    <Star size={14} className={openFaq === i ? 'fill-brand-gold' : ''} />
                  </div>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 pt-2">
                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final: High Urgency */}
      <section className="py-32 bg-[#0a0a0a] text-center px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-brand-gold/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_60%)]"></div>

        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-[#121212] border border-white/5 flex items-center justify-center rounded-full text-brand-gold animate-bounce shadow-lg">
              <Star size={20} />
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-display italic text-white leading-tight md:leading-none tracking-tighter">
            Sua Carteira <br />é Poder.
          </h2>
          <p className="text-sm md:text-xl font-light tracking-[0.3em] text-zinc-400 uppercase max-w-2xl mx-auto leading-relaxed">
            Não oferte apenas produtos básicos. Construa negócios de alto ticket oferecendo um ecossistema premium aos lojistas.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative overflow-hidden bg-white text-black px-8 md:px-20 py-6 md:py-8 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold transition-all hover:scale-105 w-full md:w-auto rounded-full"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">CADASTRAR MEU PERFIL AGORA <ArrowRight size={16} /></span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em]">Avaliação em até 2 horas úteis</p>
        </div>
      </section>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #c5a059;
          cursor: pointer;
          border: 4px solid #1a1a1a;
          box-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
        }
      `}</style>
      <footer className="py-12 border-t border-white/10 text-center bg-black">
        <div className="text-2xl font-display tracking-tighter text-white italic opacity-50 mb-4">Casa Linda</div>
        <p className="text-[8px] uppercase tracking-[0.5em] text-white/30">© 2024 Casa Linda Decorações — B2B Atacado</p>
      </footer>
    </div>
  );
};

export default LeadCapturePage;
