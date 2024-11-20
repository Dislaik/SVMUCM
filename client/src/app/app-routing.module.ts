import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './architecture/guard/auth.guard';
import { RequestProjectComponent } from './request-project/request-project.component';
import { requestProjectGuard } from './architecture/guard/request-project.guard';
import { PanelComponent } from './panel/panel.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageComponent } from './manage/manage.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageResourceComponent } from './manage-resource/manage-resource.component';
import { ProjectComponent } from './project/project.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageRoleDetailsComponent } from './manage-role-details/manage-role-details.component';
import { ManageStudentVolunteerComponent } from './manage-student-volunteer/manage-student-volunteer.component';
import { ManageStudentVolunteerDetailsComponent } from './manage-student-volunteer-details/manage-student-volunteer-details.component';
import { ManageHeadquarterComponent } from './manage-headquarter/manage-headquarter.component';
import { ManageHeadquarterDetailsComponent } from './manage-headquarter-details/manage-headquarter-details.component';
import { ManageFacultyComponent } from './manage-faculty/manage-faculty.component';
import { ManageFacultyDetailsComponent } from './manage-faculty-details/manage-faculty-details.component';
import { ManageCareerComponent } from './manage-career/manage-career.component';
import { ManageCareerDetailsComponent } from './manage-career-details/manage-career-details.component';
import { ManageProjectDetailsComponent } from './manage-project-details/manage-project-details.component';
import { ManageAPUComponent } from './manage-apu/manage-apu.component';
import { ManageAPUDetailsComponent } from './manage-apu-details/manage-apu-details.component';
import { ManageResourceDetailsComponent } from './manage-resource-details/manage-resource-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageQuotationComponent } from './manage-quotation/manage-quotation.component';
import { ManageQuotationDetailsComponent } from './manage-quotation-details/manage-quotation-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'my-profile' , component: UserProfileComponent},
  {path: 'request-project', component: RequestProjectComponent, canActivate: [requestProjectGuard]},
  {path: 'project', component: ProjectComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'panel/manage', component: ManageComponent},
  {path: 'panel/manage/user', component: ManageUserComponent},
  {path: 'panel/manage/user/:id', component: ManageUserDetailsComponent},
  {path: 'panel/manage/role', component: ManageRoleComponent},
  {path: 'panel/manage/role/:id', component: ManageRoleDetailsComponent},
  {path: 'panel/manage/student-volunteer', component: ManageStudentVolunteerComponent},
  {path: 'panel/manage/student-volunteer/:id', component: ManageStudentVolunteerDetailsComponent},
  {path: 'panel/manage/headquarter', component: ManageHeadquarterComponent},
  {path: 'panel/manage/headquarter/:id', component: ManageHeadquarterDetailsComponent},
  {path: 'panel/manage/faculty', component: ManageFacultyComponent},
  {path: 'panel/manage/faculty/:id', component: ManageFacultyDetailsComponent},
  {path: 'panel/manage/career', component: ManageCareerComponent},
  {path: 'panel/manage/career/:id', component: ManageCareerDetailsComponent},
  {path: 'panel/manage/project', component: ManageProjectComponent},
  {path: 'panel/manage/project/:id', component: ManageProjectDetailsComponent},
  {path: 'panel/manage/project', component: ManageProjectComponent},
  {path: 'panel/manage/project/:id', component: ManageProjectDetailsComponent},
  {path: 'panel/manage/apu', component: ManageAPUComponent},
  {path: 'panel/manage/apu/:id', component: ManageAPUDetailsComponent},
  {path: 'panel/manage/resource', component: ManageResourceComponent},
  {path: 'panel/manage/resource/:id', component: ManageResourceDetailsComponent},
  {path: 'panel/manage/quotation', component: ManageQuotationComponent},
  {path: 'panel/manage/quotation/:id', component: ManageQuotationDetailsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }