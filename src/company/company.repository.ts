import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompanyRepository {
  constructor(@InjectModel(Company.name) private companyModel:Model<CompanyDocument>) {}
    
  async findOne(filterQuery:any){
    return await this.companyModel.findOne(filterQuery)
  }

  async find(filterQuery:any){
    return await this.companyModel.find(filterQuery)
  }

  async create(details:Company){
    const newCompany = new this.companyModel(details);
    return await newCompany.save()
  }

  async findOneAndUpdate(filterQuery:any, details:Company){
    return await this.companyModel.findOneAndUpdate(filterQuery, details)
  }

  async updateOne(condition:any, details){
    return await this.companyModel.updateOne(condition, details)
  }

  async updateMany(condition:any, details){
    return await this.companyModel.updateOne(condition, details)
  }
}
