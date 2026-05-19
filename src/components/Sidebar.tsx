import React from 'react';
import { NavLink } from 'react-router-dom';
import { Profile } from '../types';
import { LayoutDashboard, Users, ShoppingBag, Receipt, DollarSign, LogOut, TrendingUp, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  user: Profile;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const menuItems = [
    { id: '/', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/ranking', label: 'Ranking de Vendas', icon: TrendingUp },
    { id: '/novo-pedido', label: 'Novo Pedido', icon: ShoppingBag },
    { id: '/clientes', label: 'Meus Clientes', icon: Users },
    { id: 'catalogo', label: 'Catálogo Atacado', icon: ShoppingBag, external: true, url: 'https://atacadocasalinda.com.br' },
    { id: '/pedidos', label: 'Pedidos Realizados', icon: Receipt },
    { id: '/comissoes', label: 'Minhas Comissões', icon: DollarSign },
    { id: '/admin', label: 'Aprovar Cadastros', icon: ShieldCheck },
  ];

  return (
    <aside className="w-80 bg-white dark:bg-black border-r border-zinc-200 dark:border-white/5 flex flex-col h-screen sticky top-0 z-20 transition-colors duration-500">
      <div
        className="p-12 cursor-pointer group"
        onClick={onLogout}
      >
        <img src="/images/logo-preta.png" alt="Casa Linda" className="h-8 dark:hidden object-contain" />
        <img src="/images/logo-branca.png" alt="Casa Linda" className="h-8 hidden dark:block object-contain" />
        <div className="text-[8px] uppercase tracking-[0.5em] text-brand-gold mt-1 font-bold group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Black Label Portal</div>
      </div>

      <nav className="flex-1 px-6 mt-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-white/30 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-brand-gold"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.id}
              className={({ isActive }) => `w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 text-[11px] uppercase tracking-[0.2em] font-bold ${isActive
                ? 'bg-brand-gold text-black shadow-[0_10px_30px_rgba(197,160,89,0.2)]'
                : 'text-zinc-500 dark:text-white/30 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-brand-gold'
                }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-8 space-y-4">
        <div className="p-6 bg-zinc-50 dark:bg-white/[0.02] border border-brand-gold/10 rounded-[2rem] transition-colors duration-500">
          <p className="text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3">Suporte Exclusive</p>
          <p className="text-xs text-zinc-900 dark:text-white font-display italic">Mesa de Operações</p>
          <p className="text-[10px] text-zinc-500 dark:text-white/30 mt-1 lowercase">suporte.atacado@casalinda.com</p>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-red-500/80 dark:text-red-500/50 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all rounded-2xl border border-transparent hover:border-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
