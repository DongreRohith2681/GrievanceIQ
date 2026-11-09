import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Categories />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default Home;