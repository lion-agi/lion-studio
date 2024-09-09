import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/website/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import AuthCallback from '../pages/auth/AuthCallback';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Integrations from '../pages/console/Integrations';
import Deployment from '@/features/deployment/pages/Deployment';
import Library from '@/features/library/pages/Library';
import WorkflowEditor from '../features/workflow/components/WorkflowEditor';
import About from '../pages/website/About';
import Pricing from '../pages/website/Pricing';
import Contact from '../pages/website/Contact';
import UserProfile from '../pages/console/UserProfile';
import Overview from '@/features/dashboard/pages/Overview';
import CallsTab from '@/features/dashboard/pages/CallsTab';
import CostsTab from '@/features/dashboard/pages/CostsTab';
import Admin from '../pages/console/Admin';
import ConsoleLayout from '../pages/console/ConsoleLayout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/about" element={<About />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
    
    <Route path="/console" element={<ConsoleLayout />}>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="calls" element={<CallsTab />} />
        <Route path="costs" element={<CostsTab />} />
      </Route>
      <Route path="integrations" element={<Integrations />} />
      <Route path="deployment" element={<Deployment />} />
      <Route path="library" element={<Library />} />
      <Route path="workflow-editor" element={<WorkflowEditor />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  </Routes>
);

export default AppRoutes;