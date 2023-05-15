import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent {
courseId: number = 0;
courseMaterials: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
      this.router.navigate(['/login']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }
    const cId = JSON.parse(sessionStorage.getItem('learnCourseId') || '{}');
    this.courseId = cId;
    console.log(this.courseId);
    this.getLearningMaterials(this.courseId);
  }

   getLearningMaterials(courseId: number) {
     this.http.get<any[]>(`http://localhost:8080/api/coursematerial/getbycourseid/${courseId}`).subscribe(data => {
       this.courseMaterials = data;
     });
   }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
