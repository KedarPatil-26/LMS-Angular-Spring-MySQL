import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { StudentLandingComponent } from './student-landing/student-landing.component';
import { CartComponent } from './student-landing/cart/cart.component';
import { CoursesComponent } from './student-landing/courses/courses.component';
import { FaqComponent } from './student-landing/faq/faq.component';
import { WishlistComponent } from './student-landing/wishlist/wishlist.component';
import { StudentProfileComponent } from './student-landing/student-profile/student-profile.component';
import { MyCoursesComponent } from './student-landing/my-courses/my-courses.component';
import { InstructorLandingComponent } from './instructor-landing/instructor-landing.component';
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
import { HomepageComponent } from './homepage/homepage.component';
import { BlockedComponent } from './blocked/blocked.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InstructorRequestsComponent } from './admin-landing/instructor-requests/instructor-requests.component';
import { CourseRequestsComponent } from './admin-landing/course-requests/course-requests.component';
import { AuthGuard } from './services/auth.guard';
import { ManageCategoriesComponent } from './admin-landing/manage-categories/manage-categories.component';
import { EditCourseComponent } from './instructor-landing/edit-course/edit-course.component';
import { EditMaterialComponent } from './instructor-landing/edit-material/edit-material.component';
import { AddPdfMaterialComponent } from './instructor-landing/add-pdf-material/add-pdf-material.component';
import { AddVideoMaterialComponent } from './instructor-landing/add-video-material/add-video-material.component';
import { AddTextMaterialComponent } from './instructor-landing/add-text-material/add-text-material.component';
import { AddFileMaterialComponent } from './instructor-landing/add-file-material/add-file-material.component';
import { AddOcrMaterialComponent } from './instructor-landing/add-ocr-material/add-ocr-material.component';
import { EditPdfMaterialComponent } from './instructor-landing/edit-pdf-material/edit-pdf-material.component';
import { EditVideoMaterialComponent } from './instructor-landing/edit-video-material/edit-video-material.component';
import { EditTextMaterialComponent } from './instructor-landing/edit-text-material/edit-text-material.component';
import { EditFileMaterialComponent } from './instructor-landing/edit-file-material/edit-file-material.component';
import { CourseDetailsComponent } from './student-landing/course-details/course-details.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CoursesCategoryComponent } from './student-landing/courses-category/courses-category.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blocked', component: BlockedComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'view-course', component: ViewCourseComponent },

  { path: 'app-admin-landing', component: AdminLandingComponent, canActivate: [AuthGuard], data: { expectedUserType: 'admin' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: 'manage-students', component: ManageStudentsComponent },
   { path: 'manage-courses', component: ManageCoursesComponent },
   { path: 'manage-instructors', component: ManageInstructorsComponent },
   { path: 'manage-categories', component: ManageCategoriesComponent },
   { path: 'admin-faq', component: AdminFaqComponent },
   { path: 'admin-profile', component: AdminProfileComponent },
   { path: 'instructor-requests', component: InstructorRequestsComponent },
    { path: 'course-requests', component: CourseRequestsComponent },

  { path: 'app-student-landing', component: StudentLandingComponent, canActivate: [AuthGuard], data: { expectedUserType: 'student' } },
  { path: 'cart', component: CartComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'course-details', component: CourseDetailsComponent },
  { path: 'courses-category', component: CoursesCategoryComponent },

  { path: 'app-instructor-landing', component: InstructorLandingComponent, canActivate: [AuthGuard], data: { expectedUserType: 'instructor' } },
   { path: 'create-course', component: CreateCourseComponent },
    { path: 'published-courses', component: PublishedCoursesComponent },
    { path: 'draft-courses', component: DraftCoursesComponent },
    { path: 'edit-course', component: EditCourseComponent },
    { path: 'instructor-faq', component: InstructorFaqComponent },
    { path: 'instructor-profile', component: InstructorProfileComponent },
    { path: 'instructor-dashboard', component: InstructorDashboardComponent },
    { path: 'edit-material', component: EditMaterialComponent },
    { path: 'add-pdf-material', component: AddPdfMaterialComponent },
    { path: 'add-video-material', component: AddVideoMaterialComponent },
    { path: 'add-text-material', component: AddTextMaterialComponent },
    { path: 'add-file-material', component: AddFileMaterialComponent },
    { path: 'add-ocr-material', component: AddOcrMaterialComponent },
    { path: 'edit-pdf-material', component: EditPdfMaterialComponent },
    { path: 'edit-video-material', component: EditVideoMaterialComponent },
    { path: 'edit-text-material', component: EditTextMaterialComponent },
    { path: 'edit-file-material', component: EditFileMaterialComponent },

    { path: 'homepage', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
