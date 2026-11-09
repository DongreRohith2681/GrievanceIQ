import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle2, Clock, Building2 } from 'lucide-react';

export function Stats() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="relative py-20 bg-[#F1F5F9] border-y border-[#E2E8F0] overflow-hidden">
      {/* Subtle Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Stat 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#176B4D]/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#176B4D]/10 text-[#176B4D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#102C46]">
              {inView ? '12,500+' : '0'}
            </h3>
            <p className="text-sm font-medium text-[#172B3A] mt-1">Grievances Processed</p>
            <p className="text-xs text-[#64748B] mt-0.5">Across all municipal sectors</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#176B4D]/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#176B4D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#102C46]">
              {inView ? '94%' : '0%'}
            </h3>
            <p className="text-sm font-medium text-[#172B3A] mt-1">Resolution Rate</p>
            <p className="text-xs text-[#64748B] mt-0.5">Verified by citizen feedback</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#176B4D]/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#102C46]">
              {inView ? '14 Hours' : '0h'}
            </h3>
            <p className="text-sm font-medium text-[#172B3A] mt-1">Avg. Response Time</p>
            <p className="text-xs text-[#64748B] mt-0.5">AI-accelerated triage</p>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#176B4D]/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#102C46]/10 text-[#102C46] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-extrabold text-[#102C46]">
              {inView ? '45+' : '0'}
            </h3>
            <p className="text-sm font-medium text-[#172B3A] mt-1">Smart Municipalities</p>
            <p className="text-xs text-[#64748B] mt-0.5">Partner cities nationwide</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;
