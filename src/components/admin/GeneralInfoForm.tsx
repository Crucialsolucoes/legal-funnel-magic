
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSiteData, FirmData } from "@/context/SiteDataContext";
import { FormEvent } from "react";

const GeneralInfoForm: React.FC = () => {
  const { firmData, updateFirmData } = useSiteData();
  
  const [formData, setFormData] = useState({
    name: firmData.name,
    logoUrl: firmData.logoUrl,
    email: firmData.email,
    phone: firmData.phone,
    address: firmData.address,
    about: firmData.about,
    heroTitle: firmData.heroTitle,
    heroSubtitle: firmData.heroSubtitle,
    socialMedia: {
      instagram: firmData.socialMedia.instagram,
      facebook: firmData.socialMedia.facebook,
      linkedin: firmData.socialMedia.linkedin
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateFirmData(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-lawyer-dark">Informações Gerais</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-lawyer-dark mb-1">
            Nome da Advocacia
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-lawyer-dark mb-1">
            URL do Logo (link para uma imagem)
          </label>
          <Input
            id="logoUrl"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            className="w-full"
            placeholder="/placeholder.svg"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-lawyer-dark mb-1">
              Email de Contato
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-lawyer-dark mb-1">
              Telefone (WhatsApp)
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-lawyer-dark mb-1">
            Endereço
          </label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-lawyer-dark mb-1">
            Sobre a Advocacia
          </label>
          <Textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full min-h-[100px]"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-lawyer-dark mb-3">Seção Hero</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="heroTitle" className="block text-sm font-medium text-lawyer-dark mb-1">
                Título Principal
              </label>
              <Input
                id="heroTitle"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="heroSubtitle" className="block text-sm font-medium text-lawyer-dark mb-1">
                Subtítulo
              </label>
              <Textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-lawyer-dark mb-3">Redes Sociais</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-lawyer-dark mb-1">
                Instagram (URL)
              </label>
              <Input
                id="instagram"
                name="socialMedia.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleChange}
                className="w-full"
                placeholder="https://instagram.com/seuescritorio"
              />
            </div>
            
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-lawyer-dark mb-1">
                Facebook (URL)
              </label>
              <Input
                id="facebook"
                name="socialMedia.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleChange}
                className="w-full"
                placeholder="https://facebook.com/seuescritorio"
              />
            </div>
            
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-lawyer-dark mb-1">
                LinkedIn (URL)
              </label>
              <Input
                id="linkedin"
                name="socialMedia.linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
                className="w-full"
                placeholder="https://linkedin.com/company/seuescritorio"
              />
            </div>
          </div>
        </div>
        
        <Button type="submit" className="bg-lawyer-primary hover:bg-lawyer-primary/90">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default GeneralInfoForm;
