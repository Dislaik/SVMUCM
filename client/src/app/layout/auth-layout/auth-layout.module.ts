import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../component/component.module';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from '../../page/login/login.component';
import { RegisterComponent } from '../../page/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(AuthLayoutRoutes),
    ComponentModule,
    CommonModule
  ]
})

export class AuthLayoutModule { }
