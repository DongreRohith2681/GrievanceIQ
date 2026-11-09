import React from 'react';
import { Camera, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Camera,
      title: "Snap & Report",
      description: "Spot a pothole, streetlight failure, or garbage pile? Take a photo, tag the location, and submit in seconds via mobile or web.",
    },
    {
      step: "02",
      icon: Cpu,
      title: "AI Triage & Routing",
      description: "Our intelligent AI engine automatically categorizes severity, predicts the responsible department, and assigns priority.",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Swift Resolution",
      description: "Municipal field officers resolve the issue with live status tracking. Citizens receive verified proof upon completion.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background nodes pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#176B4D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#176B4D]/10 text-[#176B4D] text-xs font-semibold tracking-wide uppercase">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
            How CivicFix Powers Smart Resolution
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            From citizen observation to official closure in three transparent, AI-optimized steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#176B4D]/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#102C46] text-white flex items-center justify-center shadow-md group-hover:bg-[#176B4D] transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-200 group-hover:text-[#176B4D]/30 transition-colors font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#172B3A] mb-3 group-hover:text-[#102C46] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center text-xs font-semibold text-[#176B4D]">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
