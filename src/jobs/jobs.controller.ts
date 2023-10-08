import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { createJobsDto } from './dto/createJobs.dto';


@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
    constructor(
        private readonly jobsService: JobsService,
    ) { }

    @Post('create')
    async createJob( @Body() jobsDetails:createJobsDto ): Promise<any> {
        return await this.jobsService.createJob(jobsDetails);
    }

    @Get(':company_id')
    async findCompanyJobs( @Param('company_id') company_id ): Promise<any> {
        return await this.jobsService.findCompanyJobs(company_id);
    }

    @Get('jobDetails/:job_id')
    async findJobDetailsById( @Param('job_id') job_id ): Promise<any> {
        return await this.jobsService.findJobDetailsById(job_id);
    }
    
}
