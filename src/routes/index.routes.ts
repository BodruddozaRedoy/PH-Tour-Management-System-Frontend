import App from "@/App";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import { AddTourPage } from "@/pages/Admin/AddTour/AddTourPage";
import { AnalyticsPage } from "@/pages/Admin/Analytics/AnalyticsPage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { BookingPage } from "@/pages/User/Booking/BookingPage";
import { VerifyPage } from "@/pages/Verify/VerifyPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "booking",
        Component: BookingPage,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/verify",
    Component: VerifyPage,
  },
]);
