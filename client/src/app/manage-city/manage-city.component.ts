import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { User } from '../architecture/model/user';
import { City } from '../architecture/model/city';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../architecture/service/user.service';
import { Utils } from '../utils';
import { CityService } from '../architecture/service/city.service';
import { RegionService } from '../architecture/service/region.service';
import { Region } from '../architecture/model/region';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-city',
  standalone: false,
  templateUrl: './manage-city.component.html',
  styleUrl: './manage-city.component.css'
})
export class ManageCityComponent {
  title: string = "Ciudades";
  pages: string;
  isViewLoaded: boolean = false;
  browserUser: User;

  @ViewChild('modalCreateItem') modalCreateItem: ElementRef;
  modalCreateItemInstance: any;
  @ViewChild('inputSearchItem') inputSearchItem: ElementRef;

  @ViewChild('inputModalName') inputModalName: ElementRef;
  nameError: string = '';
  @ViewChild('inputModalLabel') inputModalLabel: ElementRef;
  labelError: string = '';
  @ViewChild('selectModalRegion') selectModalRegion: ElementRef;
  regionError: string = '';

  cities: City[];
  regions: Region[];

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
    private cityService: CityService,
    private regionService: RegionService
  ){}

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllRegions();
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

  private async getAllRegions(): Promise<void> {
    const response = await this.regionService.getAll();

    if (response.ok) {
      this.regions = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllCities(): Promise<City[]> {
    const response = await this.cityService.getAll();

    if (response.ok) {
      return response.message
    } else {
      console.log(response.error)
    }

    return [];
  }

  //// PAGINATION START ////

  private async ngOnCreatePagination(p1: number, p2: number): Promise<void> {
    this.cities = await this.getAllCities();
    this.paginationItems = this.cities;
    this.pagination = p1;
    this.paginationRow = p2;
    this.ngOnStartPagination(this.cities);
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
    this.paginationItems = this.cities;
    this.ngOnStartPagination(this.paginationItems);
    this.ngOnNavigationStartEndPages();
  }

  public ngOnSearchItem(): void {
    const search = this.inputSearchItem.nativeElement.value;

    if (search === '') {
      this.pagination = 1;
      this.paginationItems = this.cities;
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
    return this.cities.filter(city =>
      String(city.id).toLowerCase().includes(p1.toLowerCase()) ||
      city.name.toLowerCase().includes(p1.toLowerCase()) ||
      city.label.toLowerCase().includes(p1.toLowerCase()) ||
      city.id_region.label.toLowerCase().includes(p1.toLowerCase())
    );
  }

  public ngOnItemDetails(p1: any): void {
    this.router.navigate(['/panel/city', p1.id]);
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
    const region = this.regions.find(headquarter => headquarter.name === this.selectModalRegion.nativeElement.value);
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un identificador'
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (label.trim() === '') {
      this.labelError = 'Debe ingresar una etiqueta';
    } else {
      this.labelError = '';
      success+= 1;
    }

    if (!region) {
      this.regionError = 'Debe seleccionar una región';
    } else {
      this.regionError = '';
      success+= 1;
    }
    
    if (success === 3) {
      const city = new City(name, label, region);

      this.ngOnCreateItem(city);
    }
  }


  private async ngOnCreateItem(p1: City): Promise<void> {
    const response = await this.cityService.create(p1);

    if (response.ok) {
      this.modalCreateItemInstance.hide();
      this.cities.push(response.message);
      this.ngOnShowPage(this.paginationItems, this.pagination);
      this.toastr.success('Se ha creado la ciudad con exito');
    } else {
      if (Object.keys(response.error.error).length > 0) {
        this.nameError = response.error.error.name;
      }
    }
  }


  private UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }
  
  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }

  public nameIdentifier(): void {
    Utils.formatNameIdentifier(this.inputModalName.nativeElement);
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputModalName.nativeElement.value = '';
    this.inputModalLabel.nativeElement.value = '';
    this.selectModalRegion.nativeElement.value = '';
    this.nameError = '';
    this.labelError = '';
    this.regionError = '';
  }
}