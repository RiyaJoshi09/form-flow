import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/formflow/auth';

  isLoggedIn = signal(false);

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('accessToken', accessToken);

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  checkAuthStatus() {
    const token = this.getAccessToken();
    this.isLoggedIn.set(!!token);
  }

  signup(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload).pipe(
      tap((res: any) => {
        alert(res.message + '. Please Login to continue');
        this.router.navigate(['/login']);
      }),
    );
  }

  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout() {
    const refreshToken = this.getRefreshToken();
    this.http.post(`${this.baseUrl}/logout`, { refreshToken }).subscribe({
      next: () => {},
      error: () => {}
    });

    this.clearTokens();
    this.isLoggedIn.set(false);
    alert("Logged Out!!!")
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.clearTokens();
      this.isLoggedIn.set(false);
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
      })
    );
  }
}