import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Faculty } from '../../architecture/model/faculty';
import { Router } from '@angular/router';
import { FacultyService } from '../../architecture/service/faculty.service';
import { Utils } from '../../app.utils';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../architecture/service/user.service';
import { User } from '../../architecture/model/user';

declare var bootstrap: any;

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
  isViewLoaded: boolean = false;
  browserUser: User;

  @ViewChild('modalCreateItem') modalCreateItem: ElementRef;
  modalCreateItemInstance: any;
  @ViewChild('inputSearchItem') inputSearchItem: ElementRef;

  @ViewChild('inputName') inputName: ElementRef;
  nameError: string = '';
  @ViewChild('inputLabel') inputLabel: ElementRef;
  labelError: string = '';

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
    private userService: UserService,
    private facultyService: FacultyService
  ){}

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.ngOnCreatePagination(1, 10);
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getUserByBrowser(): Promise<void> {
    const browserUser = Utils.getUsernameByBrowser();
    const response = await this.userService.getByUsername(browserUser);

    if (response.ok) {
      this.browserUser = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllFaculties(): Promise<Faculty[]> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      return response.message
    } else {
      console.log(response.error)
    }

    return [];
  }

  //// PAGINATION START ////

  private async ngOnCreatePagination(p1: number, p2: number): Promise<void> {
    this.faculties = await this.getAllFaculties();
    this.paginationItems = this.faculties;
    this.pagination = p1;
    this.paginationRow = p2;
    this.ngOnStartPagination(this.faculties);
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
    this.paginationListShow = this.paginationList.slice(0, 3);
  }

  public ngOnClearSearchItem(): void {
    this.inputSearchItem.nativeElement.value = '';
    this.pagination = 1;
    this.toastr.info('Se ha eliminado el filtrado');
    this.isOnFilter = false;
    this.paginationItems = this.faculties;
    this.ngOnStartPagination(this.paginationItems);
    this.ngOnNavigationStartEndPages();
  }

  public ngOnSearchItem(): void {
    const search = this.inputSearchItem.nativeElement.value;

    if (search === '') {
      this.pagination = 1;
      this.paginationItems = this.faculties;
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
    return this.faculties.filter(headquarter =>
      String(headquarter.id).toLowerCase().includes(p1.toLowerCase()) ||
      headquarter.name.toLowerCase().includes(p1.toLowerCase()) ||
      headquarter.label.toLowerCase().includes(p1.toLowerCase())
    );
  }

  public ngOnItemDetails(p1: any): void {
    this.router.navigate(['/panel/faculty', p1.id]);
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
    const name = this.inputName.nativeElement.value.toLowerCase();
    const label = this.inputLabel.nativeElement.value
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un identificador'
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (label.trim() === '') {
      this.labelError = 'Debe ingresar una etiqueta'
    } else {
      this.labelError = '';
      success+= 1;
    }

    if (success === 2) {
      const faculty = new Faculty(name, label);

      this.ngOnCreateItem(faculty);
    }
  }

  private async ngOnCreateItem(p1: Faculty): Promise<void> {
    const response = await this.facultyService.create(p1);

    if (response.ok) {
      this.modalCreateItemInstance.hide();
      this.faculties.push(response.message);
      this.ngOnShowPage(this.paginationItems, this.pagination);
      this.toastr.success('Se ha creado la facultad con exito');
    } else {
      if (Object.keys(response.error.error).length > 0) {
        this.nameError = response.error.error.name;
      }
    }
  }

  private UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }
  
  public nameIdentifier(): void {
    Utils.formatNameIdentifier(this.inputName.nativeElement);
  }
  
  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputName.nativeElement.value = '';
    this.inputLabel.nativeElement.value = '';
    this.nameError = '';
    this.labelError = '';
  }
}
