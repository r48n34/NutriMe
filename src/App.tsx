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

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const names: Record<string, string> = {
      "/": "A little better, every day",
      "/app": "My day",
      "/app/plan": "My plan",
      "/app/personalize": "Make it yours",
      "/app/shop": "The good stuff",
      "/app/coach": "My coach",
      "/app/progress": "My progress",
      "/app/profile": "About me",
    };
    document.title = `NutriMe — ${names[pathname] ?? "Your everyday space"}`;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
