import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, User } from '../core/models';
import { TokenService } from '../core/token.service';
import { PermissionDispatchers, AuthDispatchers } from '../store/services/dispatchers';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private authDispatchers: AuthDispatchers,
    private permissionDispatchers: PermissionDispatchers,
    private router: Router,
  ) {}

  public async login(email: string, password: string): Promise<User> {
    const authorization = `${email}:${password}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(authorization),
    });

    const response = await this.apiService.post<LoginResponse, any>('/api/auth/login', undefined, {
      headers: headers,
    });

    const token = response.token;

    this.tokenService.setToken(token);
    this.permissionDispatchers.getPermissions();
    this.router.navigateByUrl('/');

    return this.tokenService.getUserFromToken(token);
  }

  public logout(): void {
    this.authDispatchers.logout();
    this.router.navigateByUrl('/login');
  }

  public getCurrentUser(): User | undefined {
    const token = this.tokenService.getToken();

    if (token != null) {
      return this.tokenService.getUserFromToken(token);
    }

    return undefined;
  }
}
