import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { paths } from '../utils/paths';
import { SessionService } from './../services/session/session.service';

type ActivationResult =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class SimpleGuard implements CanActivate {
  constructor(private router: Router, private session: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ActivationResult {
    if (!this.session.isInitialized())
      return this.router.createUrlTree([paths.welcomePage]);
    return true;
  }
}
