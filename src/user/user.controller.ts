import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import { UserService } from './user.service';
import { ResumeBuilderDto } from './dto/resumeBuilder.dto';


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('build/resume')
    async signup( @Body() resumeDetails:ResumeBuilderDto ): Promise<any> {
        return await this.userService.buildResume(resumeDetails)
    }

}
