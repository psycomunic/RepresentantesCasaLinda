
import React, { useState } from 'react';
import { UserRole, Profile } from './types';
import Sidebar from './components/Sidebar';
import WholesalePortal from './components/WholesalePortal';
import SchemaViewer from './components/SchemaViewer';
import LeadCapturePage from './components/LeadCapturePage';

const MOCK_USER: Profile = {
  id: 'retailer-123',
  full_name: 'Loja Decor Prime',
  email: 'contato@decorprime.com.br',
  role: UserRole.RETAILER,
  representative_id: 'rep-456',
  cnpj: '12.345.678/0001-90',
  company_name: 'Decor Prime Ltda'
};

const App: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [activeTab, setActiveTab] = useState<'shop' | 'orders' | 'database'>('shop');

  if (isPublic) {
    return <LeadCapturePage onLoginClick={() => setIsPublic(false)} />;
  }

  return (
    <div className="flex min-h-screen bg-brand-dark text-white animate-in fade-in duration-1000">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        user={MOCK_USER} 
        onLogout={() => setIsPublic(true)} 
      />
      
      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-12 sticky top-0 z-10">
          <div>
            <h1 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Workspace Atacado</h1>
            <p className="text-2xl font-display text-white mt-1 italic">Casa Linda <span className="text-white/20 tracking-tighter">Black Label</span></p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold uppercase tracking-widest text-white">{MOCK_USER.full_name}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold mt-1">{MOCK_USER.cnpj}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-display text-lg italic shadow-xl">
              DP
            </div>
          </div>
        </header>

        <section className="p-12 overflow-y-auto">
          {activeTab === 'shop' && <WholesalePortal />}
          {activeTab === 'database' && <SchemaViewer />}
          {activeTab === 'orders' && (
            <div className="max-w-6xl mx-auto py-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl font-display text-white italic">Histórico de <span className="text-brand-gold">Faturamento</span></h2>
              <p className="text-white/30 mt-4 uppercase tracking-[0.2em] text-[10px] font-bold">Pedidos e Notas Fiscais</p>
              <div className="mt-16 p-20 border border-white/5 bg-white/[0.02] rounded-[3rem] text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
                Nenhuma transação registrada neste período.
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
