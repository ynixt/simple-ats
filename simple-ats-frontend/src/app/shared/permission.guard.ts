import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PermissionsSelectors } from '../store/services/selectors';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild {
  public constructor(private permissionsSelector: PermissionsSelectors, private router: Router) {}

  private permissionByRoute = new Map<string, string>();

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const permissions = await this.permissionsSelector.nextPermissions();

    if (permissions) {
      const routeUrl: string = route.url.join('/');
      const necessaryPermission = this.permissionByRoute.get(routeUrl);

      if (
        !this.permissionByRoute.has(routeUrl) ||
        (this.permissionByRoute.has(routeUrl) && permissions.map(permission => permission.code).includes(<string>necessaryPermission))
      ) {
        return true;
      }
    }

    this.router.navigateByUrl('/login');

    return false;
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
