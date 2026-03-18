import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
