export type UUID = string;

export interface Client {
  id: UUID;
  email: string;
  firstname: string;
  lastname: string;
}

export type OrderStatus = "active" | "finished" | "canceled";

export interface Order {
  id: UUID;
  createdAt: string;
  value: number;
  client: Client;
  status: OrderStatus;
}
