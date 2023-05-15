import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';

interface User {
  userType: 'admin' | 'instructor' | 'student';
  user: {
  id: number;
  name: string;
  email: string;
  password: string;
  authorized: boolean;
  blocked: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // replace with your API URL
  currentUser: User | null = null;
    currentUserChanged: EventEmitter<User | null> = new EventEmitter<User | null>();

  constructor(private http: HttpClient) {
    // Retrieve the user's information from storage when the application starts up
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  login(email: string, password: string): Observable<User | null> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post<User>(url, body).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      }),
      map(user => {
        // Store the user's information in storage when the user logs in
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          this.currentUserChanged.emit(user); // emit the updated currentUser value
        }
        return user;
      })
    );
  }

  logout(): void {
    // Remove the user's information from storage when the user logs out
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }

}
