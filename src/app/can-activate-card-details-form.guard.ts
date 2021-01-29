import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateCardDetailsFormGuard implements CanActivate {
  constructor(private userServ: UserStoreService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userServ.getUser() === null) {
      this.router.navigate(['/basic-details-form']);
      return false;
    }
    return true;
  }
}
