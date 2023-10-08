import { Injectable } from '@nestjs/common';
import { createJobsDto } from './dto/createJobs.dto';
import { JobsRepository } from './jobs.repository';
import * as moment from 'moment';
import { error } from 'console';
import * as mongoose from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository
  ) { }

  async createJob(jobsDetails: createJobsDto) {
    try {
      let { job_title, description, job_type, no_of_positions, requirements, location, company_id } = jobsDetails
      let created_on: any = moment().format("YYYY-MM-DD HH:mm")
      let createJobResponse = await this.jobsRepository.create({
        job_title,
        description,
        job_type,
        no_of_positions,
        requirements,
        location,
        company_id,
        created_on
      })
      return {
        status: 200,
        message: "Successfully created the job.",
        resultSet: createJobResponse
      }
    } catch (err) {
      console.log("error in createJob function >>>", err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }

    }
  }

  async findCompanyJobs(company_id) {
    try {
      //company exists verification required here once company side completed

      let jobs = await this.jobsRepository.find({ company_id })
      if (jobs && jobs.length) {
        return {
          status: 200,
          message: "Successfully fetched jobs.",
          resultSet: jobs
        }
      } else {
        return {
          status: 404,
          message: "Jobs not found.",
          resultSet: []
        }
      }

    } catch (err) {
      console.log("error in findCompanyJobs function >>>", err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }

    }
  }

  async findJobDetailsById(job_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(job_id)) {
        let jobDetails = await this.jobsRepository.findOne({ _id: job_id })
        if (jobDetails) {
          return {
            status: 200,
            message: "Successfully fetched job details.",
            resultSet: jobDetails
          }
        } else {
          return {
            status: 404,
            message: "Job not found.",
            resultSet: []
          }
        }
      } else {
        return {
          status: 422,
          message: "Invalid job id."
        }
      }

    } catch (err) {
      console.log("error in findJobDetailsById function >>>", err);
      return {
        status: 500,
        message: err ? (err.message || (err.response && err.response.message)) : "Something went wrong, server error.",
        error: err
      }

    }
  }

}
