import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Monitor, Heart, ArrowRight, Layers, Briefcase } from 'lucide-react';
import { AnimatedMarqueeHero } from '../components/ui/hero-3';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { MockDashboard } from '../components/ui/mock-dashboard';
import { ThemeToggle } from '../components/ThemeToggle';


interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-brand-dark bg-noise text-zinc-900 dark:text-white selection:bg-brand-gold selection:text-black font-sans relative transition-colors duration-500">
      
      {/* Alert Banner */}
      <div className="bg-brand-gold text-black text-center py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 shadow-[0_0_20px_rgba(197,160,89,0.3)] relative z-50">
        Vagas limitadas: Selecionando os melhores representantes regionais.
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 px-6 sm:px-10 py-5 flex justify-between items-center bg-white/80 dark:bg-black/40 backdrop-blur-3xl border-b border-zinc-200 dark:border-white/5 transition-all duration-300 ${scrolled ? 'top-0' : 'top-[40px]'}`}>
        <div className="flex flex-col">
          <span className="text-2xl font-display tracking-tighter text-zinc-900 dark:text-white">Casa Linda</span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Atacado Oficial</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 dark:text-white/60">
          <a href="#programa" className="hover:text-brand-gold transition-colors">A Operação</a>
          <a href="#beneficios" className="hover:text-brand-gold transition-colors">Vantagens</a>
          <a href="#faq" className="hover:text-brand-gold transition-colors">Dúvidas</a>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={onLoginClick}
            className="px-8 py-3 bg-zinc-900 dark:bg-white/[0.03] border border-transparent dark:border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all shadow-md dark:shadow-none"
          >
            Acessar Portal
          </button>
        </div>
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
          "/carrossel hero/imgi_14_641202422_18348715264227392_8604599904752408319_n.jpg",
          "/carrossel hero/imgi_15_642230641_18349355023227392_5257048329492571312_n.jpg",
          "/carrossel hero/imgi_21_673720305_18357154510227392_7100613360312219449_n.jpg",
          "/carrossel hero/imgi_25_670542895_1517559006603040_8127320229596745845_n.jpg",
          "/carrossel hero/imgi_30_639863458_18347588731227392_6963111105457300201_n.jpg",
          "/carrossel hero/imgi_33_636851025_18347385577227392_8552691080150606817_n.jpg",
          "/carrossel hero/imgi_35_635009382_18347402968227392_6373606614894034933_n.jpg",
          "/carrossel hero/imgi_54_621444801_18343990660227392_5026714762914889050_n.jpg",
          "/carrossel hero/imgi_75_605781477_18340702771227392_7686613490261021487_n.jpg",
          "/carrossel hero/imgi_79_604557123_18339982237227392_2133471787004715059_n.jpg",
          "/carrossel hero/imgi_89_586715108_18336665482227392_1213084868107507203_n.jpg",
        ]}
      />

      {/* Bloco 2: Benefícios Premium */}
      <section id="beneficios" className="py-32 px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Estrutura de Ponta</h2>
            <h3 className="text-5xl sm:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight">O poder de uma grande marca <br/> em suas mãos.</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-light text-xl">
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
                <h4 className="text-2xl font-display text-zinc-900 dark:text-white mb-3 italic tracking-wide">{item.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{item.desc}</p>
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
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">O Seu Arsenal</h2>
              <h3 className="text-5xl sm:text-7xl font-display text-zinc-900 dark:text-white italic tracking-tight leading-[1.1]">Kit Premium <br/> de Vendas.</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Catálogo de Luxo (Físico)",
                "Acesso ao Portal de Atacado (Login Exclusivo)",
                "Catálogos Digitais e Material de WhatsApp",
                "Maleta Black Label com Amostras Reais",
                "Suporte Comercial Full-Time",
                "Comissão Fixa de 12%"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group p-4 -ml-4 hover:bg-white dark:hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <CheckCircle2 size={20} className="text-brand-gold" />
                  </div>
                  <span className="text-lg text-zinc-800 dark:text-zinc-200 font-medium tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-6 mt-12 lg:mt-0">
            {/* Main Image - Full prominence, no overlap */}
            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 group">
              <img 
                src="/images/maleta02.png" 
                alt="Maleta Black Label - Kit Representante Casa Linda" 
                className="w-full h-[480px] lg:h-[560px] object-cover transition-transform duration-[2s] group-hover:scale-105" 
              />
              {/* Subtle gradient overlay at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              {/* Gold badge floating on image corner */}
              <div className="absolute top-6 right-6 bg-brand-gold text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                Black Label
              </div>
            </div>

            {/* Info card below the image — no overlap */}
            <div className="flex items-start gap-6 bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-7 rounded-[1.5rem] shadow-md border border-zinc-100 dark:border-white/10 group hover:-translate-y-1 transition-transform duration-500">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-black transition-colors duration-300">
                <Briefcase size={26} />
              </div>
              <div>
                <h4 className="text-xl font-display text-zinc-900 dark:text-white italic mb-1">Maleta Exclusiva</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                  Mostre a textura do canvas e o peso da moldura. Venda pela experiência tátil.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Cinematic Dashboard Showcase */}
      <div className="overflow-x-hidden w-full bg-zinc-50 dark:bg-brand-dark transition-colors duration-500">
        <div className="flex flex-col overflow-hidden pb-[100px] pt-[100px]">
          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white italic mb-2 tracking-tight">
                  Acompanhe suas vendas,
                </h2>
                <h2 className="text-5xl md:text-[5rem] font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
                  em tempo real.
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-light">
                  <span className="text-brand-gold font-bold">O Portal Casa Linda</span> capacita nossos representantes com acompanhamento de comissões, gestão de pedidos e visualização das metas mensais.
                </p>
              </div>
            }
          >
            <MockDashboard />
          </ContainerScroll>
        </div>
      </div>

      {/* Bloco 4 & 5: Quem buscamos & Operation */}
      <section id="programa" className="py-32 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
          <div className="glass-panel glass-edge p-12 md:p-16 rounded-[3rem] relative group">
            <h3 className="text-4xl font-display text-zinc-900 dark:text-white italic mb-12">Quem queremos a bordo</h3>
            <ul className="space-y-8">
              {[
                "Representantes com carteira consolidada",
                "Experiência prévia com Casa, Decoração ou Móveis",
                "Profundo conhecimento da região de atuação",
                "Perfil Hunter e Consultivo",
                "CORE Ativo ou em fase de regularização"
              ].map((req, i) => (
                <li key={i} className="flex gap-5 items-start text-zinc-700 dark:text-zinc-300 font-light text-lg">
                  <Star size={24} className="text-brand-gold shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12 lg:py-10">
            <h3 className="text-4xl font-display text-zinc-900 dark:text-white italic mb-14 pl-8 border-l-2 border-brand-gold">A Jornada</h3>
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
                    <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-lg text-zinc-600 dark:text-zinc-500 font-light">{item.desc}</p>
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
          <h3 className="text-5xl md:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight">Política Comercial Blindada</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
            <div className="p-10 glass-panel rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-zinc-900 dark:text-white uppercase tracking-widest font-bold leading-relaxed">Proteção de Preço <br/>e Canal</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-zinc-900 dark:text-white uppercase tracking-widest font-bold leading-relaxed">Território <br/>Demarcado</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-zinc-900 dark:text-white uppercase tracking-widest font-bold leading-relaxed">Meritocracia por <br/>Performance</p>
            </div>
            <div className="p-10 glass-panel rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-brand-gold/50 transition-all duration-300">
              <p className="text-xs text-zinc-900 dark:text-white uppercase tracking-widest font-bold leading-relaxed">Estrutura de <br/>Expansão</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">FAQ</h2>
            <h3 className="text-5xl font-display text-zinc-900 dark:text-white italic">Transparência Total</h3>
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
              <div key={i} className={`glass-panel overflow-hidden transition-all duration-500 rounded-[2rem] border ${openFaq === i ? 'border-brand-gold/40 shadow-[0_0_30px_rgba(197,160,89,0.15)]' : 'border-zinc-200 dark:border-white/5 hover:border-brand-gold/20 dark:hover:border-white/20'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${openFaq === i ? 'text-brand-gold' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-500 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180 text-brand-gold' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    <ChevronRight size={24} className={openFaq === i ? 'text-brand-gold' : ''} />
                  </div>
                </button>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-10 pb-10 pt-2">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{faq.a}</p>
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
          <h2 className="text-5xl md:text-7xl font-display text-zinc-900 dark:text-white leading-tight italic tracking-tighter">
            Domine o mercado de decoração <br className="hidden md:block" /> da sua região.
          </h2>
          
          <div className="flex justify-center pt-8">
            <button
              onClick={() => navigate('/cadastro')}
              className="group relative overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black px-12 md:px-20 py-8 text-xs uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 rounded-full shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-black">INICIAR CANDIDATURA <ArrowRight size={20} /></span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-200 dark:border-white/5 text-center bg-white/50 dark:bg-black/80 backdrop-blur-3xl transition-colors">
        <div className="text-3xl font-display tracking-tighter text-zinc-900 dark:text-white italic opacity-30 mb-6">Casa Linda</div>
        <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-white/30 font-bold">© 2024 Casa Linda Decorações — Exclusividade & Design</p>
      </footer>
    </div>
  );
};
