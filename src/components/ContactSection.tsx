
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteData } from "@/context/SiteDataContext";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { FormEvent, useState } from "react";

const ContactSection: React.FC = () => {
  const { firmData } = useSiteData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Entre em Contato</h2>
        <p className="section-subtitle">
          Estamos prontos para analisar seu caso e oferecer a melhor solução jurídica
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-serif font-bold text-lawyer-dark mb-6">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lawyer-dark">Endereço</h4>
                  <p className="text-lawyer-dark/70">{firmData.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lawyer-dark">Telefone</h4>
                  <p className="text-lawyer-dark/70">
                    <a href={`https://wa.me/55${firmData.phone}`} className="hover:text-lawyer-primary transition-colors">
                      {firmData.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lawyer-dark">Email</h4>
                  <p className="text-lawyer-dark/70">
                    <a href={`mailto:${firmData.email}`} className="hover:text-lawyer-primary transition-colors">
                      {firmData.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold text-lawyer-dark mb-4">Nosso horário de atendimento</h4>
              <div className="space-y-2">
                <p className="text-lawyer-dark/70">Segunda a Sexta: 8h às 18h</p>
                <p className="text-lawyer-dark/70">Sábado: 9h às 12h</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-serif font-bold text-lawyer-dark mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-lawyer-primary" />
                Envie uma Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-lawyer-dark mb-1">
                    Nome Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-lawyer-dark mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-lawyer-dark mb-1">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-lawyer-dark mb-1">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva seu caso ou dúvida"
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="bg-lawyer-primary hover:bg-lawyer-primary/90 w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
