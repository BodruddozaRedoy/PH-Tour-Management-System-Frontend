import AddDivisionPage from "@/pages/Admin/AddDivision/AddDivisionPage";
import AddTourType from "@/pages/Admin/AddTourType/AddTourType";
import type { ISidebarItem } from "@/types/index.types";
import { lazy } from 'react';

const AnalyticsPage = lazy(() => import("@/pages/Admin/Analytics/AnalyticsPage"))
const AddTourPage = lazy(() => import("@/pages/Admin/AddTour/AddTourPage"))

export const adminSidebarItems:ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: AnalyticsPage
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTourPage
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivisionPage
      },
    ],
  },

];
