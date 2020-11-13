import { Document } from 'mongoose';
export class SponsorCreatesDto extends Document{
    readonly name: string;
    readonly websiteUrl: string;
    readonly logo: string;
    Test: string;
  }
  