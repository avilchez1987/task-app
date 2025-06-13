import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const exists = await this.usersService.findByEmail(email);
    if (exists) throw new ConflictException('Usuario ya existe');

    const cognitoRes = await this.cognitoService.signUp(email, password);

    await this.usersService.create(email, cognitoRes.UserSub!);

    return { message: 'Usuario registrado. Verifica tu correo.' };
  }

  @Post('confirm')
  async confirmUser(
    @Body() body: { email: string; code: string },
  ): Promise<{ message: string }> {
    const { email, code } = body;
    const message = await this.cognitoService.confirmUser(email, code);
    return { message };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;

    const tokens = await this.cognitoService.login(email, password);

    return {
      accessToken: tokens.AccessToken,
      refreshToken: tokens.RefreshToken,
    };
  }
}
