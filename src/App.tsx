
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AI from "./pages/AI";
import Wishlist from "./pages/Wishlist";
import Map from "./pages/Map";
import Shop from "./pages/Shop";
import StyleIt from "./pages/StyleIt";
import DressUp from "./pages/DressUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/map" element={<Map />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/styleit" element={<StyleIt />} />
          <Route path="/dressup" element={<DressUp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
