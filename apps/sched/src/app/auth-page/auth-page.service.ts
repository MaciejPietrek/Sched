import { paths } from './../utils/paths';
import { Router } from '@angular/router';
import { SessionService } from './../services/session/session.service';
import { httpStandardHandler } from './../http-handlers/http-handler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handle401 } from '../http-handlers/http-handler';
import { SignInData, SignOutData, SignUpData } from './auth-page.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthPageService {
  constructor(
    private http: HttpClient,
    private session: SessionService,
    private router: Router
  ) {}

  signIn(data: SignInData) {
    return this.http
      .post('auth/signIn', {
        username: data.username,
        passwordHash: data.password,
      })
      .pipe(
        tap((response: any) => {
          this.session.init(response.token);
          this.router.navigateByUrl(paths.main);
        })
      );
  }

  signOut(data: SignOutData) {
    this.http.post('auth/signOut', data).subscribe(console.log);
  }

  signUp(data: SignUpData) {
    this.http
      .post('auth/signUp', {
        username: data.username,
        passwordHash: data.password,
      })
      .subscribe(console.log);
  }
}
