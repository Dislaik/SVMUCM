import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../architecture/model/role';
import { RoleService } from '../architecture/service/role.service';

@Component({
  selector: 'app-manage-role-details',
  standalone: false,
  templateUrl: './manage-role-details.component.html',
  styleUrl: './manage-role-details.component.css'
})
export class ManageRoleDetailsComponent implements OnInit {
  title: string = "Detalles del rol";
  id: number;
  pages: string;

  role: Role;
  isRoleLoaded: boolean = false;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getRole();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Roles', url: '/panel/manage/role'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getRole(): Promise<void> {
    const result = await this.roleService.getById(this.id);
    console.log(result)
    if (result.ok) {
      this.role = result.message;
      this.isRoleLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnEditRole(): void {
    console.log("Edit role")
  }

}
