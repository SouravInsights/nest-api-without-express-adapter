import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { AuthUser } from './interfaces/auth.interface';
// import { UserProfile } from './interfaces/user-profile.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {UserProfileDto} from "./dto/user-profile.dto";
import {SignupUserDto} from "./dto/signup-user.dto";
import { exception } from 'console';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>) { }

    async create(signupUserDto: SignupUserDto): Promise<User> {
        await this.isEmailExists(signupUserDto.email);
        signupUserDto.password= await bcrypt.hash(signupUserDto.password,10);        
        const newUser = await new this.userModel({
                email: signupUserDto.email,
                password: signupUserDto.password,
                firstName: signupUserDto.firstName,
                lastName: signupUserDto.lastName,
            });
        return newUser.save();
    }

    async auth(auth: AuthUser): Promise<User> {
        const authUser = await this.userModel.findOne({email: auth.email}).exec();  
        if(!!authUser){
            if(!authUser.isConfirmed){
                throw new UnauthorizedException("Email not verified");                
            }
            const isPasswordMatched=await bcrypt.compare(auth.password,authUser.password);
            if(isPasswordMatched){
                return authUser;
            }    
        }      
        return null;
    }

    async findOne(auth: AuthUser): Promise<User | undefined> {
        const authUser = await this.userModel.findOne({email: auth.email}).exec();
        return authUser;
    }

    async findProfile(userId: string): Promise<UserProfileDto> {
        const user = await this.userModel.findOne({_id: userId}).exec();                      
        const profile = {
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email, 
            dob: user.dob,
            gender: user.gender, 
            linkedinUrl: user.linkedinUrl, 
            twitterUrl: user.twitterUrl, 
            phoneNumber: user.phoneNumber,
            organization: user.organization,
            address: user.address,
            bio: user.bio,
            notification_pref: user.notificationPref,
            status: user.status
            };
        const userProfileDto = new UserProfileDto(profile);
        return userProfileDto;
    }

    async confirmEmail(confirmationToken: string): Promise<boolean>{
        const user = await this.userModel.updateOne(
            {confirmationToken: confirmationToken},
            {isConfirmed: true, confirmationToken:''},{},(err, numAffected)=>
                {      
                    console.log(numAffected);
                   if(!!err){
                       throw new exception(err.message)
                   }             
                   if(numAffected > 0){
                       return true;
                   } 
                }
            ).exec();
        return false;
    }

    //Private Methods
    private async isEmailExists(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {            
          throw new BadRequestException(
            {"errors": [
                {
                    "code": 400,
                    "title": "Signup Associated Exception",
                    "detail": "User already exists."
                }
            ]}
          );
        }
      }

}
