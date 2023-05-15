import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-add-ocr-material',
  templateUrl: './add-ocr-material.component.html',
  styleUrls: ['./add-ocr-material.component.scss']
})
export class AddOcrMaterialComponent {

  title: string = '';
  description: string = '';
  cId: number = 0;
  text: string = '';
  loading: boolean = false;

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
          materialType: 'ocr',
          fileUrl: '',
          sequenceNumber: ''
        };
        this.http.post('http://localhost:8080/api/coursematerial/add', requestBody).subscribe(
          data => console.log(data),
          error => console.error(error)
        );
        setTimeout(() => {
              this.router.navigate(['/edit-material']);
            }, 500);
      }

      logout() {
        this.authService.logout();
        this.router.navigate(['/homepage']);
      }

async ocrImage(imageUrl: string): Promise<string> {
    const result = await Tesseract.recognize(imageUrl);
    return result.data.text;
  }

  onImageSelected(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      const text = await this.ocrImage(imageUrl);
      console.log(text); // do something with the text
      this.loading = false;
      this.description = text;
      console.log("This is Description");
      console.log(this.description);
    };
    reader.readAsDataURL(file);
  }
}


