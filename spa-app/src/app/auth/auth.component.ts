import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Submitting login form with email:', this.email, 'and password:', this.password);
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/schedule']);
      },
      error => {
        console.error('Login failed:', error);
        alert('Неверные учетные данные');
      }
    );
  }
}