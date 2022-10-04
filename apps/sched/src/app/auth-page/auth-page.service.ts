import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData, SignOutData, SignUpData } from './auth-page.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthPageService {
  constructor(private http: HttpClient) {
    this.signIn({ password: '', username: '' });
  }

  signIn(data: SignInData) {
    this.http.post('/auth/signIn/', data).subscribe(console.log);
  }

  signOut(data: SignOutData) {
    this.http.post('/auth/signOut/', data).subscribe(console.log);
  }

  signUp(data: SignUpData) {
    this.http.post('/auth/signUp/', data).subscribe(console.log);
  }
}
