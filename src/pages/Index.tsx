import Navbar from "@/components/Navbar";
import VideoHero from "@/components/hero/VideoHero";
import ServicesSection from "@/components/ServicesSection";
import RealResults from "@/components/sections/RealResults";
import OffersSection from "@/components/OffersSection";
import VideoGallery from "@/components/sections/VideoGallery";
import DoctorsSection from "@/components/DoctorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VideoHero />
      <ServicesSection />
      <RealResults />
      <OffersSection />
      <VideoGallery />
      <DoctorsSection />
      <Footer />
    </div>
  );
};

export default Index;
