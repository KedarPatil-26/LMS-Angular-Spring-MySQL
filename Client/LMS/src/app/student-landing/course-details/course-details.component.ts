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

interface CartItem {
  id: number;
  courseId: number;
  studentId: number;
}

interface Wishlist {
  id: number;
  courseId: number;
  studentId: number;
}


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {

course: Course = { id: 0, title: '', description: '', instructorId: 0, keywords: '', price: 0, isAuthorized: false, isPublished: false, isDeleted: false, categoryId: 0, thumbnail: '', publishedTime: new Date() };;
cId: number = 0;
isInCart: boolean = false;
isInWishlist: boolean = false;

constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

ngOnInit(): void {
  console.log(this.authService.currentUser);
  if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
    this.router.navigate(['/login']);
  } else if (this.authService.currentUser.user.blocked) {
        this.router.navigate(['/blocked']);
      }
     const courseID = JSON.parse(sessionStorage.getItem('viewCourseId') || '{}');
     console.log(courseID)
     this.cId = courseID;
     this.checkCart();
     this.checkWishlist();
     this.getCourse();
    }

  logout() {
        this.authService.logout();
        this.router.navigate(['/homepage']);
      }

  getCourse(){
  this.http.get<Course>(`http://localhost:8080/api/courses/getbyid/${this.cId}`)
        .subscribe((course) => {
          this.course = course;
        });
  }

  addToCart() {
    // Send the course and student ids to the backend API to add the course to the cart
    const requestBody = {
      courseId: this.course.id,
      studentId: this.authService.currentUser?.user?.id
    };
    this.http.post('http://localhost:8080/api/cart/add', requestBody).subscribe(() => {
      // Navigate to the cart page after adding the course to the cart
      this.router.navigate(['/cart']);
    }, (error) => {
      // Handle any errors that occur when adding the course to the cart
      console.log('Error adding course to cart:', error);
    });
  }

    addToWishlist() {
      // Send the course and student ids to the backend API to add the course to the cart
          const requestBody = {
            courseId: this.course.id,
            studentId: this.authService.currentUser?.user?.id
          };
          this.http.post('http://localhost:8080/api/wishlist/add', requestBody).subscribe(() => {
            // Navigate to the cart page after adding the course to the cart
            this.router.navigate(['/wishlist']);
          }, (error) => {
            // Handle any errors that occur when adding the course to the cart
            console.log('Error adding course to cart:', error);
          });
    }

  checkCart() {
      const studentId = this.authService.currentUser?.user?.id;
      this.http
        .get<CartItem[]>(`http://localhost:8080/api/cart/getbycourseandstudent/${this.cId}/${studentId}`)
        .subscribe((cartItems) => {
          if (cartItems) {
            this.isInCart = true;
            console.log("Inside Cart");
          } else {
            this.isInCart = false;
            console.log("Not Inside Cart");
          }
        });
    }

  checkWishlist() {
    const studentId = this.authService.currentUser?.user?.id;
    this.http
      .get<Wishlist[]>(`http://localhost:8080/api/wishlist/getbycourseandstudent/${this.cId}/${studentId}`)
      .subscribe((wishlist) => {
        if (wishlist) {
          this.isInWishlist = true;
        } else {
          this.isInWishlist = false;
        }
      });
  }

}
