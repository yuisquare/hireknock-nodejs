import { IsNotEmpty, IsString,IsEmail , IsNumber} from 'class-validator';

export class createJobsDto {

    @IsNotEmpty()
    company_id: string;

    @IsNotEmpty()
    @IsString()
    job_title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    requirements: string;

    @IsNotEmpty()
    @IsNumber()
    no_of_positions: number;

    @IsNotEmpty()
    @IsString()
    job_type: string;

    @IsNotEmpty()
    @IsString()
    location: string;
    
}

