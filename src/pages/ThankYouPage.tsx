import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowLeft } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-brand-dark bg-noise text-zinc-900 dark:text-white selection:bg-brand-gold selection:text-black font-sans relative flex items-center justify-center p-6 transition-colors duration-500">
      
      {/* Floating 3D Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.05] rounded-full blur-[150px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-0 left-[-200px] w-[500px] h-[500px] bg-black/5 dark:bg-white/[0.03] rounded-full blur-[120px] pointer-events-none animate-float-delayed transition-colors duration-500"></div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-12">
        <div className="w-24 h-24 mx-auto glass-panel glass-edge rounded-full flex items-center justify-center text-brand-gold mb-8 shadow-[0_0_40px_rgba(197,160,89,0.2)] animate-pulse-slow">
          <CheckCircle2 size={48} />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-display text-zinc-900 dark:text-white italic tracking-tight">Candidatura Recebida.</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-lg mx-auto">
            Agradecemos o seu interesse em se tornar um representante Black Label da Casa Linda. 
          </p>
        </div>

        <div className="glass-panel glass-edge p-10 rounded-[2rem] border border-brand-gold/20 shadow-[0_0_30px_rgba(197,160,89,0.05)] text-left">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Aguardando Aprovação</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                A nossa diretoria comercial (psycomunic@gmail.com) está analisando o seu perfil, região de atuação e a disponibilidade de praça. O processo de auditoria leva em média de 24 a 48 horas úteis.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-zinc-500 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft size={16} /> Voltar para o Início
          </button>
        </div>
      </div>
    </div>
  );
};
