import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AppUsersDocument = AllUsers & Document;

@Schema()
export class DaysOff {
  @Prop()
  paidLeave: number;
  @Prop()
  availablePaidLeave: number;
  @Prop()
  vaccationLeave: number;
  @Prop()
  availableVaccationLeave: number;
  @Prop()
  compoffLeave: number;
  @Prop()
  availableCompoffLeave: number;
  @Prop()
  upload: number;
  @Prop()
  availableUpload: number;
}
@Schema()
export class CalendarEvents {
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  start: string;
  @Prop()
  end: string;
}

@Schema()
export class AllUsers {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  country: string;
  @Prop()
  phone: string;
  @Prop()
  zone: string;
  @Prop()
  role: string[];
  @Prop()
  avatar: string;
  @Prop()
  daysOff: DaysOff;
  @Prop()
  calendarEvents: CalendarEvents[];
}

export const AllUsersSchema = SchemaFactory.createForClass(AllUsers);
