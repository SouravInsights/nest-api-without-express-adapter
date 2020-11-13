import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponser.controller';
import { SponsorsSchema} from "./schemas/sponsors.schema"

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Sponsors', schema: SponsorsSchema }]),
    ],  
    providers: [SponsorService],
    controllers: [SponsorController],
  })
  export class SponsorModule { }
  