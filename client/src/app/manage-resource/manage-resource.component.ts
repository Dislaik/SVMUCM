import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectResource } from '../architecture/model/project-resource';
import { ProjectResourceService } from '../architecture/service/project-resource.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-manage-resource',
  standalone: false,
  templateUrl: './manage-resource.component.html',
  styleUrl: './manage-resource.component.css'
})
export class ManageResourceComponent implements OnInit{
  title: string = "Recursos";
  pages: string;
  projectResources: ProjectResource[];


  pagination: number;
  paginationShowProjectResources: ProjectResource[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private projectResourceService: ProjectResourceService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    await this.getAllProjectResources();

    this.pagination = 1;
    console.log(this.projectResources)
    this.showPage(this.projectResources, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.projectResources, 10)
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

  async getAllProjectResources(): Promise<void> {
    const projectResources = await this.projectResourceService.getAll();

    if (projectResources.ok) {
      this.projectResources = projectResources.message
    } else {
      console.log(projectResources.error)
    }
  }

  
  ngOnProjectResourceDetails(projectResource): void {
    console.log(projectResource.value.id);
    //this.router.navigate(['/role', user.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.projectResources, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.projectResources, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.projectResources, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: ProjectResource[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowProjectResources = list.slice(start, end);
    this.paginationLengh = this.paginationShowProjectResources.length;
  }

  getTotalPages(p1: ProjectResource[], p2: number): number {
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
