import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthSelectors } from '../store/services/selectors';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate, CanActivateChild {
  constructor(private authSelectors: AuthSelectors, private router: Router) {}

  public async canActivate(): Promise<boolean> {
    const isLogged = await this.authSelectors.nextIsLogged();
    const isAnonymous = !isLogged;

    if (isLogged) {
      this.router.navigateByUrl('/');
    }

    return isAnonymous;
  }

  public canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
}
