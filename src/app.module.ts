import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {OnboardModule} from './onboard/onboard.module'
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://anaskt:Kl53n3289@cluster0.lbdzo.mongodb.net/HireKnock?retryWrites=true`,
      {
        //useCreateIndex: true,
        //useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    ConfigModule.forRoot({
      isGlobal: true,
      }),
    OnboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
