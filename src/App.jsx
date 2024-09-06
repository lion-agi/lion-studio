import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider } from "./integrations/supabase";
import TopNavigation from "./components/TopNavigation";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ImageUpload from "./pages/ImageUpload";
import WorkflowEditor from "./components/WorkflowEditor";
import EmailConfirmation from "./pages/EmailConfirmation";
import AuthCallback from "./pages/AuthCallback";
import KnowledgeBase from "./components/knowledge_base/KnowledgeBase";
import Monitoring from "./components/Monitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <TopNavigation />
            <main className="flex-grow">
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
                <Route path="/workflows" element={<div>Workflows Page</div>} />
                <Route path="/deployments" element={<div>Deployments Page</div>} />
                <Route path="/connections" element={<div>Connections Page</div>} />
                <Route path="/prompts" element={<div>Prompts Page</div>} />
                <Route path="/fine-tuning" element={<div>Fine-tuning Page</div>} />
                <Route path="/knowledge-bases" element={<KnowledgeBase />} />
                <Route path="/evaluations" element={<div>Evaluations Page</div>} />
                <Route path="/monitoring" element={<Monitoring />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;