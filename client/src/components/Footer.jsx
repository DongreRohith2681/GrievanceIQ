import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Globe, Share2, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#176B4D] flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CivicFix</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-Powered Smart Public Grievance Management & Resolution System. Empowering citizens and city officials to build cleaner, safer, and smarter communities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#social" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#176B4D] transition-colors" aria-label="Globe">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#share" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#176B4D] transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#chat" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#176B4D] transition-colors" aria-label="Chat">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Citizen Login</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Register Complaint</Link></li>
            </ul>
          </div>

          {/* Governance */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Governance</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#admin" className="hover:text-emerald-400 transition-colors">Admin Portal</a></li>
              <li><a href="#officer" className="hover:text-emerald-400 transition-colors">Officer Desk</a></li>
              <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#176B4D] shrink-0" />
                <span>Smart City Command HQ, Sector 4</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#176B4D] shrink-0" />
                <span>+1 (800) CIVIC-FIX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#176B4D] shrink-0" />
                <span>support@civicfix.gov</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} CivicFix Inc. All rights reserved. Built for Smart Cities Worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
