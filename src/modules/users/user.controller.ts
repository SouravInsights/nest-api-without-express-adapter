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
    Request,
    UseGuards, UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';

import {SignupUserDto} from './dto/signup-user.dto';
import {AuthUserDto} from './dto/auth-user.dto';
import {UserProfileDto} from "./dto/user-profile.dto";

import { User } from './interfaces/user.interface';

import {ValidateUser} from "./pipes/validate-user.pipes"

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from '../users/auth/local-auth.guard';
import { AuthService } from '../users/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private authService: AuthService) { }
    
    @Post()
    @HttpCode(201)
    async create(@Res() res, @Body(new ValidateUser()) signupUserDto: SignupUserDto): Promise<User> {        
        const newUser = await this.userService.create(signupUserDto);
        return res.status(HttpStatus.CREATED).json({
            data:[
                {
                    type: 'user',
                    id: newUser.id,
                    message: 'User created successfully.'
                }
            ]            
        });
    }

    //@UseGuards(LocalAuthGuard)
    @Post('signin')
    @HttpCode(200)
    async auth(@Res() res, @Body() authUserDto: AuthUserDto): Promise<User> {                          
        const accessToken = await this.authService.login(authUserDto);        

        if(!!accessToken){
            return res.status(HttpStatus.OK).json(
                {
                    data:[
                        {
                            type: 'user',
                            accessToken: accessToken,
                            message: 'User logged in successfully.'
                        }
                    ]            
                }                
            );            
        }

        throw new UnauthorizedException('Invalid Creds');        
    }    

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Res() res, @Request() req) {        
        if(!!req.user){            
            const userProfile = await this.userService.findProfile(req.user["userId"]); 
            return res.status(HttpStatus.OK).json({
                data:[
                    {
                        type: 'user',
                        id: req.user["userId"],
                        attributes: userProfile                                                
                    }
                ]            
            });                               
        }
    }   


    @Post('confirmEmail')
    async getEmailConfirmation(@Res() res, @Request() req) {   
        if(!!req.body.confirmationToken){            
            const isConfirmed = await this.userService.confirmEmail(req.confirmationToken); 
            if(!!isConfirmed){
                return res.status(HttpStatus.OK).json({
                    data:[
                        {
                            type: 'user',
                            message: 'Email confirmed successfully'                                               
                        }
                    ]            
                });
            }
            return res.status(HttpStatus.OK).json({
                data:[
                    {
                        type: 'user',
                        message: 'No unconfirmed email found. Might be wrong token or email already confirmed.'                                               
                    }
                ]            
            });                               
        }
    }      
}
