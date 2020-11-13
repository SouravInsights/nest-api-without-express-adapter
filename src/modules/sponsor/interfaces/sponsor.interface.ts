import { Document } from 'mongoose';

export interface SponsorInterface extends Document {
  readonly name: string;
  readonly websiteUrl: string;
  readonly logo: string;
}
