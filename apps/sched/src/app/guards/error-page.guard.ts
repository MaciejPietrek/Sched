import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { errorPageExtras } from '../error-page/error-page-extras';
import { SessionService } from '../services/session/session.service';

type ActivationResult =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class ErrorPageGuard implements CanActivate {
  constructor(private router: Router, private session: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ActivationResult {
    if (!errorPageExtras.has()) {
      errorPageExtras.set({
        title: 'No title',
        message: 'No message provided for this error',
      });
    }
    return true;
  }
}
