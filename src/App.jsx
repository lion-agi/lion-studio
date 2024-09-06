import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider } from "./integrations/supabase";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ImageUpload from "./pages/ImageUpload";
import WorkflowEditor from "./components/WorkflowEditor";
import EmailConfirmation from "./pages/EmailConfirmation";
import AuthCallback from "./pages/AuthCallback";
import Library from "./components/library/KnowledgeBase";
import Monitoring from "./components/Monitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/upload" element={<ImageUpload />} />
              <Route path="/editor" element={<WorkflowEditor />} />
              <Route path="/logout" element={<Navigate to="/" replace />} />
              <Route path="/email-confirmation" element={<EmailConfirmation />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/deployments" element={<div>Deployments Page</div>} />
              <Route path="/connections" element={<div>Connections Page</div>} />
              <Route path="/prompts" element={<div>Prompts Page</div>} />
              <Route path="/library" element={<Library />} />
              <Route path="/monitoring" element={<Monitoring />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;