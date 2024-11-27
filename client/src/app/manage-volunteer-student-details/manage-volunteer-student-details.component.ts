import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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


  volunteerStudent: VolunteerStudent;
  userStatus: UserStatus[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private userStatusService: UserStatusService,
    private volunteerStudentService: VolunteerStudentService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.ngOnGetUserStatus();
    this.getVolunteerStudent();
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

  private async ngOnGetUserStatus(): Promise<void> {
    const response = await this.userStatusService.getAll();

    if (response.ok) {
      this.userStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getVolunteerStudent(): Promise<void> {
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
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const email = this.inputEmail.nativeElement.value;
    const firstName = this.inputFirstName.nativeElement.value;
    const lastName = this.inputLastName.nativeElement.value;
    const status = this.userStatus.find(status => status.name === this.selectUserStatus.nativeElement.value);
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
    

    if (success === 3) {
      this.volunteerStudent.email = email;
      this.volunteerStudent.first_name = firstName;
      this.volunteerStudent.last_name = lastName;
      this.volunteerStudent.id_user_status = status;

      const response = await this.volunteerStudentService.update(this.volunteerStudent.id, this.volunteerStudent);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        if (Object.keys(response.error).length > 0) {
          this.emailError = response.error.email;
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
            Swal.fire('El alumno no puede ser eliminado debio a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public haveRole(p1: any[]) {
    return Utils.haveRole(this.browserUser, p1)
  }
}
