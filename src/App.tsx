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
import { AttributionReport } from './pages/reports/AttributionReport';
import { CallsReport } from './pages/reports/CallsReport';
import { GlobalKPIsReport } from './pages/reports/GlobalKPIsReport';
import { AgentRankingReport } from './pages/reports/AgentRankingReport';
import { AppointmentsReport } from './pages/reports/AppointmentsReport';
import { SchedulingReport } from './pages/reports/SchedulingReport';
import { ReportPlaceholder } from './pages/reports/ReportPlaceholder';
import { MediaPage } from './pages/MediaPage';
import { BillingPage } from './pages/BillingPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { StoresPage } from './pages/StoresPage';
import { WebsitesPage } from './pages/WebsitesPage';
import { PricingPage } from './pages/PricingPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { SignupPage } from './pages/SignupPage';
import { ReputationPage } from './pages/ReputationPage';
import { ReputationOverview } from './pages/reputation/ReputationOverview';

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          {/* Public/Standalone Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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

            <Route path="reports" element={<ReportsPage />}>
              <Route index element={<Navigate to="attribution" replace />} />
              <Route path="attribution" element={<AttributionReport />} />
              <Route path="calls" element={<CallsReport />} />
              <Route path="appointments" element={<AppointmentsReport />} />
              <Route path="kpis" element={<GlobalKPIsReport />} />
              <Route path="fb-ads" element={<ReportPlaceholder title="Facebook Ads" />} />
              <Route path="google-ads" element={<ReportPlaceholder title="Google Ads" />} />
              <Route path="ranking" element={<AgentRankingReport />} />
              <Route path="scheduling" element={<SchedulingReport />} />
            </Route>

            <Route path="reputation" element={<ReputationPage />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<ReputationOverview />} />
              <Route path="requests" element={<ReportPlaceholder title="Requests" />} />
              <Route path="management" element={<ReportPlaceholder title="Management" />} />
              <Route path="link" element={<ReportPlaceholder title="Review Link" />} />
              <Route path="automation" element={<ReportPlaceholder title="Automation" />} />
              <Route path="sms" element={<ReportPlaceholder title="SMS" />} />
              <Route path="email" element={<ReportPlaceholder title="Email" />} />
              <Route path="whatsapp" element={<ReportPlaceholder title="WhatsApp" />} />
              <Route path="qrcodes" element={<ReportPlaceholder title="QR Codes" />} />
              <Route path="ai" element={<ReportPlaceholder title="Review AI" />} />
              <Route path="widgets" element={<ReportPlaceholder title="Widgets" />} />
              <Route path="google" element={<ReportPlaceholder title="Google Business" />} />
              <Route path="analytics" element={<ReportPlaceholder title="Analytics" />} />
              <Route path="settings" element={<ReportPlaceholder title="Settings" />} />
            </Route>

            <Route path="billing" element={<BillingPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="sites/web" element={<WebsitesPage />} />
            <Route path="sites/stores" element={<StoresPage />} />
            <Route path="sites" element={<Navigate to="/dashboard/sites/web" replace />} />
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
