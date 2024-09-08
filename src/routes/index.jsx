import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import AuthCallback from '../pages/AuthCallback';
import EmailConfirmation from '../pages/EmailConfirmation';
import Dashboard from '../pages/console/Dashboard';
import Integrations from '../pages/console/Integrations';
import Deployment from '../pages/console/Deployment';
import Library from '../pages/console/library/Library';
import WorkflowEditor from '../features/workflow/components/WorkflowEditor';
import About from '../pages/About';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';

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
  </Routes>
);

export default AppRoutes;
