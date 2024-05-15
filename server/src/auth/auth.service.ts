import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user?.comparePassword(password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string) {
    await this.usersService.create(email, password);
    return;
  }

  async verify(token: string) {
    try {
      this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
