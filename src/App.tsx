import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import TryForFree from "./pages/TryForFree";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/try-for-free" element={<TryForFree />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
