import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-draft-courses',
  templateUrl: './draft-courses.component.html',
  styleUrls: ['./draft-courses.component.scss']
})
export class DraftCoursesComponent {
  courses: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'instructor') {
      this.router.navigate(['/login']);
    } else if (!this.authService.currentUser.user.authorized) {
      this.router.navigate(['/unauthorized']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    } else {
      this.loadDraftCourses();
    }
  }

  loadDraftCourses(): void {
    const instructorId = this.authService.currentUser?.user?.id;
    this.http.get<any[]>(`http://localhost:8080/api/courses/unpublished/${instructorId}`).subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  publishCourse(courseId: number): void {
    const url = `http://localhost:8080/api/courses/${courseId}/publish`;
    this.http.put<any>(url, { isPublished: true }).subscribe(
      data => {
        this.loadDraftCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  editCourse(courseId: number): void {
      console.log(this.courses);
      console.log(courseId);
      sessionStorage.setItem('editCourse', JSON.stringify(courseId));
      this.router.navigate(['/edit-course']);

    }

    editMaterial(courseId: number): void {
    console.log(courseId);
    sessionStorage.setItem('editMaterial', JSON.stringify(courseId));
    this.router.navigate(['/edit-material']);
    }

  deleteCourse(courseId: number): void {
      const url = `http://localhost:8080/api/courses/${courseId}/delete`;
      this.http.put<any>(url, { isDeleted: true }).subscribe(
        data => {
          this.loadDraftCourses();
        },
        error => {
          console.log(error);
        }
      );
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}
