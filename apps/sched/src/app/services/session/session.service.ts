import { Injectable } from '@angular/core';
import { Jwt, JwtSession } from './session.interface';
import { jwtS, sessionInitialitedS, sessionS } from './session.storage';

function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public init(jwt: Jwt) {
    try {
      const jwtString = jwt;
      const decoded = parseJwt(jwtString);

      jwtS.set(jwt);
      sessionS.set(decoded);
      sessionInitialitedS.set(true);
    } catch (error) {
      console.error(error);
      console.error(new Error(`Invalid jwt token\n'${jwt}'`));
      return;
    }
  }

  public clear() {
    sessionS.clear();
    sessionInitialitedS.clear();
  }

  public getSession = (): JwtSession => sessionS.get() as JwtSession;

  public getJwt = (): Jwt => jwtS.get() as Jwt;

  public isInitialized = () => sessionInitialitedS.get() ?? false;
}
