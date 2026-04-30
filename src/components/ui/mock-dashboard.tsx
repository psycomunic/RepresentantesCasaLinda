import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, Package, Users, Activity, Bell } from 'lucide-react';

export const MockDashboard = () => {
  const [commissions, setCommissions] = useState([
    { id: 1, amount: 450.00, client: "Loja Decoratta", time: "Agora mesmo" },
  ]);

  const [totalCommission, setTotalCommission] = useState(12450.00);

  useEffect(() => {
    // Simulate falling commissions
    const interval = setInterval(() => {
      const newCommission = {
        id: Date.now(),
        amount: Math.floor(Math.random() * 500) + 100,
        client: ["Boutique Casa", "Espaço Design", "Móveis & Cia", "Studio Decor", "Galeria Home"][Math.floor(Math.random() * 5)],
        time: "Agora mesmo"
      };

      setCommissions(prev => [newCommission, ...prev].slice(0, 4));
      setTotalCommission(prev => prev + newCommission.amount);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-[#0a0a0a] p-4 md:p-8 flex flex-col font-sans relative overflow-hidden transition-colors duration-500">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-zinc-900 dark:text-white">Portal do Representante</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Visão Geral de Desempenho</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full"></span>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-zinc-600 dark:text-white font-bold">
            CL
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        
        {/* Left Column - Metrics & Chart */}
        <div className="md:col-span-2 space-y-6 flex flex-col">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-5 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                </div>
                <span className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-400/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mb-1">Comissão Acumulada</p>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-400 text-lg">R$</span>
                <span className="text-3xl font-display font-bold text-zinc-900 dark:text-white">
                  {totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-5 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mb-1">Pedidos no Mês</p>
              <div className="text-3xl font-display font-bold text-zinc-900 dark:text-white">42</div>
            </div>
          </div>

          {/* Chart Mockup */}
          <div className="flex-1 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 flex flex-col shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-white/60 mb-6">Evolução de Vendas</h3>
            <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 relative">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between border-y border-zinc-100 dark:border-white/5 py-4 pointer-events-none">
                <div className="border-t border-zinc-100 dark:border-white/5 w-full"></div>
                <div className="border-t border-zinc-100 dark:border-white/5 w-full"></div>
                <div className="border-t border-zinc-100 dark:border-white/5 w-full"></div>
              </div>
              
              {/* Bars */}
              {[40, 65, 45, 80, 55, 90, 75, 100].map((height, i) => (
                <div key={i} className="w-full flex justify-center group relative z-10">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                    className={`w-full max-w-[2rem] rounded-t-lg ${i === 7 ? 'bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.5)]' : 'bg-zinc-200 dark:bg-white/10 group-hover:bg-zinc-300 dark:group-hover:bg-white/20'} transition-colors duration-300`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-zinc-400">
              <span>Sem 1</span>
              <span>Sem 2</span>
              <span>Sem 3</span>
              <span>Sem 4</span>
            </div>
          </div>
        </div>

        {/* Right Column - Live Activity Feed */}
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 flex flex-col shadow-sm dark:shadow-none transition-colors duration-500">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-white/60">Feed Ao Vivo</h3>
          </div>

          <div className="flex-1 relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-zinc-200 dark:bg-white/10"></div>
            
            <div className="space-y-4">
              <AnimatePresence>
                {commissions.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[11px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-2 border-white dark:border-[#1a1a1a]"></div>
                    <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl p-3 shadow-sm">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase mb-1">{item.time}</p>
                      <p className="text-sm text-zinc-900 dark:text-white font-medium mb-1">
                        Pedido aprovado: <span className="text-brand-gold">{item.client}</span>
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1">
                        + R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
