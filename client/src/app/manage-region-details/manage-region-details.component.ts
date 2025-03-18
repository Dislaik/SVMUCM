import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../architecture/model/user';
import { Region } from '../architecture/model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../architecture/service/user.service';
import { RegionService } from '../architecture/service/region.service';
import { Utils } from '../utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-region-details',
  standalone: false,
  templateUrl: './manage-region-details.component.html',
  styleUrl: './manage-region-details.component.css'
})
export class ManageRegionDetailsComponent implements OnInit {
  title: string = "Detalles de la región";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';

  region: Region;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private regionService: RegionService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getRegion();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Regiones', url: '/panel/region'},
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

  private async getRegion(): Promise<void> {
    const response = await this.regionService.getById(this.id);

    if (response.ok) {
      this.region = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.region.name;
      }

      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.region.label;
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const label = this.inputItemEditLabel.nativeElement.value;
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
      const region = new Region(name, label);
      const response = await this.regionService.update(this.region.id, region);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.region = response.message;
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
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta región?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.regionService.delete(this.region.id)

        if (response.ok) {
          Swal.fire('Región eliminada', '', 'success');

          this.router.navigate(['/panel/region']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La región no puede ser eliminada debido a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public nameIdentifier(): void {
    Utils.formatNameIdentifier(this.inputItemEditName.nativeElement);
  }
  

  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }
}
