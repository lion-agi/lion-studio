import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider } from "./integrations/supabase";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ImageUpload from "./pages/ImageUpload";
import WorkflowEditor from "./components/WorkflowEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/upload" element={<ImageUpload />} />
              <Route path="/editor" element={<WorkflowEditor />} />
              <Route path="/logout" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;