export interface CognitoTokens {
  AccessToken: string;
  RefreshToken: string;
  IdToken?: string;
  ExpiresIn?: number;
  TokenType?: string;
}
