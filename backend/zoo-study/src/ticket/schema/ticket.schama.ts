import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AllTickets } from 'src/ticket/entities/ticket.entity';
export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  tickets: AllTickets;
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
