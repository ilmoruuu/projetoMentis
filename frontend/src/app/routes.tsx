import { createBrowserRouter } from "react-router";
import { LandingPage } from "../features/landing/LandingPage";
import { ProfessionalLayout } from "../features/professional/components/ProfessionalLayout";
import { Dashboard } from "../features/professional/pages/Dashboard";
import { RAASForm } from "../features/professional/pages/RAASForm";
import { PatientLayout } from "../features/patient/components/PatientLayout";
import { PatientHome } from "../features/patient/pages/PatientHome";
import { CheckIn } from "../features/patient/pages/CheckIn";
import { SobrietyTracker } from "../features/patient/pages/SobrietyTracker";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/professional",
    Component: ProfessionalLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "raas", Component: RAASForm },
    ],
  },
  {
    path: "/patient",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHome },
      { path: "checkin", Component: CheckIn },
      { path: "sobriety", Component: SobrietyTracker },
    ],
  },
]);
