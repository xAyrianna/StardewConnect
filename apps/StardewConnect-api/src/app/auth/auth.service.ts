import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(username: string, pass: string): Promise<any> {
        const user = (await this.userService.getUserByUsername(username)).results;
        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }   
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        // const { password, ...result } = user;
        // // TODO: return a JWT token and return
        // //instead of the user object
        // return result;
    }
}
