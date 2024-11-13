import { Component, OnInit } from '@angular/core';
import { Headquarter } from '../architecture/model/headquarter';
import { Router } from '@angular/router';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-manage-headquarter',
  standalone: false,
  templateUrl: './manage-headquarter.component.html',
  styleUrl: './manage-headquarter.component.css'
})
export class ManageHeadquarterComponent implements OnInit {
  title: string = "Sedes";
  pages: string;
  headquarters: Headquarter[];

  pagination: number;
  paginationShowHeadquarter: Headquarter[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private headquarterService: HeadquarterService
  ){}

  ngOnInit(): void {
    this.createBreadCrumb();

    this.getAllHeadquarters(() => {

      this.pagination = 1;
      this.showPage(this.headquarters, this.pagination, 10)
      this.paginationMax = this.getTotalPages(this.headquarters, 10)
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

  async getAllHeadquarters(cb: any): Promise<void> {
    const result = await this.headquarterService.getAll();

    if (result.ok) {
      this.headquarters = result.message

      cb()
    } else {
      console.log(result.error)
    }
  }

  ngOnRoleDetails(role): void {
    console.log(role.value.id);
    this.router.navigate([this.router.url + '/', role.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.headquarters, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.headquarters, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.headquarters, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: Headquarter[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowHeadquarter = list.slice(start, end);
    this.paginationLengh = this.paginationShowHeadquarter.length;
  }

  getTotalPages(p1: Headquarter[], p2: number): number {
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
