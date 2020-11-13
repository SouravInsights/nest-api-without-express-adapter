import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ValidateObjectId } from './pipes/validate-object-id.pipes';

@Controller('event')
export class EventController {
  // Here, we are injecting EventService to have access to all the functions via a constructor into our controller.
  constructor(private eventService: EventService) { }

  // Submit an event
  @Post()
  // The addEvent method will handle a POST HTTP request to add a new event to the database.
  async addEvent(@Res() res, @Body() createEventDto: CreateEventDto) {
    const newEvent = await this.eventService.addEvent(createEventDto);
    return res.status(HttpStatus.OK).json({
      message: 'Event has been submitted successfully!',
      event: newEvent,
    });
  }

  // Fetch a particular event using ID
  @Get(':eventId')
  /* - getEvent method takes a eventId as a parameter and fetches a single event from the database.
     - It also takes another method ValidateObjectId() as a param that validates and ensures that the
       eventId parameter can be found in the database. 
  */
  async getEvent(
    @Res() res,
    @Param('eventId', new ValidateObjectId()) eventId,
  ) {
    const event = await this.eventService.getEvent(eventId);
    if (!event) {
      throw new NotFoundException('Event does not exist!');
    }
    return res.status(HttpStatus.OK).json(event);
  }

  // Fetch all events
  @Get()
  // getEvents method will fetch all events from the database and then return the appropriate response.
  async getEvents(@Res() res) {
    const events = await this.eventService.getEvents();
    return res.status(HttpStatus.OK).json(events);
  }

  // Edit a particular event using ID
  @Put('/edit')
  async editEvent(
    @Res() res,
    @Query('eventId', new ValidateObjectId()) eventId,
    @Body() createEventDto: CreateEventDto,
  ) {
    const editedEvent = await this.eventService.editEvent(
      eventId,
      createEventDto,
    );
    if (!editedEvent) {
      throw new NotFoundException('Event does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Event has been successfully updated',
      event: editedEvent,
    });
  }

  // Delete an event using ID
  @Delete('/delete')
  async deleteEvent(
    @Res() res,
    @Query('eventId', new ValidateObjectId()) eventId,
  ) {
    const deletedEvent = await this.eventService.deleteEvent(eventId);
    if (!deletedEvent) {
      throw new NotFoundException('Event does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Event has been deleted!',
      event: deletedEvent,
    });
  }
}
