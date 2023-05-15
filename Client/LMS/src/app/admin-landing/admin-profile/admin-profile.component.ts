import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {

currentUser: any;

constructor(private authService: AuthService, private router: Router) {
this.currentUser = this.authService.currentUser;
}

  ngOnInit(): void {
  console.log(this.currentUser);
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}
