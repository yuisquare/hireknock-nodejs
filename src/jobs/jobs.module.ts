import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Jobs, JobsSchema } from './schemas/jobs.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Jobs.name, schema:JobsSchema}])],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
})
export class JobsModule {}