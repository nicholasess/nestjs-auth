import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '../user/user.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200 })
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() user: AuthRegisterDTO) {
    return this.authService.register(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() { user }: { user: User }) {
    return user;
  }
}
