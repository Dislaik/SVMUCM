import { Component, OnInit } from '@angular/core';
import { Career } from '../architecture/model/career';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../architecture/service/career.service';
import { FacultyService } from '../architecture/service/faculty.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';

@Component({
  selector: 'app-manage-career-details',
  standalone: false,
  templateUrl: './manage-career-details.component.html',
  styleUrl: './manage-career-details.component.css'
})
export class ManageCareerDetailsComponent  implements OnInit {
  title: string = "Detalles de la carrera";
  id: number;
  pages: string;

  career: Career;
  isCareerLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private careerService: CareerService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getCareer();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Carreras', url: '/panel/manage/career'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getCareer(): Promise<void> {
    const result = await this.careerService.getById(this.id);

    if (result.ok) {
      this.career = result.message;
      this.isCareerLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnDeleteUser(): void {

  }

  ngOnEditCareer(): void {
    console.log("Edit career")
  }
}
