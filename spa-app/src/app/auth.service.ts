import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { email: 'user1@some.com', password: 'user1@some.com' },
    { email: 'user2@some.com', password: 'user2@some.com' }
  ];

  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    const user = this.validUsers.find(u => u.email === email && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }
}