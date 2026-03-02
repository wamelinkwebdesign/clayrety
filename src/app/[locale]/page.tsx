import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import SocialProofStrip from "@/components/SocialProofStrip";
import Sessions from "@/components/Sessions";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyBookCTA from "@/components/StickyBookCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <SocialProofStrip />
        <Sessions />
        <About />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <StickyBookCTA />
    </>
  );
}
