import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseAuthProvider, useSupabaseAuth } from './integrations/supabase';

// Import components
import ConsoleHeader from './components/header/ConsoleHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import AuthCallback from './pages/AuthCallback';
import EmailConfirmation from './pages/EmailConfirmation';
import ImageUpload from './pages/ImageUpload';
import WorkflowEditor from './components/WorkflowEditor';
import Library from './pages/Library';

// Create a client
const queryClient = new QueryClient();

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-background font-sans antialiased">
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

    {/* Console routes */}
    <Route path="/console" element={<ProtectedRoute><ConsoleLayout><Navigate to="/console/workflows" replace /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/workflows" element={<ProtectedRoute><ConsoleLayout><WorkflowEditor /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/library" element={<ProtectedRoute><ConsoleLayout><Library /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/profile" element={<ProtectedRoute><ConsoleLayout><UserProfile /></ConsoleLayout></ProtectedRoute>} />
    <Route path="/console/upload" element={<ProtectedRoute><ConsoleLayout><ImageUpload /></ConsoleLayout></ProtectedRoute>} />

    {/* Add more console routes as needed */}
  </Routes>
);

const App = () => {
  return (
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
  );
};

export default App;