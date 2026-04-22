import { Key } from "react";

export type TabType =
  | "dashboard"
  | "menu-management"
  | "reservations"
  | "staff"
  | "settings";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Reservation {
  reservation_id: Key | null | undefined;
  occasion: string;
  id: string;
  customer: string;
  time: string;
  guests: number;
  status: "Confirmed" | "Pending" | "Arrived";
}
