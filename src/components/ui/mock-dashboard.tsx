import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Package, Star, Zap, Bell, ArrowUpRight } from 'lucide-react';

const sparklinePoints = [30, 45, 38, 60, 52, 78, 65, 90, 72, 95, 85, 100];

const SparklineSVG = () => {
  const width = 300;
  const height = 80;
  const max = Math.max(...sparklinePoints);
  const min = Math.min(...sparklinePoints);
  const range = max - min;
  const pts = sparklinePoints.map((v, i) => {
    const x = (i / (sparklinePoints.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  const area = `M0,${height} L${sparklinePoints.map((v, i) => {
    const x = (i / (sparklinePoints.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' L')} L${width},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#sparkGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#C5A059"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      {/* Last point highlight */}
      <motion.circle
        cx={width}
        cy={height - ((sparklinePoints[sparklinePoints.length - 1] - min) / range) * height}
        r="5"
        fill="#C5A059"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
      />
    </svg>
  );
};

const GoalRing = ({ percent }: { percent: number }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="#ffffff08" strokeWidth="5" />
        <motion.circle
          cx="35" cy="35" r={r}
          fill="none"
          stroke="#C5A059"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <span className="text-lg font-bold text-white">{percent}%</span>
    </div>
  );
};

const clients = ["Boutique Casa", "Espaço Design", "Móveis & Cia", "Studio Decor", "Galeria Home", "Requinte Decor"];

export const MockDashboard = () => {
  const [commissions, setCommissions] = useState([
    { id: 1, amount: 442.00, client: "Móveis & Cia", time: "Agora mesmo" },
    { id: 0, amount: 317.50, client: "Studio Decor", time: "2 min atrás" },
  ]);
  const [totalCommission, setTotalCommission] = useState(15511.00);
  const [orders, setOrders] = useState(42);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const amount = Math.floor(Math.random() * 600) + 150;
      const newEntry = {
        id: Date.now(),
        amount: amount + Math.random(),
        client: clients[Math.floor(Math.random() * clients.length)],
        time: "Agora mesmo",
      };
      setCommissions(prev => [newEntry, ...prev].slice(0, 4));
      setTotalCommission(prev => prev + newEntry.amount);
      setOrders(prev => prev + 1);
      setPulsing(true);
      setTimeout(() => setPulsing(false), 800);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0E0E0E] flex flex-col font-sans overflow-hidden select-none">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center">
            <Star className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Casa Linda</p>
            <p className="text-zinc-500 text-[10px]">Portal do Representante</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer">
            <Bell className="w-4 h-4 text-zinc-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full" />
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold text-xs">CL</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 grid grid-cols-5 gap-3 overflow-hidden">

        {/* Left Panel (3/5) */}
        <div className="col-span-3 flex flex-col gap-3">

          {/* Main KPI Card */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Comissão do Mês</p>
                <motion.div
                  key={totalCommission}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-baseline gap-1 mt-1"
                >
                  <span className="text-zinc-500 text-base">R$</span>
                  <span className="text-3xl font-black text-white tracking-tight">
                    {totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </motion.div>
              </div>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </span>
            </div>
            {/* Sparkline */}
            <div className="h-16 mt-2 -mx-1">
              <SparklineSVG />
            </div>
            <div className="flex justify-between text-[9px] text-zinc-600 mt-1 px-1">
              <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
            </div>
          </div>

          {/* Small KPI Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#161616] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Pedidos</p>
                <motion.p key={orders} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-black text-white">{orders}</motion.p>
              </div>
            </div>
            <div className="bg-[#161616] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Ticket Médio</p>
                <p className="text-xl font-black text-white">R$ 369</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (2/5) */}
        <div className="col-span-2 flex flex-col gap-3">

          {/* Goal Ring */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold text-center">Meta Mensal</p>
            <GoalRing percent={78} />
            <p className="text-[10px] text-zinc-400 text-center leading-tight">R$ 15.511 <br/><span className="text-zinc-600">de R$ 20.000</span></p>
          </div>

          {/* Live Feed */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <motion.div animate={pulsing ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.4 }}>
                <Zap className="w-3 h-3 text-brand-gold" />
              </motion.div>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Ao Vivo</p>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto animate-pulse" />
            </div>
            <div className="space-y-2 overflow-hidden flex-1">
              <AnimatePresence>
                {commissions.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -16, scale: 0.97 }}
                    animate={{ opacity: 1 - idx * 0.2, y: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[9px] text-zinc-500">{item.time}</p>
                      <p className="text-emerald-400 font-bold text-[10px]">+R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <p className="text-white text-[11px] font-medium truncate">{item.client}</p>
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
