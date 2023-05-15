import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-instructor-landing',
  templateUrl: './instructor-landing.component.html',
  styleUrls: ['./instructor-landing.component.scss']
})
export class InstructorLandingComponent {
constructor(private authService: AuthService, private router: Router) { }

ngOnInit(): void {
  console.log(this.authService.currentUser);
  if (!this.authService.currentUser || this.authService.currentUser.userType !== 'instructor') {
    this.router.navigate(['/login']);
  } else if (!this.authService.currentUser.user.authorized) {
    this.router.navigate(['/unauthorized']);
  } else if (this.authService.currentUser.user.blocked) {
        this.router.navigate(['/blocked']);
      }
}


  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}
