import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Users, Wallet, Activity, TrendingUp, CreditCard as CardIcon, 
  Search, Bell, Settings, HelpCircle, LogOut, Layout, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, 
  Calendar, PieChart, Repeat, Zap, ShieldCheck, Globe, MessageSquare,
  CheckCircle2, XCircle, Clock, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active, hasDropdown, to }) => (
    <Link to={to || '#'} className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all group no-underline ${
        active 
        ? 'bg-[#002d72] text-white shadow-inner' 
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`}>
        <div className="flex items-center gap-3">
            <Icon size={18} strokeWidth={active ? 3 : 2.5} className={active ? 'text-white' : 'text-white/60 group-hover:text-white'} />
            <span className={`text-[13px] tracking-wide ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
        </div>
        {hasDropdown && <ChevronDown size={14} className="opacity-40" />}
    </Link>
);

const RetailerLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/portal');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-[#f3f7fb] font-sans text-slate-900 overflow-hidden relative">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-64 h-full bg-[#004dc0] flex flex-col shrink-0 border-r border-blue-800/20 z-50 shadow-2xl">
                <div className="p-8 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <Zap className="text-[#004dc0]" size={22} fill="#004dc0" />
                    </div>
                    <span className="text-white font-black text-xl tracking-tighter">Ujjwal Pay</span>
                </div>

                <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto scrollbar-none">
                    <SidebarItem icon={Layout} label="Dashboard" active={isActive('/retailer-dashboard')} to="/retailer-dashboard" />
                    <SidebarItem icon={Users} label="User" active={isActive('/retailer-dashboard/user')} to="/retailer-dashboard/user" hasDropdown />
                    <SidebarItem icon={ShieldCheck} label="Bank/Aeps" active={isActive('/retailer-dashboard/aeps')} to="/retailer-dashboard/aeps" />
                    <SidebarItem icon={Repeat} label="Transactions" active={isActive('/retailer-dashboard/transactions')} to="/retailer-dashboard/transactions" />
                    <SidebarItem icon={Wallet} label="Wallet" active={isActive('/retailer-dashboard/wallet')} to="/retailer-dashboard/wallet" />
                    <SidebarItem icon={Activity} label="Services" active={isActive('/retailer-dashboard/services')} to="/retailer-dashboard/services" />
                    <SidebarItem icon={PieChart} label="Reports" active={isActive('/retailer-dashboard/reports')} to="/retailer-dashboard/reports" />
                    <SidebarItem icon={ShieldCheck} label="KYC" active={isActive('/retailer-dashboard/kyc')} to="/retailer-dashboard/kyc" hasDropdown />
                    <SidebarItem icon={Bell} label="Notifications" active={isActive('/retailer-dashboard/notifications')} to="/retailer-dashboard/notifications" />
                </nav>

                <div className="p-6">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all font-bold text-xs">
                        <LogOut size={18} />
                        Logout System
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* --- HEADER --- */}
                <header className="flex justify-between items-center py-6 px-10 border-b border-slate-100/50 bg-[#f3f7fb]">
                    <div className="flex-1 max-w-2xl">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-blue-500" size={18} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search here..." 
                                className="w-full pl-14 pr-6 py-3.5 bg-white border border-slate-50 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium text-slate-600 placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 pl-8">
                        <div className="flex items-center gap-2">
                            <button className="p-3 text-slate-400 hover:text-blue-600 transition-all relative">
                                <MessageSquare size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                            </button>
                            <button className="p-3 text-slate-400 hover:text-blue-600 transition-all">
                                <Layout size={20} />
                            </button>
                        </div>

                        <div className="h-8 w-px bg-slate-100 mx-2"></div>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <img 
                                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-slate-700">Retailer_01</span>
                                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-10 py-8 scrollbar-thin scrollbar-thumb-slate-200">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default RetailerLayout;
