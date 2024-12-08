import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { VolunteerStudent } from '../architecture/model/volunteer-student';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VolunteerStudentService } from '../architecture/service/volunteer-student.service';
import Swal from 'sweetalert2';
import { Utils } from '../utils';
import { UserStatus } from '../architecture/model/user-status';
import { UserStatusService } from '../architecture/service/user-status.service';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { FacultyService } from '../architecture/service/faculty.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { CareerService } from '../architecture/service/career.service';
import { Headquarter } from '../architecture/model/headquarter';
import { Faculty } from '../architecture/model/faculty';
import { Career } from '../architecture/model/career';

@Component({
  selector: 'app-manage-volunteer-student-details',
  standalone: false,
  templateUrl: './manage-volunteer-student-details.component.html',
  styleUrl: './manage-volunteer-student-details.component.css'
})
export class ManageVolunteerStudentDetailsComponent implements OnInit {
  title: string = "Detalles del alumno";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputEmail') inputEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputFirstName') inputFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputLastName') inputLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('selectUserStatus') selectUserStatus: ElementRef;
  userStatusError: string = '';
  @ViewChild('selectItemEditHeadquarter') selectItemEditHeadquarter: ElementRef;
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;
  @ViewChild('selectItemEditCareer') selectItemEditCareer: ElementRef;
  careerError: string = '';


  volunteerStudent: VolunteerStudent;
  userStatus: UserStatus[];
  headquarters: Headquarter[];
  faculties: Faculty[];
  careers: Career[];


  careersAUX: Career[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private userStatusService: UserStatusService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService,
    private careerService: CareerService,
    private volunteerStudentService: VolunteerStudentService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.ngOnGetAllUserStatus();
    this.ngOnGetAllHeadquarters();
    this.ngOnGetAllFaculties();
    this.ngOnGetAllCareers();
    this.ngOnGetVolunteerStudent();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Alumnos voluntarios', url: '/panel/volunteer-student'},
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

  private async ngOnGetAllUserStatus(): Promise<void> {
    const response = await this.userStatusService.getAll();

    if (response.ok) {
      this.userStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllHeadquarters(): Promise<void> {
    const response = await this.headquarterService.getAll();

    if (response.ok) {
      this.headquarters = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllFaculties(): Promise<void> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      this.faculties = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllCareers(): Promise<void> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      this.careers = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetVolunteerStudent(): Promise<void> {
    const response = await this.volunteerStudentService.getById(this.id);

    if (response.ok) {
      this.volunteerStudent = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {

      if (this.inputEmail) {
        this.inputEmail.nativeElement.value = this.volunteerStudent.email;
      }

      if (this.inputFirstName) {
        this.inputFirstName.nativeElement.value = this.volunteerStudent.first_name;
      }

      if (this.inputLastName) {
        this.inputLastName.nativeElement.value = this.volunteerStudent.last_name;
      }

      if (this.selectUserStatus) {
        this.selectUserStatus.nativeElement.value = this.volunteerStudent.id_user_status.name;
      }

      if (this.selectItemEditHeadquarter) {
        this.selectItemEditHeadquarter.nativeElement.value = this.volunteerStudent.id_career.id_headquarter.name;
      }

      if (this.selectItemEditFaculty) {
        this.selectItemEditFaculty.nativeElement.value = this.volunteerStudent.id_career.id_faculty.name;
      }

      if (this.selectItemEditCareer) {
        this.careersAUX = this.careers.filter(career => career.id_headquarter.name === this.selectItemEditHeadquarter.nativeElement.value && career.id_faculty.name === this.selectItemEditFaculty.nativeElement.value);

        setTimeout(() => {
          this.selectItemEditCareer.nativeElement.value = this.volunteerStudent.id_career.name;
        });
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const email = this.inputEmail.nativeElement.value;
    const firstName = this.inputFirstName.nativeElement.value;
    const lastName = this.inputLastName.nativeElement.value;
    const status = this.userStatus.find(status => status.name === this.selectUserStatus.nativeElement.value);
    const career = this.careers.find(career => career.name === this.selectItemEditCareer.nativeElement.value);
    let success = 0;

    if (email.trim() === '') { 
      this.emailError = 'Debe ingresar un correo electronico';
    } else if (!email.includes('@') || !email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (firstName.trim() === '') {
      this.firstNameError = 'Este campo no puede estar vacio';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (lastName.trim() === '') {
      this.lastNameError = 'Este campo no puede estar vacio';
    } else {
      this.lastNameError = '';
      success+= 1;
    }

    if (career === undefined) {
      this.careerError = 'No hay carreras disponibles, elige otra sede o facultad'
    } else {
      this.careerError = '';
      success+= 1;
    }
    

    if (success === 4) {
      const volunteerStudent = new VolunteerStudent(this.volunteerStudent.run, email, firstName, lastName, status, career)
      const response = await this.volunteerStudentService.update(this.volunteerStudent.id, volunteerStudent);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.volunteerStudent = response.message;
        this.enableEditItem = false;
      } else {
        if (Object.keys(response.error.error).length > 0) {
          this.emailError = response.error.error.email;
        }
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.emailError = '';
    this.firstNameError = '';
    this.lastNameError = '';
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este alumno?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.volunteerStudentService.delete(this.volunteerStudent.id)

        if (response.ok) {
          Swal.fire('Alumno eliminado', '', 'success');

          this.router.navigate(['/panel/volunteer-student']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('El alumno no puede ser eliminado debido a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
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

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.selectItemEditHeadquarter.nativeElement || event.target === this.selectItemEditFaculty.nativeElement) {
      const careersFilter = this.careers.filter(career => career.id_headquarter.name === this.selectItemEditHeadquarter.nativeElement.value && career.id_faculty.name === this.selectItemEditFaculty.nativeElement.value);
      
      if (careersFilter.length === 0) {
        this.selectItemEditCareer.nativeElement.value = '';
        this.selectItemEditCareer.nativeElement.disabled = true
      } else {
        this.careersAUX = careersFilter;
        this.selectItemEditCareer.nativeElement.value = this.careersAUX[0].name
        this.selectItemEditCareer.nativeElement.disabled = false
      }
    }
  }
}
