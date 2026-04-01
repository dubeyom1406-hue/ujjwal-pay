import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe, Send, HelpCircle } from 'lucide-react';

const ContactInfo = ({ icon: Icon, title, info, sub, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group transition-all"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-10 rounded-full bg-${color}-500 -mr-10 -mt-10 transition-transform group-hover:scale-125`} />
    <div className={`w-14 h-14 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center mb-8 shadow-lg`}>
       <Icon size={28} />
    </div>
    <h3 className="text-xl font-black text-[#0a2357] mb-3">{title}</h3>
    <p className="text-lg font-black text-[#0a2357] mb-1 leading-none">{info}</p>
    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{sub}</p>
  </motion.div>
);

const ContactPage = () => {
  return (
    <div className="bg-slate-50 pt-32 pb-20 font-sans min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Form */}
          <div className="col-span-1 lg:col-span-7 space-y-12">
            <div className="space-y-6">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="inline-block px-5 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm"
               >
                 Get in Touch
               </motion.div>
               <motion.h1 
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-7xl font-black text-[#0a2357] leading-none tracking-tighter"
               >
                 Let's Start a <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conversation.</span>
               </motion.h1>
               <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                 Our dedicated support team is available round-the-clock to assist you with any questions or concerns. 
               </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(30,58,138,0.15)] border border-gray-100 relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />
               <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#0a2357] uppercase tracking-widest pl-2">Your Name</label>
                      <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-[#0a2357] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#0a2357] uppercase tracking-widest pl-2">Email Address</label>
                      <input type="email" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-[#0a2357] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#0a2357] uppercase tracking-widest pl-2">Subject</label>
                    <select className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-[#0a2357] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner">
                       <option>Retailer Inquiry</option>
                       <option>Support Request</option>
                       <option>Billing Issue</option>
                       <option>API Partnership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#0a2357] uppercase tracking-widest pl-2">Your Message</label>
                    <textarea rows="4" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-[#0a2357] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="bg-[#0a2357] text-white w-full py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group">
                     Send Message
                     <Send size={16} className="group-hover:translate-x-3 transition-transform" />
                  </button>
               </form>
            </motion.div>
          </div>

          {/* Right: Info Cards */}
          <div className="col-span-1 lg:col-span-5 grid grid-cols-1 gap-8 mt-10 md:mt-24">
             <ContactInfo 
               icon={Phone} 
               title="Call Assistance" 
               info="+91 88000 00000" 
               sub="24/7 HELPLINE SERVICE"
               color="blue"
             />
             <ContactInfo 
               icon={Mail} 
               title="Email Support" 
               info="support@ujjwalpay.com" 
               sub="WE REPLY IN UNDER 2 HOURS"
               color="indigo"
             />
             <ContactInfo 
               icon={MapPin} 
               title="Our Office" 
               info="Mumbai, Maharashtra" 
               sub="INDIA - 400001"
               color="teal"
             />
             
             {/* Dynamic Help Section */}
             <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0a2357] to-[#1e40af] text-white relative shadow-2xl overflow-hidden mt-12 group cursor-default">
                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-400 blur-[80px] opacity-20 pointer-events-none" />
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                      <HelpCircle size={24} />
                   </div>
                   <h3 className="text-xl font-bold mb-4">Check Our Knowledge Base</h3>
                   <p className="text-blue-100 text-sm font-semibold opacity-80 leading-relaxed mb-10">Common questions and training videos available on our self-help portal.</p>
                   <button className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:gap-6 transition-all">Visit Help Center <span>›</span></button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
