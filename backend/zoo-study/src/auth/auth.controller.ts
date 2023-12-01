import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AppUsersService } from 'src/app-users/app-users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private appUserService: AppUsersService,
  ) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/user/:email')
  getUserProfile(@Param('email') email: string) {
    return this.authService.findOne(email);
  }

  // @Get('/user/details/:email')
  // getUserProfileDetails(@Param('email') email: string) {
  //   return this.appUserService.findOneByEmail(email);
  // }
}
