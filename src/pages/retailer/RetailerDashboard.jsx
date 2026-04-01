import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Wallet, Activity, TrendingUp, CreditCard as CardIcon, 
  Search, Bell, Settings, HelpCircle, LogOut, Layout, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, 
  Calendar, PieChart, Repeat, Zap, ShieldCheck, Globe, MessageSquare,
  CheckCircle2, XCircle, Clock, ChevronDown
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

import RetailerLayout from '../../components/RetailerLayout';

// --- DATA ---
const cashFlowData = [
    { month: 'Jan', amount: 45000 }, { month: 'Feb', amount: 32000 }, { month: 'Mar', amount: 55000 },
    { month: 'Apr', amount: 48000 }, { month: 'May', amount: 60000 }, { month: 'Jun', amount: 42000 },
    { month: 'Jul', amount: 58000 }, { month: 'Aug', amount: 85000 }, { month: 'Sep', amount: 52000 },
    { month: 'Oct', amount: 65000 }, { month: 'Nov', amount: 48000 }, { month: 'Dec', amount: 72000 },
];

const INITIAL_TRANSACTIONS = [
    { id: 'TXN1001', type: 'Mobile Recharge', amount: 249, status: 'success', date: '28 Mar, 10:45 AM' },
    { id: 'TXN1002', type: 'DTH Payment', amount: 500, status: 'success', date: '28 Mar, 09:30 AM' },
    { id: 'TXN1003', type: 'Wallet Add', amount: 2000, status: 'pending', date: '28 Mar, 08:15 AM' },
    { id: 'TXN1004', type: 'Electricity Bill', amount: 1240, status: 'failed', date: '27 Mar, 06:20 PM' },
    { id: 'TXN1005', type: 'Payout to Bank', amount: 5000, status: 'success', date: '27 Mar, 04:10 PM' },
];

// --- HELPER COMPONENTS ---

const StatCard = ({ icon, label, value, type, growth }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col justify-between hover:shadow-lg transition-all group">
        <div className="flex justify-between items-center">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all ${
                type === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                type === 'yellow' ? 'bg-yellow-50 text-[#ffb400] group-hover:bg-[#ffb400] group-hover:text-white' :
                'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
            }`}>
                {icon}
            </div>
            <MoreHorizontal size={20} className="text-slate-300" />
        </div>
        <div className="mt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-2xl font-black tracking-tight">{value}</span>
                <span className={`flex items-center text-[10px] font-black px-2.5 py-1 rounded-full ${
                    growth.startsWith('+') ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
                }`}>
                    {growth} {growth.startsWith('+') ? <ArrowUpRight size={12} className="ml-0.5" /> : <ArrowDownRight size={12} className="ml-0.5" />}
                </span>
            </div>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = { success: 'bg-green-50 text-green-600', pending: 'bg-amber-50 text-amber-600', failed: 'bg-red-50 text-red-600' };
    const Icons = { success: CheckCircle2, pending: Clock, failed: XCircle };
    const Icon = Icons[status];
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${styles[status]}`}>
            <Icon size={12} strokeWidth={3} /> {status}
        </span>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-black shadow-2xl border border-slate-700">
                ₹{payload[0].value.toLocaleString()}
            </div>
        );
    }
    return null;
};

const PayoutPanel = () => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-6 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Direct Payout</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none pt-2">
            {[{ name: 'JD', color: 'bg-blue-600' }, { name: 'AM', color: 'bg-emerald-500' }, { name: 'BK', color: 'bg-amber-500' }, { name: 'CL', color: 'bg-rose-500' }].map((user, i) => (
                <div key={i} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer transition-transform hover:scale-110">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-sm text-white shadow-lg ${user.color}`}>{user.name}</div>
                </div>
            ))}
            <button className="w-14 h-14 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-blue-300 hover:text-blue-500 transition-all shrink-0">
                <Plus size={24} />
            </button>
        </div>
    </div>
);

const WalletCard = () => (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 h-[240px] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group cursor-pointer transition-all hover:translate-y-[-5px]">
        <div className="flex justify-between items-start relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10"><Zap className="text-yellow-400" size={28} fill="#facc15" /></div>
            <div className="flex flex-col items-end text-white font-black italic text-sm tracking-tighter">UJJWAL PAY</div>
        </div>
        <div className="relative z-10">
            <p className="text-white text-lg font-black tracking-[0.2em] mb-6 drop-shadow-lg">4582  7892  3892  7835</p>
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-blue-200/50 uppercase tracking-widest">Partner Identity</span>
                    <span className="text-xs font-black text-white tracking-widest uppercase">RETAILER PREFERRED</span>
                </div>
                <div className="text-right flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-blue-200/50 uppercase tracking-widest">CVV</span> <span className="text-xs font-black text-white tracking-widest">***</span>
                </div>
            </div>
        </div>
        <div className="absolute -right-20 -top-20 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[120px] opacity-20 transition-opacity"></div>
    </div>
);

const ActionGrid = () => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-6">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Business Actions</h3>
        <div className="grid grid-cols-3 gap-4">
            {[{ icon: ArrowDownRight, label: 'Income', bg: 'bg-emerald-50', color: 'text-emerald-500' }, { icon: ArrowUpRight, label: 'Expense', bg: 'bg-rose-50', color: 'text-rose-500' }, { icon: MoreHorizontal, label: 'Other', bg: 'bg-blue-50', color: 'text-blue-600' }].map((action, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className={`w-full h-[85px] ${action.bg} rounded-[1.5rem] flex items-center justify-center ${action.color} transition-all group-hover:shadow-lg group-hover:scale-105`}><action.icon size={26} strokeWidth={3} /></div>
                </div>
            ))}
        </div>
    </div>
);

const PrimeBanner = () => (
    <div className="bg-[#ffb400] p-8 rounded-[2.5rem] shadow-2xl shadow-yellow-100 flex flex-col gap-6 group relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-2xl font-black text-white leading-tight tracking-tight">Grow Your <br/> Commission.</h3>
            <p className="text-[10px] font-bold text-white/80 mt-3 uppercase tracking-widest leading-relaxed">Upgrade to Prime Retailer status and earn up to 15% more.</p>
        </div>
        <button className="relative z-10 w-full py-4 bg-white text-[#ffb400] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-[1.03] active:scale-95">Upgrade Today</button>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
    </div>
);

// --- MAIN COMPONENT ---

const RetailerDashboard = () => {
    const [balance, setBalance] = useState(198420);
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
    const [addAmount, setAddAmount] = useState('');

    const handleAddMoney = (e) => {
        e.preventDefault();
        const amount = parseFloat(addAmount);
        if (amount > 0) {
            setBalance(prev => prev + amount);
            const newTxn = {
                id: `TXN${Math.floor(1000 + Math.random() * 9000)}`,
                type: 'Wallet Add',
                amount: amount,
                status: 'success',
                date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
            };
            setTransactions([newTxn, ...transactions]);
            setAddAmount('');
            setIsAddMoneyOpen(false);
            alert(`₹${amount} added successfully!`);
        }
    };

    return (
        <RetailerLayout>
            {/* Modal */}
            <AnimatePresence>
                {isAddMoneyOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl"
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Add Money</h2>
                            <form onSubmit={handleAddMoney} className="space-y-6">
                                <input 
                                    type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)}
                                    placeholder="Enter Amount" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500 font-black text-2xl transition-all"
                                />
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setIsAddMoneyOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cancel</button>
                                    <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Confirm</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Good morning, Retailer 👋</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ujjwal Pay Partner Portal • {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 mt-8">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-[0.15em]">Smart Wallet</span>
                                    <span className="text-[10px] font-bold text-slate-400">Total business holdings</span>
                                </div>
                                <button onClick={() => setIsAddMoneyOpen(true)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Plus size={20} /></button>
                            </div>
                            <div className="flex flex-col relative z-10 mt-2">
                                <span className="text-4xl font-black tracking-tight text-slate-900">₹{balance.toLocaleString()}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Available Balance</span>
                            </div>
                            <div className="flex gap-4 relative z-10 mt-4">
                                <button onClick={() => setIsAddMoneyOpen(true)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Add Money</button>
                                <button className="flex-1 py-4 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Statement</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                <StatCard icon="₹" label="Commission" value="₹7,000" type="blue" growth="+34.5%" />
                                <StatCard icon="%" label="Savings" value="₹5,300" type="yellow" growth="+12.0%" />
                                <StatCard icon="#" label="Income" value="₹28,750" type="blue" growth="+7.7%" />
                                <StatCard icon="!" label="Expenses" value="₹21,450" type="red" growth="-2.1%" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-8">
                        <div className="flex justify-between items-center"><h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Transactions</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                                        <th className="py-4">Transaction ID</th><th className="py-4">Service Type</th><th className="py-4">Amount</th><th className="py-4">Status</th><th className="py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {transactions.map(txn => (
                                        <tr key={txn.id} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="py-4 text-xs font-black text-slate-900">{txn.id}</td>
                                            <td className="py-4 text-xs font-bold text-slate-600">{txn.type}</td>
                                            <td className="py-4 text-xs font-black text-slate-900">₹{txn.amount}</td>
                                            <td className="py-4 text-xs font-black"><StatusBadge status={txn.status} /></td>
                                            <td className="py-4 text-xs font-bold text-slate-400">{txn.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[400px] flex flex-col gap-8 pb-10">
                    <PayoutPanel />
                    <WalletCard />
                    <ActionGrid />
                    <PrimeBanner />
                </div>
            </div>
        </RetailerLayout>
    );
};

export default RetailerDashboard;
