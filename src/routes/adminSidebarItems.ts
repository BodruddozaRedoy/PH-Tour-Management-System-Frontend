import { AddTourPage } from "@/pages/Admin/AddTour/AddTourPage";
import { AnalyticsPage } from "@/pages/Admin/Analytics/AnalyticsPage";
import type { ISidebarItem } from "@/types/index.types";

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
        component: AnalyticsPage
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTourPage
      },
    ],
  },

];
