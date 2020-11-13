import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SponsorInterface } from './interfaces/sponsor.interface';
//import { SponsorDto } from './dto/sponsor.dto';

@Injectable()
export class SponsorService {
    constructor(
        @InjectModel('Sponsors') private readonly SponsorsModel: Model<SponsorInterface>) { }

    async getAll(): Promise<SponsorInterface[]> {
        const sponosors = await this.SponsorsModel.find().exec();
        //map the schema to the DTO adding the test property
        return sponosors;//no more the schema , it will return the list of dto 
    }

    async getOne(SponsorsID): Promise<SponsorInterface> {
        const sponsors = await this.SponsorsModel.findById(SponsorsID).exec();
        return sponsors;
    }

    async create(sponsorInterface: SponsorInterface): Promise<SponsorInterface> {
        const newSponsors = await new this.SponsorsModel(sponsorInterface);
        return newSponsors.save();
    }

    async update(SponsorsID, sponsorInterface: SponsorInterface): Promise<SponsorInterface> {
        const editedSponsor = await this.SponsorsModel.findByIdAndUpdate(
            SponsorsID,
            sponsorInterface,
            { new: true },
        );
        return editedSponsor;
    }
    async delete(SponsorID): Promise<any> {
        const deletedSponsor = await this.SponsorsModel.findByIdAndRemove(SponsorID);
        return deletedSponsor;
    }
}

