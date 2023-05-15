import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-text-material',
  templateUrl: './edit-text-material.component.html',
  styleUrls: ['./edit-text-material.component.scss']
})
export class EditTextMaterialComponent {

title: string = '';
description: string = '';
courseMaterialId: number = 0;
fileURL: string = '';

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

ngOnInit(): void {
  console.log(this.authService.currentUser);
  if (!this.authService.currentUser || this.authService.currentUser.userType !== 'instructor') {
    this.router.navigate(['/login']);
  } else if (!this.authService.currentUser.user.authorized) {
    this.router.navigate(['/unauthorized']);
  } else if (this.authService.currentUser.user.blocked) {
        this.router.navigate(['/blocked']);
      }
  const courseMaterial = JSON.parse(sessionStorage.getItem('updateMaterial') || '{}');
  console.log(courseMaterial);
  this.courseMaterialId = courseMaterial.id;
   console.log(this.courseMaterialId);
   this.title = courseMaterial.title;
   this.description = courseMaterial.description;
   this.fileURL = courseMaterial.fileUrl;
}

submitForm() {
    const requestBody = {
      title: this.title,
      description: this.description,
    };
    this.http.put('http://localhost:8080/api/coursematerial/update/' + this.courseMaterialId, requestBody).subscribe(
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


