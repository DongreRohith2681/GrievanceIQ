import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        
        {/* Placeholder for How It Works section to support anchor smooth scrolling */}
        <section id="how-it-works" className="py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#102C46]">How CivicFix Works</h2>
            <p className="mt-4 text-[#64748B]">Transparent grievance reporting and AI resolution workflow.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;