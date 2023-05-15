import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.scss']
})
export class AdminFaqComponent {
constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
