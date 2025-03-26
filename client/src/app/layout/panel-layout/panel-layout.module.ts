import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../component/component.module';
import { PanelLayoutRoutes } from './panel-layout.routing';
import { PanelComponent } from '../../page/panel/panel.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ManageUserComponent } from '../../page/manage-user/manage-user.component';
import { ManageUserDetailsComponent } from '../../page/manage-user-details/manage-user-details.component';
import { ManageRoleComponent } from '../../page/manage-role/manage-role.component';
import { ManageRoleDetailsComponent } from '../../page/manage-role-details/manage-role-details.component';
import { ManageVolunteerStudentComponent } from '../../page/manage-volunteer-student/manage-volunteer-student.component';
import { ManageVolunteerStudentDetailsComponent } from '../../page/manage-volunteer-student-details/manage-volunteer-student-details.component';
import { ManageHeadquarterComponent } from '../../page/manage-headquarter/manage-headquarter.component';
import { ManageHeadquarterDetailsComponent } from '../../page/manage-headquarter-details/manage-headquarter-details.component';
import { ManageFacultyComponent } from '../../page/manage-faculty/manage-faculty.component';
import { ManageFacultyDetailsComponent } from '../../page/manage-faculty-details/manage-faculty-details.component';
import { ManageCareerComponent } from '../../page/manage-career/manage-career.component';
import { ManageCareerDetailsComponent } from '../../page/manage-career-details/manage-career-details.component';
import { ManageProjectComponent } from '../../page/manage-project/manage-project.component';
import { ManageProjectDetailsComponent } from '../../page/manage-project-details/manage-project-details.component';
import { ManageAPUComponent } from '../../page/manage-apu/manage-apu.component';
import { ManageAPUDetailsComponent } from '../../page/manage-apu-details/manage-apu-details.component';
import { ManageResourceComponent } from '../../page/manage-resource/manage-resource.component';
import { ManageResourceDetailsComponent } from '../../page/manage-resource-details/manage-resource-details.component';
import { ManageQuotationComponent } from '../../page/manage-quotation/manage-quotation.component';
import { ManageQuotationDetailsComponent } from '../../page/manage-quotation-details/manage-quotation-details.component';
import { ManageRegionComponent } from '../../page/manage-region/manage-region.component';
import { ManageRegionDetailsComponent } from '../../page/manage-region-details/manage-region-details.component';
import { ManageCityComponent } from '../../page/manage-city/manage-city.component';
import { ManageCityDetailsComponent } from '../../page/manage-city-details/manage-city-details.component';

@NgModule({
  declarations: [
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
    ManageCityDetailsComponent
  ],
  imports: [
    RouterModule.forChild(PanelLayoutRoutes),
    ComponentModule,
    CommonModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
  ]
})

export class PanelLayoutModule { }
