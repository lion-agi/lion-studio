import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/website/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import AuthCallback from '../pages/auth/AuthCallback';
import EmailConfirmation from '../pages/auth/EmailConfirmation';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Integrations from '../pages/console/Integrations';
import Deployment from '@/features/deployment/pages/Deployment';
import Library from '../pages/console/library/Library';
import WorkflowEditor from '../features/workflow/components/WorkflowEditor';
import About from '../pages/website/About';
import Pricing from '../pages/website/Pricing';
import Contact from '../pages/website/Contact';
import UserProfile from '../pages/console/UserProfile';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/email-confirmation" element={<EmailConfirmation />} />
    <Route path="/console/dashboard" element={<Dashboard />} />
    <Route path="/console/integrations" element={<Integrations />} />
    <Route path="/console/deployment" element={<Deployment />} />
    <Route path="/console/library" element={<Library />} />
    <Route path="/console/workflow" element={<WorkflowEditor />} />
    <Route path="/about" element={<About />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/console/user-profile" element={<UserProfile />} />
  </Routes>
);

export default AppRoutes;
