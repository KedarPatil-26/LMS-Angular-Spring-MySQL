import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

studentsCount: number = 0;
  instructorsCount: number = 0;
  coursesCount: number = 0;

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }

    this.http.get<any>('http://localhost:8080/api/student/getall').subscribe(response => {
          this.studentsCount = response.length;
        });

        this.http.get<any>('http://localhost:8080/api/instructor/getauthorized').subscribe(response => {
          this.instructorsCount = response.length;
        });

        this.http.get<any>('http://localhost:8080/api/courses/getallpublished').subscribe(response => {
          this.coursesCount = response.length;
        });
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

}
