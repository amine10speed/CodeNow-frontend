import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Example: Replace this with an actual API call
    if (this.username === 'user' && this.password === 'password') {
      alert('Login successful!');
      this.router.navigate(['/dashboard']); // Navigate to the dashboard
    } else {
      alert('Invalid username or password');
    }
  }
}
