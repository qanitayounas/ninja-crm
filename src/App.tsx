import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

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
        </Route>

        {/* Redirection */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
