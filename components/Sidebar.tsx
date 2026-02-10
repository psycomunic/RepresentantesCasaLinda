
import React from 'react';
import { Profile } from '../types';

interface SidebarProps {
  activeTab: 'shop' | 'orders' | 'database';
  onTabChange: (tab: 'shop' | 'orders' | 'database') => void;
  user: Profile;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, user, onLogout }) => {
  const menuItems = [
    { id: 'shop', label: 'Catálogo Atacado', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'orders', label: 'Pedidos Realizados', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'database', label: 'Infraestrutura SQL', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
  ];

  return (
    <aside className="w-80 bg-black border-r border-white/5 flex flex-col h-screen sticky top-0 z-20">
      <div className="p-12">
        <div className="text-3xl font-display tracking-tighter text-white italic">Casa Linda</div>
        <div className="text-[8px] uppercase tracking-[0.5em] text-brand-gold mt-1 font-bold">Black Label Portal</div>
      </div>

      <nav className="flex-1 px-6 mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as any)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 text-[11px] uppercase tracking-[0.2em] font-bold ${
              activeTab === item.id 
                ? 'bg-brand-gold text-black shadow-[0_10px_30px_rgba(197,160,89,0.2)]' 
                : 'text-white/30 hover:bg-white/5 hover:text-brand-gold'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-8 space-y-4">
        <div className="p-6 bg-white/[0.02] border border-brand-gold/10 rounded-[2rem]">
          <p className="text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3">Suporte Exclusive</p>
          <p className="text-xs text-white font-display italic">Marcio Silva</p>
          <p className="text-[10px] text-white/30 mt-1 lowercase">marcio.rep@casalinda.com.br</p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all rounded-2xl border border-transparent hover:border-red-500/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
