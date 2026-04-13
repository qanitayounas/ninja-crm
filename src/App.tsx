import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './layouts/DashboardLayout';
import { RoleProvider } from './context/RoleContext';
import { apiService } from './services/apiService';

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
import { AutomationOverview } from './pages/automations/AutomationOverview';
import { MagnusFlowTab } from './components/automations/MagnusFlowTab';
import { ModulePlaceholder } from './components/ModulePlaceholder';
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
import { ReputationQRCodes } from './pages/reputation/ReputationQRCodes';
import { ReputationGoogleBusiness } from './pages/reputation/ReputationGoogleBusiness';
import { ReputationRequests } from './pages/reputation/ReputationRequests';
import { MarketingPage } from './pages/MarketingPage';
import { MarketingAdsManager } from './pages/marketing/MarketingAdsManager';
import { MarketingEmail } from './pages/marketing/MarketingEmail';
import { MarketingSnippets } from './pages/marketing/MarketingSnippets';
import { MarketingBrandPanels } from './pages/marketing/MarketingBrandPanels';
import { MarketingTimers } from './pages/marketing/MarketingTimers';
import { MarketingActivationLinks } from './pages/marketing/MarketingActivationLinks';
import { MarketingAffiliate } from './pages/marketing/MarketingAffiliate';
import { MarketingStats } from './pages/marketing/MarketingStats';
import { MarketingAutomation } from './pages/marketing/MarketingAutomation';
import { MarketingSocial } from './pages/marketing/MarketingSocial';
import { WebinarsPage } from "./pages/WebinarsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { WordPressPage } from "./pages/WordPressPage";
import { ClientPortalPage } from "./pages/ClientPortalPage";
import { FormsPage } from "./pages/FormsPage";
import { SurveysPage } from "./pages/SurveysPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { ChatWidgetPage } from "./pages/ChatWidgetPage";
import { QRCodesPage } from "./pages/QRCodesPage";
import { SitesSettingsPage } from "./pages/SitesSettingsPage";
import { MarketingHubPage } from "./pages/MarketingHubPage";
import { SchoolProPage } from "./pages/SchoolProPage";
import { SchoolProOverview } from "./pages/schoolpro/SchoolProOverview";
import { TasksPage } from "./pages/TasksPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import {
  SchoolProCourses,
  SchoolProCommunities, 
  SchoolProCertificates, 
  SchoolProStudentPortal, 
  SchoolProMonetization, 
  SchoolProAutomation 
} from "./pages/schoolpro/SchoolProSubPages";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = apiService.isAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = apiService.isAuthenticated();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  return (
    <RoleProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Public/Standalone Routes */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Main Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="subaccounts" element={<SubaccountsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="tasks" element={<TasksPage />} />

            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="automations" element={<AutomationsPage />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AutomationOverview />} />
              <Route path="workflows" element={<ModulePlaceholder title="Workflows" />} />
              <Route path="templates" element={<ModulePlaceholder title="Templates" />} />
              <Route path="magnusflow" element={<MagnusFlowTab />} />
              <Route path="alerts" element={<ModulePlaceholder title="Alerts" />} />
              <Route path="settings" element={<ModulePlaceholder title="Settings" />} />
            </Route>

            <Route path="reports" element={<ReportsPage />}>
              <Route index element={<Navigate to="attribution" replace />} />
              <Route path="attribution" element={<AttributionReport />} />
              <Route path="calls" element={<CallsReport />} />
              <Route path="appointments" element={<AppointmentsReport />} />
              <Route path="kpis" element={<GlobalKPIsReport />} />
              <Route path="fb-ads" element={<ModulePlaceholder title="Facebook Ads" />} />
              <Route path="google-ads" element={<ModulePlaceholder title="Google Ads" />} />
              <Route path="ranking" element={<AgentRankingReport />} />
              <Route path="scheduling" element={<SchedulingReport />} />
            </Route>

            <Route path="reputation" element={<ReputationPage />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<ReputationOverview />} />
              <Route path="requests" element={<ReputationRequests />} />
              <Route path="management" element={<ModulePlaceholder title="Management" />} />
              <Route path="link" element={<ModulePlaceholder title="Review Link" />} />
              <Route path="automation" element={<ModulePlaceholder title="Automation" />} />
              <Route path="sms" element={<ModulePlaceholder title="SMS" />} />
              <Route path="email" element={<ModulePlaceholder title="Email" />} />
              <Route path="whatsapp" element={<ModulePlaceholder title="WhatsApp" />} />
              <Route path="qrcodes" element={<ReputationQRCodes />} />
              <Route path="ai" element={<ModulePlaceholder title="Review AI" />} />
              <Route path="widgets" element={<ModulePlaceholder title="Widgets" />} />
              <Route path="google" element={<ReputationGoogleBusiness />} />
              <Route path="analytics" element={<ModulePlaceholder title="Analytics" />} />
              <Route path="settings" element={<ModulePlaceholder title="Settings" />} />
            </Route>

            <Route path="billing" element={<BillingPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="sites/web" element={<WebsitesPage />} />
            <Route path="sites/stores" element={<StoresPage />} />
            <Route path="sites/webinars" element={<WebinarsPage />} />
            <Route path="sites/analytics" element={<AnalyticsPage />} />
            <Route path="sites/blogs" element={<BlogsPage />} />
            <Route path="sites/wordpress" element={<WordPressPage />} />
            <Route path="sites/portal" element={<ClientPortalPage />} />
            <Route path="sites/forms" element={<FormsPage />} />
            <Route path="sites/surveys" element={<SurveysPage />} />
            <Route path="sites/quizzes" element={<QuizzesPage />} />
            <Route path="sites/chatwidget" element={<ChatWidgetPage />} />
            <Route path="sites/qr" element={<QRCodesPage />} />
            <Route path="sites/settings" element={<SitesSettingsPage />} />
            <Route path="marketing-hub" element={<MarketingHubPage />} />
            <Route path="marketing" element={<MarketingPage />}>
              <Route index element={<Navigate to="ads" replace />} />
              <Route path="ads" element={<MarketingAdsManager />} />
              <Route path="email" element={<MarketingEmail />} />
              <Route path="snippets" element={<MarketingSnippets />} />
              <Route path="timers" element={<MarketingTimers />} />
              <Route path="links" element={<MarketingActivationLinks />} />
              <Route path="affiliate" element={<MarketingAffiliate />} />
              <Route path="social" element={<MarketingSocial />} />
              <Route path="brand" element={<MarketingBrandPanels />} />
              <Route path="stats" element={<MarketingStats />} />
              <Route path="automation" element={<MarketingAutomation />} />
            </Route>
            <Route path="schoolpro" element={<SchoolProPage />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<SchoolProOverview />} />
              <Route path="courses" element={<SchoolProCourses />} />
              <Route path="communities" element={<SchoolProCommunities />} />
              <Route path="certificates" element={<SchoolProCertificates />} />
              <Route path="student-portal" element={<SchoolProStudentPortal />} />
              <Route path="monetization" element={<SchoolProMonetization />} />
              <Route path="automation" element={<SchoolProAutomation />} />
            </Route>
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
