
import { useSiteData } from "@/context/SiteDataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  const { firmData } = useSiteData();

  return (
    <section id="testimonials" className="bg-lawyer-light py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">O Que Dizem Nossos Clientes</h2>
        <p className="section-subtitle">
          Conheça a experiência de quem já confiou em nossos serviços jurídicos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {firmData.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-lawyer-secondary text-lawyer-secondary' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="italic text-lawyer-dark/80 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  <div className="bg-lawyer-primary text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
