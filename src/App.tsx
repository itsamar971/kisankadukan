import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FarmersPage from './pages/FarmersPage';
import BuyersPage from './pages/BuyersPage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LiveDemoPage from './pages/LiveDemoPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          
          {/* Coming Soon Pages */}
          <Route path="pricing" element={<ComingSoonPage title="Pricing" />} />
          <Route path="careers" element={<ComingSoonPage title="Careers" />} />
          <Route path="press" element={<ComingSoonPage title="Press Kit" />} />
          <Route path="blog" element={<ComingSoonPage title="Blog" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}