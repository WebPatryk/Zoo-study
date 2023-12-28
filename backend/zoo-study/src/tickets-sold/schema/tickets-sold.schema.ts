import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketsSoldDocument = TicketsSold & Document;

@Schema()
export class TicketsSold {
  @Prop()
  date: Date;

  @Prop()
  count: number;
}

export const TicketsSoldSchema = SchemaFactory.createForClass(TicketsSold);
