import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import Fuse from 'fuse.js';

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

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses: Course[] = [];
  categories: Category[]  = [];
  selectedCategoryId: number = 0;
  filteredCourses: Course[] = [];
  searchQuery: string = '';

constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

ngOnInit(): void {
  console.log(this.authService.currentUser);
  if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
    this.router.navigate(['/login']);
  } else if (this.authService.currentUser.user.blocked) {
        this.router.navigate(['/blocked']);
      }
  this.getCourses();
  this.loadCategories();
}

saveCourseId(courseId: number): void {
  sessionStorage.setItem('viewCourseId', JSON.stringify(courseId));
}

getCourses() {
    this.http.get<Course[]>('http://localhost:8080/api/courses/getallauthorizedandundeleted').subscribe(
      data => {
        this.courses = data;
        this.filteredCourses = data;
        },
      error => {
        console.log(error);
      }
    );
  }

loadCategories(): void {
    this.http.get<Category[]>('http://localhost:8080/api/coursecategories/getall').subscribe(categories => {
      this.categories = categories;
    });
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

  applyFilter(): void {
      if (this.selectedCategoryId) {
          const selectedCategory = this.categories.find(c => c.id === this.selectedCategoryId);
          sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
          this.router.navigate(['/courses-category']);
        }
    }

    onSearch() {
        const fuse = new Fuse(this.courses, {
          keys: ['title', 'description', 'keywords'],
          threshold: 0.3
        });
        if (this.searchQuery.trim() !== '') {
          this.filteredCourses = fuse.search(this.searchQuery.trim()).map(result => result.item);
          console.log("if");
        } else {
          this.filteredCourses = this.courses;
          console.log("else");
        }
      }

      clearSearch() {
        this.searchQuery = '';
        this.filteredCourses = this.courses;
      }

}
