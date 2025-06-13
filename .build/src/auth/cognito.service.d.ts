import { CognitoTokens } from './interfaces/cognito-tokens.interface';
export declare class CognitoService {
    private client;
    signUp(email: string, password: string): Promise<import("@aws-sdk/client-cognito-identity-provider").SignUpCommandOutput>;
    confirmUser(email: string, code: string): Promise<string>;
    login(username: string, password: string): Promise<CognitoTokens>;
}
