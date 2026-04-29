import React, { useState } from 'react';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Monitor, Heart, ArrowRight, ArrowLeft, Check, Layers } from 'lucide-react';
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
      <div className="min-h-screen bg-brand-dark bg-noise flex items-center justify-center p-8 animate-in fade-in zoom-in duration-1000 relative overflow-hidden">
        {/* Abstract Orbs for Success */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/[0.05] rounded-full blur-[150px] animate-pulse-slow pointer-events-none"></div>

        <div className="max-w-xl text-center p-16 rounded-[3rem] glass-panel glass-edge relative z-10">
          <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_60px_rgba(197,160,89,0.5)]">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6 italic tracking-tight">Candidatura Recebida!</h2>
          <p className="text-zinc-400 leading-relaxed mb-12 text-lg font-light">
            Nosso time comercial está avaliando sua região e carteira. 
            Em breve retornaremos no seu WhatsApp com os próximos passos e acesso ao portal.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold hover:text-white transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark bg-noise text-white selection:bg-brand-gold selection:text-black font-sans relative">
      
      {/* Alert Banner */}
      <div className="bg-brand-gold text-black text-center py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 shadow-[0_0_20px_rgba(197,160,89,0.3)] relative z-50">
        Vagas limitadas: Selecionando os melhores representantes regionais.
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 px-6 sm:px-10 py-5 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-white/5 transition-all top-[40px]">
        <div className="flex flex-col">
          <span className="text-2xl font-display tracking-tighter text-white">Casa Linda</span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Atacado Oficial</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
          <a href="#programa" className="hover:text-brand-gold transition-colors">A Operação</a>
          <a href="#beneficios" className="hover:text-brand-gold transition-colors">Vantagens</a>
          <a href="#faq" className="hover:text-brand-gold transition-colors">Dúvidas</a>
        </div>
        <button
          onClick={onLoginClick}
          className="px-8 py-3 bg-white/[0.03] border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all"
        >
          Acessar Portal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex items-center border-b border-white/5">
        
        {/* Floating 3D Orbs / Volumetric Lights */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/[0.05] rounded-full blur-[150px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-gold/[0.02] rounded-full blur-[180px] pointer-events-none animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">
          
          {/* Hero Content */}
          <div className="space-y-10 lg:space-y-14 text-center lg:text-left">
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-1000 fade-in">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(197,160,89,0.15)]">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
                Seja Representante Black Label
              </div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-sans font-bold text-white leading-[0.9] tracking-tighter">
                Sua região é <br className="hidden sm:block" /> <span className="font-display italic font-normal text-brand-gold">o seu império.</span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-zinc-400 leading-relaxed font-light max-w-xl mx-auto lg:mx-0 animate-in slide-in-from-bottom-10 duration-1000 fade-in delay-200">
              Assuma o mercado local com a marca mais cobiçada de quadros decorativos. Comissão premium de <strong className="text-white font-medium">12%</strong> e portal exclusivo de vendas.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-in slide-in-from-bottom-12 duration-1000 fade-in delay-300">
              <span className="px-5 py-2.5 glass-panel rounded-full text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Comissão 12%</span>
              <span className="px-5 py-2.5 glass-panel rounded-full text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Plataforma Exclusiva</span>
              <span className="px-5 py-2.5 glass-panel rounded-full text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Maleta de Amostras</span>
            </div>
            
            <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
          </div>

          {/* Premium Glassmorphism Typeform Widget */}
          <div className="relative mt-8 lg:mt-0 animate-in slide-in-from-right-12 duration-1000 fade-in delay-500">
            <div className="glass-panel glass-edge p-10 sm:p-14 rounded-[3rem] relative z-10 w-full max-w-xl mx-auto lg:mr-0 min-h-[480px] flex flex-col">
              
              <div className="mb-12 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Qualificação</span>
                <span className="text-xs font-bold text-zinc-500 font-display italic tracking-widest">{step + 1} / 9</span>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* Step 0: Nome */}
                  {step === 0 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">1. Qual o seu nome completo?</label>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.nome && handleNext()}
                        className="w-full text-3xl md:text-5xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2"
                        placeholder="Ex: João da Silva"
                      />
                    </div>
                  )}

                  {/* Step 1: E-mail */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">2. Qual o seu melhor e-mail?</label>
                      <input
                        required
                        autoFocus
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.email.includes('@') && handleNext()}
                        className="w-full text-3xl md:text-5xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2"
                        placeholder="email@exato.com"
                      />
                    </div>
                  )}

                  {/* Step 2: WhatsApp */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">3. Seu WhatsApp com DDD</label>
                      <input
                        required
                        autoFocus
                        type="tel"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.whatsapp && handleNext()}
                        className="w-full text-3xl md:text-5xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2"
                        placeholder="(00) 90000-0000"
                      />
                    </div>
                  )}

                  {/* Step 3: Documento */}
                  {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">4. Qual seu CNPJ ou CPF?</label>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.documento}
                        onChange={e => setFormData({ ...formData, documento: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && formData.documento && handleNext()}
                        className="w-full text-3xl md:text-5xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2"
                        placeholder="Digite os números"
                      />
                    </div>
                  )}

                  {/* Step 4: Localização Base */}
                  {step === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">5. Onde fica sua base de operação?</label>
                      <div className="flex gap-4">
                        <input
                          required
                          autoFocus
                          type="text"
                          value={formData.cidade}
                          onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                          className="w-2/3 text-3xl md:text-4xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2"
                          placeholder="Cidade"
                        />
                        <input
                          required
                          type="text"
                          maxLength={2}
                          value={formData.estado}
                          onChange={e => setFormData({ ...formData, estado: e.target.value.toUpperCase() })}
                          className="w-1/3 text-3xl md:text-4xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2 text-center uppercase"
                          placeholder="UF"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: CORE */}
                  {step === 5 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">6. Você possui CORE ativo?</label>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {[
                          { val: 'sim', label: 'Sim, possuo ativo' },
                          { val: 'nao', label: 'Não possuo' },
                          { val: 'em_regularizacao', label: 'Em fase de regularização' }
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, core_status: opt.val });
                              setTimeout(handleNext, 300); // Slight delay for visual feedback
                            }}
                            className={`px-8 py-5 rounded-[1.5rem] border text-left font-display text-xl md:text-2xl italic transition-all duration-300 ${
                              formData.core_status === opt.val 
                                ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_30px_rgba(197,160,89,0.3)]' 
                                : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05] hover:text-white hover:border-white/20'
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
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1 mb-4 block">7. Quais segmentos você já atende?</label>
                      <div className="flex flex-wrap gap-3">
                        {segmentosOpcoes.map(seg => (
                          <button
                            key={seg}
                            type="button"
                            onClick={() => toggleSegmento(seg)}
                            className={`px-6 py-3 rounded-full border text-sm font-bold tracking-widest transition-all flex items-center gap-3 ${
                              formData.segmentos.includes(seg)
                                ? 'bg-brand-gold border-brand-gold text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                                : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05] hover:text-white hover:border-white/20'
                            }`}
                          >
                            {formData.segmentos.includes(seg) && <Check size={16} strokeWidth={3} />}
                            {seg}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 7: Regiões de Atuação */}
                  {step === 7 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">8. Cidades/Estados de atuação:</label>
                      <textarea
                        required
                        autoFocus
                        rows={2}
                        value={formData.regioes_atuacao}
                        onChange={e => setFormData({ ...formData, regioes_atuacao: e.target.value })}
                        className="w-full text-2xl md:text-3xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2 resize-none"
                        placeholder="Ex: Todo estado de SP e Sul de MG"
                      />
                    </div>
                  )}

                  {/* Step 8: Pergunta Chave */}
                  {step === 8 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 ml-1">9. Pergunta Estratégica</label>
                      <h4 className="text-2xl md:text-3xl text-brand-gold font-display italic leading-tight">Quantos lojistas ativos do segmento de casa & decoração você atende hoje?</h4>
                      <input
                        required
                        autoFocus
                        type="text"
                        value={formData.quantidade_lojistas}
                        onChange={e => setFormData({ ...formData, quantidade_lojistas: e.target.value })}
                        className="w-full text-3xl md:text-4xl font-display italic text-white placeholder:text-white/10 input-gold-glow pb-2 mt-6"
                        placeholder="Ex: Aproximadamente 50 ativos."
                      />
                    </div>
                  )}

                </div>

                {/* Form Controls */}
                <div className="flex gap-4 pt-8">
                  {step > 0 && (
                    <button type="button" onClick={handlePrev} className="p-5 glass-panel rounded-[1.5rem] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all border border-white/5">
                      <ArrowLeft size={24} />
                    </button>
                  )}
                  
                  {step < 8 ? (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="flex-1 py-5 bg-white text-black rounded-[1.5rem] font-bold text-xs tracking-[0.3em] uppercase hover:bg-brand-gold hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all flex justify-center items-center gap-3 duration-300"
                    >
                      Avançar <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !formData.quantidade_lojistas} 
                      className="flex-1 py-5 bg-brand-gold text-black rounded-[1.5rem] font-bold text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50 flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:scale-[1.02] duration-300"
                    >
                      {isSubmitting ? 'Enviando...' : 'Finalizar Aplicação'} <CheckCircle2 size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 2: Benefícios Premium */}
      <section id="beneficios" className="py-32 px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Estrutura de Ponta</h2>
            <h3 className="text-5xl sm:text-6xl font-display text-white italic tracking-tight">O poder de uma grande marca <br/> em suas mãos.</h3>
            <p className="text-zinc-400 font-light text-xl">
              Você não começa do zero. Você entra em campo com uma infraestrutura projetada para fechar negócios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Star size={24}/>, title: "Autoridade de Marca", desc: "Abra portas com facilidade e feche negócios grandes." },
              { icon: <Shield size={24}/>, title: "Valor Percebido", desc: "Acabamentos finos que justificam o investimento." },
              { icon: <Layers size={24}/>, title: "Portfólio Infinito", desc: "Modelos para atender desde estúdios a mansões." },
              { icon: <TrendingUp size={24}/>, title: "Margem Agressiva", desc: "Garanta a lucratividade do seu lojista parceiro." },
              { icon: <Truck size={24}/>, title: "Logística Eficiente", desc: "Produção e entrega que honram sua palavra." },
              { icon: <Monitor size={24}/>, title: "Plataforma Própria", desc: "Tecnologia para gerir seus pedidos em tempo real." }
            ].map((item, i) => (
              <div key={i} className="p-10 glass-panel glass-edge rounded-[2rem] group hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-black transition-colors duration-500">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-display text-white mb-3 italic tracking-wide">{item.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-panel rounded-full p-8 flex items-center justify-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(197,160,89,0.1)] mx-auto max-w-xl">
            <Heart size={20} /> Suporte Consultivo ao Representante
          </div>
        </div>
      </section>

      {/* Bloco 3: Kit Comercial */}
      <section className="py-32 px-6 relative border-b border-white/5 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.04] blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">O Seu Arsenal</h2>
              <h3 className="text-5xl sm:text-7xl font-display text-white italic tracking-tight leading-[1.1]">Kit Premium <br/> de Vendas.</h3>
            </div>
            
            <ul className="space-y-8">
              {[
                "Catálogo de Luxo (Físico)",
                "Acesso ao Portal de Atacado (Login Exclusivo)",
                "Catálogos Digitais e Material de WhatsApp",
                "Maleta Black Label com Amostras Reais",
                "Suporte Comercial Full-Time",
                "Comissão Fixa de 12%"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full glass-panel glass-edge flex items-center justify-center text-brand-gold shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-xl text-zinc-300 font-light tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] glass-panel glass-edge overflow-hidden flex items-center justify-center relative group p-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
              {/* Image Placeholder */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" alt="Kit Representante" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-60" />
              </div>
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="glass-panel backdrop-blur-3xl p-8 rounded-3xl border border-white/10">
                  <p className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-3">Maleta Exclusiva</p>
                  <p className="text-white text-lg font-light leading-relaxed">Mostre a textura do canvas e o peso da moldura. Venda pela experiência tátil.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 4 & 5: Quem buscamos & Operation */}
      <section id="programa" className="py-32 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
          <div className="glass-panel glass-edge p-12 md:p-16 rounded-[3rem] relative group">
            <h3 className="text-4xl font-display text-white italic mb-12">Quem queremos a bordo</h3>
            <ul className="space-y-8">
              {[
                "Representantes com carteira consolidada",
                "Experiência prévia com Casa, Decoração ou Móveis",
                "Profundo conhecimento da região de atuação",
                "Perfil Hunter e Consultivo",
                "CORE Ativo ou em fase de regularização"
              ].map((req, i) => (
                <li key={i} className="flex gap-5 items-start text-zinc-300 font-light text-lg">
                  <Star size={24} className="text-brand-gold shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12 lg:py-10">
            <h3 className="text-4xl font-display text-white italic mb-14 pl-8 border-l-2 border-brand-gold">A Jornada</h3>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px before:h-[90%] before:w-px before:bg-gradient-to-b before:from-brand-gold before:to-transparent">
              {[
                { step: "1", title: "Candidatura", desc: "Preencha o formulário para análise sigilosa do seu perfil." },
                { step: "2", title: "Auditoria de Potencial", desc: "Analisamos estrategicamente a praça e sua capacidade de absorção." },
                { step: "3", title: "Onboarding VIP", desc: "Treinamento intensivo sobre produto, argumento de venda e sistemas." },
                { step: "4", title: "Go-Live", desc: "Você recebe a maleta física e os acessos para começar a faturar." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-8">
                  <div className="w-14 h-14 rounded-full bg-black border border-brand-gold flex items-center justify-center font-display text-brand-gold text-2xl shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.2)] z-10">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-lg text-zinc-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Política Comercial Séria */}
      <section className="py-32 px-6 text-center border-b border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="w-20 h-20 mx-auto glass-panel glass-edge flex items-center justify-center rounded-3xl text-brand-gold mb-8">
            <Shield size={36} />
          </div>
          <h3 className="text-5xl md:text-6xl font-display text-white italic tracking-tight">Política Comercial Blindada</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
            <div className="p-10 glass-panel rounded-[2rem] hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-white uppercase tracking-widest font-bold leading-relaxed">Proteção de Preço <br/>e Canal</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-white uppercase tracking-widest font-bold leading-relaxed">Território <br/>Demarcado</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-white uppercase tracking-widest font-bold leading-relaxed">Meritocracia por <br/>Performance</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-white uppercase tracking-widest font-bold leading-relaxed">Estrutura de <br/>Expansão</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">FAQ</h2>
            <h3 className="text-5xl font-display text-white italic">Transparência Total</h3>
          </div>

          <div className="space-y-6">
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
                q: "Recebo catálogo físico e amostras?", 
                a: "Sim. Os representantes aprovados recebem catálogo físico, acesso ao catálogo digital e uma maleta exclusiva com amostras de molduras, canvas e acabamentos, para apoiar as visitas comerciais e facilitar a apresentação de alto padrão da marca aos lojistas." 
              }
            ].map((faq, i) => (
              <div key={i} className={`glass-panel overflow-hidden transition-all duration-500 rounded-[2rem] border ${openFaq === i ? 'border-brand-gold/40 shadow-[0_0_30px_rgba(197,160,89,0.15)]' : 'border-white/5 hover:border-white/20'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${openFaq === i ? 'text-brand-gold' : 'text-zinc-300 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-500 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180 text-brand-gold' : 'text-zinc-600'}`}>
                    <ChevronRight size={24} className={openFaq === i ? 'text-brand-gold' : ''} />
                  </div>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-10 pb-10 pt-2">
                    <p className="text-lg text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.1)_0%,transparent_60%)] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <h2 className="text-5xl md:text-7xl font-display text-white leading-tight italic tracking-tighter">
            Domine o mercado de decoração <br className="hidden md:block" /> da sua região.
          </h2>
          
          <div className="flex justify-center pt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative overflow-hidden bg-white text-black px-12 md:px-20 py-8 text-xs uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 rounded-full shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-black">INICIAR CANDIDATURA <ArrowRight size={20} /></span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-center bg-black/80 backdrop-blur-3xl">
        <div className="text-3xl font-display tracking-tighter text-white italic opacity-30 mb-6">Casa Linda</div>
        <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold">© 2024 Casa Linda Decorações — Exclusividade & Design</p>
      </footer>
    </div>
  );
};

export default LeadCapturePage;
