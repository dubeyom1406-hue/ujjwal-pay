import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from './components/layout/LandingLayout';
import DashboardLayout from './components/layout/DashboardLayout';

import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import PortalPage from './pages/PortalPage';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Transactions from './pages/admin/Transactions';
import Wallet from './pages/admin/Wallet';
import Services from './pages/admin/Services';
import Reports from './pages/admin/Reports';
import KYC from './pages/admin/KYC';
import Notifications from './pages/admin/Notifications';
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import AepsPage from './pages/retailer/AepsPage';
import UserPage from './pages/retailer/UserPage';
import TransactionsPage from './pages/retailer/TransactionsPage';
import WalletPage from './pages/retailer/WalletPage';
import RetailerServicesPage from './pages/retailer/RetailerServicesPage';
import ReportsPage from './pages/retailer/ReportsPage';
import KycPage from './pages/retailer/KycPage';
import NotificationsPage from './pages/retailer/NotificationsPage';
import DistributorDashboard from './pages/distributor/DistributorDashboard';
import DistributorRetailers from './pages/distributor/DistributorRetailers';
import DistributorTransactions from './pages/distributor/DistributorTransactions';
import DistributorReports from './pages/distributor/DistributorReports';
import DistributorPlans from './pages/distributor/DistributorPlans';
import { DistributorInvoices, DistributorAccounts, DistributorPromotions, DistributorSupport, DistributorOldReports } from './pages/distributor/DistributorPages';
import SuperDistributorDashboard from './pages/super-distributor/SuperDistributorDashboard';
import SuperDistributorUserManagement from './pages/super-distributor/SuperDistributorUserManagement';
import { SuperDistributorMasterLog, SuperDistributorKPI, SuperDistributorRevenue, SuperDistributorKYC, SuperDistributorConfig } from './pages/super-distributor/SuperDistributorPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/login" element={<Navigate to="/portal" />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Super Distributor Dashboard Routes */}
        <Route path="/super-distributor-dashboard" element={<SuperDistributorDashboard />} />
        <Route path="/super-distributor-dashboard/distributors" element={<SuperDistributorUserManagement />} />
        <Route path="/super-distributor-dashboard/retailers" element={<SuperDistributorUserManagement />} />
        <Route path="/super-distributor-dashboard/master-log" element={<SuperDistributorMasterLog />} />
        <Route path="/super-distributor-dashboard/kpi" element={<SuperDistributorKPI />} />
        <Route path="/super-distributor-dashboard/revenue" element={<SuperDistributorRevenue />} />
        <Route path="/super-distributor-dashboard/kyc" element={<SuperDistributorKYC />} />
        <Route path="/super-distributor-dashboard/config" element={<SuperDistributorConfig />} />

        {/* Distributor Dashboard Routes */}
        <Route path="/distributor" element={<Navigate to="/distributor-dashboard" />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/distributor-dashboard/retailers" element={<DistributorRetailers />} />
        <Route path="/distributor-dashboard/transactions" element={<DistributorTransactions />} />
        <Route path="/distributor-dashboard/reports" element={<DistributorReports />} />
        <Route path="/distributor-dashboard/plans" element={<DistributorPlans />} />
        <Route path="/distributor-dashboard/invoices" element={<DistributorInvoices />} />
        <Route path="/distributor-dashboard/accounts" element={<DistributorAccounts />} />
        <Route path="/distributor-dashboard/promotions" element={<DistributorPromotions />} />
        <Route path="/distributor-dashboard/support" element={<DistributorSupport />} />
        <Route path="/distributor-dashboard/old-reports" element={<DistributorOldReports />} />

        {/* Dashboard Routes (Protected ideally, but simple for now) */}
        <Route path="/admin-panel" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/admin-panel/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<Reports />} />
          <Route path="kyc" element={<KYC />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Retailer Dashboard Routes */}
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/retailer-dashboard/aeps" element={<AepsPage />} />
        <Route path="/retailer-dashboard/user" element={<UserPage />} />
        <Route path="/retailer-dashboard/transactions" element={<TransactionsPage />} />
        <Route path="/retailer-dashboard/wallet" element={<WalletPage />} />
        <Route path="/retailer-dashboard/services" element={<RetailerServicesPage />} />
        <Route path="/retailer-dashboard/reports" element={<ReportsPage />} />
        <Route path="/retailer-dashboard/kyc" element={<KycPage />} />
        <Route path="/retailer-dashboard/notifications" element={<NotificationsPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
