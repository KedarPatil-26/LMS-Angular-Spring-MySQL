import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class EditMaterialComponent {

courseMaterials: any[] = [];
selectedMaterialType: string = 'Video';
cId: number = 0;

 constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'instructor') {
      this.router.navigate(['/login']);
    } else if (!this.authService.currentUser.user.authorized) {
      this.router.navigate(['/unauthorized']);
    } else if (this.authService.currentUser.user.blocked) {
      this.router.navigate(['/blocked']);
    }

    const courseID = JSON.parse(sessionStorage.getItem('editMaterial') || '{}');
    console.log(courseID);
    this.cId = courseID;

    this.fetchCourseMaterials(courseID);

  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

    fetchCourseMaterials(courseID: number) {
        this.http.get(`http://localhost:8080/api/coursematerial/getbycourseid/${courseID}`)
          .subscribe((data: any) => {
            this.courseMaterials = data;
          });
      }

    addMaterial() {
        sessionStorage.setItem('addMaterial', JSON.stringify(this.cId));
        switch (this.selectedMaterialType) {
          case 'PDF':
            this.router.navigate(['/add-pdf-material']);
            break;
          case 'Video':
            this.router.navigate(['/add-video-material']);
            break;
          case 'Text':
            this.router.navigate(['/add-text-material']);
            break;
          case 'File':
            this.router.navigate(['/add-file-material']);
            break;
          case 'OCR':
            this.router.navigate(['/add-ocr-material']);
            break;
          default:
            break;
        }
      }

    editMaterial(courseMaterial: any) {
            sessionStorage.setItem('updateMaterial', JSON.stringify(courseMaterial));
            console.log(courseMaterial);
            switch(courseMaterial.materialType){
            case 'pdf':
              this.router.navigate(['/edit-pdf-material']);
              break;
            case 'video':
              this.router.navigate(['/edit-video-material']);
              break;
            case 'text':
              this.router.navigate(['/edit-text-material']);
              break;
            case 'file':
              this.router.navigate(['/edit-file-material']);
              break;
            case 'ocr':
              this.router.navigate(['/edit-text-material']);
              break;
            default:
              break;
            }
          }

      deleteMaterial(materialId: number) {
          this.http.delete('http://localhost:8080/api/coursematerial/delete/' + materialId).subscribe(() => {
            this.courseMaterials = this.courseMaterials.filter(material => material.id !== materialId);
          });
        }



}
