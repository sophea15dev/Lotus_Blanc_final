export type TabType =
  | "dashboard"
  | "menu-management"
  | "reservations"
  | "staff"
  | "settings";

export interface MenuItem {
  isAvailable: any;
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Reservation {
  id: string;
  customer: string;
  time: string;
  guests: number;
  status: "Confirmed" | "Pending" | "Arrived";
}
