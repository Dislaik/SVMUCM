import { Routes } from "@angular/router";
import { HomeComponent } from "../../page/home/home.component";
import { RequestProjectComponent } from "../../page/request-project/request-project.component";
import { ProjectComponent } from "../../page/project/project.component";
import { ProjectDetailsComponent } from "../../page/project-details/project-details.component";
import { authGuard } from "../../architecture/guard/auth.guard";
import { UserProfileComponent } from "../../page/user-profile/user-profile.component";
import { ownProjectGuard } from "../../architecture/guard/own-project.guard";

export const MainLayoutRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'request-project', component: RequestProjectComponent, canActivate: [authGuard]},
  { path: 'project', component: ProjectComponent, canActivate: [authGuard] },
  { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [authGuard, ownProjectGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
];