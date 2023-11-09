export class AllTickets {
  count: number;
  discount: string;
}

export class Ticket {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tickets: AllTickets;
}
