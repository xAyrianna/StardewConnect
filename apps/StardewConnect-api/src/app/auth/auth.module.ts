import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: process.env['JWT_SECRET'],
        signOptions: { expiresIn: '12h' },
    })],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
