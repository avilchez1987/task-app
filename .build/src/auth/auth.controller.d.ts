import { CognitoService } from './cognito.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly cognitoService;
    private readonly usersService;
    constructor(cognitoService: CognitoService, usersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    confirmUser(body: {
        email: string;
        code: string;
    }): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        idToken: string;
        refreshToken: string;
    }>;
}
