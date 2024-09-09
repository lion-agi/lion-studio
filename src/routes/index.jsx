import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/home/Login';
import Registration from '../pages/home/Registration';
import AuthCallback from '../pages/home/AuthCallback';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Integrations from '../pages/console/Integrations';
import Deployment from '@/features/deployment/pages/Deployment';
import Library from '@/features/library/pages/Library';
import WorkflowEditor from '../features/workflow/components/WorkflowEditor';
import About from '../pages/home/About';
import Pricing from '../pages/home/Pricing';
import Contact from '../pages/home/Contact';
import UserProfile from '../features/profile/pages/UserProfile';
import Overview from '@/features/dashboard/pages/Overview';
import CallsTab from '@/features/dashboard/pages/CallsTab';
import CostsTab from '@/features/dashboard/pages/CostsTab';
import Admin from '../features/admin/pages/Admin';
import ConsoleLayout from '../common/components/ConsoleLayout';
import ProtectedRoute from '@/common/components/ProtectedRoute';
import WorkerManagement from '@/features/deployment/pages/WorkerManagement';
import JobManagement from '@/features/deployment/pages/JobManagement';
import CronAndSchedule from '@/features/deployment/pages/CronAndSchedule';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/about" element={<About />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
    
    <Route path="/console" element={<ProtectedRoute><ConsoleLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="calls" element={<CallsTab />} />
        <Route path="costs" element={<CostsTab />} />
      </Route>
      <Route path="integrations" element={<Integrations />} />
      <Route path="deployment" element={<Deployment />}>
        <Route path="workers" element={<WorkerManagement />} />
        <Route path="jobs" element={<JobManagement />} />
        <Route path="cron" element={<CronAndSchedule />} />
      </Route>
      <Route path="library" element={<Library />} />
      <Route path="workflow" element={<WorkflowEditor />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  </Routes>
);

export default AppRoutes;