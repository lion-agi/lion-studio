import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/common/components/theme-provider";
import { Toaster } from "@/common/components/ui/toaster";
import { SupabaseAuthProvider, useSupabaseAuth } from './integrations/supabase';
import { RecoilRoot } from 'recoil';
import commonStyles from '@/common/components/ui/style-guide';

import AppRoutes from './routes';

// Import components
import ConsoleHeader from '@/features/console/components/ConsoleHeader';
import Home from './pages/home/Home';
import Login from './pages/home/Login';
import Registration from './pages/home/Registration';
import AuthCallback from './pages/home/AuthCallback';
import EmailConfirmation from './pages/home/EmailConfirmation';
import WorkflowEditor from '@/features/workflow/components/WorkflowEditor';
import About from './pages/home/About';
import Pricing from './pages/home/Pricing';
import Contact from './pages/home/Contact';

import Library from './features/library/pages/Library';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Integrations from './features/integrations/pages/Integrations';
import Deployment from '@/features/deployment/pages/Deployment';
import Overview from '@/features/dashboard/pages/Overview';
import CallsTab from '@/features/dashboard/pages/CallsTab';
import CostsTab from '@/features/dashboard/pages/CostsTab';
import UserProfile from './features/profile/pages/UserProfile';
import Admin from './features/admin/pages/Admin';

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

// const AppRoutes = () => (
//   <Routes>
//     {/* Main website routes */}
//     <Route path="/" element={<Home />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Registration />} />
//     <Route path="/auth/callback" element={<AuthCallback />} />
//     <Route path="/email-confirmation" element={<EmailConfirmation />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/pricing" element={<Pricing />} />
//     <Route path="/contact" element={<Contact />} />

//     {/* Console routes */}
//     <Route path="/console" element={<ProtectedRoute><ConsoleLayout><Navigate to="/console/dashboard" replace /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/dashboard" element={<ProtectedRoute><ConsoleLayout><Dashboard /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/workflow" element={<ProtectedRoute><ConsoleLayout><WorkflowEditor /></ConsoleLayout></ProtectedRoute>} />
//     {/* <Route path="/console/library" element={<ProtectedRoute><ConsoleLayout><Library /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/integrations" element={<ProtectedRoute><ConsoleLayout><Integrations /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/deployment" element={<ProtectedRoute><ConsoleLayout><Deployment /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/user-profile" element={<ProtectedRoute><ConsoleLayout><UserProfile /></ConsoleLayout></ProtectedRoute>} />
//     <Route path="/console/admin" element={<ProtectedRoute><ConsoleLayout><Admin /></ConsoleLayout></ProtectedRoute>} /> */}

//     {/* Add more console routes as needed */}
//   </Routes>
// );

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