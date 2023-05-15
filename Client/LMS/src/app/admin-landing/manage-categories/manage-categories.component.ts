import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent {

newCategoryName: string = '';
  categories: Category[] = [];

constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Check if the user is logged in and has the correct user type
    if (!this.authService.currentUser || this.authService.currentUser.userType !== 'admin') {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
    }
    this.loadCategories();
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/homepage']);
    }

loadCategories(): void {
    this.http.get<Category[]>('http://localhost:8080/api/coursecategories/getall').subscribe(categories => {
      this.categories = categories;
    });
  }

  addCategory(): void {
    if (!this.newCategoryName) {
      return;
    }
    const category = { name: this.newCategoryName };
    this.http.post<Category>('http://localhost:8080/api/coursecategories/add', category).subscribe(newCategory => {
      this.categories.push(newCategory);
      this.newCategoryName = '';
      location.reload();
    });
  }

  deleteCategory(categoryId: number): void {
    this.http.delete(`http://localhost:8080/api/coursecategories/delete/${categoryId}`).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== categoryId);
    });
  }

}

