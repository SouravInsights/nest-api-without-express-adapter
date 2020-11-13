import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeModule } from './modules/attendees/attendee.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { AuthModule } from './modules/users/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE'),
      }),
      inject: [ConfigService],
    }),
    EventModule,
    SponsorModule,
    AttendeeModule,
    UserModule,
  ],
})
export class AppModule {}
