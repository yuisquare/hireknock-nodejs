import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyRegistrationDto } from './dto/company_registration.dto';
import { CompanyLoginDto } from './dto/company_login.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) { }

    @Post('registration')
    async registerCompany( @Body() companyDetails:CompanyRegistrationDto ): Promise<any> {
        return await this.companyService.registerCompany(companyDetails);
    }

    @Post('login')
    async companyLogin( @Body() logindata:CompanyLoginDto ): Promise<any> {
        return await this.companyService.companyLogin(logindata);
    }

    @Post('approve/:company_id')
    async approveCompany( @Param('company_id') company_id: number ): Promise<any> {
        return await this.companyService.approveCompany(company_id);
    }

}
