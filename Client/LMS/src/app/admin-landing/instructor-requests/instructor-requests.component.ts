import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-instructor-requests',
  templateUrl: './instructor-requests.component.html',
  styleUrls: ['./instructor-requests.component.scss']
})
export class InstructorRequestsComponent {

  instructors: any[] = [];
  pageSizeOptions: number[] = [5];
  pageSize: number = 10;
  pageIndex: number = 0;
  totalInstructors: number = 0;

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
    this.getUnauthorizedInstructors();
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

getUnauthorizedInstructors() {
       this.http.get<any[]>('http://localhost:8080/api/instructor/getunauthorized').subscribe(
         (instructors: any[]) => {
           this.instructors = instructors;
           this.totalInstructors = instructors.length;
         },
         error => console.error(error)
       );
     }

     onPageChange(event: PageEvent) {
       this.pageSize = event.pageSize;
       this.pageIndex = event.pageIndex;
     }

  authorizeInstructor(instructor: any) {
    const body = { id: instructor.id, authorized: true };
    this.http.put('http://localhost:8080/api/instructor/authorize', body).subscribe(
      () => {
        instructor.authorized = true;
        location.reload();
      },
      error => console.error(error)
    );
  }

}
