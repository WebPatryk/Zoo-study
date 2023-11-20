export class DaysOff {
  paidLeave: number;
  availablePaidLeave: number;

  vaccationLeave: number;
  availableVaccationLeave: number;

  compoffLeave: number;
  availableCompoffLeave: number;

  upload: number;
  availableUpload: number;
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
