import logoImg from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="Ujjwal Pay" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Har Transaction Mein Vishwas. All-in-One Fintech Platform for India.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Mobile Recharge</a></li>
              <li><a href="#" className="hover:text-blue-400">AEPS</a></li>
              <li><a href="#" className="hover:text-blue-400">Money Transfer</a></li>
              <li><a href="#" className="hover:text-blue-400">Credit Card Bill</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@ujjwalpay.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} Ujjwal Pay FinTech Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
