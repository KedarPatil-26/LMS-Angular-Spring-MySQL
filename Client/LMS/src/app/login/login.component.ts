import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit()');
    // Check if the currentUser is already set in the AuthService
    if (this.authService.currentUser) {
      console.log('currentUser found, redirecting to landing page');
      // Navigate to the appropriate landing page based on the user's userType
      switch (this.authService.currentUser.userType) {
        case 'admin':
          this.router.navigate(['/app-admin-landing']);
          break;
        case 'instructor':
          this.router.navigate(['/app-instructor-landing']);
          break;
        case 'student':
          this.router.navigate(['/app-student-landing']);
          break;
      }
    } else {
      console.log('no currentUser found');
    }
  }

  login() {
    console.log('login() called');
    this.authService.login(this.email, this.password)
      .subscribe(
        user => {
          if (user) {
            console.log('login successful, redirecting to landing page');
            // Navigate to the appropriate landing page based on the user's userType
            switch (user.userType) {
              case 'admin':
                this.router.navigate(['/app-admin-landing']);
                break;
              case 'instructor':
                this.router.navigate(['/app-instructor-landing']);
                break;
              case 'student':
                this.router.navigate(['/app-student-landing']);
                break;
            }
          } else {
            console.log('login failed: invalid username or password');
            this.error = 'Invalid username or password';
            setTimeout(() => {
                      this.error = '';
                    }, 5000);
          }
        }
      );
  }
}
