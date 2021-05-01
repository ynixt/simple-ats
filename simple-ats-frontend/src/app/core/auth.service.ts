import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../core/models';
import { TokenService } from '../core/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  public async login(email: string, password: string): Promise<User> {
    const authorization = `${email}:${password}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(authorization),
    });

    const response = await this.httpClient
      .post<LoginResponse>('/api/auth/login', undefined, {
        headers: headers,
      })
      .toPromise();

    const token = response.token;

    this.tokenService.setToken(token);

    return this.tokenService.getuserFromToken(token);
  }
}
