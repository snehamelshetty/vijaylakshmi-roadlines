import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CinematicLoader from "@/components/CinematicLoader";
import ScrollingTruck from "@/components/ScrollingTruck";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import BookTruck from "./pages/BookTruck";
import TrucksAvailable from "./pages/TrucksAvailable";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminTrucks from "./pages/admin/AdminTrucks";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminContent from "./pages/admin/AdminContent";
import AdminTeam from "./pages/admin/AdminTeam";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            {loading && <CinematicLoader key="loader" onComplete={handleLoadComplete} />}
          </AnimatePresence>
          {!loading && (
            <SmoothScroll>
              <BrowserRouter>
                <ScrollingTruck />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/book" element={<BookTruck />} />
                  <Route path="/trucks" element={<TrucksAvailable />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="trucks" element={<AdminTrucks />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="team" element={<AdminTeam />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SmoothScroll>
          )}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
