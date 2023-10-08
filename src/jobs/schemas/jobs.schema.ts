import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type JobsDocument = Jobs & Document ;
@Schema()
export class Jobs {
  @Prop()
  company_id: string;

  @Prop()
  job_title: string;

  @Prop()
  description: string;

  @Prop()
  requirements:string

  @Prop()
  no_of_positions:number

  @Prop()
  job_type:string

  @Prop()
  location:string

  @Prop()
  created_on:Date

  @Prop()
  updated_on?:Date
}

export const JobsSchema = SchemaFactory.createForClass(Jobs)