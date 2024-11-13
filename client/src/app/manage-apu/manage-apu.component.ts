import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APU } from '../architecture/model/apu';
import { APUService } from '../architecture/service/apu.service';
import { Utils } from '../utils';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-apu',
  standalone: false,
  templateUrl: './manage-apu.component.html',
  styleUrl: './manage-apu.component.css'
})
export class ManageAPUComponent implements OnInit {
  title: string = "APU";
  pages: string;

  @ViewChild('modalCreateAPU') modalCreateAPU: ElementRef;
  modalCreateAPUInstance: any;
  @ViewChild('inputName') inputName: ElementRef;
  nameError: string = '';
  @ViewChild('inputLabel') inputLabel: ElementRef;
  labelError: string = '';
  @ViewChild('inputDescription') inputDescription: ElementRef;


  apus: APU[];
  resourceCreateAt: string;


  pagination: number;
  paginationShowAPUS: APU[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private apuService: APUService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    await this.getAllResources();

    this.pagination = 1;
    this.showPage(this.apus, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.apus, 10)
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
    const resources = await this.apuService.getAll();

    if (resources.ok) {
      this.apus = resources.message
      console.log(this.apus)
    } else {
      console.log(resources.error)
    }
  }

  public ngOnModalCreateAPU(): void {
    this.modalCreateAPUInstance = new bootstrap.Modal(this.modalCreateAPU.nativeElement);

    this.modalCreateAPUInstance.show();
  }

  public ngOnCreateAPUSubmit(): void {
    const name = this.inputName.nativeElement.value.toLowerCase();
    const label = this.inputLabel.nativeElement.value
    const description = this.inputDescription.nativeElement.value;
    let descriptionAlt;
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

    if (success === 2) {
      const resource = new APU(name, label, descriptionAlt);

      this.ngOnCreateAPU(resource);
    }
  }

  private async ngOnCreateAPU(object: APU): Promise<void> {
    const response = await this.apuService.create(object);

    if (response.ok) {
      this.modalCreateAPUInstance.hide();
      this.apus.push(response.message);
      this.showPage(this.apus, this.pagination, 10);
    } else {
      console.log(response.error)
    }
  }

  
  ngOnClickAPUDetails(apu): void {
    console.log(apu.value.id);
    this.router.navigate([this.router.url + '/', apu.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.apus, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.apus, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.apus, index, 10)
    this.pagination = index;
  }

  showPage(list: APU[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    if (list) {
      this.paginationShowAPUS = list.slice(start, end);
      this.paginationLengh = this.paginationShowAPUS.length;
    }
  }

  getTotalPages(p1: APU[], p2: number): number {
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
    this.nameError = '';
    this.labelError = '';
  }
}
