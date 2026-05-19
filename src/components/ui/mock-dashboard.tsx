import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Package, Star, Zap, Bell, ArrowUpRight, CheckCircle, AlertCircle, Gift, X } from 'lucide-react';

// ─── Sparkline ────────────────────────────────────────────────────────────────
const sparklinePoints = [30, 45, 38, 60, 52, 78, 65, 90, 72, 95, 85, 100];

const SparklineSVG = () => {
  const W = 300, H = 80;
  const max = Math.max(...sparklinePoints), min = Math.min(...sparklinePoints), range = max - min;
  const coords = sparklinePoints.map((v, i) => ({ x: (i / (sparklinePoints.length - 1)) * W, y: H - ((v - min) / range) * H }));
  const pts = coords.map(c => `${c.x},${c.y}`).join(' ');
  const area = `M0,${H} L${coords.map(c => `${c.x},${c.y}`).join(' L')} L${W},${H} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path d={area} fill="url(#sg)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
      <motion.polyline points={pts} fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
      <motion.circle cx={last.x} cy={last.y} r="5" fill="#C5A059" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: 'spring' }} />
    </svg>
  );
};

// ─── Goal Ring ────────────────────────────────────────────────────────────────
const GoalRing = ({ percent }: { percent: number }) => {
  const r = 28, circ = 2 * Math.PI * r, dash = (percent / 100) * circ;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 70 70">
        <defs>
          <filter id="glow-goal" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="35" cy="35" r={r} fill="none" stroke="#ffffff08" strokeWidth="5" />
        <motion.circle cx="35" cy="35" r={r} fill="none" stroke="#C5A059" strokeWidth="5" strokeLinecap="round"
          filter="url(#glow-goal)"
          strokeDasharray={`${circ}`} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }} />
      </svg>
      <span className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{percent}%</span>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Commission { id: number; amount: number; client: string; time: string; }
interface Toast { id: number; type: 'success' | 'info' | 'bonus'; title: string; body: string; }
interface Notification { id: number; icon: React.ReactNode; iconBg: string; title: string; sub: string; time: string; unread: boolean; }

const clients = ["Boutique Casa", "Espaço Design", "Móveis & Cia", "Studio Decor", "Galeria Home", "Requinte Decor"];

// ─── Initial notifications ────────────────────────────────────────────────────
const initNotifications: Notification[] = [
  { id: 1, icon: <CheckCircle className="w-4 h-4" />, iconBg: 'bg-emerald-500/20 text-emerald-400', title: 'Pedido aprovado', sub: 'Móveis & Cia — R$ 442,00 de comissão', time: 'Agora', unread: true },
  { id: 2, icon: <Gift className="w-4 h-4" />, iconBg: 'bg-brand-gold/20 text-brand-gold', title: 'Bônus liberado!', sub: 'Você atingiu 75% da meta mensal', time: '5 min', unread: true },
  { id: 3, icon: <TrendingUp className="w-4 h-4" />, iconBg: 'bg-blue-500/20 text-blue-400', title: 'Novo recorde!', sub: 'Semana com maior volume de vendas', time: '1h', unread: false },
  { id: 4, icon: <AlertCircle className="w-4 h-4" />, iconBg: 'bg-amber-500/20 text-amber-400', title: 'Catálogo atualizado', sub: 'Novos quadros adicionados ao portfólio', time: '3h', unread: false },
];

// ─── Main component ───────────────────────────────────────────────────────────
export const MockDashboard = () => {
  const [commissions, setCommissions] = useState<Commission[]>([
    { id: 1, amount: 874.20, client: "Móveis & Cia", time: "Agora mesmo" },
    { id: 0, amount: 1342.80, client: "Studio Decor", time: "2 min atrás" },
  ]);
  const [totalCommission, setTotalCommission] = useState(12240.00);
  const [orders, setOrders] = useState(14);
  const [pulsing, setPulsing] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const dismissToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  useEffect(() => {
    const toastMessages: Toast[] = [
      { id: 0, type: 'success', title: 'Pedido confirmado', body: 'Boutique Casa pagou R$ 7.890,00' },
      { id: 0, type: 'bonus', title: '🎉 Bônus de meta!', body: 'Você chegou a 85% da meta mensal' },
      { id: 0, type: 'info', title: 'Novo pedido recebido', body: 'Studio Decor fez um pedido agora' },
      { id: 0, type: 'success', title: 'Comissão creditada', body: 'Galeria Home aprovou R$ 1.142,00' },
    ];
    let idx = 0;

    const interval = setInterval(() => {
      const amount = Math.floor(Math.random() * 900) + 600;
      const client = clients[Math.floor(Math.random() * clients.length)];

      const newEntry: Commission = { id: Date.now(), amount: amount + Math.random(), client, time: "Agora mesmo" };
      setCommissions(prev => [newEntry, ...prev].slice(0, 4));
      setTotalCommission(prev => prev + newEntry.amount);
      setOrders(prev => prev + 1);
      setPulsing(true);
      setTimeout(() => setPulsing(false), 800);

      // Add notification
      const newNotif: Notification = {
        id: Date.now() + 1,
        icon: <CheckCircle className="w-4 h-4" />,
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        title: 'Pedido aprovado',
        sub: `${client} — R$ ${(amount + Math.random()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de comissão`,
        time: 'Agora',
        unread: true,
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 6));

      // Toast pop
      const msg = toastMessages[idx % toastMessages.length];
      const toast: Toast = { ...msg, id: Date.now() + 2 };
      setToasts(prev => [...prev, toast]);
      setTimeout(() => dismissToast(toast.id), 4000);
      idx++;
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col font-sans overflow-hidden select-none relative">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] bg-[radial-gradient(circle,rgba(197,160,89,0.06)_0%,transparent_70%)] blur-[40px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[55%] h-[55%] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[50px]" />
      </div>

      {/* ── Toast Stack (top-center) ─────────────────────── */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none" style={{ width: '85%' }}>
        <AnimatePresence>
          {toasts.slice(-2).map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-lg text-white pointer-events-auto
                ${toast.type === 'success' ? 'bg-emerald-600/90 backdrop-blur-md border border-emerald-500/20' :
                  toast.type === 'bonus' ? 'bg-brand-gold/90 !text-black backdrop-blur-md border border-white/20' :
                  'bg-zinc-900/95 backdrop-blur-md border border-white/10'}`}
            >
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs leading-tight truncate">{toast.title}</span>
                <span className={`text-[10px] leading-tight truncate ${toast.type === 'bonus' ? 'text-black/70' : 'opacity-70'}`}>{toast.body}</span>
              </div>
              <button onClick={() => dismissToast(toast.id)} className="ml-auto opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Top Navigation Bar ──────────────────────────── */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/35 backdrop-blur-md relative z-40">
        <div className="flex items-center gap-3">
          <img src="/images/logo-branca.png" alt="Casa Linda" className="h-5 object-contain" />
          <div className="pl-3 border-l border-white/10 mt-0.5">
            <p className="text-zinc-400 text-[9px] uppercase tracking-wider font-semibold">Portal do Representante</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifs(v => !v); if (!showNotifs) markAllRead(); }}
              className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
            >
              <motion.div animate={pulsing ? { rotate: [0, -15, 15, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>
                <Bell className="w-4 h-4 text-zinc-400" />
              </motion.div>
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span
                    key={unreadCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-brand-gold text-black text-[9px] font-black rounded-full flex items-center justify-center px-0.5"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-10 w-64 bg-[#141414]/95 border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-50 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <p className="text-white font-bold text-xs">Notificações</p>
                    <button onClick={markAllRead} className="text-[10px] text-brand-gold hover:underline">Marcar lidas</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto overscroll-contain">
                    {notifications.map(n => (
                      <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${n.unread ? 'bg-white/[0.03]' : ''}`}>
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>{n.icon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-white text-[11px] font-semibold truncate">{n.title}</p>
                            <span className="text-[9px] text-zinc-500 flex-shrink-0">{n.time}</span>
                          </div>
                          <p className="text-zinc-500 text-[10px] leading-tight truncate">{n.sub}</p>
                        </div>
                        {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-1" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold text-xs">CL</div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="flex-1 p-4 grid grid-cols-5 gap-3 overflow-hidden relative z-10">

        {/* Left Panel (3/5) */}
        <div className="col-span-3 flex flex-col gap-3">

          {/* Main KPI Card */}
          <div className="glass-premium border border-white/5 rounded-2xl p-5 relative overflow-hidden gold-border-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">Comissão do Mês</p>
                <motion.div key={Math.floor(totalCommission)} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-baseline gap-1 mt-1">
                  <span className="text-brand-gold text-base font-bold">R$</span>
                  <span className="text-3xl font-black text-white tracking-tight">
                    {totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </motion.div>
              </div>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </span>
            </div>
            <div className="h-16 mt-2 -mx-1"><SparklineSVG /></div>
            <div className="flex justify-between text-[9px] text-zinc-500 mt-1 px-1">
              <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
            </div>
          </div>

          {/* Small KPI Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-premium border border-white/5 rounded-2xl p-4 flex items-center gap-3 gold-border-glow">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Pedidos</p>
                <motion.p key={orders} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-black text-white">{orders}</motion.p>
              </div>
            </div>
            <div className="glass-premium border border-white/5 rounded-2xl p-4 flex items-center gap-3 gold-border-glow">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Pedido Médio</p>
                <p className="text-xl font-black text-white">R$ 7.285</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (2/5) */}
        <div className="col-span-2 flex flex-col gap-3">

          {/* Goal Ring */}
          <div className="glass-premium border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 gold-border-glow">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold text-center">Meta Mensal</p>
            <GoalRing percent={85} />
            <p className="text-[10px] text-zinc-300 text-center leading-tight">R$ 102.000 <br /><span className="text-zinc-500">de R$ 120.000</span></p>
          </div>

          {/* Live Feed */}
          <div className="glass-premium border border-white/5 rounded-2xl p-4 flex-1 flex flex-col overflow-hidden gold-border-glow">
            <div className="flex items-center gap-2 mb-3">
              <motion.div animate={pulsing ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.4 }}>
                <Zap className="w-3 h-3 text-brand-gold" />
              </motion.div>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Ao Vivo</p>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto animate-pulse" />
            </div>
            <div className="space-y-2 overflow-hidden flex-1">
              <AnimatePresence>
                {commissions.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -16, scale: 0.97 }}
                    animate={{ opacity: 1 - idx * 0.25, y: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="bg-white/[0.015] border border-white/5 hover:border-brand-gold/20 rounded-xl p-2.5 transition-all duration-300"
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
