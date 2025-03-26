import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutes } from './main-layout.routing';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../component/component.module';
import { HomeComponent } from '../../page/home/home.component';
import { RequestProjectComponent } from '../../page/request-project/request-project.component';
import { ProjectComponent } from '../../page/project/project.component';
import { ProjectDetailsComponent } from '../../page/project-details/project-details.component';
import { UserProfileComponent } from '../../page/user-profile/user-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    RequestProjectComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    UserProfileComponent
  ],
  imports: [
    RouterModule.forChild(MainLayoutRoutes),
    ComponentModule,
    CommonModule
  ]
})

export class MainLayoutModule { }
