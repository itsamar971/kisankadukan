import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import FarmersPage from './pages/FarmersPage';
import BuyersPage from './pages/BuyersPage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LiveDemoPage from './pages/LiveDemoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone auth routes — no navbar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Marketing site */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="farmers" element={<FarmersPage />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="mission" element={<MissionPage />} />
            <Route path="help" element={<HelpCenterPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="how-we-build" element={<ComingSoonPage title="How we build?" message="Yet to be out soon, we just started!" />} />
            <Route path="demo" element={<LiveDemoPage />} />
            <Route path="pricing" element={<ComingSoonPage title="Pricing" />} />
            <Route path="careers" element={<ComingSoonPage title="Careers" />} />
            <Route path="press" element={<ComingSoonPage title="Press Kit" />} />
            <Route path="blog" element={<ComingSoonPage title="Blog" />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}