import { Injectable } from '@angular/core';

interface JwtSession {
  login: string;
  exp: number;
}
type Jwt = string;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  private session?: JwtSession;
  private jwt?: Jwt;
  private initialized: boolean = false;

  public init(jwt: Jwt) {
    const jwtString = jwt;
    const dataString = jwtString.split('.')[1];
    const dataObj = JSON.parse(dataString);
    this.session = dataObj;
    this.jwt = jwt;
    this.initialized = true;
  }

  public clear() {
    this.session = undefined;
    this.jwt = undefined;
  }

  public getSession = (): JwtSession => this.session as JwtSession;

  public getJwt = (): Jwt => this.jwt as Jwt;

  public isInitialized = () => this.initialized;
}
