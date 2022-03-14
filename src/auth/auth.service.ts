import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

// import users from '../users.json';
// eslint-disable-next-line
const users = require('../users.json');

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    signinLocal(dto: AuthDto) {
        // retrive user
        const user = users.find((_user) => _user.email === dto.email);
        if (!user) throw new UnauthorizedException('Incorrect credentials');
        if (user.password !== dto.password) 
            throw new UnauthorizedException('Incorrect credentials');

        return this.signUser(user.id, user.email, 'user');
    }

    signupLocal(dto: AuthDto) {}

    signUser(userId: number, email: string, type: string) {
        return this.jwtService.sign({
            sub: userId,
            email,
            type: type,
        });
    }
}
