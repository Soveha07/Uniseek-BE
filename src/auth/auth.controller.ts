import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const student = await this.authService.validateUser(body.email, body.password);
    return await this.authService.login(student);
  }

}
