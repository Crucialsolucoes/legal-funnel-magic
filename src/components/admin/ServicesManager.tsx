
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as LucideIcons from "lucide-react";
import { useSiteData, Service } from "@/context/SiteDataContext";

// List of available Lucide icon names for selection
const iconOptions = [
  "Briefcase",
  "FileText",
  "ShieldCheck",
  "Scale",
  "Users",
  "HeartPulse",
  "Building",
  "FileSearch",
  "Gavel",
  "BookOpen",
  "HandHelping",
  "Clock"
];

const ServicesManager: React.FC = () => {
  const { firmData, updateService, addService, removeService } = useSiteData();
  
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    title: "",
    description: "",
    icon: "FileText"
  });
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dynamic icon component
  const IconComponent = ({ name }: { name: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.FileText;
    return <Icon className="h-6 w-6" />;
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingService) {
      updateService(editingService.id, editingService);
      setIsEditDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleAddService = () => {
    addService(newService);
    setNewService({
      title: "",
      description: "",
      icon: "FileText"
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-lawyer-dark">Serviços</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lawyer-primary hover:bg-lawyer-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Serviço</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="new-title" className="block text-sm font-medium mb-1">
                  Título
                </label>
                <Input
                  id="new-title"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="new-description" className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <Textarea
                  id="new-description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label htmlFor="new-icon" className="block text-sm font-medium mb-1">
                  Ícone
                </label>
                <Select
                  value={newService.icon}
                  onValueChange={(value) => setNewService({ ...newService, icon: value })}
                >
                  <SelectTrigger id="new-icon">
                    <SelectValue placeholder="Selecione um ícone" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center">
                          <IconComponent name={icon} />
                          <span className="ml-2">{icon}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddService}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firmData.services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <div className="bg-lawyer-primary/10 p-2 rounded-full mr-3">
                  <IconComponent name={service.icon} />
                </div>
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEditService(service)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => removeService(service.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Remover
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Serviço</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                  Título
                </label>
                <Input
                  id="edit-title"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <Textarea
                  id="edit-description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label htmlFor="edit-icon" className="block text-sm font-medium mb-1">
                  Ícone
                </label>
                <Select
                  value={editingService.icon}
                  onValueChange={(value) => setEditingService({ ...editingService, icon: value })}
                >
                  <SelectTrigger id="edit-icon">
                    <SelectValue placeholder="Selecione um ícone" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center">
                          <IconComponent name={icon} />
                          <span className="ml-2">{icon}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default ServicesManager;
