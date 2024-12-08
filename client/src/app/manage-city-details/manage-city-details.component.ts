import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../architecture/model/user';
import { City } from '../architecture/model/city';
import { Region } from '../architecture/model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../architecture/service/user.service';
import { CityService } from '../architecture/service/city.service';
import { RegionService } from '../architecture/service/region.service';
import { Utils } from '../utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-city-details',
  standalone: false,
  templateUrl: './manage-city-details.component.html',
  styleUrl: './manage-city-details.component.css'
})
export class ManageCityDetailsComponent implements OnInit {
  title: string = "Detalles de la ciudad";
  id: number;
  pages: string;  
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';
  @ViewChild('selectItemEditRegion') selectItemEditRegion: ElementRef;


  city: City;
  regions: Region[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private cityService: CityService,
    private regionService: RegionService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllRegions();
    this.getCity();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Ciudades', url: '/panel/city'},
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

  private async getAllRegions(): Promise<void> {
    const response = await this.regionService.getAll();

    if (response.ok) {
      this.regions = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getCity(): Promise<void> {
    const response = await this.cityService.getById(this.id);

    if (response.ok) {
      this.city = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {

      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.city.name;
      }

      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.city.label;
      }

      if (this.selectItemEditRegion) {
        this.selectItemEditRegion.nativeElement.value = this.city.id_region.name;
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value.toLowerCase();
    const label = this.inputItemEditLabel.nativeElement.value;
    const region = this.regions.find(region => region.name === this.selectItemEditRegion.nativeElement.value);
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
      const city = new City(name, label, region);
      const response = await this.cityService.update(this.city.id, city);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.city = response.message;
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
      title: '¿Estas seguro que quieres eliminar esta ciudad?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.cityService.delete(this.city.id)

        if (response.ok) {
          Swal.fire('Ciudad eliminada', '', 'success');

          this.router.navigate(['/panel/city']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La ciudad no puede ser eliminada debido a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
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
    Utils.formatNameIdentifier(this.inputItemEditName.nativeElement);
  }
}
