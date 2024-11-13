import { Component, OnInit } from '@angular/core';
import { Headquarter } from '../architecture/model/headquarter';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadquarterService } from '../architecture/service/headquarter.service';

@Component({
  selector: 'app-manage-headquarter-details',
  standalone: false,
  templateUrl: './manage-headquarter-details.component.html',
  styleUrl: './manage-headquarter-details.component.css'
})
export class ManageHeadquarterDetailsComponent implements OnInit {
  title: string = "Detalles de la sede";
  id: number;
  pages: string;

  headquarter: Headquarter;
  isHeadquarterLoaded: boolean = false;

  constructor(
    private router: Router,
    private headquarterService: HeadquarterService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getHeadquarter();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Sedes', url: '/panel/manage/headquarter'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getHeadquarter(): Promise<void> {
    const result = await this.headquarterService.getById(this.id);

    if (result.ok) {
      this.headquarter = result.message;
      this.isHeadquarterLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnDeleteHeadquarter(): void {
    
  }

  ngOnEditHeadquarter(): void {
    console.log("Edit role")
  }

}
