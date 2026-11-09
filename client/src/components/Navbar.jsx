import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If not on home page, navigate to home first or scroll if already there
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? 'shadow-sm border-b border-[#E2E8F0]' : 'border-b border-[#E2E8F0]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Section: Branding */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#102C46]/10 flex items-center justify-center text-[#102C46] group-hover:bg-[#102C46] group-hover:text-white transition-colors duration-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#102C46]">
                  CivicFix
                </span>
                <span className="hidden sm:inline-block text-[10px] font-medium text-[#64748B] tracking-wider uppercase">
                  Smart Cities, Better Living
                </span>
              </div>
            </Link>
          </div>

          {/* Center Section: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#172B3A] hover:text-[#176B4D] hover:bg-slate-50 transition-colors"
            >
              Home
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#172B3A] hover:text-[#176B4D] hover:bg-slate-50 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#172B3A] hover:text-[#176B4D] hover:bg-slate-50 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#172B3A] hover:text-[#176B4D] hover:bg-slate-50 transition-colors"
            >
              About Us
            </a>
          </div>

          {/* Right Section: Authentication Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-[#172B3A] hover:bg-slate-100 transition-colors border border-transparent"
            >
              LogIn
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#176B4D] hover:bg-[#13543d] transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-[#172B3A] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay/Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-[#172B3A] hover:bg-slate-50 hover:text-[#176B4D] transition-colors"
            >
              Home
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-[#172B3A] hover:bg-slate-50 hover:text-[#176B4D] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-[#172B3A] hover:bg-slate-50 hover:text-[#176B4D] transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-[#172B3A] hover:bg-slate-50 hover:text-[#176B4D] transition-colors"
            >
              About Us
            </a>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-[#172B3A] border border-[#E2E8F0] hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#176B4D] hover:bg-[#13543d] transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
