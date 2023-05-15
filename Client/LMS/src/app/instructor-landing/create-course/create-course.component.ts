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

interface CourseCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  title: string = '';
  description: string = '';
  keywords: string = '';
  categoryId: number = 0;
  price: number = 0;
  rawPrice: String = ''
  courseCategories: CourseCategory[] = [];
  thumbnail: string = '';
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
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
    const instructorId = this.authService.currentUser?.user?.id;
    const newCourse = {
      title: this.title,
      description: this.description,
      keywords: this.keywords,
      categoryId: this.categoryId,
      instructorId: instructorId,
      price: this.price,
      thumbnail: this.thumbnail
    };
    console.log(newCourse);
    this.http.post<any>('http://localhost:8080/api/courses/add', newCourse).subscribe(
      () => {
        console.log('Course created successfully!');
        location.reload();
      },
      (error) => {
        console.error('Error creating course:', error);
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

}
