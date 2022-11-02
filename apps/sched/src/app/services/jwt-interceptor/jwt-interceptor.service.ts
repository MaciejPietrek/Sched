import { SessionService } from './../session/session.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private session: SessionService) {}

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
