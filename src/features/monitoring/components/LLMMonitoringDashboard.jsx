import React from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const queryClient = new QueryClient();

const ErrorFallback = ({ error }) => (
  <div className="text-red-500">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

const LLMMonitoringDashboard = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="container mx-auto p-4 space-y-6">
            <DashboardHeader />
            <DashboardContent />
          </div>
        </ErrorBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default LLMMonitoringDashboard;