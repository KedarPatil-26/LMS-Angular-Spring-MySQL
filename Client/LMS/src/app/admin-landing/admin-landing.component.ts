import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent{
constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/admin-dashboard']);
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}

