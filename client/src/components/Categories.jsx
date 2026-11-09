import React from 'react';
import { AlertTriangle, Lightbulb, Trash2, Droplets, ShieldAlert, Wrench } from 'lucide-react';

export function Categories() {
  const categories = [
    { icon: AlertTriangle, name: "Roads & Potholes", count: "340 active reports", color: "text-amber-600 bg-amber-50" },
    { icon: Trash2, name: "Garbage & Sanitation", count: "215 active reports", color: "text-emerald-600 bg-emerald-50" },
    { icon: Droplets, name: "Water & Drainage", count: "180 active reports", color: "text-blue-600 bg-blue-50" },
    { icon: Lightbulb, name: "Street Lighting", count: "95 active reports", color: "text-yellow-600 bg-yellow-50" },
    { icon: ShieldAlert, name: "Public Safety", count: "60 active reports", color: "text-red-600 bg-red-50" },
    { icon: Wrench, name: "Municipal Infrastructure", count: "120 active reports", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <section className="py-20 bg-[#F0FDF4] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl font-extrabold text-[#102C46]">Frequently Reported Categories</h2>
          <p className="text-sm text-[#64748B]">Real-time municipal grievance distribution across city sectors.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#176B4D]/40 transition-all flex items-center gap-4 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#172B3A] group-hover:text-[#176B4D] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{cat.count}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Categories;
