import App from "@/App";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import { VerifyPage } from "@/pages/Verify/VerifyPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import UnauthorizedPage from "@/pages/Unauthorized/UnauthorizedPage";
import { role } from "@/constants/role";
import type { TRole } from "@/types/index.types";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: withAuth(About, undefined),
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...generateRoutes(userSidebarItems)
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
  {
    path: "/unauthorized",
    Component: UnauthorizedPage
  }
]);
