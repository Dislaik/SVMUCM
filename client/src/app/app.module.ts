import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "./component/navbar/navbar.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './architecture/interceptor/auth.interceptor';
import { RestrictedModelRequestCourseComponent } from './component/restricted-model-request-course/restricted-model-request-course.component';
import { FooterComponent } from "./component/footer/footer.component";
import { RequestProjectComponent } from './request-project/request-project.component';
import { PanelComponent } from './panel/panel.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageComponent } from './manage/manage.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageResourceComponent } from './manage-resource/manage-resource.component';
import { ProjectComponent } from './project/project.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageRoleDetailsComponent } from './manage-role-details/manage-role-details.component';
import { ManageStudentVolunteerComponent } from './manage-student-volunteer/manage-student-volunteer.component';
import { ManageStudentVolunteerDetailsComponent } from './manage-student-volunteer-details/manage-student-volunteer-details.component';
import { ManageHeadquarterComponent } from './manage-headquarter/manage-headquarter.component';
import { ManageHeadquarterDetailsComponent } from './manage-headquarter-details/manage-headquarter-details.component';
import { ManageFacultyDetailsComponent } from './manage-faculty-details/manage-faculty-details.component';
import { ManageFacultyComponent } from './manage-faculty/manage-faculty.component';
import { ManageCareerComponent } from './manage-career/manage-career.component';
import { ManageCareerDetailsComponent } from './manage-career-details/manage-career-details.component';
import { ManageProjectDetailsComponent } from './manage-project-details/manage-project-details.component';
import { ManageAPUComponent } from './manage-apu/manage-apu.component';
import { ManageAPUDetailsComponent } from './manage-apu-details/manage-apu-details.component';
import { ManageResourceDetailsComponent } from './manage-resource-details/manage-resource-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    RequestProjectComponent,
    ProjectComponent,
    NavbarComponent,
    RestrictedModelRequestCourseComponent,
    FooterComponent,
    PanelComponent,
    ManageComponent,
    ManageUserComponent,
    ManageUserDetailsComponent,
    ManageRoleComponent,
    ManageRoleDetailsComponent,
    ManageStudentVolunteerComponent,
    ManageStudentVolunteerDetailsComponent,
    ManageHeadquarterComponent,
    ManageHeadquarterDetailsComponent,
    ManageFacultyComponent,
    ManageFacultyDetailsComponent,
    ManageCareerComponent,
    ManageCareerDetailsComponent,
    ManageProjectComponent,
    ManageProjectDetailsComponent,
    ManageAPUComponent,
    ManageAPUDetailsComponent,
    ManageResourceComponent,
    ManageResourceDetailsComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    SweetAlert2Module.forRoot(),
],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
