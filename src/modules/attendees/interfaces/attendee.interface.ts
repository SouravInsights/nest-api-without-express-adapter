import { Document } from 'mongoose';

export interface Attendee extends Document {
  readonly userId: number;
  readonly eventId: number;
  readonly eventConfigResponses: object;
}
