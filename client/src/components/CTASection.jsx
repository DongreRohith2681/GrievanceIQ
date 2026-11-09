import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24 bg-[#102C46] text-white overflow-hidden">
      {/* Background Teal Lighting Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#176B4D]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wider uppercase border border-white/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>JOIN THE SMART CITY REVOLUTION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to make a real difference in your community?
        </h2>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Report your first civic grievance in under 60 seconds and experience transparent, AI-powered resolution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#176B4D] hover:bg-[#13543d] transition-all shadow-xl shadow-[#176B4D]/40 hover:-translate-y-0.5 group"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md"
          >
            Sign In to Portal
          </Link>
        </div>

      </div>
    </section>
  );
}

export default CTASection;
