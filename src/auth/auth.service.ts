import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUserByEmail(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email);

    const isValidPassword = await this.comparePasswords(password, user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(
    email: string,
    username: string,
    pass: string,
  ): Promise<{ access_token: string, id_user: number, username: string, role: any }> {
    try {
      let user: any

      if (username) {
        user = await this.usersService.findOneUsername(username.trim());
      } else if (email) {
        user = await this.usersService.findOneEmail(email.trim());
      }

      if (!user) {
        throw new UnauthorizedException();
      }
      const isValidPassword = await this.comparePasswords(pass, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      const payload: any = { sub: user.id, roles: user.roles, has_access: user.has_access };
      if (username) {
        payload.username = user.username
      } else if (email) {
        payload.email = user.email
      }
      return {
        access_token: await this.jwtService.signAsync(payload),
        id_user: user.id,
        username: user.username,
        role: user.roles,
      };
    } catch (error) {
      console.log(error);
    }
  }




  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }

}