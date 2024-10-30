import { Component, OnInit } from '@angular/core';
import { Project } from '../architecture/model/project';
import { Utils } from '../utils';
import { Router } from '@angular/router';
import { ProjectService } from '../architecture/service/project.service';

@Component({
  selector: 'app-manage-project',
  standalone: false,
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.css'
})
export class ManageProjectComponent implements OnInit{
  title: string = "Proyectos";
  pages: string;

  projects: Project[]

  pagination: number;
  paginationShowProjects: Project[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();


    this.pagination = 1;
    this.projects = await this.projectService.getAll();
    console.log(this.projects)
    this.showPage(this.projects, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.projects, 10)
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

  // async getAllRoles(): Promise<void> {
  //   const roles = await this.roleService.getAll();

  //   if (roles.ok) {
  //     this.roles = roles.message;
  //   } else {
  //     console.log(roles.error)
  //   }
  // }

  ngOnUserDetails(user): void {
    console.log(user.value.id);
    //this.router.navigate(['/user', user.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.projects, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.projects, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.projects, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: Project[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowProjects = list.slice(start, end);
    this.paginationLengh = this.paginationShowProjects.length;
  }

  getTotalPages(p1: Project[], p2: number): number {
    return Math.ceil(p1.length / p2);
  }

  createRange(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  UTCToChileTime(p1: string): string {
    return Utils.convertToChileTime(p1);
  }

}