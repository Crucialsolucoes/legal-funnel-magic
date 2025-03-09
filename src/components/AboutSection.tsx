
import { useSiteData } from "@/context/SiteDataContext";
import { Shield, Award, Users } from "lucide-react";

const AboutSection: React.FC = () => {
  const { firmData } = useSiteData();

  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-lawyer-dark mb-6">
              Sobre {firmData.name}
            </h2>
            <p className="text-lawyer-dark/80 text-lg mb-6 leading-relaxed">
              {firmData.about}
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lawyer-dark">Comprometimento</h3>
                  <p className="text-lawyer-dark/70">
                    Dedicação total à defesa dos seus direitos previdenciários
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <Award className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lawyer-dark">Experiência</h3>
                  <p className="text-lawyer-dark/70">
                    Anos de atuação especializada em questões previdenciárias
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-4">
                  <Users className="h-6 w-6 text-lawyer-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lawyer-dark">Atendimento Humanizado</h3>
                  <p className="text-lawyer-dark/70">
                    Tratamos cada cliente com a atenção e respeito que merece
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-2/3 h-2/3 bg-lawyer-secondary/20 rounded-lg -z-10"></div>
            <img 
              src="/placeholder.svg" 
              alt="Escritório de advocacia" 
              className="rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
            <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 bg-lawyer-primary/20 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
