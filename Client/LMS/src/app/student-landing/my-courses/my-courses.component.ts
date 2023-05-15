import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

interface CartItem {
  id: number;
  courseId: number;
  studentId: number;
}

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent {

enrolledItems: any[] = [];
enrolledCourse: Course[] = [];
course: Course = { id: 0, title: '', description: '', instructorId: 0, keywords: '', price: 0, isAuthorized: false, isPublished: false, isDeleted: false, categoryId: 0, thumbnail: '', publishedTime: new Date() };;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
      this.router.navigate(['/login']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }
    this.getEnrolledItems();
    console.log(this.enrolledCourse);
  }

   getEnrolledItems(){
     const studentId = this.authService.currentUser?.user?.id;
     this.http.get<any[]>(`http://localhost:8080/api/enrollment/getbystudentid/${studentId}`).subscribe(
       (enrolledItems) => {
         for (let i = 0; i < enrolledItems.length; i++) {
           console.log(enrolledItems[i].courseId);
           this.getCourseInfo(enrolledItems[i].courseId);
         }
         this.enrolledItems = enrolledItems;
       },
       (error) => {
         console.log('Error fetching  items:', error);
       }
     );
   }

   getCourseInfo(courseId: number){
    this.http.get<Course>(`http://localhost:8080/api/courses/getbyid/${courseId}`)
           .subscribe((course) => {
             this.enrolledCourse.push(course);
           });
   }

  viewCourse(itemId: number) {
    const requestBody = {
      courseId: itemId,
      studentId: this.authService.currentUser?.user?.id
    };
    console.log(requestBody);
    sessionStorage.setItem('learnCourseId', JSON.stringify(itemId));
    this.router.navigate(['/view-course']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}
