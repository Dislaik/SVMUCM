import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { APU } from '../architecture/model/apu';
import { ActivatedRoute, Router } from '@angular/router';
import { APUService } from '../architecture/service/apu.service';
import { Resource } from '../architecture/model/resource';
import { ResourceService } from '../architecture/service/resource.service';
import { APUResource } from '../architecture/model/apuresource';
import { APUResourceService } from '../architecture/service/apuresource.service';
import { Utils } from '../utils';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  isViewLoaded: boolean = false;
  enableEditItem: boolean;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';
  @ViewChild('inputItemEditDescription') inputItemEditDescription: ElementRef;

  @ViewChild('modalAddResource') modalAddResource: ElementRef;
  modalAddResourceInstance: any;

  apu: APU;
  resources: Resource[];
  APUResources: APUResource[];

  constructor(
    private router: Router,
    private toastr: ToastrService,
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
    this.ngOnGetAPU();
    this.ngOnGetAllResources();
    this.ngOnGetResourcesByAPUId();
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
    } else {
      console.log(response.error)
    }
  }


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
      this.apu.name = name;
      this.apu.label = label;
      this.apu.description = description;

      const response = await this.apuService.update(this.apu.id, this.apu);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        if (Object.keys(response.error).length > 0) {
          this.nameError = response.error.name;
        }
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.labelError = '';
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta APU?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.resourceService.delete(this.apu.id)

        if (response.ok) {
          Swal.fire('APU eliminada', '', 'success');

          this.router.navigate(['/panel/manage/resource']);
        } else {
          Swal.fire(response.error, '', 'warning');
        }
      }
    }); 
  }

  ///// MODAL START /////


  public ngOnCreateModalAddResource(): void {
    this.modalAddResourceInstance = new bootstrap.Modal(this.modalAddResource.nativeElement);
    this.modalAddResourceInstance.show();
  }




  public async ngOnModalAddResource(p1: Resource): Promise<void> {
    
  }


  public async ngOnClickOpenModal(): Promise<void> {

  }























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
}

























//   public ngOnClickAddResource(): void {
//     const amount = this.inputAmount.nativeElement.value;
//     const resource = this.modalAddResourceAmountInstance.arguments.resource;
//     let success = 0;


//     if (amount.trim() === '') {
//       this.amountError = 'Debe ingresar una cantidad'
//     } else {
//       this.amountError = '';
//       success+= 1;
//     }

//     if (success === 1) {
//       const apuResource = new APUResource(this.apu, resource, Number(amount));
//       this.ngOnAddResource(apuResource);
//     }
//   }

//   public ngOnClickBackToSelectResource(): void {
//     this.modalAddResourceAmountInstance.hide();
//     this.modalAddResourceInstance.show()
//   }



//   public ngOnOnlyNumbers(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     Utils.onlyNumbers(input);
//   }

//   private async ngOnAddResource(object: APUResource): Promise<void> {
//     const response = await this.apuResourceService.create(object);

//     if (response.ok) {
//       this.modalAddResourceInstance.hide();
//       this.APUResources.push(response.message);
//       this.modalAddResourceAmountInstance.hide();
//     } else {
//       console.log(response.error)
//     }
//   }



//   ngOnClickDeleteResource(): void {

//   }

//   ngOnClickEditResource(): void {
//     console.log("Edit apu")
//   }

//   @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
//     this.inputAmount.nativeElement.value = '';
//   }
// }