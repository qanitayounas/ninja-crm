import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './layouts/DashboardLayout';
import { RoleProvider } from './context/RoleContext';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MessagesPage } from './pages/MessagesPage';
import { ContactsPage } from './pages/ContactsPage';
import { SubaccountsPage, SettingsPage } from './pages/AdminPages';
import { PipelinePage } from './pages/PipelinePage';
import { CalendarPage } from './pages/CalendarPage';
import { AutomationsPage } from './pages/AutomationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { MediaPage } from './pages/MediaPage';
import { BillingPage } from './pages/BillingPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { StoresPage } from './pages/StoresPage';
import { PricingPage } from './pages/PricingPage';

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
      <Routes>
        {/* Public/Standalone Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Main Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="subaccounts" element={<SubaccountsPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="pipeline" element={<PipelinePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="automations" element={<AutomationsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="sites/stores" element={<StoresPage />} />
          <Route path="sites" element={<Navigate to="/dashboard/sites/stores" replace />} />
        </Route>

        {/* Redirection */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster 
        position="top-right" 
        toastOptions={{
          success: {
            style: {
              background: '#F0FDF4',
              color: '#166534',
              fontWeight: '700',
              fontSize: '13px',
              border: '1px solid #BBF7D0',
              padding: '12px 20px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            iconTheme: {
              primary: '#22C55E',
              secondary: '#fff',
            },
          },
        }}
      />
      </BrowserRouter>
    </RoleProvider>
  );
}


export default App;
