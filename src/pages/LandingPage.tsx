import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Shield, TrendingUp, Truck, CheckCircle2, Monitor, Heart, ArrowRight, Layers, Briefcase, Map, Award, Globe, Play, X, ChevronLeft, Info } from 'lucide-react';
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
  const [activeVideo, setActiveVideo] = useState<{ title: string; videoUrl: string } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = videoScrollRef.current;
      const cardWidth = videoScrollRef.current.firstElementChild?.clientWidth || 320;
      const gap = 24;
      
      if (direction === 'right') {
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          videoScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          videoScrollRef.current.scrollTo({ left: scrollLeft + cardWidth + gap, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 0) {
          videoScrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          videoScrollRef.current.scrollTo({ left: scrollLeft - cardWidth - gap, behavior: 'smooth' });
        }
      }
    }
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url;
  };

  const productVideos = [
    {
      title: "Apresentação Casa Linda",
      category: "Vídeo Destaque",
      thumbnail: "https://img.youtube.com/vi/FGe0IAosgD8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/FGe0IAosgD8",
      duration: "0:15"
    },
    {
      title: "Bastidores da Molduraria",
      category: "Produção & Acabamento",
      thumbnail: "https://img.youtube.com/vi/6AMl5ftgJMc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/6AMl5ftgJMc",
      duration: "0:15"
    },
    {
      title: "Quadros Decorativos em Ambientes",
      category: "Instalação & Ambientação",
      thumbnail: "https://img.youtube.com/vi/n0zR1JuLWMM/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/n0zR1JuLWMM",
      duration: "0:15"
    },
    {
      title: "Bastidores & Embalagem",
      category: "Qualidade de Entrega",
      thumbnail: "https://img.youtube.com/vi/WQtHmg4z37Q/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/WQtHmg4z37Q",
      duration: "0:15"
    },
    {
      title: "Coleção Abstrata Moderna",
      category: "Artes Exclusivas",
      thumbnail: "https://img.youtube.com/vi/7JFEm5Zxgto/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/7JFEm5Zxgto",
      duration: "0:15"
    },
    {
      title: "Linha Filete Metálica",
      category: "Design Minimalista",
      thumbnail: "https://img.youtube.com/vi/xI4M02LcXAc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/xI4M02LcXAc",
      duration: "0:15"
    },
    {
      title: "Showroom & Galeria Física",
      category: "Experiência Casa Linda",
      thumbnail: "https://img.youtube.com/vi/FQuwyGYlauA/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/FQuwyGYlauA",
      duration: "0:15"
    },
    {
      title: "Processo de Impressão Fine Art",
      category: "Alta Tecnologia",
      thumbnail: "https://img.youtube.com/vi/NIoySq34mOo/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/NIoySq34mOo",
      duration: "0:15"
    },
    {
      title: "Série Minimalista Botânica",
      category: "Harmonia Orgânica",
      thumbnail: "https://img.youtube.com/vi/aTjDxpQz_Lk/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/aTjDxpQz_Lk",
      duration: "0:15"
    },
    {
      title: "Quadros com Vidro de Cristal",
      category: "Brilho e Proteção",
      thumbnail: "https://img.youtube.com/vi/ruPxMtZOSoA/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/shorts/ruPxMtZOSoA",
      duration: "0:15"
    }
  ];

  // Auto-scroll effect
  React.useEffect(() => {
    if (activeVideo || isHovered) return;
    const intervalId = setInterval(() => {
      if (videoScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = videoScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          videoScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const cardWidth = videoScrollRef.current.firstElementChild?.clientWidth || 320;
          const gap = 24;
          videoScrollRef.current.scrollTo({ left: scrollLeft + cardWidth + gap, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(intervalId);
  }, [activeVideo, isHovered]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-brand-dark bg-noise text-zinc-900 dark:text-white selection:bg-brand-gold selection:text-black font-sans relative transition-colors duration-500">
      
      {/* Alert Banner */}
      <div className="bg-brand-gold text-black text-center py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 shadow-[0_5px_15px_rgba(197,160,89,0.2)] relative z-50">
        Vagas limitadas: Selecionando os melhores representantes regionais.
      </div>

      {/* Navigation */}
      <div className={`fixed left-0 right-0 z-40 px-4 sm:px-6 transition-all duration-500 ${scrolled ? 'top-4' : 'top-[56px]'}`}>
        <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300">
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/images/logo-preta.png" alt="Casa Linda" className="h-6 md:h-8 dark:hidden object-contain" />
            <img src="/images/logo-branca.png" alt="Casa Linda" className="h-6 md:h-8 hidden dark:block object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-white/60">
            <a href="#programa" className="hover:text-brand-gold transition-colors duration-300">A Operação</a>
            <a href="#beneficios" className="hover:text-brand-gold transition-colors duration-300">Vantagens</a>
            <a href="#faq" className="hover:text-brand-gold transition-colors duration-300">Dúvidas</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onLoginClick}
              className="relative overflow-hidden group px-8 py-3 bg-zinc-900 dark:bg-white/[0.04] border border-zinc-900/10 dark:border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all shadow-sm hover:shadow-[0_10px_20px_rgba(197,160,89,0.2)]"
            >
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 dark:via-brand-gold/30 to-transparent animate-shimmer pointer-events-none" />
              <span className="relative z-10">Acessar Portal</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <AnimatedMarqueeHero
        tagline="Canal oficial para representantes de decoração e home decor"
        title={
          <>
            Sua carteira já vende decoração.<br className="hidden sm:block" />
            <span className="font-display italic font-normal text-brand-gold">Agora ela pode vender Casa Linda.</span>
          </>
        }
        description="Se você já atende lojistas de decoração, móveis, iluminação ou home decor, a Casa Linda oferece comissão de 12%, catálogo físico e digital, maleta de amostras e portal atacado exclusivo para vender com agilidade e segurança."
        ctaText="QUERO AVALIAR MINHA REGIÃO"
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
      <section id="beneficios" className="py-12 md:py-24 px-6 border-b border-white/5 relative overflow-hidden">
        {/* Background ambient orbs */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-gold/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-black/[0.1] dark:bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-4xl mx-auto space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Estrutura Comercial para Representantes</h2>
            <h3 className="text-5xl sm:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight">O poder de uma grande marca <br/> em suas mãos.</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-light text-xl max-w-3xl mx-auto">
              A Casa Linda entrega marca, produto, margem e ferramentas comerciais para representantes que já atuam no segmento de decoração.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Star size={24}/>, title: "Marca que abre portas", desc: "A Casa Linda já possui presença forte no mercado de quadros decorativos." },
              { icon: <Shield size={24}/>, title: "Valor percebido", desc: "Produto com alto valor percebido." },
              { icon: <Layers size={24}/>, title: "Portfólio amplo e estratégico", desc: "Para diferentes estilos de loja: decoração contemporânea, clássica, religiosa, abstrata, luxo, ambientes corporativos e projetos especiais." },
              { icon: <TrendingUp size={24}/>, title: "Margem atrativa para o lojista", desc: "Política pensada para que o lojista consiga vender com margem saudável e sem competir por preço baixo." },
              { icon: <Truck size={24}/>, title: "Logística Eficiente", desc: "Operação estruturada para atender pedidos de atacado com acompanhamento, prazos claros e suporte comercial durante o processo." },
              { icon: <Monitor size={24}/>, title: "Plataforma Própria", desc: "Tecnologia para gerir seus pedidos em tempo real." }
            ].map((item, i) => (
              <div key={i} className="relative p-10 glass-premium rounded-[2rem] group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,160,89,0.08)] transition-all duration-500 overflow-hidden">
                {/* Sheen reflection on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div className="w-16 h-16 bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-black group-hover:scale-110 transition-all duration-500">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-display text-zinc-900 dark:text-white mb-3 italic tracking-wide">{item.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 glass-premium rounded-full p-6 flex items-center justify-center gap-4 text-brand-gold font-bold uppercase tracking-widest text-xs shadow-[0_10px_35px_rgba(197,160,89,0.06)] border border-brand-gold/25 mx-auto max-w-md">
            <Heart size={18} className="animate-pulse" /> Suporte Consultivo ao Representante
          </div>
        </div>
      </section>

      {/* Bloco 3: Kit Comercial */}
      <section className="py-12 md:py-24 px-6 relative border-b border-white/5 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.04] blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Centered Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Sua Estrutura Comercial</h2>
            <h3 className="text-5xl sm:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight leading-[1.2]">
              Estrutura completa para vender no atacado.
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ul className="space-y-4">
              {[
                "Catálogo físico premium",
                "Portal atacado com login exclusivo",
                "Catálogo digital e materiais para WhatsApp",
                "Maleta com amostras reais de molduras, canvas e acabamentos",
                "Suporte comercial para abertura de clientes",
                "Comissão de 12% sobre vendas faturadas"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group p-4 -ml-4 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-black border border-zinc-200/50 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <CheckCircle2 size={20} className="text-brand-gold" />
                  </div>
                  <span className="text-lg text-zinc-800 dark:text-zinc-200 font-medium tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col gap-6 mt-12 lg:mt-0 relative group">
              {/* Ambient gold glow behind the container */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/15 via-transparent to-brand-gold/5 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none" />
              
              {/* Main Showcase Container */}
              <div className="relative w-full rounded-[2.5rem] p-4 bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                
                {/* Image Frame */}
                <div className="relative w-full rounded-[2rem] overflow-hidden border border-zinc-200/30 dark:border-white/5 group/img">
                  <img 
                    src="/images/maleta02.png" 
                    alt="Maleta Black Label - Kit Representante Casa Linda" 
                    className="w-full h-[460px] lg:h-[530px] object-cover transition-transform duration-[2.5s] ease-out group-hover/img:scale-105" 
                  />
                  {/* Reflection effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                  {/* Dark gradient for premium shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  {/* Floating Gold badge */}
                  <div className="absolute top-6 right-6 bg-brand-gold text-black text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(197,160,89,0.3)]">
                    Black Label
                  </div>
                </div>
              </div>
  
              {/* Info Card - Beautifully Glassmorphic */}
              <div className="relative flex items-start gap-6 glass-premium p-8 rounded-[2rem] border border-zinc-200/50 dark:border-white/10 group/card hover:-translate-y-1 transition-transform duration-500">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/20 group-hover/card:bg-brand-gold group-hover/card:text-black group-hover/card:scale-105 transition-all duration-300">
                  <Briefcase size={26} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-display text-zinc-900 dark:text-white italic mb-1">Maleta Exclusiva</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed">
                    Venda com amostras reais em mãos: textura, acabamento e qualidade percebida na frente do lojista.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-semibold mt-3">
                    Obs: Kit enviado aos representantes aprovados no processo de seleção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco: Nossos Quadros em Ação */}
      <section id="videos-quadros" className="py-12 md:py-24 px-6 border-b border-white/5 relative overflow-hidden bg-zinc-50 dark:bg-brand-dark/50 transition-colors duration-500">
        {/* Glow decorative circle */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-4">
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Coleções em Movimento</h2>
              <h3 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white italic tracking-tight">
                Nossos Quadros em Ação
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-light max-w-xl text-lg">
                Explore a qualidade dos nossos acabamentos, canvas e montagens através de vídeos reais.
              </p>
            </div>
            
            {/* Carousel Navigation buttons */}
            <div className="flex gap-4 mt-8 md:mt-0">
              <button 
                onClick={() => scrollVideos('left')}
                className="w-14 h-14 rounded-full glass-premium border border-zinc-200/50 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-brand-gold hover:border-brand-gold/60 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollVideos('right')}
                className="w-14 h-14 rounded-full glass-premium border border-zinc-200/50 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-brand-gold hover:border-brand-gold/60 transition-all duration-300 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div 
            ref={videoScrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {productVideos.map((video, idx) => (
              <div 
                key={idx}
                className="w-[280px] md:w-[320px] shrink-0 snap-start group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-zinc-200/50 dark:border-white/10 glass-premium hover:border-brand-gold/40 hover:shadow-[0_15px_30px_rgba(197,160,89,0.06)] transition-all duration-500"
              >
                {/* Thumbnail Image */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Play Button Overlay */}
                <button 
                  onClick={() => setActiveVideo({ title: video.title, videoUrl: video.videoUrl })}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-gold text-black flex items-center justify-center cursor-pointer shadow-[0_10px_25px_rgba(197,160,89,0.4)] hover:scale-110 transition-transform duration-300 z-10"
                >
                  <div className="absolute inset-0 rounded-full border border-brand-gold/40 animate-ping pointer-events-none" />
                  <Play size={24} className="fill-black ml-1" />
                </button>
              </div>
            ))}
          </div>

          {/* Support Banner / Material de Apoio */}
          <div className="mt-12 glass-premium p-8 rounded-[2rem] border border-zinc-200/50 dark:border-white/10 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto text-left relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/[0.03] to-transparent pointer-events-none" />
            <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-black group-hover:scale-105 transition-all duration-300">
              <Info size={26} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-display text-zinc-900 dark:text-white italic mb-1">
                Material de Vendas Liberado
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed">
                Como representante parceiro da <span className="text-brand-gold font-semibold">Casa Linda</span>, você tem autorização total para utilizar todo o nosso acervo de vídeos, mockups e fotos ambientadas de alta resolução para divulgar em suas redes sociais e enviar diretamente aos seus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Dashboard Showcase */}
      <div className="overflow-x-hidden w-full bg-zinc-50 dark:bg-brand-dark transition-colors duration-500">
        <div className="flex flex-col overflow-hidden py-0">
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
                  Sem planilhas soltas e sem depender de mensagens. <span className="text-brand-gold font-bold">O representante aprovado</span> terá acesso a um portal exclusivo para acompanhar pedidos, comissões, metas mensais e evolução da sua carteira.
                </p>
              </div>
            }
          >
            <MockDashboard />
          </ContainerScroll>
        </div>
      </div>

      {/* Bloco 4 & 5: Quem buscamos & Operation */}
      <section id="programa" className="pt-10 pb-16 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
          {/* Card: Quem estamos selecionando */}
          <div className="glass-premium p-12 md:p-16 rounded-[3rem] relative group border border-zinc-200/50 dark:border-white/10 hover:shadow-[0_30px_60px_rgba(197,160,89,0.04)] transition-all duration-500 overflow-hidden">
            {/* Dynamic shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4">Quem estamos selecionando</h2>
            <h3 className="text-4xl font-display text-zinc-900 dark:text-white italic mb-12">Quem queremos a bordo</h3>
            <ul className="space-y-8">
              {[
                "Carteira ativa de lojistas no segmento casa & decoração",
                "Experiência com decoração, móveis, iluminação, presentes premium ou home decor",
                "Atuação regional definida e conhecimento da praça",
                "Perfil comercial para abrir contas e desenvolver carteira",
                "CORE ativo ou em processo de regularização",
                "Sem conflito com marcas concorrentes diretas"
              ].map((req, i) => (
                <li key={i} className="flex gap-5 items-start text-zinc-700 dark:text-zinc-300 font-light text-lg hover:translate-x-1 transition-transform duration-300">
                  <Star size={24} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline: Como funciona */}
          <div className="space-y-12 lg:py-4">
            <div className="pl-8 border-l-2 border-brand-gold/60 mb-14">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-3">Como funciona o processo</h2>
              <h3 className="text-4xl font-display text-zinc-900 dark:text-white italic">A Jornada</h3>
            </div>
            
            {/* Timeline container */}
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px before:h-[90%] before:w-px before:bg-gradient-to-b before:from-brand-gold/50 before:to-transparent">
              {[
                { step: "1", title: "Candidatura", desc: "Preencha o formulário com sua região de atuação, carteira atual e experiência no segmento." },
                { step: "2", title: "Análise de Perfil e Região", desc: "Avaliamos sua carteira, praça de atuação, marcas representadas e potencial comercial." },
                { step: "3", title: "Treinamento e Ativação", desc: "Você recebe treinamento sobre produtos, política comercial, argumentos de venda e uso do portal atacado." },
                { step: "4", title: "Início das Vendas", desc: "Após aprovação, você recebe seus acessos, materiais comerciais e kit físico para iniciar a atuação na região." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-8 group/item">
                  {/* Floating Gold/Glass timeline node */}
                  <div className="w-14 h-14 rounded-full bg-zinc-950/80 backdrop-blur-md border border-brand-gold/60 flex items-center justify-center font-display text-brand-gold text-2xl shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.15)] group-hover/item:shadow-[0_0_30px_rgba(197,160,89,0.4)] group-hover/item:border-brand-gold group-hover/item:scale-110 transition-all duration-500 z-10">
                    {item.step}
                  </div>
                  <div className="pt-2 group-hover/item:translate-x-1 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover/item:text-brand-gold transition-colors duration-300">{item.title}</h4>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Política Comercial Séria */}
      <section className="py-28 px-6 text-center border-b border-white/5 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/[0.03] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -top-40 right-10 w-[300px] h-[300px] bg-brand-gold/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          {/* Animated Shield Badge */}
          <div className="relative w-24 h-24 mx-auto mb-10 group">
            {/* Pulsing ring around shield */}
            <div className="absolute inset-0 bg-brand-gold/10 rounded-3xl blur-md scale-110 group-hover:scale-125 transition-transform duration-700 animate-pulse pointer-events-none" />
            <div className="relative w-full h-full glass-premium flex items-center justify-center rounded-3xl text-brand-gold shadow-[0_15px_35px_rgba(197,160,89,0.15)] border border-brand-gold/30 group-hover:border-brand-gold group-hover:shadow-[0_20px_50px_rgba(197,160,89,0.3)] transition-all duration-500">
              <Shield size={40} className="group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          <h3 className="text-5xl md:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight">
            Política Comercial <span className="text-brand-gold">Blindada</span>
          </h3>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
            Você desenvolve sua região com segurança comercial. A Casa Linda define regras de canal, acompanha sua performance e protege a operação para evitar conflitos de preço, território e carteira.
          </p>

          {/* Balões da Política Comercial */}
          <div className="flex flex-wrap justify-center gap-6 pt-12 pb-6 max-w-4xl mx-auto">
            {[
              { line1: "Área de Atuação", line2: "Definida" },
              { line1: "Crescimento", line2: "por Performance" },
              { line1: "Exclusividade", line2: "Condicionada" }
            ].map((balloon, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-zinc-950/40 border border-brand-gold/30 dark:border-brand-gold/20 rounded-[2rem] px-10 py-6 shadow-[0_10px_35px_rgba(197,160,89,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex items-center justify-center text-center min-w-[240px] transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/60"
              >
                <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-zinc-800 dark:text-white leading-relaxed font-sans">
                  {balloon.line1} <br />
                  {balloon.line2}
                </p>
              </div>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-10">
            {[
              { 
                icon: <Map size={26} />, 
                title: "Área de Atuação Definida", 
                desc: "Área de atuação regional exclusiva e contratualmente garantida para evitar qualquer tipo de concorrência interna." 
              },
              { 
                icon: <Award size={26} />, 
                title: "Crescimento por Performance", 
                desc: "Crescimento de comissões e prioridade em novas praças de acordo com o atingimento das metas regionais." 
              },
              { 
                icon: <Globe size={26} />, 
                title: "Exclusividade Condicionada", 
                desc: "Manutenção da exclusividade atrelada ao cumprimento estratégico de atendimento e positivação dos lojistas." 
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className="group relative p-10 md:p-12 glass-premium rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 hover:border-brand-gold/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(197,160,89,0.06)] transition-all duration-500 text-left flex flex-col justify-between overflow-hidden"
              >
                {/* Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                
                <div>
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/[0.07] rounded-2xl flex items-center justify-center text-brand-gold mb-8 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(197,160,89,0.2)] transition-all duration-500">
                    {card.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-2xl font-display text-zinc-900 dark:text-white italic mb-4 group-hover:text-brand-gold transition-colors duration-300">
                    {card.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Subtle visual accent line */}
                <div className="w-12 h-1 bg-brand-gold/30 rounded-full mt-8 group-hover:w-full group-hover:bg-brand-gold transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
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
              <div key={i} className={`glass-premium overflow-hidden transition-all duration-500 rounded-[2rem] border ${openFaq === i ? 'border-brand-gold/40 shadow-[0_15px_30px_rgba(197,160,89,0.1)]' : 'border-zinc-200/50 dark:border-white/10 hover:border-brand-gold/30 dark:hover:border-white/20'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${openFaq === i ? 'text-brand-gold' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`transition-all duration-500 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-90 text-brand-gold' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    <ChevronRight size={24} />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-10 pb-10 pt-2 border-t border-zinc-200/30 dark:border-white/5">
                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.1)_0%,transparent_60%)] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <h2 className="text-5xl md:text-7xl font-display text-zinc-900 dark:text-white leading-tight italic tracking-tighter">
            Transforme sua carteira de lojistas <br className="hidden md:block" /> em uma nova fonte de faturamento.
          </h2>

          <div className="flex justify-center pt-8">
            <button
              onClick={() => navigate('/cadastro')}
              className="group relative overflow-hidden bg-zinc-950 dark:bg-white text-white dark:text-black px-12 md:px-20 py-8 text-xs uppercase tracking-[0.4em] font-bold transition-all duration-300 hover:scale-105 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.25)] border border-brand-gold/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-black transition-colors duration-300">
                QUERO AVALIAR MINHA REGIÃO <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-[#D4B36A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-200 dark:border-white/5 text-center bg-white/50 dark:bg-black/80 backdrop-blur-3xl transition-colors">
        <img src="/images/logo-preta.png" alt="Casa Linda" className="h-10 md:h-12 mx-auto opacity-40 dark:hidden object-contain mb-6" />
        <img src="/images/logo-branca.png" alt="Casa Linda" className="h-10 md:h-12 mx-auto opacity-40 hidden dark:block object-contain mb-6" />
        <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-white/30 font-bold">© 2024 Casa Linda Decorações | Exclusividade & Design</p>
      </footer>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-5xl aspect-video glass-premium rounded-[2.5rem] border border-brand-gold/30 overflow-hidden shadow-[0_30px_70px_rgba(197,160,89,0.2)]">
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur border border-white/10 hover:border-brand-gold/60 text-white hover:text-brand-gold flex items-center justify-center transition-all duration-300 z-50 cursor-pointer"
            >
              <X size={20} />
            </button>
            
            {/* Player Container */}
            <div className="w-full h-full bg-black">
              {activeVideo.videoUrl.includes('youtube.com') || activeVideo.videoUrl.includes('youtu.be') ? (
                <iframe 
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video 
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            

          </div>
        </div>
      )}
    </div>
  );
};
