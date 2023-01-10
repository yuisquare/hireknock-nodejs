import {  IsNotEmpty, IsString, IsOptional, IsEmail, IsMobilePhone } from 'class-validator';

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsMobilePhone()
    mobile_no: string;

    @IsOptional()
    @IsString()
    linkedin_link: string;

}

