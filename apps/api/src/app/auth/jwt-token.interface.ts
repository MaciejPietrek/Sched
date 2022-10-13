export interface IJwtToken {
  username: string;
  email: string;
  groups: string[];
  tags: string[];
  iat: string;
  exp: string;
}
