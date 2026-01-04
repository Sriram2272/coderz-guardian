import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Universities from "@/pages/admin/Universities";
import UniversityDetail from "@/pages/admin/UniversityDetail";
import Programs from "@/pages/admin/Programs";
import ProgramDetailStandalone from "@/pages/admin/ProgramDetailStandalone";
import ProgramDetail from "@/pages/admin/ProgramDetail";
import BatchDetail from "@/pages/admin/BatchDetail";
import SectionDetail from "@/pages/admin/SectionDetail";
import ExamsPage from "@/pages/admin/Exams";
import UserManagement from "@/pages/admin/UserManagement";
import Assignments from "@/pages/admin/Assignments";
import Analytics from "@/pages/admin/Analytics";
import PlaceholderPage from "@/pages/admin/PlaceholderPage";
import Compare from "@/pages/admin/Compare";
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
            <Route path="/users" element={<UserManagement />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/:id" element={<UniversityDetail />} />
            <Route path="/universities/:id/programs/:programKey" element={<ProgramDetail />} />
            <Route path="/universities/:id/programs/:programKey/batches/:batchId" element={<BatchDetail />} />
            <Route path="/universities/:id/programs/:programKey/batches/:batchId/sections/:sectionId" element={<SectionDetail />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:programKey" element={<ProgramDetailStandalone />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;