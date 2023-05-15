import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-text-material',
  templateUrl: './add-text-material.component.html',
  styleUrls: ['./add-text-material.component.scss']
})
export class AddTextMaterialComponent {
  title: string = '';
  description: string = '';
  cId: number = 0;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {  }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'instructor') {
      this.router.navigate(['/login']);
    } else if (!this.authService.currentUser.user.authorized) {
      this.router.navigate(['/unauthorized']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }
    const courseID = JSON.parse(sessionStorage.getItem('addMaterial') || '{}');
        console.log(courseID);
        this.cId = courseID;
        console.log(this.cId);
  }

  submitForm() {
    const requestBody = {
      title: this.title,
      description: this.description,
      courseId: this.cId,
      materialType: 'text',
      fileUrl: '',
      sequenceNumber: ''
    };
    this.http.post('http://localhost:8080/api/coursematerial/add', requestBody).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
    this.router.navigate(['/edit-material']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}
