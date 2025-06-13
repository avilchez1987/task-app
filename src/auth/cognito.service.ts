import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { CognitoTokens } from './interfaces/cognito-tokens.interface';

@Injectable()
export class CognitoService {
  private client = new CognitoIdentityProviderClient({
    region: process.env.COGNITO_REGION,
  });

  async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
    });

    const response = await this.client.send(command);
    return response;
  }

  async confirmUser(email: string, code: string): Promise<string> {
    const command = new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    });

    try {
      await this.client.send(command);
      return 'Usuario confirmado exitosamente';
    } catch (error) {
      console.error(error);
      throw new Error('Error al confirmar usuario');
    }
  }

  async login(username: string, password: string): Promise<CognitoTokens> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.client.send(command);
      const authResult = response.AuthenticationResult;

      if (
        !authResult ||
        !authResult.AccessToken ||
        !authResult.IdToken ||
        !authResult.RefreshToken
      ) {
        throw new Error('Autenticación fallida: tokens incompletos');
      }

      return {
        AccessToken: authResult.AccessToken,
        RefreshToken: authResult.RefreshToken,
        IdToken: authResult.IdToken,
        ExpiresIn: authResult.ExpiresIn ?? 0,
        TokenType: authResult.TokenType ?? 'Bearer',
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Credenciales incorrectas o usuario no confirmado');
    }
  }
}
