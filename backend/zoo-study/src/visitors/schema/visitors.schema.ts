import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitorsDocument = Visitors & Document;

@Schema()
export class Visitors {
  @Prop()
  year: number;

  @Prop()
  userGain: number;

  @Prop()
  userLost: number;
}

export const VisitorsSchema = SchemaFactory.createForClass(Visitors);
