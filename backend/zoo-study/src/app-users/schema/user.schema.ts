import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  zone: string;
  @Prop()
  role: string;
  @Prop()
  country: string;
}
export const UserSchema = SchemaFactory.createForClass(User);