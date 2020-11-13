import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: string
  readonly firstName: string;
  readonly lastName: string;
  password: string;
  readonly email: string;
  readonly dob: Date;
  readonly gender: string;
  readonly phoneNumber: string;
  readonly linkedinUrl: string;       
  readonly twitterUrl: string;           
  readonly address: string;            
  readonly organization: string;                  
  readonly bio: string;             
  readonly notificationPref: boolean;       
  readonly status: string;   
  readonly confirmationToken: string;
  readonly isConfirmed: boolean;
  readonly forgetToken: string;
}
