import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { Jobs, JobsDocument } from './schemas/jobs.schema';

@Injectable()
export class JobsRepository {
  constructor(@InjectModel(Jobs.name) private jobsModel:Model<JobsDocument>) {}
    
  async findOne(filterQuery:any){
    return await this.jobsModel.findOne(filterQuery)
  }

  async find(filterQuery:any){
    return await this.jobsModel.find(filterQuery)
  }

  async create(jobDetails:Jobs){
    const newJob = new this.jobsModel(jobDetails);
    return await newJob.save()
  }

  async findOneAndUpdate(filterQuery:any, jobDetails:Jobs){
    return await this.jobsModel.findOneAndUpdate(filterQuery, jobDetails)
  }
}
