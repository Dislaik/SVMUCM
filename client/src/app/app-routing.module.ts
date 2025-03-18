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
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageResourceComponent } from './manage-resource/manage-resource.component';
import { ProjectComponent } from './project/project.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageRoleDetailsComponent } from './manage-role-details/manage-role-details.component';
import { ManageVolunteerStudentComponent } from './manage-volunteer-student/manage-volunteer-student.component';
import { ManageVolunteerStudentDetailsComponent } from './manage-volunteer-student-details/manage-volunteer-student-details.component';
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
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { roleGuard } from './architecture/guard/role.guard';
import { projectGuard } from './architecture/guard/project.guard';
import { ManageRegionComponent } from './manage-region/manage-region.component';
import { ManageRegionDetailsComponent } from './manage-region-details/manage-region-details.component';
import { ManageCityComponent } from './manage-city/manage-city.component';
import { ManageCityDetailsComponent } from './manage-city-details/manage-city-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile' , component: UserProfileComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor', 'community']}},
  {path: 'request-project', component: RequestProjectComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor', 'community']}},
  {path: 'project', component: ProjectComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor', 'community']}},
  {path: 'project/:id', component: ProjectDetailsComponent, canActivate: [roleGuard, projectGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor', 'community']}},
  {path: 'panel', component: PanelComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/user', component: ManageUserComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/user/:id', component: ManageUserDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/role', component: ManageRoleComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/role/:id', component: ManageRoleDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/volunteer-student', component: ManageVolunteerStudentComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/volunteer-student/:id', component: ManageVolunteerStudentDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/headquarter', component: ManageHeadquarterComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/headquarter/:id', component: ManageHeadquarterDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/faculty', component: ManageFacultyComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/faculty/:id', component: ManageFacultyDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/career', component: ManageCareerComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/career/:id', component: ManageCareerDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/project', component: ManageProjectComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/project/:id', component: ManageProjectDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/project', component: ManageProjectComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/project/:id', component: ManageProjectDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/apu', component: ManageAPUComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/apu/:id', component: ManageAPUDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/resource', component: ManageResourceComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/resource/:id', component: ManageResourceDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/quotation', component: ManageQuotationComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/quotation/:id', component: ManageQuotationDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/region', component: ManageRegionComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/region/:id', component: ManageRegionDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/city', component: ManageCityComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  {path: 'panel/city/:id', component: ManageCityDetailsComponent, canActivate: [roleGuard], data: { roles: [ 'admin', 'externalrelationscoordinator', 'externalrelations', 'dean', 'careerdirector', 'professor']}},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }