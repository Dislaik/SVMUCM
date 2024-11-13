import { Component, OnInit } from '@angular/core';
import { Faculty } from '../architecture/model/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../architecture/service/faculty.service';

@Component({
  selector: 'app-manage-faculty-details',
  standalone: false,
  templateUrl: './manage-faculty-details.component.html',
  styleUrl: './manage-faculty-details.component.css'
})
export class ManageFacultyDetailsComponent implements OnInit {
  title: string = "Detalles de la facultad";
  id: number;
  pages: string;

  faculty: Faculty;
  isFacultyLoaded: boolean = false;

  constructor(
    private router: Router,
    private facultyService: FacultyService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getFaculty();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Facultades', url: '/panel/manage/faculty'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getFaculty(): Promise<void> {
    const result = await this.facultyService.getById(this.id);

    if (result.ok) {
      this.faculty = result.message;
      this.isFacultyLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnDeleteFaculty(): void {
    
  }

  ngOnEditFaculty(): void {
    console.log("Edit faculty")
  }
}
