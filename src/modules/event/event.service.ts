import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>) { }

  async getEvents(): Promise<Event[]> {
    const events = await this.eventModel.find().exec();
    return events;
  }

  async getEvent(eventID): Promise<Event> {
    const event = await this.eventModel.findById(eventID).exec();
    return event;
  }

  async addEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = await new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async editEvent(eventID, createEventDto: CreateEventDto): Promise<Event> {
    const editedEvent = await this.eventModel.findByIdAndUpdate(
      eventID,
      createEventDto,
      { new: true },
    );
    return editedEvent;
  }
  async deleteEvent(eventID): Promise<any> {
    const deletedEvent = await this.eventModel.findByIdAndRemove(eventID);
    return deletedEvent;
  }
}
