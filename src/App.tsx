import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import TryForFree from "./pages/TryForFree";
import Schedule from "./pages/Schedule";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import YearlyBenefits from "./pages/YearlyBenefits";
import PrivateSittings from "./pages/PrivateSittings";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 min
      gcTime: 30 * 60 * 1000,      // 30 min cache
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/try-for-free" element={<TryForFree />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/terms" element={<TermsAndPrivacy />} />
          <Route path="/privacy" element={<TermsAndPrivacy />} />
          <Route path="/yearly-benefits" element={<YearlyBenefits />} />
          <Route path="/private-sittings" element={<PrivateSittings />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
