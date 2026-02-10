
import React, { useState } from 'react';

interface LeadCapturePageProps {
  onLoginClick: () => void;
}

const LeadCapturePage: React.FC<LeadCapturePageProps> = ({ onLoginClick }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-8 animate-in fade-in zoom-in duration-1000">
        <div className="max-w-md text-center border border-white/10 p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl">
          <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(197,160,89,0.4)]">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-display text-white mb-4 italic">Solicitação Enviada</h2>
          <p className="text-gray-400 leading-relaxed mb-8 text-sm uppercase tracking-wider">
            Sua jornada com a Casa Linda começa agora. Um consultor premium entrará em contato em até 24h úteis.
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
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-gold selection:text-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-2xl bg-black/60 border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-2xl font-display tracking-tighter text-white">Casa Linda</span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Black Label Atacado</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
          <a href="#beneficios" className="hover:text-brand-gold transition-colors">Benefícios</a>
          <a href="#logistica" className="hover:text-brand-gold transition-colors">Logística</a>
          <a href="#processo" className="hover:text-brand-gold transition-colors">O Processo</a>
        </div>
        <button 
          onClick={onLoginClick}
          className="px-6 py-2.5 border border-brand-gold/30 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold hover:bg-brand-gold hover:text-black transition-all"
        >
          Acessar Portal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-gold/[0.05] rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold block mb-4">Exclusividade B2B</span>
              <h1 className="text-6xl lg:text-8xl font-display text-white leading-[0.9] tracking-tighter">
                Onde a <span className="italic text-brand-gold">Arte</span> encontra o <span className="text-white/40">Lucro.</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-400 leading-relaxed font-light max-w-lg">
              Não vendemos apenas quadros. Entregamos curadoria de alto padrão para lojistas que buscam transformar ambientes em ativos de valor.
            </p>

            <div className="flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-dark bg-gray-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Retailer" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                +450 Lojistas <br /> Parcerias Ativas
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/[0.03] backdrop-blur-3xl p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10">
              <div className="mb-10">
                <h3 className="text-2xl font-display text-white italic">Seja um <span className="text-brand-gold">Parceiro</span></h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2 font-bold">Qualificação de CNPJ Obrigatória</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-gold/50 ml-1">E-mail Corporativo</label>
                  <input required type="email" className="w-full px-5 py-4 bg-white/[0.05] border border-white/5 rounded-2xl focus:border-brand-gold/40 transition-all outline-none text-sm placeholder:text-white/10" placeholder="contato@empresa.com" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-gold/50 ml-1">Razão Social</label>
                    <input required type="text" className="w-full px-5 py-4 bg-white/[0.05] border border-white/5 rounded-2xl focus:border-brand-gold/40 transition-all outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-gold/50 ml-1">CNPJ</label>
                    <input required type="text" className="w-full px-5 py-4 bg-white/[0.05] border border-white/5 rounded-2xl focus:border-brand-gold/40 transition-all outline-none text-sm" placeholder="00.000.000/0001-00" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-gold/50 ml-1">Volume Estimado Mensal</label>
                  <select className="w-full px-5 py-4 bg-white/[0.05] border border-white/5 rounded-2xl focus:border-brand-gold/40 transition-all outline-none text-sm text-white/40 appearance-none">
                    <option className="bg-brand-dark">Até R$ 5.000</option>
                    <option className="bg-brand-dark">R$ 5.000 a R$ 20.000</option>
                    <option className="bg-brand-dark">Acima de R$ 20.000</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-5 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.3em] hover:bg-brand-gold/80 transition-all mt-4 shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
                  SOLICITAR ACESSO BLACK LABEL
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full Explanation Section */}
      <section id="beneficios" className="py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-6">O Ecossistema</h2>
              <h3 className="text-4xl lg:text-5xl font-display text-white italic leading-tight">
                Um modelo pensado para a saúde financeira da sua <span className="text-brand-gold">loja.</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-6xl font-display text-brand-gold/20">B2B</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Margens Reais", desc: "Tabela de atacado que permite markup de até 2.5x, garantindo lucro líquido expressivo.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Curadoria Inédita", desc: "Artes exclusivas desenvolvidas em nosso estúdio. Sua loja não concorre com marketplace de massa.", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
              { title: "Logística Blindada", desc: "Embalagens customizadas em madeira e papelão triplo. Taxa de avaria inferior a 0.2%.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
              { title: "Faturamento Direto", desc: "Condições de parcelamento via boleto faturado para parceiros com recorrência (sob análise).", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-brand-gold/40 transition-all group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-gold transition-all group-hover:text-black">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-display text-white mb-4 italic group-hover:text-brand-gold transition-colors">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics & Quality Section */}
      <section id="logistica" className="py-32 px-8 bg-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/5] bg-gray-900 rounded-[3rem] overflow-hidden border border-white/5">
               <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000" alt="Processo Criativo" className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[2s]" />
            </div>
            <div className="absolute -bottom-8 -right-8 p-10 bg-brand-dark border border-brand-gold/20 rounded-3xl shadow-2xl">
               <p className="text-4xl font-display italic text-brand-gold">99.8%</p>
               <p className="text-[9px] uppercase tracking-widest text-white/40 mt-2 font-bold">Integridade na Entrega</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-10">
            <h3 className="text-4xl font-display italic">A segurança que o <br /> <span className="text-brand-gold">lojista precisa.</span></h3>
            <div className="space-y-8">
               <div className="flex gap-6">
                 <div className="text-brand-gold font-display text-2xl">01</div>
                 <div>
                    <h5 className="text-sm uppercase tracking-widest font-bold mb-2 text-white/80">Molduras Certificadas</h5>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">Utilizamos apenas madeira de reflorestamento com acabamento premium, garantindo que a peça não empenará em sua vitrine.</p>
                 </div>
               </div>
               <div className="flex gap-6">
                 <div className="text-brand-gold font-display text-2xl">02</div>
                 <div>
                    <h5 className="text-sm uppercase tracking-widest font-bold mb-2 text-white/80">Impressão Fine Art</h5>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">Tecnologia de 12 cores com pigmento mineral. Durabilidade de museu que agrega valor imediato à percepção do cliente.</p>
                 </div>
               </div>
               <div className="flex gap-6">
                 <div className="text-brand-gold font-display text-2xl">03</div>
                 <div>
                    <h5 className="text-sm uppercase tracking-widest font-bold mb-2 text-white/80">Packing Inteligente</h5>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">Nossas caixas são projetadas para resistir a impactos de transportadoras de carga pesada. Abrir a caixa é uma experiência de luxo.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section id="processo" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-6">Workflow</h2>
            <h3 className="text-4xl font-display italic text-white">Quatro passos para a primeira <span className="text-brand-gold">vitrine.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { step: "01", label: "Cadastro", desc: "Preencha seus dados B2B para análise." },
               { step: "02", label: "Validação", desc: "Nossa equipe valida o CNPJ e o nicho de mercado." },
               { step: "03", label: "Acesso", desc: "Receba o login para o portal exclusivo com preços." },
               { step: "04", label: "Pedido", desc: "Realize seu primeiro faturamento com suporte dedicado." }
             ].map((p, i) => (
               <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all">
                  <div className="absolute top-0 right-0 p-4 text-4xl font-display text-brand-gold/10 group-hover:text-brand-gold transition-colors">{p.step}</div>
                  <h6 className="text-sm uppercase tracking-widest font-bold mb-3 text-brand-gold/70">{p.label}</h6>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{p.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 text-center bg-gradient-to-t from-brand-gold/5 to-transparent">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-7xl font-display italic text-white leading-tight">Elevando o padrão de <br /> <span className="text-brand-gold">revenda</span> no Brasil.</h2>
          <p className="text-gray-500 text-lg font-light tracking-wide uppercase">Tornamos a curadoria de luxo acessível ao seu negócio.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-6 bg-brand-gold text-black rounded-full font-bold text-xs tracking-[0.4em] hover:scale-105 transition-all shadow-[0_0_50px_rgba(197,160,89,0.3)]"
          >
            INICIAR MEU CADASTRO
          </button>
        </div>
      </section>

      <footer className="py-20 px-8 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-display tracking-tighter text-white">Casa Linda</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold -mt-1 font-bold">Black Label Atacado</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-medium max-w-xs leading-loose">
            Curadoria para lojas de decoração, arquitetos e designers de interiores.
          </p>
          <div className="h-px w-20 bg-brand-gold/20 my-4"></div>
          <p className="text-[8px] uppercase tracking-[0.5em] text-white/20">© 2024 — Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default LeadCapturePage;
