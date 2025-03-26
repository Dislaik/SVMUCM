import { Routes } from "@angular/router";
import { PanelComponent } from "../../page/panel/panel.component";
import { ManageUserComponent } from "../../page/manage-user/manage-user.component";
import { ManageUserDetailsComponent } from "../../page/manage-user-details/manage-user-details.component";
import { ManageRoleComponent } from "../../page/manage-role/manage-role.component";
import { ManageRoleDetailsComponent } from "../../page/manage-role-details/manage-role-details.component";
import { ManageVolunteerStudentComponent } from "../../page/manage-volunteer-student/manage-volunteer-student.component";
import { ManageVolunteerStudentDetailsComponent } from "../../page/manage-volunteer-student-details/manage-volunteer-student-details.component";
import { ManageHeadquarterComponent } from "../../page/manage-headquarter/manage-headquarter.component";
import { ManageHeadquarterDetailsComponent } from "../../page/manage-headquarter-details/manage-headquarter-details.component";
import { ManageFacultyComponent } from "../../page/manage-faculty/manage-faculty.component";
import { ManageFacultyDetailsComponent } from "../../page/manage-faculty-details/manage-faculty-details.component";
import { ManageCareerComponent } from "../../page/manage-career/manage-career.component";
import { ManageCareerDetailsComponent } from "../../page/manage-career-details/manage-career-details.component";
import { ManageProjectComponent } from "../../page/manage-project/manage-project.component";
import { ManageProjectDetailsComponent } from "../../page/manage-project-details/manage-project-details.component";
import { ManageAPUComponent } from "../../page/manage-apu/manage-apu.component";
import { ManageAPUDetailsComponent } from "../../page/manage-apu-details/manage-apu-details.component";
import { ManageResourceComponent } from "../../page/manage-resource/manage-resource.component";
import { ManageResourceDetailsComponent } from "../../page/manage-resource-details/manage-resource-details.component";
import { ManageQuotationComponent } from "../../page/manage-quotation/manage-quotation.component";
import { ManageQuotationDetailsComponent } from "../../page/manage-quotation-details/manage-quotation-details.component";
import { ManageRegionComponent } from "../../page/manage-region/manage-region.component";
import { ManageRegionDetailsComponent } from "../../page/manage-region-details/manage-region-details.component";
import { ManageCityComponent } from "../../page/manage-city/manage-city.component";
import { ManageCityDetailsComponent } from "../../page/manage-city-details/manage-city-details.component";

export const PanelLayoutRoutes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'user', component: ManageUserComponent },
  { path: 'user/:id', component: ManageUserDetailsComponent },
  { path: 'role', component: ManageRoleComponent },
  { path: 'role/:id', component: ManageRoleDetailsComponent },
  { path: 'volunteer-student', component: ManageVolunteerStudentComponent },
  { path: 'volunteer-student/:id', component: ManageVolunteerStudentDetailsComponent },
  { path: 'headquarter', component: ManageHeadquarterComponent },
  { path: 'headquarter/:id', component: ManageHeadquarterDetailsComponent },
  { path: 'faculty', component: ManageFacultyComponent },
  { path: 'faculty/:id', component: ManageFacultyDetailsComponent },
  { path: 'career', component: ManageCareerComponent },
  { path: 'career/:id', component: ManageCareerDetailsComponent },
  { path: 'project', component: ManageProjectComponent },
  { path: 'project/:id', component: ManageProjectDetailsComponent },
  { path: 'apu', component: ManageAPUComponent },
  { path: 'apu/:id', component: ManageAPUDetailsComponent },
  { path: 'resource', component: ManageResourceComponent },
  { path: 'resource/:id', component: ManageResourceDetailsComponent },
  { path: 'quotation', component: ManageQuotationComponent },
  { path: 'quotation/:id', component: ManageQuotationDetailsComponent },
  { path: 'region', component: ManageRegionComponent },
  { path: 'region/:id', component: ManageRegionDetailsComponent },
  { path: 'city', component: ManageCityComponent },
  { path: 'city/:id', component: ManageCityDetailsComponent }
];