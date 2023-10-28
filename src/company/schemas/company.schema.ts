import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type CompanyDocument = Company & Document ;
@Schema({ timestamps: { createdAt: "created_on", updatedAt: "updated_on" } })
export class Company {
  @Prop()
  company_name : string;

  @Prop()
  email : string;

  @Prop()
  password:string

  @Prop()
  mobile_no:string

  @Prop()
  location:string

  @Prop()
  industry_type:string
  
  @Prop()
  total_employees_count?:number

  @Prop()
  linked_in_link :string

  @Prop()
  website_link?:string

  @Prop({default: false})
  is_verified?:boolean

  @Prop({default: false})
  is_deleted?:boolean
}

export const CompanySchema = SchemaFactory.createForClass(Company)