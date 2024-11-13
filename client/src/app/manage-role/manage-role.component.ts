import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../architecture/model/role';
import { Utils } from '../utils';
import { RoleService } from '../architecture/service/role.service';

@Component({
  selector: 'app-manage-role',
  standalone: false,
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.css'
})
export class ManageRoleComponent implements OnInit {
  title: string = "Roles";
  pages: string;
  roles: Role[];


  pagination: number;
  paginationShowRoles: Role[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private roleService: RoleService
  ){}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    await this.getAllRoles();

    this.pagination = 1;
    this.showPage(this.roles, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.roles, 10)
    this.paginationList = this.createRange(this.paginationMax);
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getAllRoles(): Promise<void> {
    const roles = await this.roleService.getAll();

    if (roles.ok) {
      this.roles = roles.message
    } else {
      console.log(roles.error)
    }
  }

  ngOnRoleDetails(role): void {
    console.log(role.value.id);
    this.router.navigate([this.router.url + '/', role.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.roles, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.roles, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.roles, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: Role[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowRoles = list.slice(start, end);
    this.paginationLengh = this.paginationShowRoles.length;
  }

  getTotalPages(p1: Role[], p2: number): number {
    return Math.ceil(p1.length / p2);
  }

  createRange(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }


}
