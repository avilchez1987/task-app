"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const common_1 = require("@nestjs/common");
let CognitoService = class CognitoService {
    client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
        region: process.env.COGNITO_REGION,
    });
    async signUp(email, password) {
        const command = new client_cognito_identity_provider_1.SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
        });
        const response = await this.client.send(command);
        return response;
    }
    async confirmUser(email, code) {
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        });
        try {
            await this.client.send(command);
            return 'Usuario confirmado exitosamente';
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al confirmar usuario');
        }
    }
    async login(username, password) {
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
            AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        });
        try {
            const response = await this.client.send(command);
            const authResult = response.AuthenticationResult;
            if (!authResult ||
                !authResult.AccessToken ||
                !authResult.IdToken ||
                !authResult.RefreshToken) {
                throw new Error('Autenticación fallida: tokens incompletos');
            }
            return {
                AccessToken: authResult.AccessToken,
                RefreshToken: authResult.RefreshToken,
                IdToken: authResult.IdToken,
                ExpiresIn: authResult.ExpiresIn ?? 0,
                TokenType: authResult.TokenType ?? 'Bearer',
            };
        }
        catch (error) {
            console.error('Login error:', error);
            throw new Error('Credenciales incorrectas o usuario no confirmado');
        }
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)()
], CognitoService);
//# sourceMappingURL=cognito.service.js.map