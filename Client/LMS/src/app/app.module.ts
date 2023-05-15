import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { StudentLandingComponent } from './student-landing/student-landing.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { InstructorLandingComponent } from './instructor-landing/instructor-landing.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './student-landing/cart/cart.component';
import { FaqComponent } from './student-landing/faq/faq.component';
import { CoursesComponent } from './student-landing/courses/courses.component';
import { WishlistComponent } from './student-landing/wishlist/wishlist.component';
import { MyCoursesComponent } from './student-landing/my-courses/my-courses.component';
import { StudentProfileComponent } from './student-landing/student-profile/student-profile.component';
import { InstructorDashboardComponent } from './instructor-landing/instructor-dashboard/instructor-dashboard.component';
import { CreateCourseComponent } from './instructor-landing/create-course/create-course.component';
import { PublishedCoursesComponent } from './instructor-landing/published-courses/published-courses.component';
import { DraftCoursesComponent } from './instructor-landing/draft-courses/draft-courses.component';
import { InstructorFaqComponent } from './instructor-landing/instructor-faq/instructor-faq.component';
import { InstructorProfileComponent } from './instructor-landing/instructor-profile/instructor-profile.component';
import { AdminDashboardComponent } from './admin-landing/admin-dashboard/admin-dashboard.component';
import { ManageStudentsComponent } from './admin-landing/manage-students/manage-students.component';
import { ManageCoursesComponent } from './admin-landing/manage-courses/manage-courses.component';
import { ManageInstructorsComponent } from './admin-landing/manage-instructors/manage-instructors.component';
import { AdminFaqComponent } from './admin-landing/admin-faq/admin-faq.component';
import { AdminProfileComponent } from './admin-landing/admin-profile/admin-profile.component';
import { RegisterComponent } from './register/register.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomepageComponent } from './homepage/homepage.component';
import { BlockedComponent } from './blocked/blocked.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { InstructorRequestsComponent } from './admin-landing/instructor-requests/instructor-requests.component';
import { CourseRequestsComponent } from './admin-landing/course-requests/course-requests.component';
import { InstructorNavbarComponent } from './instructor-navbar/instructor-navbar.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ManageCategoriesComponent } from './admin-landing/manage-categories/manage-categories.component';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { EditCourseComponent } from './instructor-landing/edit-course/edit-course.component';
import { EditMaterialComponent } from './instructor-landing/edit-material/edit-material.component';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddPdfMaterialComponent } from './instructor-landing/add-pdf-material/add-pdf-material.component';
import { AddVideoMaterialComponent } from './instructor-landing/add-video-material/add-video-material.component';
import { AddTextMaterialComponent } from './instructor-landing/add-text-material/add-text-material.component';
import { AddFileMaterialComponent } from './instructor-landing/add-file-material/add-file-material.component';
import { AddOcrMaterialComponent } from './instructor-landing/add-ocr-material/add-ocr-material.component';
import { EditPdfMaterialComponent } from './instructor-landing/edit-pdf-material/edit-pdf-material.component';
import { EditVideoMaterialComponent } from './instructor-landing/edit-video-material/edit-video-material.component';
import { EditTextMaterialComponent } from './instructor-landing/edit-text-material/edit-text-material.component';
import { EditFileMaterialComponent } from './instructor-landing/edit-file-material/edit-file-material.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseDetailsComponent } from './student-landing/course-details/course-details.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CoursesCategoryComponent } from './student-landing/courses-category/courses-category.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    StudentLandingComponent,
    AdminLandingComponent,
    InstructorLandingComponent,
    LoginComponent,
    CartComponent,
    FaqComponent,
    CoursesComponent,
    WishlistComponent,
    MyCoursesComponent,
    StudentProfileComponent,
    InstructorDashboardComponent,
    CreateCourseComponent,
    PublishedCoursesComponent,
    DraftCoursesComponent,
    InstructorFaqComponent,
    InstructorProfileComponent,
    AdminDashboardComponent,
    ManageStudentsComponent,
    ManageCoursesComponent,
    ManageInstructorsComponent,
    AdminFaqComponent,
    AdminProfileComponent,
    RegisterComponent,
    HomepageComponent,
    BlockedComponent,
    UnauthorizedComponent,
    InstructorRequestsComponent,
    CourseRequestsComponent,
    InstructorNavbarComponent,
    StudentNavbarComponent,
    AdminNavbarComponent,
    ManageCategoriesComponent,
    EditCourseComponent,
    EditMaterialComponent,
    AddPdfMaterialComponent,
    AddVideoMaterialComponent,
    AddTextMaterialComponent,
    AddFileMaterialComponent,
    AddOcrMaterialComponent,
    EditPdfMaterialComponent,
    EditVideoMaterialComponent,
    EditTextMaterialComponent,
    EditFileMaterialComponent,
    CourseDetailsComponent,
    ViewCourseComponent,
    CoursesCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
