import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent {

currentUser: any;

constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
this.currentUser = this.authService.currentUser;
}


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

updateInstructor() {
    const updateData = {
      name: this.currentUser.user.name,
      email: this.currentUser.user.email,
      password: this.currentUser.user.password,
      id: this.currentUser.user.id
    };
    console.log(updateData);
    this.http.post('http://localhost:8080/api/instructor/update', updateData).subscribe(() => {
      // Success message
      console.log('Instructor updated successfully');
    }, (error) => {
      // Error message
      console.error('Error updating student:', error);
    });
  }
}
