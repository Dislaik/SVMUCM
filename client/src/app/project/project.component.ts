import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../architecture/model/project';
import { ProjectService } from '../architecture/service/project.service';
import { Utils } from '../utils';
import { UserService } from '../architecture/service/user.service';
import { User } from '../architecture/model/user';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  title: string = "Mis proyectos";
  pages: string;

  user: User;
  projects: Project[];

  pagination: number;
  paginationShowProjects: Project[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService
  ){}

  ngOnInit(): void {
    this.createBreadCrumb();

    this.getAllProjectsByUser(() => {
      console.log(this.projects)
      this.pagination = 1;
      this.showPage(this.projects, this.pagination, 10)
      this.paginationMax = this.getTotalPages(this.projects, 10)
      this.paginationList = this.createRange(this.paginationMax);
    });

    
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getAllProjectsByUser(cb: any): Promise<void> {
    const resultUser = await this.userService.getByUsername(Utils.getUsernameByBrowser());
    if (resultUser.ok) {
      this.user = resultUser.message;
  
      const resultProjects = await this.projectService.getByUserId(this.user.id);

      if (resultProjects.ok) {
        this.projects = resultProjects.message

        cb()
      } else {
        console.log(resultProjects.error)
      }
    } else {
      console.log(resultUser.error)
    }

  }

  ngOnProjectDetails(project): void {
    console.log(project.value.id);
    //this.router.navigate([this.router.url + '/', project.value.id]);
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

  UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }
}
