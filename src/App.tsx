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
          <Route path="reports" element={<PlaceholderPage name="Reports" />} />
          <Route path="billing" element={<PlaceholderPage name="Billing" />} />
          <Route path="media" element={<PlaceholderPage name="Media" />} />
        </Route>
        
        {/* Redirection */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="h-full flex flex-col items-center justify-center text-gray-300">
    <div className="bg-white p-12 rounded-3xl shadow-ninja flex flex-col items-center max-w-md text-center">
      <div className="h-20 w-20 bg-ninja-bg rounded-3xl flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-ninja-yellow animate-pulse">!</span>
      </div>
      <h3 className="text-xl font-bold text-ninja-dark mb-2">{name}</h3>
      <p className="text-sm font-medium text-gray-400">This feature is currently being implemented for GoHighLevel integration.</p>
    </div>
  </div>
);

export default App;
