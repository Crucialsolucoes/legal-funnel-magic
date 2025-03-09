
import { useSiteData } from "@/context/SiteDataContext";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Footer: React.FC = () => {
  const { firmData } = useSiteData();
  const { isAuthenticated } = useAuth();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lawyer-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={firmData.logoUrl || "/placeholder.svg"}
                alt={firmData.name}
                className="h-10 w-auto mr-3 bg-white p-1 rounded"
              />
              <span className="text-xl font-serif font-bold">{firmData.name}</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Especialistas em Direito Previdenciário, dedicados a garantir seus direitos junto ao INSS.
            </p>
            <div className="flex space-x-4">
              <a 
                href={firmData.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={firmData.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={firmData.socialMedia.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link to="/admin" className="text-white/80 hover:text-white transition-colors">
                    Área Admin
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{firmData.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <a 
                  href={`https://wa.me/55${firmData.phone}`} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {firmData.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <a 
                  href={`mailto:${firmData.email}`} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {firmData.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>© {currentYear} {firmData.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
