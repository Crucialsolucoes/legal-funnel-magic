
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const HeroSection: React.FC = () => {
  const { firmData } = useSiteData();

  return (
    <div className="relative bg-lawyer-primary text-white">
      <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="section-container relative z-10 flex flex-col items-center justify-center py-20 md:py-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center max-w-4xl animate-fade-in">
          {firmData.heroTitle}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white/80 text-center max-w-3xl">
          {firmData.heroSubtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button className="bg-lawyer-accent text-white hover:bg-lawyer-accent/90 text-lg px-8 py-6" size="lg">
            <a href="#contact">Fale com um Especialista</a>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6" size="lg">
            <a href="#services">Nossos Serviços</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
