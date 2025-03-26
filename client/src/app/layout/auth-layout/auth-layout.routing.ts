import { Routes } from "@angular/router";
import { LoginComponent } from "../../page/login/login.component";
import { RegisterComponent } from "../../page/register/register.component";
import { noAuthGuard } from "../../architecture/guard/no-auth.guard";

export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] }
];