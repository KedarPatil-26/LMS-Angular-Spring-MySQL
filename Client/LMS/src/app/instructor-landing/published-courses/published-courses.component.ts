import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-published-courses',
  templateUrl: './published-courses.component.html',
  styleUrls: ['./published-courses.component.scss']
})
export class PublishedCoursesComponent {
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
    }
    this.loadPublishedCourses();
  }

  loadPublishedCourses(): void {
    const instructorId = this.authService.currentUser?.user?.id;
    this.http.get<any[]>(`http://localhost:8080/api/courses/published/${instructorId}`).subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  unpublishCourse(courseId: number): void {
    const url = `http://localhost:8080/api/courses/${courseId}/publish`;
    this.http.put<any>(url, { isPublished: false }).subscribe(
      data => {
        this.loadPublishedCourses();
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
