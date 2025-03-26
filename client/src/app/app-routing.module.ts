import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PanelLayoutComponent } from './layout/panel-layout/panel-layout.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { onlyStaffGuard } from './architecture/guard/only-staff.guard';

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layout/main-layout/main-layout.module").then(m => m.MainLayoutModule)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layout/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: "panel",
    component: PanelLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layout/panel-layout/panel-layout.module").then(m => m.PanelLayoutModule),
      }
    ],
    canActivate: [onlyStaffGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }