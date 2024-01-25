export class DaysOff {
  paidLeave: number;
  availablePaidLeave: number;

  vacationLeave: number;
  availableVacationLeave: number;

  compOffLeave: number;
  availableCompOffLeave: number;
}

export class CalendarEvents {
  id: string;
  title: string;
  start: string;
  end: string;
}

export class AppUser {
  username: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  zone: string;
  role: string[];
  avatar: string;
  daysOff: DaysOff;
  calendarEvents: CalendarEvents[];
}
