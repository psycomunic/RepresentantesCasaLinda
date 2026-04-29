import React, { useState } from 'react';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Maximize, Monitor, Sparkles, Zap, Brush, Calculator, Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadCapturePageProps {
  onLoginClick: () => void;
}

const LeadCapturePage: React.FC<LeadCapturePageProps> = ({ onLoginClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Formulário de qualificação - Typeform style
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    documento: '',
    cidade: '',
    estado: '',
    core_status: '', // 'sim' | 'nao' | 'em_regularizacao'
    segmentos: [] as string[],
    regioes_atuacao: '',
    quantidade_lojistas: ''
  });

  const segmentosOpcoes = [
    'Móveis', 'Decoração', 'Iluminação', 'Presentes Premium', 'Arquitetura e Design', 'Outros'
  ];

  const handleNext = () => {
    if (step < 8) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleSegmento = (seg: string) => {
    setFormData(prev => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg)
        ? prev.segmentos.filter(s => s !== seg)
        : [...prev.segmentos, seg]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('representantes_leads').insert([
        {
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          documento: formData.documento,
          cidade: formData.cidade,
          estado: formData.estado,
          core_status: formData.core_status,
          segmentos: formData.segmentos,
          regioes_atuacao: formData.regioes_atuacao,
          quantidade_lojistas: formData.quantidade_lojistas,
          status: 'pending'
        }
      ]);

      if (error) {
        console.error('Erro ao enviar lead:', error);
        alert('Ocorreu um erro ao enviar seu cadastro. Tente novamente.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao conectar com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-8 animate-in fade-in zoom-in duration-1000">
        <div className="max-w-md text-center border border-white/10 p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl">
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(197,160,89,0.4)]">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-3xl font-display text-white mb-4 italic tracking-tight">Candidatura Recebida!</h2>
          <p className="text-gray-400 leading-relaxed mb-10 text-sm">
            Nosso time comercial está avaliando sua região e carteira. 
            Em breve retornaremos no seu WhatsApp com os próximos passos, acesso ao portal e treinamento.
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
      <div className="bg-brand-gold text-black text-center py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 shadow-[0_0_20px_rgba(197,160,89,0.3)] relative z-50">
        Vagas limitadas: Estamos selecionando os melhores representantes regionais.
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-2xl bg-black/60 border-b border-white/5 transition-all top-[36px]">
        <div className="flex flex-col">
          <span className="text-2xl font-display tracking-tighter text-white">Casa Linda</span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Atacado Oficial</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
          <a href="#programa" className="hover:text-brand-gold transition-colors">A Operação</a>
          <a href="#beneficios" className="hover:text-brand-gold transition-colors">Vantagens</a>
          <a href="#faq" className="hover:text-brand-gold transition-colors">Dúvidas</a>
        </div>
        <button
          onClick={onLoginClick}
          className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
        >
          Acessar Portal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex items-center border-b border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[1000px] h-[600px] bg-brand-gold/[0.08] lg:bg-brand-gold/[0.06] rounded-full blur-[100px] lg:blur-[140px] -z-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">
          {/* Hero Content */}
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left pt-10 lg:pt-0">
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-1000 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[9px] uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(197,160,89,0.15)]">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
                Seja representante Casa Linda
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display text-white leading-[0.9] tracking-tighter">
                Sua região é <br className="hidden sm:block" /> <span className="italic text-brand-gold">o seu negócio.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light max-w-lg mx-auto lg:mx-0 animate-in slide-in-from-bottom-10 duration-1000 fade-in delay-200">
              Atue com uma marca forte de quadros decorativos, comissão de <strong className="text-white">12%</strong>, catálogo físico e digital, maleta de amostras e plataforma atacado com login próprio para vender com agilidade.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-in slide-in-from-bottom-12 duration-1000 fade-in delay-300">
              <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/70 uppercase tracking-widest font-medium border border-white/5">Comissão de 12%</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/70 uppercase tracking-widest font-medium border border-white/5">Plataforma Atacado</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/70 uppercase tracking-widest font-medium border border-white/5">Catálogo Físico + Amostras</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/70 uppercase tracking-widest font-medium border border-white/5">Ótima Margem</span>
            </div>

            <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
          </div>

          {/* Form Widget */}
          <div className="relative mt-8 lg:mt-0 animate-in slide-in-from-right-12 duration-1000 fade-in delay-500">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/20 to-transparent opacity-50 blur-3xl rounded-full"></div>
            
            <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8 sm:p-12 rounded-[2.5rem] relative z-10 w-full max-w-lg mx-auto lg:mr-0">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-display text-white italic tracking-tight mb-2">Formulário de <span className="text-brand-gold">Qualificação</span></h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Avaliação Estratégica Regional</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-brand-gold transition-all duration-700 ease-out shadow-[0_0_10px_#c5a059]" 
                    style={{ width: `${((step + 1) / 9) * 100}%` }}
                  ></div>
                </div>

                <div className="min-h-[160px] flex flex-col justify-center">
                  {/* Step 0: Nome */}
                  {step === 0 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Como podemos te chamar? *</label>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.nome && handleNext()}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  )}

                  {/* Step 1: E-mail */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Qual o seu melhor e-mail? *</label>
                      <input
                        required
                        autoFocus
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.email.includes('@') && handleNext()}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  )}

                  {/* Step 2: WhatsApp */}
                  {step === 2 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Seu WhatsApp com DDD *</label>
                      <input
                        required
                        autoFocus
                        type="tel"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.whatsapp && handleNext()}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                        placeholder="(00) 90000-0000"
                      />
                    </div>
                  )}

                  {/* Step 3: Documento */}
                  {step === 3 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">CNPJ ou CPF *</label>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.documento}
                        onChange={e => setFormData({ ...formData, documento: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.documento && handleNext()}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                        placeholder="Digite seu documento"
                      />
                    </div>
                  )}

                  {/* Step 4: Localização Base */}
                  {step === 4 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Sua base (Cidade/Estado) *</label>
                      <div className="flex gap-4">
                        <input
                          required
                          autoFocus
                          type="text"
                          value={formData.cidade}
                          onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                          className="w-2/3 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                          placeholder="Cidade"
                        />
                        <input
                          required
                          type="text"
                          maxLength={2}
                          value={formData.estado}
                          onChange={e => setFormData({ ...formData, estado: e.target.value.toUpperCase() })}
                          className="w-1/3 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20 text-center uppercase"
                          placeholder="UF"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: CORE */}
                  {step === 5 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1 mb-2 block">Você possui CORE ativo? *</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { val: 'sim', label: 'Sim, ativo' },
                          { val: 'nao', label: 'Não possuo' },
                          { val: 'em_regularizacao', label: 'Em regularização' }
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, core_status: opt.val });
                              handleNext();
                            }}
                            className={`px-5 py-4 rounded-2xl border text-left font-medium transition-all ${
                              formData.core_status === opt.val 
                                ? 'bg-brand-gold/20 border-brand-gold text-white' 
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Segmentos */}
                  {step === 6 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1 mb-2 block">Quais segmentos você já atende? *</label>
                      <div className="flex flex-wrap gap-2">
                        {segmentosOpcoes.map(seg => (
                          <button
                            key={seg}
                            type="button"
                            onClick={() => toggleSegmento(seg)}
                            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${
                              formData.segmentos.includes(seg)
                                ? 'bg-brand-gold border-brand-gold text-black'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {formData.segmentos.includes(seg) && <Check size={12} strokeWidth={3} />}
                            {seg}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 7: Cidades/Estados de Atuação */}
                  {step === 7 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Em quais cidades e estados você atua? *</label>
                      <textarea
                        required
                        autoFocus
                        rows={3}
                        value={formData.regioes_atuacao}
                        onChange={e => setFormData({ ...formData, regioes_atuacao: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-base text-white placeholder:text-white/20 resize-none"
                        placeholder="Ex: Capital SP, Grande SP e Baixada Santista."
                      />
                    </div>
                  )}

                  {/* Step 8: Lojistas Ativos (Pergunta Chave) */}
                  {step === 8 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold ml-1">Pergunta Estratégica *</label>
                      <h4 className="text-xl text-white font-display mb-4 italic">Quantos lojistas ativos do segmento casa & decoração você atende hoje?</h4>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.quantidade_lojistas}
                        onChange={e => setFormData({ ...formData, quantidade_lojistas: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-xl text-white placeholder:text-white/20"
                        placeholder="Ex: Mais de 50 lojistas ativos."
                      />
                    </div>
                  )}
                </div>

                {/* Form Controls */}
                <div className="flex gap-4 pt-4 mt-6 border-t border-white/5">
                  {step > 0 && (
                    <button type="button" onClick={handlePrev} className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  
                  {step < 8 ? (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all flex justify-center items-center gap-2 shadow-[0_5px_20px_rgba(197,160,89,0.2)]"
                    >
                      AVANÇAR <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !formData.quantidade_lojistas} 
                      className="flex-1 py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_5px_20px_rgba(197,160,89,0.3)]"
                    >
                      {isSubmitting ? 'ENVIANDO...' : 'FINALIZAR CANDIDATURA'} <CheckCircle2 size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 2: Por que a Casa Linda é fácil de representar */}
      <section id="beneficios" className="py-24 sm:py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Destaque Comercial</h2>
            <h3 className="text-4xl sm:text-5xl font-display text-white italic tracking-tight">Por que a Casa Linda é fácil de representar?</h3>
            <p className="text-gray-400 font-light text-lg">
              Você não entra do zero. Entra com marca, portfólio, suporte comercial e estrutura para vender.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Star />, title: "Marca Conhecida", desc: "Abra portas com facilidade." },
              { icon: <Shield />, title: "Alto Valor Percebido", desc: "Produtos que se vendem sozinhos pela qualidade." },
              { icon: <Layers />, title: "Mix Grande de Modelos", desc: "Portfólio amplo para qualquer projeto." },
              { icon: <TrendingUp />, title: "Boa Margem para o Lojista", desc: "Rentabilidade garantida para seu cliente." },
              { icon: <Truck />, title: "Operação Pronta", desc: "Logística e produção eficientes." },
              { icon: <Monitor />, title: "Venda Assistida", desc: "Materiais físicos e digitais de apoio." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#121212] border border-white/5 rounded-2xl hover:border-brand-gold/30 transition-all group flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black text-brand-gold transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display text-white mb-1 tracking-wide">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light uppercase tracking-wider">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-8 flex items-center justify-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(197,160,89,0.1)]">
            <Heart size={20} /> Suporte Dedicado ao Representante
          </div>
        </div>
      </section>

      {/* Bloco 3: O que você recebe */}
      <section className="py-24 sm:py-32 px-6 bg-[#0a0a0a] relative border-b border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Kit Comercial</h2>
            <h3 className="text-4xl sm:text-6xl font-display text-white italic tracking-tight leading-tight">O que você recebe <br/> para começar.</h3>
            
            <ul className="space-y-6">
              {[
                "Catálogo físico",
                "Site atacado com login e senha",
                "Acesso ao catálogo digital",
                "Maleta com amostras de molduras/canvas/acabamentos",
                "Materiais de venda para WhatsApp",
                "Suporte comercial",
                "Comissão de 12%"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-300">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-lg font-light tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              {/* Using a placeholder for the sample kit image */}
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" alt="Kit Representante" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                  <p className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-2">Estrutura Completa</p>
                  <p className="text-white text-sm">Maleta exclusiva de acabamentos para encantar o lojista no momento da visita.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 4 & 5: Quem buscamos & Como funciona */}
      <section id="programa" className="py-24 sm:py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="bg-[#121212] p-10 md:p-14 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] group-hover:bg-brand-gold/20 transition-all duration-700"></div>
            <h3 className="text-3xl font-display text-white italic mb-10">Quem estamos buscando</h3>
            <ul className="space-y-6">
              {[
                "Representantes com carteira ativa",
                "Experiência em casa, decoração, móveis ou afins",
                "Atuação regional",
                "Relacionamento com lojistas",
                "Perfil comercial consultivo",
                "CORE ativo ou em regularização"
              ].map((req, i) => (
                <li key={i} className="flex gap-4 items-start text-zinc-400 font-light">
                  <Star size={18} className="text-brand-gold shrink-0 mt-1" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h3 className="text-3xl font-display text-white italic mb-10 pl-6 border-l-4 border-brand-gold">Como funciona a operação</h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[22px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-gold before:to-transparent">
              {[
                { step: "1", title: "Você se candidata", desc: "Preenche o formulário para análise de perfil." },
                { step: "2", title: "Nosso time avalia", desc: "Analisamos sua região e carteira de clientes." },
                { step: "3", title: "Aprovamos", desc: "Definimos seu território e perfil de atuação." },
                { step: "4", title: "Início da Operação", desc: "Você recebe acesso, treinamento e kit comercial." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-6">
                  <div className="w-11 h-11 rounded-full bg-brand-dark border-2 border-brand-gold flex items-center justify-center font-display text-brand-gold text-xl shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.3)] z-10">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 6: Política Comercial Séria */}
      <section className="py-24 bg-[#0a0a0a] px-6 text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl text-brand-gold mb-6">
            <Shield size={32} />
          </div>
          <h3 className="text-4xl md:text-5xl font-display text-white italic">Política Comercial Séria</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div className="p-6 bg-[#121212] rounded-xl border border-white/5">
              <p className="text-xs text-white uppercase tracking-widest font-bold">Política de Preço <br/>e Canal</p>
            </div>
            <div className="p-6 bg-[#121212] rounded-xl border border-white/5">
              <p className="text-xs text-white uppercase tracking-widest font-bold">Território Definido <br/>conforme potencial</p>
            </div>
            <div className="p-6 bg-[#121212] rounded-xl border border-white/5">
              <p className="text-xs text-white uppercase tracking-widest font-bold">Avaliação por <br/>Performance</p>
            </div>
            <div className="p-6 bg-[#121212] rounded-xl border border-white/5">
              <p className="text-xs text-white uppercase tracking-widest font-bold">Estrutura para <br/>Crescimento Regional</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-brand-dark px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Dúvidas Frequentes</h2>
            <h3 className="text-4xl font-display text-white italic">Tudo o que você precisa saber</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { 
                q: "Como funciona a comissão?", 
                a: "A comissão é de 12% sobre as vendas faturadas e pagas da carteira desenvolvida pelo representante, conforme a política comercial da Casa Linda. Todo o acompanhamento de pedidos, comissões e desempenho será feito pela nossa plataforma de atacado, com login e senha exclusivos." 
              },
              { 
                q: "Preciso ter experiência no segmento?", 
                a: "Sim. Buscamos representantes que já atuem no segmento de casa, decoração, móveis, iluminação, presentes premium ou áreas correlatas, e que já tenham carteira ativa de lojistas na região. Nosso objetivo é trabalhar com profissionais que conheçam o mercado e tenham capacidade real de desenvolver a marca." 
              },
              { 
                q: "Preciso ter CORE?", 
                a: "Avaliamos representantes que possuem CORE ativo ou que estejam em processo de regularização para atuar legalmente na profissão." 
              },
              { 
                q: "A Casa Linda já atende minha região?", 
                a: "A Casa Linda está em expansão nacional e avalia cada região de forma estratégica. Durante o processo seletivo, analisamos sua área de atuação, carteira de clientes e potencial comercial para definir disponibilidade e modelo de desenvolvimento da região." 
              },
              { 
                q: "Como funciona o site atacado?", 
                a: "O representante aprovado recebe login e senha exclusivos para acessar o nosso site de atacado, que funciona como catálogo digital e ferramenta comercial. Nele, você poderá consultar portfólio, materiais de apoio, informações comerciais e registrar pedidos com mais agilidade e organização." 
              },
              { 
                q: "Recebo catálogo físico e amostras?", 
                a: "Sim. Os representantes aprovados recebem catálogo físico, acesso ao catálogo digital e uma maleta com amostras de molduras, canvas e acabamentos, para apoiar as visitas comerciais e facilitar a apresentação da marca aos lojistas." 
              },
              { 
                q: "Existe exclusividade?", 
                a: "A política de exclusividade é definida conforme a região e o potencial comercial, sempre vinculada a critérios de desenvolvimento e performance. Nosso objetivo é construir parcerias consistentes e bem distribuídas, com organização territorial e foco em resultado." 
              },
              { 
                q: "Posso representar outras marcas não concorrentes?", 
                a: "Sim, desde que não haja conflito com a atuação da Casa Linda nem concorrência direta com o nosso posicionamento. Avaliamos esse ponto no processo de seleção para garantir alinhamento comercial e proteção da marca em cada região." 
              }
            ].map((faq, i) => (
              <div key={i} className={`bg-[#121212] overflow-hidden transition-all duration-500 rounded-xl border ${openFaq === i ? 'border-brand-gold/30 shadow-[0_0_15px_rgba(197,160,89,0.1)]' : 'border-white/5'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left group">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${openFaq === i ? 'text-brand-gold' : 'text-zinc-300 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-brand-gold' : 'text-zinc-600'}`}>
                    <ChevronRight size={18} className={openFaq === i ? 'text-brand-gold' : ''} />
                  </div>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 pt-2">
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-[#0a0a0a] text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-white leading-tight italic">
            Se você já atua com lojas do segmento casa & decoração e quer representar uma marca com estrutura real de venda, cadastre-se.
          </h2>
          
          <div className="flex justify-center pt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative overflow-hidden bg-brand-gold text-black px-10 md:px-16 py-6 md:py-8 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 rounded-full shadow-[0_10px_40px_rgba(197,160,89,0.3)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">QUERO ME CADASTRAR AGORA <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center bg-black">
        <div className="text-2xl font-display tracking-tighter text-white italic opacity-50 mb-4">Casa Linda</div>
        <p className="text-[8px] uppercase tracking-[0.5em] text-white/30">© 2024 Casa Linda Decorações — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default LeadCapturePage;
