
import React, { useState } from 'react';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2 } from 'lucide-react';

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
          Portal do Parceiro
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
                Escale seu <br className="hidden sm:block" /> <span className="italic text-brand-gold">Faturamento.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              Tenha acesso direto à fábrica da Casa Linda. <strong>Markup de até 300%</strong>, curadoria de luxo, entrega blindada e exclusividade territorial para o seu negócio decolar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-12">
              <div className="flex -space-x-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="Retailer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" alt="Retailer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=100&h=100" alt="Retailer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark object-cover" />
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-dark bg-brand-gold flex items-center justify-center text-black text-xs font-bold">+2k</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1 justify-center sm:justify-start mb-1 text-brand-gold">
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <Star className="w-4 h-4 fill-brand-gold" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Lojistas Lucrando<br />Todos os meses</p>
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
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-3 font-bold">Apenas para CNPJs do setor de decoração/varejo</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">E-mail Corporativo *</label>
                  <input required type="email" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-sm text-white placeholder:text-white/20" placeholder="seu@email.com.br" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">WhatsApp (Com DDD) *</label>
                  <input required type="tel" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-sm text-white placeholder:text-white/20" placeholder="(11) 99999-9999" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">CNPJ da Loja *</label>
                  <input required type="text" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-sm text-white placeholder:text-white/20" placeholder="00.000.000/0001-00" />
                </div>

                <button type="submit" className="group w-full py-5 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all mt-6 shadow-[0_10px_40px_rgba(197,160,89,0.3)] flex items-center justify-center gap-3">
                  QUERO SER UM REPRESENTANTE
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-white/30 font-medium">Seus dados estão seguros. Não enviamos spam.</p>
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
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Por que a Casa Linda?</h2>
            <h3 className="text-4xl sm:text-5xl font-display text-white italic tracking-tight">O Fim da Concorrência Desleal.</h3>
            <p className="text-gray-400 font-light text-lg">Nossas obras não estão em marketplaces de preço baixo. Vendemos exclusividade para que você possa cobrar o valor que o seu cliente merece pagar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <TrendingUp className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Markup de até 300%</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Compre direto da nossa fábrica com preços de atacado real e revenda com margens altíssimas. Rentabilidade comprovada por nossos lojistas.</p>
            </div>

            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group text-center md:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full"></div>
              <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <Shield className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Exclusividade Territorial</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Mapeamos as regiões para evitar conflito. Quando você é aprovado, nos comprometemos a não aprovar concorrentes diretos no seu raio de atuação.</p>
            </div>

            <div className="p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] hover:border-brand-gold/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <Truck className="w-6 h-6 text-brand-gold group-hover:text-black" />
              </div>
              <h4 className="text-xl font-display text-white mb-3 tracking-wide">Logística Blindada</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">Nossas embalagens em madeira e papelão triplo garantem 99.8% de integridade na entrega. Chega de dor de cabeça com vidros quebrados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="flex overflow-hidden gap-4 px-4 mask-edges pb-8">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" className="h-[400px] w-[300px] object-cover rounded-3xl shrink-0 border border-white/10" alt="Decor" />
          <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?auto=format&fit=crop&q=80&w=800" className="h-[400px] w-[600px] object-cover rounded-3xl shrink-0 border border-white/10 hidden md:block" alt="Decor" />
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800" className="h-[400px] w-[400px] object-cover rounded-3xl shrink-0 border border-white/10" alt="Decor" />
          <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800" className="h-[400px] w-[300px] object-cover rounded-3xl shrink-0 border border-white/10" alt="Decor" />
        </div>
        <div className="text-center pt-8">
          <p className="text-brand-gold text-sm tracking-widest uppercase font-bold">Padrão Museu — Molduras em Madeira Maciça e Vidro Museo</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold mb-4">Quem já é Parceiro</h2>
            <h3 className="text-3xl sm:text-5xl font-display text-white italic tracking-tight">Números irrebatíveis.</h3>
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
                "Depois que tirei os quadros de plástico genéricos e coloquei Casa Linda na vitrine principal, o ticket médio da minha loja subiu 40%. A qualidade impressiona de perto."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Roberto M.</p>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest mt-1 font-bold">Proprietário - Móveis & Design</p>
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
                "O portal simplificou muito. Eu consigo fechar orçamentos para grandes escritórios de arquitetura montando carrinhos em minutos, já com os prazos de boleto."
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

      {/* Final CTA Action */}
      <section className="py-32 px-6 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/10 lg:bg-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_60%)]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10 bg-black/80 lg:bg-transparent p-10 rounded-3xl border border-white/5 lg:border-none backdrop-blur-xl lg:backdrop-blur-none">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display italic text-white tracking-tighter">
            Última chamada para <br /> transformar sua <span className="text-brand-gold">loja.</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl font-light">Avaliação de CNPJs em 2h úteis. Não fique de fora da revolução do alto padrão.</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-6 sm:px-16 sm:py-7 bg-brand-gold text-black rounded-full font-bold text-xs sm:text-sm tracking-[0.3em] uppercase hover:bg-white transition-all shadow-[0_0_60px_rgba(197,160,89,0.4)]"
          >
            CADASTRAR MEU CNPJ AGORA
          </button>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 text-center bg-black">
        <div className="text-2xl font-display tracking-tighter text-white italic opacity-50 mb-4">Casa Linda</div>
        <p className="text-[8px] uppercase tracking-[0.5em] text-white/30">© 2024 Casa Linda Decorações — B2B Atacado</p>
      </footer>
    </div>
  );
};

export default LeadCapturePage;
