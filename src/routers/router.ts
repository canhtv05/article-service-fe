import configs from "@/configs";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));

const publicRoutes = [
  {
    path: configs.routes.home,
    component: Home,
  },
];

const privateRoutes = [
  {
    path: configs.routes.home,
    component: Home,
  },
];

const modals = [
  {
    path: configs.routes.home,
    component: Home,
  },
];

export { publicRoutes, privateRoutes, modals };
