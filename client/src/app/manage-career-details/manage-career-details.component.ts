import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Career } from '../architecture/model/career';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../architecture/service/career.service';
import { FacultyService } from '../architecture/service/faculty.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { ToastrService } from 'ngx-toastr';
import { Headquarter } from '../architecture/model/headquarter';
import { Faculty } from '../architecture/model/faculty';
import Swal from 'sweetalert2';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-manage-career-details',
  standalone: false,
  templateUrl: './manage-career-details.component.html',
  styleUrl: './manage-career-details.component.css'
})
export class ManageCareerDetailsComponent  implements OnInit {
  title: string = "Detalles de la carrera";
  id: number;
  pages: string;  
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';
  @ViewChild('selectItemEditHeadquarter') selectItemEditHeadquarter: ElementRef;
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;


  career: Career;
  headquarters: Headquarter[];
  faculties: Faculty[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private careerService: CareerService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllHeadquarters();
    this.getAllFaculties();
    this.getCareer();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Carreras', url: '/panel/career'},
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

  private async getAllHeadquarters(): Promise<void> {
    const response = await this.headquarterService.getAll();

    if (response.ok) {
      this.headquarters = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllFaculties(): Promise<void> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      this.faculties = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getCareer(): Promise<void> {
    const response = await this.careerService.getById(this.id);

    if (response.ok) {
      this.career = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {

      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.career.name;
      }


      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.career.label;
      }

      if (this.selectItemEditHeadquarter) {
        this.selectItemEditHeadquarter.nativeElement.value = this.career.id_headquarter.name;
      }

      if (this.selectItemEditFaculty) {
        this.selectItemEditFaculty.nativeElement.value = this.career.id_faculty.name;
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const label = this.inputItemEditLabel.nativeElement.value;
    const headquarter = this.headquarters.find(headquarter => headquarter.name === this.selectItemEditHeadquarter.nativeElement.value);
    const faculty = this.faculties.find(faculty => faculty.name === this.selectItemEditFaculty.nativeElement.value); 
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
      const career = new Career(name, label, headquarter, faculty);
      const response = await this.careerService.update(this.career.id, career);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.career = response.message;
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
      title: '¿Estas seguro que quieres eliminar esta carrera?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.careerService.delete(this.career.id)

        if (response.ok) {
          Swal.fire('Carrera eliminada', '', 'success');

          this.router.navigate(['/panel/career']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La carrera no puede ser eliminada debido a tablas relacionadas', '', 'warning');
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
