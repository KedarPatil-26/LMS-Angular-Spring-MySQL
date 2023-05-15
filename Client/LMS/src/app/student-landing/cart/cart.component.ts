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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


cartItems: any[] = [];
cartCourse: Course[] = [];
course: Course = { id: 0, title: '', description: '', instructorId: 0, keywords: '', price: 0, isAuthorized: false, isPublished: false, isDeleted: false, categoryId: 0, thumbnail: '', publishedTime: new Date() };;
isAlreadyBought: boolean[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'student') {
      this.router.navigate(['/login']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }
    this.getCartItems();
    console.log(this.cartCourse);
  }

   getCartItems(){
     const studentId = this.authService.currentUser?.user?.id;
     this.http.get<any[]>(`http://localhost:8080/api/cart/getbystudentid/${studentId}`).subscribe(
       (cartItems) => {
         for (let i = 0; i < cartItems.length; i++) {
           console.log(cartItems[i].courseId);
           this.getCourseInfo(cartItems[i].courseId);
           this.checkEnrolled(cartItems[i].courseId, i);
         }
         this.cartItems = cartItems;
       },
       (error) => {
         console.log('Error fetching  items:', error);
       }
     );
   }

   getCourseInfo(courseId: number){
    this.http.get<Course>(`http://localhost:8080/api/courses/getbyid/${courseId}`)
           .subscribe((course) => {
             this.cartCourse.push(course);
           });
   }

  buyCourse(itemId: number) {
    const requestBody = {
      courseId: itemId,
      studentId: this.authService.currentUser?.user?.id
    };
    console.log(requestBody);
    this.http.post('http://localhost:8080/api/enrollment/add', requestBody).subscribe(
      () => {
        console.log('Success');
        this.deleteFromCart(itemId);
        location.reload();
      },
      (error) => {
        console.log('Error :', error);
      }
    );
  }

 checkEnrolled(courseId: number, index: number) {
   const studentId = this.authService.currentUser?.user?.id;
   this.http
     .get<CartItem[]>(`http://localhost:8080/api/enrollment/getbycourseandstudent/${courseId}/${studentId}`)
     .subscribe((cartItems) => {
       if (cartItems) {
         this.isAlreadyBought[index] = true;
       } else {
         this.isAlreadyBought[index] = false;
       }
     });
 }

deleteFromCart(itemId: number) {
  const studentId = this.authService.currentUser?.user?.id;
  this.http.delete(`http://localhost:8080/api/cart/delete/${itemId}/${studentId}`).subscribe(() => {
    console.log('Item removed ');
    location.reload();
  }, (error) => {
    console.log('Error removing item:', error);
  });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}
