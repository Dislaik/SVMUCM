import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Faculty } from '../architecture/model/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../architecture/service/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../utils';
import { UserService } from '../architecture/service/user.service';
import { User } from '../architecture/model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-faculty-details',
  standalone: false,
  templateUrl: './manage-faculty-details.component.html',
  styleUrl: './manage-faculty-details.component.css'
})
export class ManageFacultyDetailsComponent implements OnInit {
  title: string = "Detalles de la facultad";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';

  faculty: Faculty;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getFaculty();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Facultades', url: '/panel/faculty'},
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

  async getFaculty(): Promise<void> {
    const response = await this.facultyService.getById(this.id);

    if (response.ok) {
      this.faculty = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
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
      const faculty = new Faculty(name, label);
      const response = await this.facultyService.update(this.faculty.id, faculty);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.faculty = response.message;
        this.enableEditItem = false;
      } else {
        if (Object.keys(response.error.error).length > 0) {
          this.nameError = response.error.error.name;
        }
      }
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.faculty.name;
      }

      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.faculty.label;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.labelError = '';
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta facultad?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.facultyService.delete(this.faculty.id)

        if (response.ok) {
          Swal.fire('Facultad eliminada', '', 'success');

          this.router.navigate(['/panel/faculty']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La facultad no puede ser eliminada debido a tablas relacionadas', '', 'warning');
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
