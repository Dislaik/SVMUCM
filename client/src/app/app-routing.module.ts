import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './architecture/guard/auth.guard';
import { CourseComponent } from './course/course.component';
import { RequestProjectComponent } from './request-project/request-project.component';
import { requestProjectGuard } from './architecture/guard/request-project.guard';
import { CourseSearchComponent } from './course-search/course-search.component';
import { PanelComponent } from './panel/panel.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageComponent } from './manage/manage.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageResourceComponent } from './manage-resource/manage-resource.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile' , component: UserProfileComponent},
  {path: 'settings', component: UserSettingComponent},
  {path: 'request-project', component: RequestProjectComponent, canActivate: [requestProjectGuard]},
  {path: 'project', component: ProjectComponent},
  {path: 'course/search', component: CourseSearchComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'panel/manage', component: ManageComponent},
  {path: 'panel/manage/user', component: ManageUserComponent},
  {path: 'panel/manage/role', component: ManageRoleComponent},
  {path: 'panel/manage/project', component: ManageProjectComponent},
  {path: 'panel/manage/activity', component: ManageActivityComponent},
  {path: 'panel/manage/resource', component: ManageResourceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }