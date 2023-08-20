import { IsNotEmpty, IsString,IsEmail } from 'class-validator';

export class ResumeBuilderDto {

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsNotEmpty()
    @IsString()
    profile_picture: string;

    @IsNotEmpty()
    @IsString()
    job_title: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email_id: string;

    @IsNotEmpty()
    @IsString()
    mobile_no: string;

    @IsNotEmpty()
    @IsString()
    linkedin_link: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    work_description: string;
    
    @IsNotEmpty()
    education_details: Array<DetailsSectionDto>;

    @IsNotEmpty()
    skills: Array<string>;

    @IsNotEmpty()
    strengths: Array<string>;

    @IsNotEmpty()
    languages: Array<string>;

    @IsNotEmpty()
    project_details: Array<DetailsSectionDto>;
    
}

export class DetailsSectionDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    year: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}



