import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

interface CourseCategory {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  keywords: string;
  categoryId: number;
  instructorId: number;
  price: number;
  thumbnail: string;
}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
 title: string = '';
  description: string = '';
  keywords: string = '';
  categoryId: number = 0;
  price: number = 0;
  rawPrice: String = ''
  courseCategories: CourseCategory[] = [];
  thumbnail: string = '';
  selectedFile: File | null = null;
  courseId: number = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
    this.getCategories();
    const courseData = JSON.parse(sessionStorage.getItem('editCourse') || '{}');
        this.courseId = courseData.id;
        this.title = courseData.title;
        this.description = courseData.description;
        this.keywords = courseData.keywords;
        this.categoryId = courseData.categoryId;
        this.price = courseData.price;
        this.rawPrice = String(courseData.price);
        this.thumbnail = courseData.thumbnail;

    console.log(courseData);
  }

  getCategories(){
  this.http.get<CourseCategory[]>('http://localhost:8080/api/coursecategories/getall').subscribe(
        (categories) => {
          this.courseCategories = categories;
        },
        (error) => {
          console.error('Error fetching course categories:', error);
        }
      );
  }

  onSubmit() {
      this.price = Number(this.rawPrice);
      const newCourse = {
        id: this.courseId,
        title: this.title,
        description: this.description,
        keywords: this.keywords,
        categoryId: this.categoryId,
        price: this.price,
        thumbnail: this.thumbnail
      };
      console.log(newCourse);
      this.http.put<any>(`http://localhost:8080/api/courses/update/${this.courseId}`, newCourse).subscribe(
        () => {
          console.log('Course updated successfully!');
          localStorage.removeItem('editCourse'); // Remove the local data in local storage
         this.showAlert();
        },
        (error) => {
          console.error('Error updating course:', error);
        }
      );
    }

  onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http.post('http://localhost:8080/api/courses/upload', formData, { responseType: 'text' }).subscribe(
        (response) => {
          console.log(response);
          const fileName = response.split('\\').pop(); // extract file name from response string
          this.thumbnail = 'http://127.0.0.1:8887/Thumbnails/' + fileName; // construct thumbnail URL
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

  showAlert() {
    const alertBox = document.getElementById("alert-box");
    if (alertBox) {
      alertBox.style.display = "block";
    setTimeout(() => {
        window.location.href = '/draft-courses';
      }, 3000);
    }
  }

}
