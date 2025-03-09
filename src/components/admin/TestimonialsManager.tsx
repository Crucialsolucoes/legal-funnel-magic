
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, Edit, Star } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSiteData, Testimonial } from "@/context/SiteDataContext";

const TestimonialsManager: React.FC = () => {
  const { firmData, updateTestimonial, addTestimonial, removeTestimonial } = useSiteData();
  
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: "",
    text: "",
    rating: 5
  });
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
      setIsEditDialogOpen(false);
      setEditingTestimonial(null);
    }
  };

  const handleAddTestimonial = () => {
    addTestimonial(newTestimonial);
    setNewTestimonial({
      name: "",
      text: "",
      rating: 5
    });
    setIsAddDialogOpen(false);
  };

  // Rating stars component
  const RatingStars = ({ rating, setRating }: { rating: number; setRating: (r: number) => void }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star 
              className={`h-6 w-6 ${star <= rating ? 'fill-lawyer-secondary text-lawyer-secondary' : 'text-gray-300'}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-lawyer-dark">Depoimentos</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lawyer-primary hover:bg-lawyer-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Depoimento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Depoimento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="new-name" className="block text-sm font-medium mb-1">
                  Nome do Cliente
                </label>
                <Input
                  id="new-name"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="new-text" className="block text-sm font-medium mb-1">
                  Depoimento
                </label>
                <Textarea
                  id="new-text"
                  value={newTestimonial.text}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Avaliação
                </label>
                <RatingStars 
                  rating={newTestimonial.rating} 
                  setRating={(r) => setNewTestimonial({ ...newTestimonial, rating: r })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddTestimonial}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firmData.testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader className="pb-2">
              <CardTitle>
                <div className="flex items-center justify-between">
                  <span>{testimonial.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-lawyer-secondary text-lawyer-secondary' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEditTestimonial(testimonial)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => removeTestimonial(testimonial.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Remover
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Edit Testimonial Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Depoimento</DialogTitle>
          </DialogHeader>
          {editingTestimonial && (
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                  Nome do Cliente
                </label>
                <Input
                  id="edit-name"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="edit-text" className="block text-sm font-medium mb-1">
                  Depoimento
                </label>
                <Textarea
                  id="edit-text"
                  value={editingTestimonial.text}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Avaliação
                </label>
                <RatingStars 
                  rating={editingTestimonial.rating} 
                  setRating={(r) => setEditingTestimonial({ ...editingTestimonial, rating: r })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManager;
