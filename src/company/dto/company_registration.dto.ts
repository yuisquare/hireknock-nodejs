import {  IsNotEmpty, IsString, IsOptional, IsEmail, IsMobilePhone } from 'class-validator';

export class CompanyRegistrationDto {

    @IsNotEmpty()
    @IsString()
    company_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone()
    mobile_no: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    industry_type: string;

    @IsOptional()
    total_employees_count: number;

    @IsNotEmpty()
    @IsString()
    linked_in_link: string;

    @IsOptional()
    website_link: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

