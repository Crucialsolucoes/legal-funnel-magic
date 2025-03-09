
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define our firm data types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface FirmData {
  name: string;
  logoUrl: string;
  phone: string;
  address: string;
  email: string;
  about: string;
  heroTitle: string;
  heroSubtitle: string;
  services: Service[];
  testimonials: Testimonial[];
  socialMedia: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

interface SiteDataContextType {
  firmData: FirmData;
  updateFirmData: (newData: Partial<FirmData>) => void;
  updateService: (serviceId: string, updatedService: Partial<Service>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  removeService: (serviceId: string) => void;
  updateTestimonial: (testimonialId: string, updatedTestimonial: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  removeTestimonial: (testimonialId: string) => void;
}

// Default data
const defaultFirmData: FirmData = {
  name: "Roque Cunha Advocacia",
  logoUrl: "/placeholder.svg",
  phone: "64999383747",
  address: "Alameda Marechal Rondon, 65, Jataí 75804015",
  email: "contato@roquecunhaadvocacia.com",
  about: "Especialistas em Direito Previdenciário, dedicados a garantir seus direitos junto ao INSS. Nossa equipe experiente oferece atendimento personalizado para aposentadorias, benefícios por incapacidade, pensões e outros serviços previdenciários.",
  heroTitle: "Protegendo seus direitos previdenciários",
  heroSubtitle: "Especialistas em garantir seus benefícios junto ao INSS com atendimento personalizado e eficiente",
  services: [
    {
      id: "1",
      title: "Aposentadorias",
      description: "Análise e planejamento para todas as modalidades de aposentadorias junto ao INSS, garantindo o melhor benefício possível.",
      icon: "Briefcase"
    },
    {
      id: "2",
      title: "Benefícios por Incapacidade",
      description: "Auxílio-doença, aposentadoria por invalidez e demais benefícios relacionados à incapacidade para o trabalho.",
      icon: "HeartPulse"
    },
    {
      id: "3",
      title: "Pensão por Morte",
      description: "Assessoria completa para garantir a pensão por morte aos dependentes, com rapidez e eficiência.",
      icon: "Users"
    },
    {
      id: "4",
      title: "Revisão de Benefícios",
      description: "Análise e revisão de benefícios já concedidos para verificar se você está recebendo os valores corretos.",
      icon: "FileSearch"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Maria Silva",
      text: "Graças ao Dr. Roque Cunha consegui minha aposentadoria depois de ter o pedido negado pelo INSS. Profissional dedicado e atencioso!",
      rating: 5
    },
    {
      id: "2",
      name: "João Pereira",
      text: "Excelente atendimento e total transparência durante todo o processo. Recomendo a todos que precisam de auxílio com questões do INSS.",
      rating: 5
    },
    {
      id: "3",
      name: "Ana Oliveira",
      text: "Meu benefício por incapacidade foi concedido rapidamente graças à competência do Dr. Roque. Equipe muito preparada!",
      rating: 5
    }
  ],
  socialMedia: {
    instagram: "https://instagram.com/roquecunhaadvocacia",
    facebook: "https://facebook.com/roquecunhaadvocacia",
    linkedin: "https://linkedin.com/in/roquecunhaadvocacia"
  }
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firmData, setFirmData] = useState<FirmData>(defaultFirmData);
  const { toast } = useToast();

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('firmData');
    if (savedData) {
      try {
        setFirmData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing stored firm data:', error);
        // If there's an error, use the default data
        setFirmData(defaultFirmData);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('firmData', JSON.stringify(firmData));
  }, [firmData]);

  const updateFirmData = (newData: Partial<FirmData>) => {
    setFirmData(prev => {
      const updated = { ...prev, ...newData };
      toast({
        title: "Dados atualizados",
        description: "As informações foram salvas com sucesso.",
      });
      return updated;
    });
  };

  const updateService = (serviceId: string, updatedService: Partial<Service>) => {
    setFirmData(prev => {
      const updatedServices = prev.services.map(service => 
        service.id === serviceId ? { ...service, ...updatedService } : service
      );
      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso.",
      });
      return { ...prev, services: updatedServices };
    });
  };

  const addService = (service: Omit<Service, 'id'>) => {
    setFirmData(prev => {
      const newService = {
        ...service,
        id: Date.now().toString()
      };
      toast({
        title: "Serviço adicionado",
        description: "O novo serviço foi adicionado com sucesso.",
      });
      return { ...prev, services: [...prev.services, newService] };
    });
  };

  const removeService = (serviceId: string) => {
    setFirmData(prev => {
      const updatedServices = prev.services.filter(service => service.id !== serviceId);
      toast({
        title: "Serviço removido",
        description: "O serviço foi removido com sucesso.",
      });
      return { ...prev, services: updatedServices };
    });
  };

  const updateTestimonial = (testimonialId: string, updatedTestimonial: Partial<Testimonial>) => {
    setFirmData(prev => {
      const updatedTestimonials = prev.testimonials.map(testimonial => 
        testimonial.id === testimonialId ? { ...testimonial, ...updatedTestimonial } : testimonial
      );
      toast({
        title: "Depoimento atualizado",
        description: "O depoimento foi atualizado com sucesso.",
      });
      return { ...prev, testimonials: updatedTestimonials };
    });
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    setFirmData(prev => {
      const newTestimonial = {
        ...testimonial,
        id: Date.now().toString()
      };
      toast({
        title: "Depoimento adicionado",
        description: "O novo depoimento foi adicionado com sucesso.",
      });
      return { ...prev, testimonials: [...prev.testimonials, newTestimonial] };
    });
  };

  const removeTestimonial = (testimonialId: string) => {
    setFirmData(prev => {
      const updatedTestimonials = prev.testimonials.filter(testimonial => testimonial.id !== testimonialId);
      toast({
        title: "Depoimento removido",
        description: "O depoimento foi removido com sucesso.",
      });
      return { ...prev, testimonials: updatedTestimonials };
    });
  };

  return (
    <SiteDataContext.Provider 
      value={{ 
        firmData, 
        updateFirmData, 
        updateService, 
        addService, 
        removeService,
        updateTestimonial,
        addTestimonial,
        removeTestimonial
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
