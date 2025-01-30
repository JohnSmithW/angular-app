import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('accessToken', token);
        } else {
          throw new Error('No token received from server');
        }
      }),
      tap(null, error => {
        console.error('Login failed:', error); 
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}