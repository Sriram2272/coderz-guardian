import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import OrganizationsPage from "@/pages/admin/Organizations";
import OrganizationDetail from "@/pages/admin/OrganizationDetail";
import ExamsPage from "@/pages/admin/Exams";
import PlaceholderPage from "@/pages/admin/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="/organizations/:id" element={<OrganizationDetail />} />
            <Route path="/programs" element={<PlaceholderPage title="Programs" />} />
            <Route path="/programs/:id" element={<PlaceholderPage title="Program Details" />} />
            <Route path="/batches" element={<PlaceholderPage title="Batches" />} />
            <Route path="/sections" element={<PlaceholderPage title="Sections" />} />
            <Route path="/students" element={<PlaceholderPage title="Students" />} />
            <Route path="/students/:id" element={<PlaceholderPage title="Student Details" />} />
            <Route path="/teachers" element={<PlaceholderPage title="Teachers" />} />
            <Route path="/teachers/:id" element={<PlaceholderPage title="Teacher Details" />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/assignments" element={<PlaceholderPage title="Assignments" />} />
            <Route path="/analytics" element={<PlaceholderPage title="Analytics & Reports" />} />
            <Route path="/compare" element={<PlaceholderPage title="Compare" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/audit-logs" element={<PlaceholderPage title="Audit Logs" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
