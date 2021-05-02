import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public readonly allowedDomains = ['localhost:44352'];
  public readonly disallowedRoutes = [/api\/auth\/login/];

  private readonly tokenKey = 'token';

  constructor() {}

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public deleteToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public getUserFromToken(token: string): User {
    if (token != null) {
      const jwtHelperService = new JwtHelperService();

      const decodedToken = jwtHelperService.decodeToken(token);

      return {
        id: decodedToken.nameid,
        email: decodedToken.unique_name,
        name: decodedToken.given_name,
      };
    }

    return null;
  }

  public tokenIsSaved(): boolean {
    return localStorage.getItem(this.tokenKey) != null;
  }
}
