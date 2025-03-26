import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RestrictedModelRequestCourseComponent } from './restricted-model-request-course/restricted-model-request-course.component';

@NgModule({
  declarations: [
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    RestrictedModelRequestCourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    RestrictedModelRequestCourseComponent
  ]
})
export class ComponentModule { }
