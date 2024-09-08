import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/common/components/theme-provider";
import { Toaster } from "@/common/components/ui/toaster";
import { SupabaseAuthProvider, useSupabaseAuth } from './integrations/supabase';
import { RecoilRoot } from 'recoil';
import commonStyles from '@/common/components/ui/style-guide';

// Import components
import ConsoleHeader from '@/features/console/components/ConsoleHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AuthCallback from './pages/AuthCallback';
import EmailConfirmation from './pages/EmailConfirmation';
import WorkflowEditor from '@/features/workflow/components/WorkflowEditor';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

import Library from './pages/console/library/Library';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Integrations from './pages/console/Integrations';
import Deployment from './pages/console/Deployment';

// Create a client
const queryClient = new QueryClient();

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-background font-sans antialiased" style={commonStyles}>
    <ConsoleHeader />
    {children}
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { session } = useSupabaseAuth();
  return session ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Main website routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/email-confirmation" element={<EmailConfirmation />} />
    <Route path="/about" element={<About />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />

    {/* Console routes */}
    <Route path="/console" element={<ProtectedRoute><ConsoleLayout><Navigate to="/console/dashboard" replace /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/dashboard" element={<ProtectedRoute><ConsoleLayout><Dashboard /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/workflow" element={<ProtectedRoute><ConsoleLayout><WorkflowEditor /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/library" element={<ProtectedRoute><ConsoleLayout><Library /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/integrations" element={<ProtectedRoute><ConsoleLayout><Integrations /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/deployment" element={<ProtectedRoute><ConsoleLayout><Deployment /></ConsoleLayout></ProtectedRoute>} />

    {/* Add more console routes as needed */}
  </Routes>
);

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SupabaseAuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
              <AppRoutes />
              <Toaster />
            </Router>
          </ThemeProvider>
        </SupabaseAuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
