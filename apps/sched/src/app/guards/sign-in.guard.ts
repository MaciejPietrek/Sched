import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session/session.service';
import { paths } from '../utils/paths';
import { signInGuardReturnURL } from '../utils/storages';

type ActivationResult =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class SignInGuard implements CanActivate {
  constructor(private router: Router, private session: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ActivationResult {
    if (!this.session.isInitialized()) {
      signInGuardReturnURL.set(state.url);
      return this.router.createUrlTree([paths.signIn]);
    }
    return true;
  }
}
