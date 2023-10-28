import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type UserDocument = User & Document ;
@Schema({ timestamps: { createdAt: "created_on", updatedAt: "updated_on" } })
export class User {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  password:string

  @Prop()
  mobile_no:string

  @Prop()
  linkedin_link?:string

  @Prop({default: false})
  is_deleted?:string
}

export const UserSchema = SchemaFactory.createForClass(User)