
import { useSiteData } from "@/context/SiteDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesSection: React.FC = () => {
  const { firmData } = useSiteData();

  // Dynamic icon component
  const IconComponent = ({ name }: { name: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.FileText;
    return <Icon className="h-10 w-10 text-lawyer-primary" />;
  };

  return (
    <section id="services" className="bg-lawyer-light py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589216532814-cf882bca9dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-fixed bg-cover opacity-5"></div>
      <div className="section-container relative z-10">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Assistência jurídica especializada em Direito Previdenciário para garantir seus direitos junto ao INSS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {firmData.services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="mb-4">
                  <IconComponent name={service.icon} />
                </div>
                <CardTitle className="text-xl font-serif text-lawyer-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lawyer-dark/70 text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="custom" 
            size="lg" 
            className="bg-lawyer-purple-primary hover:bg-lawyer-purple-tertiary text-white font-medium shadow-md"
            asChild
          >
            <Link to="/contato">Consulte Nossos Serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
