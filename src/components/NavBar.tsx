
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSiteData } from "@/context/SiteDataContext";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { firmData } = useSiteData();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto object-contain"
                src={firmData.logoUrl || "/placeholder.svg"}
                alt={firmData.name}
              />
              <span className="ml-3 text-xl font-serif font-bold text-lawyer-primary hidden sm:block">
                {firmData.name}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-lawyer-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <a href="#services" className="text-lawyer-dark hover:text-lawyer-primary px-3 py-2 font-medium">
              Serviços
            </a>
            <a href="#about" className="text-lawyer-dark hover:text-lawyer-primary px-3 py-2 font-medium">
              Sobre
            </a>
            <a href="#testimonials" className="text-lawyer-dark hover:text-lawyer-primary px-3 py-2 font-medium">
              Depoimentos
            </a>
            <a href="#contact" className="text-lawyer-dark hover:text-lawyer-primary px-3 py-2 font-medium">
              Contato
            </a>
            {isAuthenticated && (
              <Link to="/admin" className="text-lawyer-dark hover:text-lawyer-primary px-3 py-2 font-medium">
                Admin
              </Link>
            )}
            <Button className="bg-lawyer-accent hover:bg-lawyer-accent/90 text-white ml-3">
              <Phone className="mr-2 h-4 w-4" />
              <a href={`https://wa.me/55${firmData.phone}`} target="_blank" rel="noopener noreferrer">
                {firmData.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="#services"
            className="block px-3 py-2 text-base font-medium text-lawyer-dark hover:text-lawyer-primary"
            onClick={() => setIsOpen(false)}
          >
            Serviços
          </a>
          <a
            href="#about"
            className="block px-3 py-2 text-base font-medium text-lawyer-dark hover:text-lawyer-primary"
            onClick={() => setIsOpen(false)}
          >
            Sobre
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 text-base font-medium text-lawyer-dark hover:text-lawyer-primary"
            onClick={() => setIsOpen(false)}
          >
            Depoimentos
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 text-base font-medium text-lawyer-dark hover:text-lawyer-primary"
            onClick={() => setIsOpen(false)}
          >
            Contato
          </a>
          {isAuthenticated && (
            <Link
              to="/admin"
              className="block px-3 py-2 text-base font-medium text-lawyer-dark hover:text-lawyer-primary"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          <div className="px-3 py-2">
            <Button className="w-full bg-lawyer-accent hover:bg-lawyer-accent/90 text-white">
              <Phone className="mr-2 h-4 w-4" />
              <a href={`https://wa.me/55${firmData.phone}`} target="_blank" rel="noopener noreferrer">
                {firmData.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
