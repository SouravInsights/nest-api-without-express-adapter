import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../interfaces/auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(authUser: AuthUser): Promise<any> {
        const user = await this.userService.findOne(authUser);
        const isPasswordMatched=await bcrypt.compare(authUser.password,user.password);
        if(isPasswordMatched){
            return user;
        }
        return null;        
    }

    async login(user: AuthUser) {
        const dbUser = await this.userService.auth(user);
        if(!!dbUser){        
            return this.jwtService.sign({ userid: dbUser.id });
        }
        return null;
    }
}
