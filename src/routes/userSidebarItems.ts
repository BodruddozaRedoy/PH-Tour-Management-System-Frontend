import { BookingPage } from "@/pages/User/Booking/BookingPage";
import type { ISidebarItem } from "@/types/index.types";

export const userSidebarItems:ISidebarItem[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "Analytics",
        url: "/user/bookings",
        component: BookingPage
      },
    ],
  },
  

];
