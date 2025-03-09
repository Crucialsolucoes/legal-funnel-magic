
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-lawyer-primary text-white p-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel Administrativo</h1>
        <Button variant="ghost" className="text-white hover:bg-lawyer-primary/90" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
