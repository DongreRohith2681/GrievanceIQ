import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  Users, 
  FileText, 
  Bell, 
  Search, 
  ChevronRight,
  Clock,
  CheckCircle,
  Building2
} from 'lucide-react';
import heroImg from '../assets/Hero.jpg';

export function Hero() {
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#how-it-works');
    }
  };

  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-cover bg-center pt-16 pb-24 lg:pt-28 lg:pb-36"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Clean subtle dark overlay so the uploaded Hero.jpg background image is clearly and directly visible */}
      <div className="absolute inset-0 bg-slate-950/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wide uppercase shadow-sm border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>SMARTER CITIES START WITH YOU</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Making Our Cities Better, <span className="text-emerald-400 relative inline-block">
                One Report
                <span className="absolute left-0 -bottom-1 w-full h-1.5 bg-emerald-400/30 rounded-full" />
              </span> at a Time.
            </h1>

            {/* Supporting Description */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Report civic issues, track their progress, and contribute to building cleaner, safer and smarter communities. CivicFix connects citizens and authorities through intelligent, transparent issue management.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-[#176B4D] hover:bg-[#13543d] transition-all shadow-lg shadow-[#176B4D]/40 hover:shadow-xl hover:-translate-y-0.5 group border border-emerald-500/30"
              >
                <span>Report an Issue</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all shadow-sm backdrop-blur-md"
              >
                Explore How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 border border-white/10">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Easy Reporting</h4>
                  <p className="text-xs text-slate-300">Snap & submit in seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 border border-white/10">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Real-Time Track</h4>
                  <p className="text-xs text-slate-300">Live status updates</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 border border-white/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Transparent</h4>
                  <p className="text-xs text-slate-300">Accountable resolution</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Polished Dashboard Preview */}
          <div className="lg:col-span-6 relative">
            
            {/* Decorative back glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-[#102C46] rounded-3xl opacity-25 blur-2xl transform rotate-1 scale-95" />

            {/* Main Mockup Container with Gentle Float Animation */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl shadow-black/30 overflow-hidden text-slate-900 animate-float">
              
              {/* Dashboard Window Header */}
              <div className="bg-[#102C46] px-4 py-3.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 ml-2 font-mono">civicfix.app/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-300 font-medium">System Live</span>
                </div>
              </div>

              {/* Dashboard Content Body */}
              <div className="p-5 sm:p-6 bg-slate-50/90 space-y-5">
                
                {/* Header inside Dashboard */}
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#102C46] flex items-center justify-center text-white font-bold">
                      CF
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">CivicFix Command Center</h3>
                      <p className="text-xs text-slate-500">Welcome back, Citizen Officer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      A
                    </div>
                  </div>
                </div>

                {/* Statistics Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-medium text-slate-500">Total Reports</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">1,250</p>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +12% this week
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-medium text-slate-500">Resolved</p>
                    <p className="text-xl font-bold text-[#176B4D] mt-1">890</p>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" /> 71.2% rate
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-medium text-slate-500">In Progress</p>
                    <p className="text-xl font-bold text-amber-600 mt-1">245</p>
                    <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Active crews
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-medium text-slate-500">Pending</p>
                    <p className="text-xl font-bold text-slate-700 mt-1">115</p>
                    <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-1">
                      <Activity className="w-3 h-3" /> Queued
                    </span>
                  </div>
                </div>

                {/* Split: Recent Complaints & AI Insight */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  
                  {/* Recent Complaints (7 cols) */}
                  <div className="sm:col-span-7 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Complaints</h4>
                      <span className="text-[11px] text-[#176B4D] font-semibold cursor-pointer hover:underline">View All</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">Road damage near Main St</p>
                            <p className="text-[10px] text-slate-500">Sector 4 • 2h ago</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          In Progress
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#176B4D] flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">Garbage overflow Sector 12</p>
                            <p className="text-[10px] text-slate-500">North Zone • 5h ago</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-[#176B4D] border border-emerald-200">
                          Resolved
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">Water leakage City Park</p>
                            <p className="text-[10px] text-slate-500">Central • 1d ago</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Insight & Map Mini Preview (5 cols) */}
                  <div className="sm:col-span-5 flex flex-col gap-4">
                    
                    {/* AI Insight Card */}
                    <div className="bg-gradient-to-br from-[#102C46] to-[#176B4D] p-4 rounded-xl text-white shadow-md relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                        </div>
                        <span className="text-xs font-bold tracking-wide uppercase text-emerald-200">AI-Powered Insights</span>
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed">
                        High-priority potholes identified in Sector 4. Auto-routed to municipal road crew #3.
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[10px] text-emerald-300 font-medium">
                        <span>Confidence: 98.4%</span>
                        <span className="underline cursor-pointer">View Report &rarr;</span>
                      </div>
                    </div>

                    {/* Mini Map Representation */}
                    <div className="bg-slate-900 rounded-xl p-3 text-white flex items-center justify-between relative overflow-hidden border border-slate-800">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="relative z-10">
                        <p className="text-[11px] font-bold text-slate-200">Live Grid Coverage</p>
                        <p className="text-[10px] text-slate-400">3 active zones monitored</p>
                      </div>
                      <div className="relative z-10 px-2.5 py-1 rounded-md bg-[#176B4D] text-[10px] font-semibold text-white shadow-sm">
                        Active Map
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Notification Badge */}
            <div className="absolute -bottom-6 -left-6 sm:left-6 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-bounce-slow max-w-xs text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B4D] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Issue #4928 Resolved</p>
                <p className="text-[11px] text-slate-500">Garbage clearance completed in 4h</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
