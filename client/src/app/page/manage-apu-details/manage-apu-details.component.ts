import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { APU } from '../../architecture/model/apu';
import { ActivatedRoute, Router } from '@angular/router';
import { APUService } from '../../architecture/service/apu.service';
import { Resource } from '../../architecture/model/resource';
import { ResourceService } from '../../architecture/service/resource.service';
import { APUResource } from '../../architecture/model/apuresource';
import { APUResourceService } from '../../architecture/service/apuresource.service';
import { Utils } from '../../app.utils';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { User } from '../../architecture/model/user';
import { UserService } from '../../architecture/service/user.service';

declare var bootstrap: any;

///WEIRD STUFF SOLVED LOL

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
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';
  @ViewChild('inputItemEditDescription') inputItemEditDescription: ElementRef;

  @ViewChild('modalAddResource') modalAddResource: ElementRef;
  modalAddResourceInstance: any;
  @ViewChild('modalListResources') modalListResources: ElementRef;

  apu: APU;
  resources: Resource[];
  APUResources: APUResource[];
  APUResourcesAUX: APUResource[];
  buttonResources: any[] = [];
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
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
    this.getUserByBrowser();
    this.ngOnGetAPU();
    this.ngOnGetAllResources();
    this.ngOnGetResourcesByAPUId();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'APU', url: '/panel/apu'},
      4: {page: this.title, url: this.router.url},
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

  private async ngOnGetAPU(): Promise<void> {
    const response = await this.apuService.getById(this.id);

    if (response.ok) {
      this.apu = response.message;
      this.isViewLoaded = true;
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
      this.APUResourcesAUX = structuredClone(this.APUResources); // LITTLE HACK
      //this.APUResourcesAUX = [...this.APUResources] // LITTLE HACK
      console.log(this.APUResourcesAUX)
    } else {
      console.log(response.error)
    }
  }

  ///START EDIT
  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.apu.name;
      }

      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.apu.label;
      }

      if (this.inputItemEditDescription) {
        this.inputItemEditDescription.nativeElement.value = this.apu.description;
      }
    });

    if (this.buttonResources.length === 0) {
      const HTMLElementResources = this.modalListResources.nativeElement as HTMLElement;

      for (let i = 0; i < HTMLElementResources.childNodes.length - 1; i++) {
        const element = HTMLElementResources.childNodes[i];
        this.buttonResources.push(element.childNodes[0] as HTMLButtonElement);
      }
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const label = this.inputItemEditLabel.nativeElement.value;
    const description = this.inputItemEditDescription.nativeElement.value;
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un identificador';
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

    if (success === 2) {
      const apu = new APU(name, label, description);
      const response = await this.apuService.update(this.apu.id, apu);
      
      if (response.ok) {
        if (!this.compareLists(this.APUResourcesAUX, this.APUResources)) {
          for (let i = 0; i < this.APUResources.length; i++) {
            const element = this.APUResources[i];
            
            await this.apuResourceService.delete(element.id);         
          }

          this.APUResources = [];

          for (let i = 0; i < this.APUResourcesAUX.length; i++) {
            const element = this.APUResourcesAUX[i];
            const response = await this.apuResourceService.create(element);
            
            if (response.ok) {
              this.APUResources.push(response.message)
            }
          }
          this.APUResourcesAUX = structuredClone(this.APUResources);
          //this.APUResourcesAUX = [...this.APUResources];
        }
        
        this.toastr.success('Se han guardado los cambios con exito');
        this.apu = response.message;
        this.enableEditItem = false;

      } else {
        if (Object.keys(response.error.error).length > 0) {
          this.nameError = response.error.error.name;
        }
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.labelError = '';
    this.clearAPUResourceAUX(true);
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta APU?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.apuService.delete(this.apu.id)
        console.log(response)
        if (response.ok) {
          Swal.fire('APU eliminada', '', 'success');

          this.router.navigate(['/panel/apu']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La APU no puede ser eliminada debido a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  ///// MODAL START /////

  public ngOnCreateModalAddResource(): void {
    this.modalAddResourceInstance = new bootstrap.Modal(this.modalAddResource.nativeElement);
    this.modalAddResourceInstance.show();
  }

  public async ngOnModalAddResource(resource: Resource): Promise<void> {
    const apuResource = new APUResource(this.apu, resource);
    const buttonElement = this.buttonResources.find(button => Number(button.getAttribute('data-resource-id')) === resource.id);

    buttonElement.disabled = true;
    this.APUResourcesAUX.push(apuResource);
    console.log(this.APUResourcesAUX)
  }


  public async ngOnRemoveResource(apuResource: APUResource): Promise<void> {
    const resourceId = apuResource.id_resource.id;
    const index = this.APUResourcesAUX.findIndex(element => element.id_resource.id === resourceId);

    if (index !== -1) {
      this.APUResourcesAUX.splice(index, 1);
    }

    this.buttonResources.forEach(element => {
      if (Number(element.getAttribute('data-resource-id')) === resourceId) {
        element.disabled = false;
      }
    });
  }

  ///// MODAL END /////

  public nameIdentifier(): void {
    Utils.formatNameIdentifier(this.inputItemEditName.nativeElement);
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public checkDescription(p1: string): string {
    if (p1.trim() === '') {
      return "Sin descripción";
    }

    return p1;
  }

  public numberToPrice(p1: number): string {
    if (p1 === 0) {
      return "Gratis"
    }

    return '$' + Utils.stringToPrice(String(p1));
  }

  private clearAPUResourceAUX(p1: boolean): void {
    const compare = this.buttonResources.filter(item1 => this.APUResourcesAUX.some(item2 => Number(item1.getAttribute('data-resource-id')) === item2.id_resource.id));

    compare.forEach(button => {
      button.disabled = false;
    });

    if (p1) {
      this.APUResourcesAUX = structuredClone(this.APUResources);
      //this.APUResourcesAUX = [...this.APUResources];
    }
  }

  public aLittleHackLOL(p1: number): string {
    return String(p1);
  }

  private compareLists(p1: any[], p2: any[]): boolean {
    if (p1.length !== p2.length) {
      return false;
    }
  
    for (let i = 0; i < p1.length; i++) {
      if (p1[i].id_resource.id !== p2[i].id_resource.id) {
        return false;
      }
    }

    return true
  }

  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }

  @HostListener('document:show.bs.modal', ['$event']) onModalClick(event: Event) {
    const compare = this.buttonResources.filter(item1 => !this.APUResourcesAUX.some(item2 => Number(item1.getAttribute('data-resource-id')) === item2.id_resource.id));
    const compare2 = this.buttonResources.filter(item1 => this.APUResourcesAUX.some(item2 => Number(item1.getAttribute('data-resource-id')) === item2.id_resource.id));
    
    compare2.forEach(button => {
      button.disabled = true;
    });

    compare.forEach(button => {
      button.disabled = false;
    });
  }
}