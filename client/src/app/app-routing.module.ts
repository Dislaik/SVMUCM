import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './architecture/guard/auth.guard';
import { CourseComponent } from './course/course.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent},
  {path: 'courses', component: CourseComponent},
  {path: 'request', component: RequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }