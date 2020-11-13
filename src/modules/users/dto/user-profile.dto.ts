export class UserProfileDto {

  constructor(userProfile: any) { 
    Object.keys(userProfile).forEach(element => {
      this[element] = userProfile[element];
    });
  }

    readonly id: string
    readonly firstName: string;
    readonly lastName: string;
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
  }
  