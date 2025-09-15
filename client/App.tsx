import "./global.css";
import "./i18n"; // Import i18n configuration

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Citizen from "./pages/Citizen";
import CitizenLogin from "./pages/CitizenLogin";
import CitizenRegister from "./pages/CitizenRegister";
import CitizenDashboard from "./pages/CitizenDashboard";
import CitizenProfile from "./pages/CitizenProfile";
import CitizenDonations from "./pages/CitizenDonations";
import Volunteer from "./pages/Volunteer";
import VolunteerLogin from "./pages/VolunteerLogin";
import VolunteerRegister from "./pages/VolunteerRegister";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerTeam from "./pages/VolunteerTeam";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";  
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import CitizensManagement from "./pages/CitizensManagement";
import VolunteersManagement from "./pages/VolunteersManagement";
import SheltersManagement from "./pages/SheltersManagement";
import IncidentsManagement from "./pages/IncidentsManagement";
import AnalyticsManagement from "./pages/AnalyticsManagement";
import SystemSettings from "./pages/SystemSettings";
import SystemMonitoring from "./pages/SystemMonitoring";
import BackupManagement from "./pages/BackupManagement";
import Registry from "./pages/Registry";
import { LifeBuoy, Moon, Sun } from "lucide-react";
import { LanguageSelector } from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function Layout() {
  const { t } = useTranslation();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggleDark = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-primary/10 grid place-items-center"><LifeBuoy className="text-primary" /></span>
            <span className="font-bold text-[hsl(var(--heading))] dark:text-foreground">{t('app.name')}</span>
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="hover:underline text-[hsl(var(--heading))] dark:text-foreground">{t('navigation.home')}</a>
              <a href="/citizen" className="hover:underline text-[hsl(var(--heading))] dark:text-foreground">{t('navigation.citizen')}</a>
              <a href="/volunteer" className="hover:underline text-[hsl(var(--heading))] dark:text-foreground">{t('navigation.volunteer')}</a>
              <a href="/admin" className="hover:underline text-[hsl(var(--heading))] dark:text-foreground">{t('navigation.admin')}</a>
            </nav>
            <LanguageSelector />
            <button
              aria-label="Toggle dark mode"
              onClick={toggleDark}
              className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:-translate-y-0.5 transition-all"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/citizen" element={<Citizen />} />
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/profile" element={<CitizenProfile />} />
            <Route path="/citizen/donations" element={<CitizenDonations />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
            <Route path="/volunteer/team" element={<VolunteerTeam />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/registry" element={<Registry />} />
          <Route path="/login" element={<Registry />} />
          <Route path="/citizen/login" element={<CitizenLogin />} />
          <Route path="/citizen/register" element={<CitizenRegister />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route path="/volunteer/register" element={<VolunteerRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/citizens" element={<CitizensManagement />} />
          <Route path="/admin/volunteers" element={<VolunteersManagement />} />
          <Route path="/admin/shelters" element={<SheltersManagement />} />
          <Route path="/admin/incidents" element={<IncidentsManagement />} />
          <Route path="/admin/analytics" element={<AnalyticsManagement />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/monitoring" element={<SystemMonitoring />} />
          <Route path="/admin/backup" element={<BackupManagement />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);