import { BookingPage } from "@/pages/User/Booking/BookingPage";
import type { ISidebarItem } from "@/types/index.types";

export const userSidebarItems:ISidebarItem[] = [
  {
    title: "Booking",
    items: [
      {
        title: "Booking",
        url: "/user/booking",
        component: BookingPage
      },
    ],
  },
  

];
