export interface JwtPayload {
  id:string;
  email: string;
  username: string;
  exp: number;
  iat?: number;
}
