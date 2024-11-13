import { Component, OnInit } from '@angular/core';
import { Resource } from '../architecture/model/resource';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../architecture/service/resource.service';

@Component({
  selector: 'app-manage-resource-details',
  standalone: false,
  templateUrl: './manage-resource-details.component.html',
  styleUrl: './manage-resource-details.component.css'
})
export class ManageResourceDetailsComponent implements OnInit {
  title: string = "Detalles del recurso";
  id: number;
  pages: string;

  resource: Resource;
  isResourceLoaded: boolean = false;

  constructor(
    private router: Router,
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getResource();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Recursos', url: '/panel/manage/resource'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getResource(): Promise<void> {
    const result = await this.resourceService.getById(this.id);
    console.log(result)
    if (result.ok) {
      this.resource = result.message;
      this.isResourceLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnClickDeleteResource(): void {

  }

  ngOnClickEditResource(): void {
    console.log("Edit resource")
  }

}
