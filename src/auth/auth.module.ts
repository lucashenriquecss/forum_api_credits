import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utils/guard/jwt.strategy';
import * as dotenv from 'dotenv';
import { LogRequestEntity } from 'src/log_requests/entities/log_request.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
dotenv.config();
@Module({
  imports:[
    UsersModule,
    LogRequestsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '1200m' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
