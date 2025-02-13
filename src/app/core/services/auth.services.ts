import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, { email, password });
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.clearToken();
  }
}
