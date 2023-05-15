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
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  wishlistedCourse: Course[] = [];
  course: Course = { id: 0, title: '', description: '', instructorId: 0, keywords: '', price: 0, isAuthorized: false, isPublished: false, isDeleted: false, categoryId: 0, thumbnail: '', publishedTime: new Date() };;
  isInCart: boolean[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
      this.router.navigate(['/login']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }
    this.getWishlistItems();
    console.log(this.wishlistedCourse);
  }

   getWishlistItems(){
     const studentId = this.authService.currentUser?.user?.id;
     this.http.get<any[]>(`http://localhost:8080/api/wishlist/getbystudentid/${studentId}`).subscribe(
       (wishlistItems) => {
         for (let i = 0; i < wishlistItems.length; i++) {
           console.log(wishlistItems[i].courseId);
           this.getCourseInfo(wishlistItems[i].courseId);
           this.checkCart(wishlistItems[i].courseId, i);
         }
         this.wishlistItems = wishlistItems;
       },
       (error) => {
         console.log('Error fetching wishlist items:', error);
       }
     );
   }

   getCourseInfo(courseId: number){
    this.http.get<Course>(`http://localhost:8080/api/courses/getbyid/${courseId}`)
           .subscribe((course) => {
             this.wishlistedCourse.push(course);
           });
   }

  addToCart(itemId: number) {
    const requestBody = {
      courseId: itemId,
      studentId: this.authService.currentUser?.user?.id
    };
    this.http.post('http://localhost:8080/api/cart/add', requestBody).subscribe(
      () => {
        console.log('Course added to cart');
        location.reload();
      },
      (error) => {
        console.log('Error adding course to cart:', error);
      }
    );
  }

 checkCart(courseId: number, index: number) {
   const studentId = this.authService.currentUser?.user?.id;
   this.http
     .get<CartItem[]>(`http://localhost:8080/api/cart/getbycourseandstudent/${courseId}/${studentId}`)
     .subscribe((cartItems) => {
       if (cartItems) {
         this.isInCart[index] = true;
         console.log("Inside Cart");
       } else {
         this.isInCart[index] = false;
         console.log("Not Inside Cart");
       }
     });
 }

deleteFromWishlist(itemId: number) {
  const studentId = this.authService.currentUser?.user?.id;
  this.http.delete(`http://localhost:8080/api/wishlist/delete/${itemId}/${studentId}`).subscribe(() => {
    console.log('Item removed from wishlist');
    location.reload();
  }, (error) => {
    console.log('Error removing item from wishlist:', error);
  });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}
