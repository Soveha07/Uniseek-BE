import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from 'src/students/dto/refresh-token.dto';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Response } from 'express';
import { CustomUser } from 'src/students/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const student = await this.authService.validateUser(body.email, body.password);
    return await this.authService.login(student);
  }

  @Public()
  @Post('/refresh/:id')
  async refresh(@Param("id") id: string, @Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const newAccessToken = await this.authService.refreshAccessToken(refreshTokenDto.refreshToken, id);
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Public()
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google Auth route - handled by Passport
  }

  @Public()
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as CustomUser;
    console.log("user", user);
    console.log(user.uid, user.accessToken, user.refreshToken);

    if (!user) {
      throw new UnauthorizedException('Google login failed');
    }

    res.status(200).send(`
      <script>
        // This sends the authentication data back to the parent window
        window.opener.postMessage({
          type: 'GoogleAuthSuccess',
          studentId: '${user.uid}',
          accessToken: '${user.accessToken}',
          refreshToken: '${user.refreshToken}'
        }, 'http://localhost:3000');

        // Close the popup window
        window.close();
      </script>
    `);
    // return res.json({
    //   userId: user.uid,
    //   accessToken: user.accessToken,
    //   refreshToken: user.refreshToken,
    // });
  }
}
