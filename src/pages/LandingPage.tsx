import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Monitor, Heart, ArrowRight, Layers } from 'lucide-react';
import { AnimatedMarqueeHero } from '../components/ui/hero-3';

interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

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
      <AnimatedMarqueeHero
        tagline="Seja Representante Black Label"
        title={
          <>
            Sua região é<br className="hidden sm:block" />
            <span className="font-display italic font-normal text-brand-gold">o seu império.</span>
          </>
        }
        description="Assuma o mercado local com a marca mais cobiçada de quadros decorativos. Comissão premium de 12% e portal exclusivo de vendas."
        ctaText="INICIAR CANDIDATURA"
        onCtaClick={() => navigate('/cadastro')}
        images={[
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1583847268964-b28ce8f89f13?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
        ]}
      />

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
                a: "Sim. Buscamos representantes que já atuem no segmento de casa, decoração, móveis, iluminação, presentes premium ou áreas correlatas, e que já tenham carteira ativa de lojistas na região." 
              },
              { 
                q: "Preciso ter CORE?", 
                a: "Avaliamos representantes que possuem CORE ativo ou que estejam em processo de regularização para atuar legalmente na profissão." 
              },
              { 
                q: "A Casa Linda já atende minha região?", 
                a: "A Casa Linda está em expansão nacional e avalia cada região de forma estratégica. Analisamos sua área de atuação, carteira de clientes e potencial comercial para definir disponibilidade." 
              },
              { 
                q: "Recebo catálogo físico e amostras?", 
                a: "Sim. Os representantes aprovados recebem catálogo físico, acesso ao catálogo digital e uma maleta exclusiva com amostras de molduras, canvas e acabamentos." 
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
              onClick={() => navigate('/cadastro')}
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
