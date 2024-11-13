import { Component, OnInit } from '@angular/core';
import { Faculty } from '../architecture/model/faculty';
import { Router } from '@angular/router';
import { FacultyService } from '../architecture/service/faculty.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-manage-faculty',
  standalone: false,
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})
export class ManageFacultyComponent implements OnInit {
  title: string = "Facultades";
  pages: string;
  faculties: Faculty[];


  pagination: number;
  paginationShowFaculties: Faculty[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private facultyService: FacultyService
  ){}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();

    this.getAllFaculties(() => {

      this.pagination = 1;
      this.showPage(this.faculties, this.pagination, 10)
      this.paginationMax = this.getTotalPages(this.faculties, 10)
      this.paginationList = this.createRange(this.paginationMax);
    });
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

  async getAllFaculties(cb: any): Promise<void> {
    const result = await this.facultyService.getAll();

    if (result.ok) {
      this.faculties = result.message

      cb();
    } else {
      console.log(result.error)
    }
  }

  ngOnFacultyDetails(faculty): void {
    console.log(faculty.value.id);
    this.router.navigate([this.router.url + '/', faculty.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.faculties, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.faculties, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.faculties, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: Faculty[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowFaculties = list.slice(start, end);
    this.paginationLengh = this.paginationShowFaculties.length;
  }

  getTotalPages(p1: Faculty[], p2: number): number {
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
