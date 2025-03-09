
import { SiteDataProvider } from "@/context/SiteDataContext";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";

const Index = () => {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </SiteDataProvider>
    </AuthProvider>
  );
};

export default Index;
