import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, tap } from 'rxjs';
import { signInGuardReturnURL } from '../utils/storages';
import { SessionService } from './../services/session/session.service';
import { paths } from './../utils/paths';
import { SignInData, SignOutData, SignUpData } from './auth-page.interface';

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
          if (signInGuardReturnURL.has())
            this.router.navigateByUrl(signInGuardReturnURL.pop()!);
          else this.router.navigateByUrl(paths.main);
        })
      );
  }

  signOut(data: SignOutData) {
    this.http.post('auth/signOut', data).subscribe();
  }

  signUp(data: SignUpData) {
    return EMPTY;
    return this.http
      .post('auth/signUp', {
        username: data.username,
        passwordHash: data.password,
      })
      .pipe(
        tap((response: any) => {
          this.session.init(response.token);
          if (signInGuardReturnURL.has())
            this.router.navigateByUrl(signInGuardReturnURL.pop()!);
          else this.router.navigateByUrl(paths.main);
        })
      );
  }
}
