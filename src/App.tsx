import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Universities from "@/pages/admin/Universities";
import UniversityDetail from "@/pages/admin/UniversityDetail";
import ProgramDetail from "@/pages/admin/ProgramDetail";
import BatchDetail from "@/pages/admin/BatchDetail";
import SectionDetail from "@/pages/admin/SectionDetail";
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
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/:id" element={<UniversityDetail />} />
            <Route path="/universities/:id/programs/:programKey" element={<ProgramDetail />} />
            <Route path="/universities/:id/programs/:programKey/batches/:batchId" element={<BatchDetail />} />
            <Route path="/universities/:id/programs/:programKey/batches/:batchId/sections/:sectionId" element={<SectionDetail />} />
            <Route path="/programs" element={<PlaceholderPage title="Programs" />} />
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