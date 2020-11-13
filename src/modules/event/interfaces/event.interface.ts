import { Document } from 'mongoose';

export interface Event extends Document {
  readonly name: string;
  readonly description: string;
  readonly tags: string;
  readonly websiteUrl: string;
}
