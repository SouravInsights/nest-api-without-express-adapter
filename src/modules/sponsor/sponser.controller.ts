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
  import {SponsorCreatesDto} from "./dto/sponsor-creates.dto"
  import {SponsorService} from "./sponsor.service"
  import { ValidateObjectId } from './pipes/validate-object-id.pipes';

  @Controller('sponsors')
export class SponsorController {
  // Here, we are injecting SponsorService to have access to all the functions via a constructor into our controller.
  constructor(private sponsorsService: SponsorService) { }

  // Add a sponsor
  @Post()
  // The AddSponsor method will handle a POST HTTP request to add a new sponsor to the database.
  async Create(@Res() res, @Body() sponsorCreatsDto: SponsorCreatesDto) {
    const newSponsor = await this.sponsorsService.create(sponsorCreatsDto);
    return res.status(HttpStatus.OK).json({
      message: 'Sponsor has been added successfully!',
      sponsor: newSponsor,
    });
  }

  // Fetch a particular sponsor using ID
  @Get(':sponsorId')
  /* - Sponsor method takes a sponsorId as a parameter and fetches a single sponsor from the database.
     - It also takes another method ValidateObjectId() as a param that validates and ensures that the sponsorId parameter can be found in the database. 
  */
  async Sponsor(
    @Res() res,
    @Param('sponsorId', new ValidateObjectId()) sponsorId,
  ) {
    const sponsor = await this.sponsorsService.getOne(sponsorId);
    if (!sponsor) {
      throw new NotFoundException('Sponsor does not exist!');
    }
    return res.status(HttpStatus.OK).json(sponsor);
  }

  // Fetch all sponsors
  @Get()
  // Sponsors method will fetch all sponsors from the database and then return the appropriate response.
  async Sponsors(@Res() res) {
      const sponsors = await this.sponsorsService.getAll();
    return res.status(HttpStatus.OK).json(sponsors);
  }

  // Edit a particular sponsor using ID
  @Put('/update')
  async update(
    @Res() res,
    @Query('sponsorId', new ValidateObjectId()) sponsorId,
    @Body() sponsorCreatsDto: SponsorCreatesDto,
  ) {
    const editedSponsor = await this.sponsorsService.update(
      sponsorId,
      sponsorCreatsDto,
    );
    if (!editedSponsor) {
      throw new NotFoundException('Sponsor does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Sponsor has been successfully updated',
      sponsor: editedSponsor,
    });
  }

  // Delete a sponsor using ID
  @Delete('/delete')
  async delete(
    @Res() res,
    @Query('sponsorId', new ValidateObjectId()) sponsorId,
  ) {
    const deletedSponsor = await this.sponsorsService.delete(sponsorId);
    if (!deletedSponsor) {
      throw new NotFoundException('Sponsor does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Sponsor has been deleted!',
      sponsor: deletedSponsor,
    });
  }
}
