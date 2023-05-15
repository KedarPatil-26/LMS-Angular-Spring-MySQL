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
  selector: 'app-manage-instructors',
  templateUrl: './manage-instructors.component.html',
  styleUrls: ['./manage-instructors.component.scss']
})
export class ManageInstructorsComponent {

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
    this.getInstructors()
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

getInstructors() {
       this.http.get<any[]>('http://localhost:8080/api/instructor/getauthorized').subscribe(
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

  blockInstructor(instructor: any) {
    const body = { id: instructor.id, blocked: true };
    this.http.put('http://localhost:8080/api/instructor/block', body).subscribe(
      () => {
        instructor.blocked = true;
      },
      error => console.error(error)
    );
  }

  unblockInstructor(instructor: any) {
    const body = { id: instructor.id, blocked: false };
    this.http.put('http://localhost:8080/api/instructor/block', body).subscribe(
      () => {
        instructor.blocked = false;
      },
      error => console.error(error)
    );
  }
}
