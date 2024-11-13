import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from '../architecture/model/resource';
import { ResourceService } from '../architecture/service/resource.service';
import { Utils } from '../utils';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-resource',
  standalone: false,
  templateUrl: './manage-resource.component.html',
  styleUrl: './manage-resource.component.css'
})
export class ManageResourceComponent implements OnInit{
  title: string = "Recursos";
  pages: string;

  @ViewChild('modalCreateResource') modalCreateResource: ElementRef;
  modalCreateResourceInstance: any;
  @ViewChild('inputName') inputName: ElementRef;
  nameError: string = '';
  @ViewChild('inputLabel') inputLabel: ElementRef;
  labelError: string = '';
  @ViewChild('inputDescription') inputDescription: ElementRef;
  @ViewChild('inputPrice') inputPrice: ElementRef;
  priceError: string = '';


  resources: Resource[];
  resourceCreateAt: string;


  pagination: number;
  paginationShowResources: Resource[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private resourceService: ResourceService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    await this.getAllResources();

    this.pagination = 1;
    this.showPage(this.resources, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.resources, 10)
    this.paginationList = this.createRange(this.paginationMax);
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

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  private async getAllResources(): Promise<void> {
    const resources = await this.resourceService.getAll();

    if (resources.ok) {
      this.resources = resources.message
      console.log(this.resources)
    } else {
      console.log(resources.error)
    }
  }

  public ngOnModalCreateResource(): void {
    this.modalCreateResourceInstance = new bootstrap.Modal(this.modalCreateResource.nativeElement);

    this.modalCreateResourceInstance.show();
  }

  public ngOnCreateResourceSubmit(): void {
    const name = this.inputName.nativeElement.value.toLowerCase();
    const label = this.inputLabel.nativeElement.value
    const description = this.inputDescription.nativeElement.value;
    const price = this.inputPrice.nativeElement.value;
    let descriptionAlt;
    let priceAlt;
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un nombre'
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

    if (description.trim() === '') {
      descriptionAlt = 'Sin Descripción'
    } else {
      descriptionAlt = description
    }

    if (price.trim() === '' || price === '0') {
      priceAlt = '0';
    } else {
      priceAlt = price;
    }

    if (success === 2) {
      const resource = new Resource(name, label, descriptionAlt, Number(priceAlt.replace(/\./g, '')));

      this.ngOnCreateResource(resource);
    }
  }

  private async ngOnCreateResource(object: Resource): Promise<void> {
    const response = await this.resourceService.create(object);

    if (response.ok) {
      this.modalCreateResourceInstance.hide();
      this.resources.push(response.message);
      this.showPage(this.resources, this.pagination, 10);
    } else {
      console.log(response.error)
    }
  }

  
  ngOnClickResourceDetails(resource): void {
    console.log(resource.value.id);
    this.router.navigate([this.router.url + '/', resource.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.resources, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.resources, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.resources, index, 10)
    this.pagination = index;
  }

  showPage(list: Resource[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    if (list) {
      this.paginationShowResources = list.slice(start, end);
      this.paginationLengh = this.paginationShowResources.length;
    }
  }

  getTotalPages(p1: Resource[], p2: number): number {
    if (p1) {
      return Math.ceil(p1.length / p2);
    }
    return null;
  }

  createRange(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  priceCLP(event: Event): void {
    const input = event.target as HTMLInputElement;
    Utils.formatCLP(input);
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputName.nativeElement.value = '';
    this.inputLabel.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    this.inputPrice.nativeElement.value = ''
    this.nameError = '';
    this.labelError = '';
  }
}
