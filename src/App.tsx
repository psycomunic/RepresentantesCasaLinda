import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserRole, Profile } from './types';
import Sidebar from './components/Sidebar';
import WholesalePortal from './components/WholesalePortal';
import { Dashboard } from './pages/Dashboard';
import { ClientManager } from './pages/ClientManager';
import { CheckoutFlow } from './pages/CheckoutFlow';
import { Commissions } from './pages/Commissions';
import { Orders } from './pages/Orders';
import { NewOrder } from './pages/NewOrder';
import { SalesRanking } from './pages/SalesRanking';
import { CartProvider } from './context/CartContext';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { supabase } from './lib/supabase';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

const ProtectedLayout = ({ user, onLogout }: { user: Profile, onLogout: () => void }) => {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="flex min-h-screen bg-background text-foreground transition-colors duration-500 animate-in fade-in duration-1000">
          <Sidebar
            user={user}
            onLogout={onLogout}
          />

          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-24 shrink-0 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-xl flex items-center justify-between px-12 z-10 transition-colors duration-500">
              <div>
                <h1 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Portal do Representante</h1>
                <p className="text-2xl font-display text-zinc-900 dark:text-white mt-1 italic">Casa Linda <span className="text-zinc-400 dark:text-white/20 tracking-tighter">Black Label</span></p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">{user.full_name}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold mt-1">{user.role === 'admin' ? 'Administração' : 'Vendas B2B'}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-display text-lg italic shadow-xl">
                  {user.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AG'}
                </div>
                {/* Theme Toggle Button added in Header */}
                <ThemeToggle />
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
                {user.role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </section>
          </main>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

const AppRoutes = () => {
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      if (data) setUserProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || !userProfile) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage onLoginClick={() => navigate('/login')} />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/obrigado" element={<ThankYouPage />} />
        <Route path="/login" element={<AuthPage onLogin={() => navigate('/')} onBack={() => navigate('/')} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return <ProtectedLayout user={userProfile} onLogout={handleLogout} />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
