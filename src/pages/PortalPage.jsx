import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Lock, Eye, EyeOff, RefreshCcw,
    Facebook, Twitter, Linkedin, Youtube, Send,
    MessageSquare, Phone, Mail, Instagram, Globe,
    ChevronDown, ChevronRight, ChevronLeft, QrCode,
    Calendar, Smartphone, Check, HelpCircle,
    Building2, Users, ArrowRight, Shield
} from 'lucide-react';
import logo from '../assets/images/logo.png';

// Mock Language Context for simplicity
const useLanguage = () => {
    const [lang, setLang] = useState('en');
    return { 
        language: lang, 
        setLanguage: setLang, 
        t: (key) => TRANSLATIONS[lang][key] || key 
    };
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const TRANSLATIONS = {
    en: {
        welcome: "WELCOME TO UJJWAL PAY",
        login_btn: "Login",
        register_btn: "Register",
        username_placeholder: "Mobile Number",
        password_placeholder: "Password",
        get_app: "GET UJJWAL PAY APP",
        rights: "© Ujjwal Pay Digital Services | All rights reserved.",
        select_lang: "SELECT LANGUAGE",
    },
    hi: {
        welcome: "उज्ज्वल पे में आपका स्वागत है",
        login_btn: "लॉगिन",
        register_btn: "पंजीकरण",
        username_placeholder: "मोबाइल नंबर",
        password_placeholder: "पासवर्ड",
        get_app: "उज्ज्वल पे ऐप डाउनलोड करें",
        rights: "© उज्ज्वल पे डिजिटल सर्विसेज | सर्वाधिकार सुरक्षित।",
        select_lang: "भाषा चुनें",
    }
};

// Mock Login Components
const RetailerLogin = () => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder="Mobile / Username" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder="Password" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/retailer-dashboard'} 
                className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 uppercase tracking-widest text-sm"
            >
                LOGIN
            </button>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1 px-1">
                <span className="cursor-pointer hover:text-blue-600">Register Now</span>
                <span className="cursor-pointer hover:text-blue-600">Forgot?</span>
            </div>
        </div>
    );
};

const DistributorLogin = () => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder="Distributor ID" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder="Password" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/distributor-dashboard'}
                className="w-full py-5 bg-slate-800 text-white font-black rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:shadow-slate-200 uppercase tracking-widest text-sm"
            >
                LOGIN
            </button>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1 px-1">
                <span className="cursor-pointer hover:text-slate-600">Request ID</span>
                <span className="cursor-pointer hover:text-slate-600">Password Reset</span>
            </div>
        </div>
    );
};

const SuperAdminLogin = () => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder="Master Identity" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder="Key" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/super-distributor-dashboard'}
                className="w-full py-5 bg-[#10b981] text-white font-black rounded-xl hover:bg-[#059669] transition-all shadow-lg hover:shadow-emerald-200 uppercase tracking-widest text-sm"
            >
                AUTHORIZE MASTER
            </button>
        </div>
    );
};

const RegisterForm = () => (
    <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
            <input type="text" placeholder="Last Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        </div>
        <input type="text" placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        <input type="text" placeholder="Mobile Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        <button className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-widest text-xs mt-2">Create Account</button>
    </div>
);

const PortalPage = () => {
    const navigate = useNavigate();
    const [portal, setPortal] = useState('retailer');
    const [view, setView] = useState('login'); // 'login' or 'register'
    
    const PORTALS = [
        { 
            id: 'retailer', 
            label: 'Retailer', 
            icon: Users, 
            color: '#2563eb', 
            light: '#eff6ff',
            grad: 'linear-gradient(135deg, #1e40af, #1e3a8a, #0f172a)',
            comp: RetailerLogin,
            desc: 'Digital Banking Hub'
        },
        { 
            id: 'distributor', 
            label: 'Distributor', 
            icon: Building2, 
            color: '#1e293b', 
            light: '#ffffff',
            grad: 'linear-gradient(135deg, #ffffff, #f1f5f9, #cbd5e1)',
            comp: DistributorLogin,
            desc: 'Partner Network'
        },
        { 
            id: 'superadmin', 
            label: 'Super Distributor', 
            icon: Shield, 
            color: '#eab308', 
            light: '#fefce8',
            grad: 'linear-gradient(135deg, #fbbf24, #d97706, #78350f)',
            comp: SuperAdminLogin,
            desc: 'System Controller'
        }
    ];

    const active = PORTALS.find(p => p.id === portal);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
            {/* Minimal Header */}
            <header className="bg-white px-8 py-3 flex items-center justify-between border-b border-slate-100 z-50">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="UJJWAL PAY" style={{ height: '40px' }} />
                </div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/')} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">Website</button>
                    <button className="text-xs font-black uppercase tracking-widest text-blue-600">Support</button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Side: Three Thin Boxes Selector */}
                <div className="w-[320px] lg:w-[400px] h-full bg-white border-r border-slate-100 p-8 flex flex-col gap-4 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Access Portal</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select your account type</p>
                    </div>

                    <div className="space-y-4">
                        {PORTALS.map((p) => (
                            <motion.div
                                key={p.id}
                                onClick={() => { setPortal(p.id); setView('login'); }}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative group cursor-pointer p-6 rounded-[2rem] border transition-all duration-300 ${
                                    portal === p.id 
                                        ? 'bg-white shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] border-slate-200' 
                                        : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-100'
                                }`}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        portal === p.id ? 'scale-110 shadow-lg' : 'opacity-40 group-hover:opacity-100'
                                    }`} style={{ backgroundColor: portal === p.id ? p.color : 'transparent' }}>
                                        <p.icon size={28} className={portal === p.id ? 'text-white' : 'text-slate-400'} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-base font-black transition-colors ${portal === p.id ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {p.label}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.desc}</p>
                                    </div>
                                    {portal === p.id && (
                                        <motion.div layoutId="arrow" className="text-blue-600">
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    )}
                                </div>
                                {portal === p.id && (
                                    <motion.div 
                                        layoutId="indicator" 
                                        className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-2 h-12 bg-blue-600 rounded-r-full"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Security Notice</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Dynamic Card */}
                <div className="flex-1 relative transition-colors duration-700 bg-slate-50 flex items-center justify-center p-8 overflow-y-auto">
                    {/* Background Glows based on Active Portal */}
                    <AnimatePresence>
                        <motion.div 
                            key={portal + "_bg"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-[320px] md:inset-[400px] pointer-events-none"
                        >
                            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-10 transition-colors duration-1000" style={{ backgroundColor: active.color }}></div>
                            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full filter blur-[80px] opacity-5 transition-colors duration-1000" style={{ backgroundColor: active.color }}></div>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={portal}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`w-full max-w-[850px] min-h-[400px] flex rounded-[2rem] overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-white transition-all duration-700 ${view === 'register' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Card Visual Side */}
                            <motion.div 
                                layout
                                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                                className="hidden lg:flex w-[45%] p-12 flex-col items-center justify-center relative overflow-hidden" 
                                style={{ background: active.grad }}
                            >
                                <motion.div 
                                    className="absolute inset-0 opacity-20" 
                                    style={{ background: `radial-gradient(circle at 100% 0%, #fff, transparent)` }}
                                ></motion.div>
                                <motion.div 
                                    layout
                                    className="relative z-10 flex flex-col items-center"
                                >
                                    <img src={logo} alt="UJJWAL PAY" className="h-48 w-auto drop-shadow-2xl" />
                                </motion.div>
                            </motion.div>

                            {/* Card Form Side */}
                            <motion.div 
                                layout
                                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                                className="flex-1 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white"
                            >
                                <div className="max-w-[420px] mx-auto w-full space-y-6">
                                    <div className="space-y-1">
                                        <motion.h3 
                                            key={view + "_title"}
                                            initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-2xl font-black text-slate-900 tracking-tight"
                                        >
                                            {active.label} {view === 'login' ? 'Login' : 'Registration'}
                                        </motion.h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Authorized Portal</p>
                                    </div>
                                    
                                    <div className="p-0.5 rounded-[1.8rem] bg-slate-50 border border-slate-100 shadow-inner">
                                        <div className="bg-white rounded-[1.6rem] p-6 shadow-sm border border-slate-50 min-h-[200px] flex flex-col justify-center">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={view}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {view === 'login' ? <active.comp /> : <RegisterForm />}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="text-center pt-2">
                                        {view === 'login' ? (
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Don't have an account? 
                                                <span onClick={() => setView('register')} className="ml-2 text-blue-600 cursor-pointer hover:underline decoration-2 underline-offset-4 font-black">Create Account</span>
                                            </p>
                                        ) : (
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Already registered? 
                                                <span onClick={() => setView('login')} className="ml-2 text-blue-600 cursor-pointer hover:underline decoration-2 underline-offset-4 font-black">Login Now</span>
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 pt-2">
                                        <div className="flex-1 h-px bg-slate-50"></div>
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Resources</span>
                                        <div className="flex-1 h-px bg-slate-50"></div>
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 text-[8px] font-black text-slate-400 uppercase tracking-widest hover:border-slate-300 transition-colors cursor-pointer">
                                            <Globe size={12} /> English
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 text-[8px] font-black text-slate-400 uppercase tracking-widest hover:border-slate-300 transition-colors cursor-pointer">
                                            <MessageSquare size={12} /> FAQ
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default PortalPage;
