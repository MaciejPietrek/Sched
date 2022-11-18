import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './../session/session.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private session: SessionService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const base = 'http://localhost:3333/revile/';
    const update = {
      url: base + req.url,
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.session.getJwt()}`
      ),
    };

    const newRequest = req.clone(update);

    return next.handle(newRequest);
  }
}
