import { lazy } from "react";

const AttandanceInfo = lazy(() => import("../pages/AttendeeList"));
const SeatingPosition = lazy(() => import("../pages/SeatingPosition"));
const TotalDelegates = lazy(() => import("../pages/TotalDelegates"));

const coreRoutes = [
  {
    path: "/info",
    component: AttandanceInfo,
  },
  {
    path: "/total",
    component: TotalDelegates,
  },
  {
    path: "/maps",
    component: SeatingPosition,
  },
];

const routes = [...coreRoutes];
export default routes;
