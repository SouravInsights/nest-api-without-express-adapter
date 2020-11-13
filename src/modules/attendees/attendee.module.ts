import { Module } from '@nestjs/common';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeSchema } from './schemas/attendee.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Attendee', schema: AttendeeSchema }]),
      ],
  controllers: [AttendeeController],
  providers: [AttendeeService]
})
export class AttendeeModule {}
