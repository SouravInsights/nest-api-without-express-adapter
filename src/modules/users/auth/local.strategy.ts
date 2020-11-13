import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from '../interfaces/auth.interface';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();        
    }

    async validate(authUser: AuthUser): Promise<any> {        
        const user = await this.authService.validateUser(authUser);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}