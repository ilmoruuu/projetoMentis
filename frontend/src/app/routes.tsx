import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { ProfessionalLayout } from "./components/professional/ProfessionalLayout";
import { Dashboard } from "./components/professional/Dashboard";
import { RAASForm } from "./components/professional/RAASForm";
import { PatientLayout } from "./components/patient/PatientLayout";
import { PatientHome } from "./components/patient/PatientHome";
import { CheckIn } from "./components/patient/CheckIn";
import { SobrietyTracker } from "./components/patient/SobrietyTracker";

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
