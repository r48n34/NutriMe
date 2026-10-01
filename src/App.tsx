import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import { DemoProvider } from "./state/DemoProvider";
import { ToastProvider } from "./state/ToastProvider";
import { AppShell } from "./components/AppShell";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Personalize } from "./pages/Personalize";
import { Plan } from "./pages/Plan";
import { Shop } from "./pages/Shop";
import { Coach } from "./pages/Coach";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";
import { updatePageSeo } from "./utils/seo-dom";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageSeo(pathname);
  }, [pathname]);
  return null;
}

export function AppContent() {
  return (
    <DemoProvider>
      <ToastProvider>
        <RouteEffects />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="personalize" element={<Personalize />} />
            <Route path="plan" element={<Plan />} />
            <Route path="shop" element={<Shop />} />
            <Route path="coach" element={<Coach />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </DemoProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
