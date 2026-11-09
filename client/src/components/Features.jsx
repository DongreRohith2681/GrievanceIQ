import React from 'react';
import { Sparkles, MapPin, ShieldCheck, Activity, Smartphone, BellRing } from 'lucide-react';

export function Features() {
  const featuresList = [
    {
      icon: Sparkles,
      title: "AI-Powered Classification",
      description: "Automatically analyzes uploaded complaint photos, detects severity, tags category, and filters out spam submissions with 98% accuracy.",
    },
    {
      icon: MapPin,
      title: "Interactive GIS Mapping",
      description: "Pins complaints on an interactive city map with hot-spot identification, helping municipal planners allocate repair crews efficiently.",
    },
    {
      icon: Activity,
      title: "Real-Time Tracking",
      description: "Citizens receive instant SMS and push notifications at every stage—from submission to inspection and final closure.",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Dashboards",
      description: "Tailored portals for Citizens, Field Officers, and Administrators with granular permissions and accountability logs.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Experience",
      description: "Optimized Progressive Web App allowing offline photo capture and instant sync when network is restored.",
    },
    {
      icon: BellRing,
      title: "SLA Escalation Engine",
      description: "Automatic escalation to senior municipal authorities if field officers fail to acknowledge or resolve complaints within set SLAs.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102C46]/10 text-[#102C46] text-xs font-semibold tracking-wide uppercase">
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
            Engineered for Modern Governance
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Discover the intelligent tools that empower city officials and citizens to resolve urban challenges together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#176B4D]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#176B4D]/10 text-[#176B4D] flex items-center justify-center mb-6 group-hover:bg-[#176B4D] group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#172B3A] mb-3 group-hover:text-[#176B4D] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;
