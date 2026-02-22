import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, Profile } from './types';
import Sidebar from './components/Sidebar';
import WholesalePortal from './components/WholesalePortal';
import LeadCapturePage from './components/LeadCapturePage';
import { Dashboard } from './pages/Dashboard';
import { ClientManager } from './pages/ClientManager';
import { CheckoutFlow } from './pages/CheckoutFlow';
import { Commissions } from './pages/Commissions';
import { Orders } from './pages/Orders';
import { NewOrder } from './pages/NewOrder';
import { SalesRanking } from './pages/SalesRanking';
import { CartProvider } from './context/CartContext';

const MOCK_USER: Profile = {
  id: 'rep-123',
  full_name: 'Angelo Garcia',
  email: 'angelo@casalinda.com.br',
  role: UserRole.REPRESENTATIVE,
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('@casalinda:auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('@casalinda:auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('@casalinda:auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LeadCapturePage onLoginClick={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex min-h-screen bg-brand-dark text-white animate-in fade-in duration-1000">
          <Sidebar
            user={MOCK_USER}
            onLogout={handleLogout}
          />

          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-24 shrink-0 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-12 z-10">
              <div>
                <h1 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Portal do Representante</h1>
                <p className="text-2xl font-display text-white mt-1 italic">Casa Linda <span className="text-white/20 tracking-tighter">Black Label</span></p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold uppercase tracking-widest text-white">{MOCK_USER.full_name}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold mt-1">Vendas B2B</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-display text-lg italic shadow-xl">
                  AG
                </div>
              </div>
            </header>

            <section className="flex-1 overflow-y-auto p-12">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clientes" element={<ClientManager />} />
                <Route path="/catalogo" element={<WholesalePortal />} />
                <Route path="/checkout" element={<CheckoutFlow />} />
                <Route path="/comissoes" element={<Commissions />} />
                <Route path="/pedidos" element={<Orders />} />
                <Route path="/novo-pedido" element={<NewOrder />} />
                <Route path="/ranking" element={<SalesRanking />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </section>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
