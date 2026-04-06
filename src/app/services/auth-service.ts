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

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/varifyaccount`, {
        email,
        otp,
      })
      .pipe(
        tap((res: any) => {
          this.setTokens(res.accessToken, res.refreshToken);
          this.isLoggedIn.set(true);
        }),
      );
  }

  sendOtp(data: string) {
    return this.http
      .post(`${this.baseUrl}/forgot-password`, {
        email: data,
      })
      .pipe(
        tap((res: any) => {
          console.log('An OTP has been sent to the registered Email!!');
        }),
      );
  }

  verifyResetOtp(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/verify-reset-otp`, data, {
        responseType: 'text',
      })
      .pipe(
        tap((res: string) => {
          console.log(res);
        }),
      );
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

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
        this.router.navigate(['/verify'], {
          queryParams: { email: payload.email },
        });
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
      next: () => {
        console.log('logged out successfully !');
      },
      error: () => {},
    });

    this.clearTokens();
    this.isLoggedIn.set(false);
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
      }),
    );
  }
}
