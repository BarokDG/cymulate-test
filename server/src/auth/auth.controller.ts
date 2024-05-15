import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { extractTokenFromHeader } from './lib/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verify')
  verify(@Req() req) {
    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.authService.verify(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }
}
