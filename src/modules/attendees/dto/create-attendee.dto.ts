import { Document } from 'mongoose';

export class CreateAttendeeDto extends Document {
  readonly userId: number;
  readonly eventId: number;
  readonly eventConfigResponses: object;
}
