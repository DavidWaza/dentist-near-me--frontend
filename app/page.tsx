import Hero from "@/components/Hero";
import StoryStats from "@/components/StoryStats";
import Services from "@/components/Services";
import Team from "@/components/Team";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StoryStats />
      <Services />
      <Team />
      <WhyUs />
      <Testimonials />
      <Locations />
      <Footer />
    </main>
  );
}
