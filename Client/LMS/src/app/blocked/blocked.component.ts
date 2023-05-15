import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent {
constructor(private authService: AuthService, private router: Router) { }
  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}
