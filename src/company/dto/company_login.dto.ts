import { IsNotEmpty, IsString,IsEmail } from 'class-validator';

export class CompanyLoginDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
}

