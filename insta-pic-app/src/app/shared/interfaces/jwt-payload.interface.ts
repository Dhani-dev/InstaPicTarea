export interface JwtPayload {
  email: string;
  username: string;
  exp: number;
  iat?: number;
}
