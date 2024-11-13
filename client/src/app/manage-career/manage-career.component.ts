import { Component, OnInit } from '@angular/core';
import { Career } from '../architecture/model/career';
import { Router } from '@angular/router';
import { CareerService } from '../architecture/service/career.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-manage-career',
  standalone: false,
  templateUrl: './manage-career.component.html',
  styleUrl: './manage-career.component.css'
})
export class ManageCareerComponent implements OnInit{
  title: string = "Carreras";
  pages: string;
  careers: Career[];


  pagination: number;
  paginationShowCareers: Career[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private careerService: CareerService
  ){}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();

    this.getAllCareers(() => {

      this.pagination = 1;
      this.showPage(this.careers, this.pagination, 10)
      this.paginationMax = this.getTotalPages(this.careers, 10)
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

  async getAllCareers(cb: any): Promise<void> {
    const result = await this.careerService.getAll();

    if (result.ok) {
      this.careers = result.message

      cb();
    } else {
      console.log(result.error)
    }
  }

  ngOnCareerDetails(career): void {
    console.log(career.value.id);
    this.router.navigate([this.router.url + '/', career.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.careers, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.careers, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.careers, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: Career[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowCareers = list.slice(start, end);
    this.paginationLengh = this.paginationShowCareers.length;
  }

  getTotalPages(p1: Career[], p2: number): number {
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
