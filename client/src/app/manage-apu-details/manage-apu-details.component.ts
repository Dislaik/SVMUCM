import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { APU } from '../architecture/model/apu';
import { ActivatedRoute, Router } from '@angular/router';
import { APUService } from '../architecture/service/apu.service';
import { Resource } from '../architecture/model/resource';
import { ResourceService } from '../architecture/service/resource.service';
import { APUResource } from '../architecture/model/apuresource';
import { APUResourceService } from '../architecture/service/apuresource.service';
import { Utils } from '../utils';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-apudetails',
  standalone: false,
  templateUrl: './manage-apu-details.component.html',
  styleUrl: './manage-apu-details.component.css'
})
export class ManageAPUDetailsComponent implements OnInit{
  title: string = "Detalles de la APU";
  id: number;
  pages: string;

  @ViewChild('modalAddResource') modalAddResource: ElementRef;
  modalAddResourceInstance: any;
  @ViewChild('modalAddResourceAmount') modalAddResourceAmount: ElementRef;
  modalAddResourceAmountInstance: any;
  @ViewChild('inputAmount') inputAmount: ElementRef;
  amountError: string = '';

  apu: APU;
  resources: Resource[];
  APUResources: APUResource[];
  isAPULoaded: boolean = false;

  constructor(
    private router: Router,
    private apuService: APUService,
    private resourceService: ResourceService,
    private apuResourceService: APUResourceService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getAPU();
    this.ngOnGetAllResources();
    this.ngOnGetResourcesByAPUId();
  }

  public ngOnClickOpenModal(): void {
    this.modalAddResourceInstance = new bootstrap.Modal(this.modalAddResource.nativeElement);
    this.modalAddResourceInstance.show();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'APU', url: '/panel/manage/apu'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  public ngOnClickAddResource(): void {
    const amount = this.inputAmount.nativeElement.value;
    const resource = this.modalAddResourceAmountInstance.arguments.resource;
    let success = 0;


    if (amount.trim() === '') {
      this.amountError = 'Debe ingresar una cantidad'
    } else {
      this.amountError = '';
      success+= 1;
    }

    if (success === 1) {
      const apuResource = new APUResource(this.apu, resource, Number(amount));
      this.ngOnAddResource(apuResource);
    }
  }

  public ngOnClickBackToSelectResource(): void {
    this.modalAddResourceAmountInstance.hide();
    this.modalAddResourceInstance.show()
  }

  public async ngOnClickSelectResource(resource: Resource): Promise<void> {
    this.modalAddResourceInstance.hide()
    this.modalAddResourceAmountInstance = new bootstrap.Modal(this.modalAddResourceAmount.nativeElement);
    this.modalAddResourceAmountInstance.arguments = {
      resource: resource
    };
    this.modalAddResourceAmountInstance.show();
  }

  public ngOnOnlyNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;
    Utils.onlyNumbers(input);
  }

  private async ngOnAddResource(object: APUResource): Promise<void> {
    const response = await this.apuResourceService.create(object);

    if (response.ok) {
      this.modalAddResourceInstance.hide();
      this.APUResources.push(response.message);
      this.modalAddResourceAmountInstance.hide();
    } else {
      console.log(response.error)
    }
  }

  private async getAPU(): Promise<void> {
    const response = await this.apuService.getById(this.id);

    if (response.ok) {
      this.apu = response.message;
      this.isAPULoaded = true;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllResources(): Promise<void> {
    const response = await this.resourceService.getAll();

    if (response.ok) {
      this.resources = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetResourcesByAPUId(): Promise<void> {
    const response = await this.apuResourceService.getByAPUId(this.id);

    if (response.ok) {
      this.APUResources = response.message;
    } else {
      console.log(response.error)
    }
  }

  ngOnClickDeleteResource(): void {

  }

  ngOnClickEditResource(): void {
    console.log("Edit apu")
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputAmount.nativeElement.value = '';
  }
}
