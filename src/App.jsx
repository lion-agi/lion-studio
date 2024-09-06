import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/common/components/theme-provider";
import { Toaster } from "@/common/components/ui/toaster";
import { useStore } from './store';
import { supabase } from './integrations/supabase/supabase';
import { SupabaseAuthProvider } from './integrations/supabase/auth';

// Import components
import ConsoleHeader from './features/console/components/ConsoleHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import AuthCallback from './pages/AuthCallback';
import EmailConfirmation from './pages/EmailConfirmation';
import WorkflowEditor from './common/components/WorkflowEditor';
import ProtectedRoute from './common/components/ProtectedRoute';

import Monitoring from './pages/console/Monitoring';
import Library from './pages/console/Library';
import Dashboard from './pages/console/Dashboard';
import Connections from './pages/console/Connections';
import Deployment from './pages/console/Deployment';

// Create a client
const queryClient = new QueryClient();

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-background font-sans antialiased">
    <ConsoleHeader />
    {children}
  </div>
);

const AppRoutes = () => {
  const { session } = useStore();

  return (
    <Routes>
      {/* Main website routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={session ? <Navigate to="/console" replace /> : <Login />} />
      <Route path="/register" element={session ? <Navigate to="/console" replace /> : <Registration />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/email-confirmation" element={<EmailConfirmation />} />

      {/* Console routes */}
      <Route path="/console" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Navigate to="/console/dashboard" replace />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/workflow" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <WorkflowEditor />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/library" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Library />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/monitoring" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Monitoring />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/dashboard" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Dashboard />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/connections" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Connections />
          </ConsoleLayout>
        </ProtectedRoute>
      } />
      <Route path="/console/deployment" element={
        <ProtectedRoute>
          <ConsoleLayout>
            <Deployment />
          </ConsoleLayout>
        </ProtectedRoute>
      } />

      {/* Add more console routes as needed */}
    </Routes>
  );
};

const App = () => {
  const setSession = useStore((state) => state.setSession);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SupabaseAuthProvider>
          <Router>
            <AppRoutes />
            <Toaster />
          </Router>
        </SupabaseAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;