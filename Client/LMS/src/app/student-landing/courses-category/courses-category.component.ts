import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: number;
  keywords: string;
  price: number;
  isAuthorized: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  categoryId: number;
  thumbnail: string;
  publishedTime: Date;
}


@Component({
  selector: 'app-courses-category',
  templateUrl: './courses-category.component.html',
  styleUrls: ['./courses-category.component.scss']
})
export class CoursesCategoryComponent {

  courses: any = [];
  courseId: number = 0;
  categoryId: number = 0;
  categoryName: number = 0;

constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

ngOnInit(): void {
  console.log(this.authService.currentUser);
  if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
    this.router.navigate(['/login']);
  } else if (this.authService.currentUser.user.blocked) {
        this.router.navigate(['/blocked']);
      }
  const cId = JSON.parse(sessionStorage.getItem('selectedCategory') || '{}');
  this.categoryId = cId.id;
  this.categoryName = cId.name;
  console.log(this.categoryId);
  console.log(this.courses);
  this.getCourses();
}

saveCourseId(courseId: number): void {
  sessionStorage.setItem('viewCourseId', JSON.stringify(courseId));
}

getCourses() {
  this.http.get(`http://localhost:8080/api/courses/getauthorizedandundeletedbycategory/${this.categoryId}`).subscribe(
    data => {
      console.log(data);
      this.courses = data;
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
