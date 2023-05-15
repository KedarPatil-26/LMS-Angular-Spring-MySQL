import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
constructor(private authService: AuthService, private router: Router) { }
  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}
