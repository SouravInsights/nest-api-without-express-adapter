import { Injectable } from '@nestjs/common';
import { Attendee } from './interfaces/attendee.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AttendeeService {
    constructor(
        @InjectModel('Attendee') private readonly attendeeModel: Model<Attendee>) { }

    async create(attendee: Attendee): Promise<Attendee> {
        const newAttendee = await new this.attendeeModel(attendee);
        return newAttendee.save();
    }

    async getAll(): Promise<Attendee[]> {
        const attendees = await this.attendeeModel.find().exec();
        return attendees;
    }

    // async getOne(userId): Promise<Attendee> {
    //     const attendee = await this.attendeeModel.findById(userId).exec();
    //     return attendee;
    // }
}
