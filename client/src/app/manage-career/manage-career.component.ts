import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Career } from '../architecture/model/career';
import { Router } from '@angular/router';
import { CareerService } from '../architecture/service/career.service';
import { Utils } from '../utils';
import { ToastrService } from 'ngx-toastr';
import { Headquarter } from '../architecture/model/headquarter';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { Faculty } from '../architecture/model/faculty';
import { FacultyService } from '../architecture/service/faculty.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-career',
  standalone: false,
  templateUrl: './manage-career.component.html',
  styleUrl: './manage-career.component.css'
})
export class ManageCareerComponent implements OnInit{
  title: string = "Carreras";
  pages: string;
  isViewLoaded: boolean = false;

  @ViewChild('modalCreateItem') modalCreateItem: ElementRef;
  modalCreateItemInstance: any;
  @ViewChild('inputSearchItem') inputSearchItem: ElementRef;

  @ViewChild('inputModalName') inputModalName: ElementRef;
  nameError: string = '';
  @ViewChild('inputModalLabel') inputModalLabel: ElementRef;
  labelError: string = '';
  @ViewChild('selectModalHeadquarter') selectModalHeadquarter: ElementRef;
  headquarterError: string = '';
  @ViewChild('selectModalFaculty') selectModalFaculty: ElementRef;
  facultyError: string = '';



  careers: Career[];
  headquarters: Headquarter[];
  faculties: Faculty[];

  //// PAGINATION VARIABLES ////
  pagination: number;
  paginationItems: any[]
  paginationShowItems: any[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];
  paginationListShow: number[];
  paginationRow: number;
  isNavigationContainFirstPage: boolean;
  isNavigationContainLastPage: boolean;
  isOnFilter: boolean;
  //// PAGINATION VARIABLES ////

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private careerService: CareerService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService
  ){}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    this.getAllHeadquarters();
    this.getAllFaculties();
    this.ngOnCreatePagination(1, 10);
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getAllFaculties(): Promise<void> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      this.faculties = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllHeadquarters(): Promise<void> {
    const response = await this.headquarterService.getAll();

    if (response.ok) {
      this.headquarters = response.message;
    } else {
      console.log(response.error);
    }
  }


  private async getAllCareers(): Promise<Career[]> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      return response.message
    } else {
      console.log(response.error)
    }

    return [];
  }

  //// PAGINATION START ////

  private async ngOnCreatePagination(p1: number, p2: number): Promise<void> {
    this.careers = await this.getAllCareers();
    this.paginationItems = this.careers;
    this.pagination = p1;
    this.paginationRow = p2;
    this.ngOnStartPagination(this.paginationItems);
    this.isNavigationContainFirstPage = false;
    
    if (this.paginationMax < 4) {
      this.isNavigationContainLastPage = true;
    } else {
      this.isNavigationContainLastPage = false;
    }

    this.isOnFilter = false;
    this.isViewLoaded = true;
  }

  private ngOnStartPagination(p1: any[]): void {
    this.ngOnShowPage(p1, this.pagination)
    this.paginationMax = this.getTotalPages(p1, this.paginationRow)
    this.paginationList = this.createRange(this.paginationMax);
    console.log(this.paginationList)
    this.paginationListShow = this.paginationList.slice(0, 3);
  }

  public ngOnClearSearchItem(): void {
    this.inputSearchItem.nativeElement.value = '';
    this.pagination = 1;
    this.toastr.info('Se ha eliminado el filtrado');
    this.isOnFilter = false;
    this.paginationItems = this.careers;
    this.ngOnStartPagination(this.paginationItems);
    this.ngOnNavigationStartEndPages();
  }

  public ngOnSearchItem(): void {
    const search = this.inputSearchItem.nativeElement.value;

    if (search === '') {
      this.pagination = 1;
      this.paginationItems = this.careers;
      this.ngOnStartPagination(this.paginationItems);
      this.ngOnNavigationStartEndPages();
      this.toastr.info('Se ha eliminado el filtrado');
      this.isOnFilter = false;
    } else {
      this.pagination = 1;
      this.paginationItems = this.ngOnFilterPaginationItems(search);
      this.ngOnStartPagination(this.paginationItems);
      this.ngOnNavigationStartEndPages();
      this.toastr.info('Se ha aplicado el filtrado');
      this.isOnFilter = true;
    }

    this.ngOnNavigationStartEndPages();
  }

  private ngOnFilterPaginationItems(p1: string): any[] {
    return this.careers.filter(career =>
      String(career.id).toLowerCase().includes(p1.toLowerCase()) ||
      career.name.toLowerCase().includes(p1.toLowerCase()) ||
      career.label.toLowerCase().includes(p1.toLowerCase())
    );
  }

  public ngOnItemDetails(p1: any): void {
    this.router.navigate(['/panel/manage/career', p1.id]);
  }

  public ngOnPaginationNext(): void {
    this.pagination += 1;

    this.ngOnShowPage(this.paginationItems, this.pagination)
    if (this.pagination >= 3 && this.pagination < this.paginationMax) {
      const newPaginationList = this.paginationListShow.map(page => page + 1);
      this.paginationListShow = newPaginationList
    }

    this.ngOnNavigationStartEndPages();
  }

  public ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.ngOnShowPage(this.paginationItems, this.pagination)
    
    if (this.pagination >= 2 && this.pagination !== this.paginationMax - 1) {
      const newPaginationList = this.paginationListShow.map(page => page - 1);
      this.paginationListShow = newPaginationList
    }

    this.ngOnNavigationStartEndPages();
  }

  public ngOnPaginationItem(p1: number): void {
    this.ngOnShowPage(this.paginationItems, p1)

    if (p1 === 1) {
      const firstElement = this.paginationListShow[0];
      const asd = firstElement - 1;
      const newPaginationList = this.paginationListShow.map(page => page - asd);

      this.paginationListShow = newPaginationList;
    } else if (this.pagination > p1) {
      if (p1 >= 2 && p1 !== this.paginationMax - 1) {
        const newPaginationList = this.paginationListShow.map(page => page - 1);
        this.paginationListShow = newPaginationList
      }
    } else if (p1 === this.paginationMax) {
      const lastElement = this.paginationListShow[this.paginationListShow.length - 1];
      const asd = this.paginationMax - lastElement; 
      const newPaginationList = this.paginationListShow.map(page => page + asd);

      this.paginationListShow = newPaginationList
    } else {
      if (p1 >= 3 && p1 < this.paginationMax) {
        const newPaginationList = this.paginationListShow.map(page => page + 1);
        this.paginationListShow = newPaginationList
      }
    }

    this.ngOnNavigationStartEndPages();

    this.pagination = p1;
  }

  private ngOnShowPage(p1: any[], p2: number): void {
    const start = (p2 - 1) * this.paginationRow;
    const end = start + this.paginationRow;
    
    this.paginationShowItems = p1.slice(start, end);
    this.paginationLengh = this.paginationShowItems.length;
  }

  private ngOnNavigationStartEndPages(): void {
    if (this.paginationListShow.includes(this.paginationMax)) {
      this.isNavigationContainLastPage = true;
    } else {
      this.isNavigationContainLastPage = false;
    }

    if (this.paginationListShow.includes(1)) {
      this.isNavigationContainFirstPage = true;
    } else {
      this.isNavigationContainFirstPage = false;
    }
  }

  private getTotalPages(p1: any[], p2: number): number {
    if (p1.length === 0) {
      return 1;
    }
    
    return Math.ceil(p1.length / p2);
  }

  private createRange(number){
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  ///// PAGINATION END ////

  public ngOnCreateModalItem(): void {
    this.modalCreateItemInstance = new bootstrap.Modal(this.modalCreateItem.nativeElement);

    this.modalCreateItemInstance.show();
  }

  public ngOnModelCreateItem(): void {
    const name = this.inputModalName.nativeElement.value.toLowerCase();
    const label = this.inputModalLabel.nativeElement.value
    const headquarter = this.headquarters.find(headquarter => headquarter.name === this.selectModalHeadquarter.nativeElement.value);
    const faculty = this.faculties.find(faculty => faculty.name === this.selectModalFaculty.nativeElement.value);
    const career = new Career(name, label, headquarter, faculty);

    this.ngOnCreateItem(career);
  }

  private async ngOnCreateItem(career: Career): Promise<void> {
    let success = 0;

    if (career.name.trim() === '') {
      this.nameError = 'Debe ingresar un identificador'
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (career.label === '') {
      this.labelError = 'Debe ingresar una etiqueta';
    } else {
      this.labelError = '';
      success+= 1;
    }

    if (career.id_headquarter.name === '') {
      this.headquarterError = 'Debe seleccionar una sede';
    } else {
      this.headquarterError = '';
      success+= 1;
    }

    if (career.id_faculty.name === '') {
      this.facultyError = 'Debe seleccionar una facultad';
    } else {
      this.facultyError = '';
      success+= 1;
    }
    
    if (success === 4) {
      const response = await this.careerService.create(career);

      if (response.ok) {
        this.modalCreateItemInstance.hide();
        this.careers.push(response.message);
        this.paginationItems = this.careers;
        this.ngOnShowPage(this.paginationItems, this.pagination);
        this.toastr.success('Se ha creado la carrera con exito');
      } else {
        this.nameError = response.error.name;
      }
    }
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public nameIdentifier(): void {
    Utils.formatNameIdentifier(this.inputModalName.nativeElement);
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputModalName.nativeElement.value = '';
    this.inputModalLabel.nativeElement.value = '';
    this.selectModalHeadquarter.nativeElement.value = '';
    this.selectModalFaculty.nativeElement.value = '';
    this.nameError = '';
    this.labelError = '';
    this.headquarterError = '';
    this.facultyError = '';
  }
}
