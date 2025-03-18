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
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageResourceComponent } from './manage-resource/manage-resource.component';
import { ProjectComponent } from './project/project.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageRoleDetailsComponent } from './manage-role-details/manage-role-details.component';
import { ManageVolunteerStudentComponent } from './manage-volunteer-student/manage-volunteer-student.component';
import { ManageVolunteerStudentDetailsComponent } from './manage-volunteer-student-details/manage-volunteer-student-details.component';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ManageQuotationComponent } from './manage-quotation/manage-quotation.component';
import { ManageQuotationDetailsComponent } from './manage-quotation-details/manage-quotation-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ManageRegionDetailsComponent } from './manage-region-details/manage-region-details.component';
import { ManageRegionComponent } from './manage-region/manage-region.component';
import { ManageCityComponent } from './manage-city/manage-city.component';
import { ManageCityDetailsComponent } from './manage-city-details/manage-city-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    RequestProjectComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    NavbarComponent,
    RestrictedModelRequestCourseComponent,
    FooterComponent,
    PanelComponent,
    ManageUserComponent,
    ManageUserDetailsComponent,
    ManageRoleComponent,
    ManageRoleDetailsComponent,
    ManageVolunteerStudentComponent,
    ManageVolunteerStudentDetailsComponent,
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
    ManageQuotationComponent,
    ManageQuotationDetailsComponent,
    ManageRegionComponent,
    ManageRegionDetailsComponent,
    ManageCityComponent,
    ManageCityDetailsComponent,
    BreadcrumbComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
