import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../core/auth/auth.service';
import { environment } from '../../environments/environment';

import { UiInputComponent } from '../shared/components/ui-input/ui-input.component';
import { UiButtonComponent } from '../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      FormsModule,
      CommonModule,
      UiInputComponent,
      UiButtonComponent
              ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error    = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.http.post<{ token: string }>(
      `${environment.apiUrl}/auth/login`,
      { username: this.username, password: this.password }
    ).subscribe({
      next: res => {
        this.auth.token = res.token;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = err.error?.error || 'Login failed';
      }
    });
  }
}
