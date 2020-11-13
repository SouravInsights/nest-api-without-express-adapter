import {
    Controller,
    Get,
    Res,
    HttpStatus,
    HttpCode,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete,
} from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { Attendee } from './interfaces/attendee.interface';


@Controller('attendee')
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) { }

    @Post()
    @HttpCode(201)
    async create(@Res() res, @Body() createAttendeeDto: CreateAttendeeDto): Promise<Attendee> {
        const newAttendee = await this.attendeeService.create(createAttendeeDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Marked as an attendee for the event.',
            event: newAttendee,
        });
    }

    // Fetch list of attendees for all events
    @Get()
    @HttpCode(200)
    async getAll(@Res() res) {
        const attendees = await this.attendeeService.getAll();
        return res.status(HttpStatus.OK).json(attendees);
    }

    // // Fetch list of attendees for all events
    // @Get(':userId')
    // @HttpCode(200)
    // async getOne(@Res() res, @Param('userId') userId) {
    //     console.log(userId);
    //     const attendees = await this.attendeeService.getOne(userId);
    //     return res.status(HttpStatus.OK).json(attendees);
    // }
}
