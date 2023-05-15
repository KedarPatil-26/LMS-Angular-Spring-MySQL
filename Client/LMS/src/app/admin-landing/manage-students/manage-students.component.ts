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
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent {

  students: any[] = [];
  pageSizeOptions: number[] = [5];
  pageSize: number = 10;
  pageIndex: number = 0;
  totalStudents: number = 0;

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
    this.getStudents()
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

   getStudents() {
       this.http.get<any[]>('http://localhost:8080/api/student/getall').subscribe(
         (students: any[]) => {
           this.students = students;
           this.totalStudents = students.length;
         },
         error => console.error(error)
       );
     }

     onPageChange(event: PageEvent) {
       this.pageSize = event.pageSize;
       this.pageIndex = event.pageIndex;
     }

  blockStudent(student: any) {
    const body = { id: student.id, blocked: true };
    this.http.put('http://localhost:8080/api/student/block', body).subscribe(
      () => {
        student.blocked = true;
      },
      error => console.error(error)
    );
  }

  unblockStudent(student: any) {
    const body = { id: student.id, blocked: false };
    this.http.put('http://localhost:8080/api/student/block', body).subscribe(
      () => {
        student.blocked = false;
      },
      error => console.error(error)
    );
  }
}
