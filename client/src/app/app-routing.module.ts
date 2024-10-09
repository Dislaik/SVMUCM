import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './architecture/guard/auth.guard';
import { CourseComponent } from './course/course.component';
import { RequestCourseComponent } from './request-course/request-course.component';
import { requestCourseGuard } from './architecture/guard/request-course.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'request-course', component: RequestCourseComponent, canActivate: [requestCourseGuard]},
  {path: '', component: HomeComponent},
  {path: 'courses', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }