import { Injectable } from '@angular/core';
import { Jwt, JwtSession } from './session.interface';
import { jwtS, sessionInitialitedS, sessionS } from './session.storage';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public init(jwt: Jwt) {
    try {
      const jwtString = jwt;
      const dataString = jwtString.split('.')[1];
      const decoded = atob(dataString);
      const dataObj = JSON.parse(decoded);

      jwtS.set(jwt);
      sessionS.set(dataObj);
      sessionInitialitedS.set(true);
    } catch (error) {
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
