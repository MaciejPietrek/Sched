export interface JwtSession {
  username: string;
  email: string;
  groups: string[];
  tags: string[];
  iat: number;
  exp: number;
}
export type Jwt = string;
