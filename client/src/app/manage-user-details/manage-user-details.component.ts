import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { Utils } from '../utils';
import { Role } from '../architecture/model/role';
import { RoleService } from '../architecture/service/role.service';
import { UserStatus } from '../architecture/model/user-status';
import { UserStatusService } from '../architecture/service/user-status.service';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from '../architecture/model/faculty';
import { UserFaculty } from '../architecture/model/user-faculty';
import { UserFacultyService } from '../architecture/service/user-faculty.service';
import { FacultyService } from '../architecture/service/faculty.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-user-details',
  standalone: false,
  templateUrl: './manage-user-details.component.html',
  styleUrl: './manage-user-details.component.css'
})
export class ManageUserDetailsComponent implements OnInit {
  title: string = "Detalles de usuario";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('modalChangePassword') modalChangePassword: ElementRef;
  modalChangePasswordInstance: any;

  @ViewChild('inputPassword', {static: false}) inputPassword: ElementRef; 
  passwordError: string = '';


  @ViewChild('inputItemEditFirstName') inputItemEditFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputItemEditLastName') inputItemEditLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('inputItemEditEmail') inputItemEditEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputItemEditAddress') inputItemEditAddress: ElementRef;
  addressError: string = '';
  @ViewChild('inputItemEditPhone') inputItemEditPhone: ElementRef;
  phoneError: string = '';
  @ViewChild('selectItemEditRole') selectItemEditRole: ElementRef;
  roleError: string = '';
  @ViewChild('selectItemEditUserStatus') selectItemEditUserStatus: ElementRef;
  userStatusError: string = '';
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;
  facultyError: string = '';


  user: User;
  userFaculty: UserFaculty;
  roles: Role[];
  faculties: Faculty[];
  userStatus: UserStatus[];
  
  isOnProfessor: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private roleService: RoleService,
    private userStatusService: UserStatusService,
    private userFacultyService: UserFacultyService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllRoles();
    this.getAllUserStatus();
    this.ngOnGetAllFaculties();
    this.ngOnGetUserById();
    this.ngOnGetUserFacultyByUserId();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Usuarios', url: '/panel/user'},
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
  
  private async getAllRoles(): Promise<void> {
    const response = await this.roleService.getAll();

    if (response.ok) {
      this.roles = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllUserStatus(): Promise<void> {
    const response = await this.userStatusService.getAll();

    if (response.ok) {
      this.userStatus = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetAllFaculties(): Promise<void> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      this.faculties = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetUserById(): Promise<void> {
    const response = await this.userService.getById(this.id);

    if (response.ok) {
      this.user = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetUserFacultyByUserId(): Promise<void> {
    const response = await this.userFacultyService.getByUserId(this.id);

    if (response.ok) {
      this.userFaculty = response.message;

      if (this.userFaculty) {
        this.isOnProfessor = true;
      }
    } else {
      console.log(response.error);
    }
  }

  public ngOnCreateModalChangePassword(): void {
    this.modalChangePasswordInstance = new bootstrap.Modal(this.modalChangePassword.nativeElement);
    this.modalChangePasswordInstance.show();
  }

  public async ngOnModelChangePassword(): Promise<void> {
    const password = this.inputPassword.nativeElement.value;
    let success = 0

    if (password.trim() === '') {
      this.passwordError = 'Debe ingresar una contraseña';
    } else {
      this.passwordError = '';
      success+= 1;
    }


    if (success === 1) {
      this.user.password = password;

      const response = await this.userService.update(this.user.id, this.user)

      if (response.ok) {
        this.modalChangePasswordInstance.hide()
        this.enableEditItem = false;
        this.toastr.success('Se han guardado los cambios con exito');
      } else {
        console.log(response.error)
      }
    }
  }
  
  public async ngOnEditItemSave(): Promise<void> {
    const firstName = this.inputItemEditFirstName.nativeElement.value;
    const lastName = this.inputItemEditLastName.nativeElement.value;
    const email = this.inputItemEditEmail.nativeElement.value;
    const address = this.inputItemEditAddress.nativeElement.value;
    const phone = this.inputItemEditPhone.nativeElement.value;
    const role = this.roles.find(role => role.name === this.selectItemEditRole.nativeElement.value);
    let userStatus = this.user.id_user_status;
    if (this.selectItemEditUserStatus) {
      userStatus = this.userStatus.find(status => status.name === this.selectItemEditUserStatus.nativeElement.value);
    }
    let faculty;
    if (this.selectItemEditFaculty) {
      faculty = this.faculties.find(status => status.name === this.selectItemEditFaculty.nativeElement.value);
    }
    let success = 0;

    if (firstName.trim() === '') {
      this.firstNameError = 'Debe ingresar sus nombres';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (lastName.trim() === '') {
      this.lastNameError = 'Debe ingresar sus apellidos';
    } else {
      this.lastNameError = '';
      success+= 1;
    }

    if (email.trim() === '') { 
      this.emailError = 'Debe ingresar su correo electronico';
    } else if (!email.includes('@') || !email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (success === 3) {
      const user = new User(this.user.username, this.user.password, email, firstName, lastName, address, phone, '', role, userStatus)
      // this.user.first_name = firstName;
      // this.user.last_name = lastName;
      // this.user.email = email;
      // this.user.address = address;
      // this.user.phone = phone;
      // this.user.id_role = role;
      // this.user.id_user_status = userStatus;

      const response = await this.userService.update(this.user.id, user);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.user = response.message;

        if (faculty) {
          if (this.userFaculty) {
            this.userFaculty.id_faculty = faculty;
            this.ngOnUpdateUserFaculty(this.userFaculty.id, this.userFaculty);
          } else {
            const userFaculty = new UserFaculty(this.user, faculty);
            this.ngOnCreateUserFaculty(userFaculty);
          }
        } else {
          if (this.userFaculty) {
            await this.userFacultyService.delete(this.userFaculty.id);
            this.userFaculty = null;
          }
          
        }

        this.enableEditItem = false;
      } else {
        if (Object.keys(response.error.error).length > 0) {
          this.emailError = response.error.error.email;
        }
      }
    }
  }

  private async ngOnCreateUserFaculty(userFaculty: UserFaculty): Promise<void> {
    const response = await this.userFacultyService.create(userFaculty);

    if (response.ok) {
      this.userFaculty = response.message;
    } else { 
      console.log(response.error)
    }
  }

  private async ngOnUpdateUserFaculty(id: number, userFaculty: UserFaculty): Promise<void> {
    const response = await this.userFacultyService.update(id, userFaculty);

    if (response.ok) {
      this.userFaculty = response.message;
    } else { 
      console.log(response.error)
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;

    if (this.haveRole(['dean'])) {
      const toRemove = ['admin', 'externalrelationscoordinator', 'externalrelations', 'dean'];
      this.roles = this.roles.filter(role => !toRemove.includes(<string>role.name));
    }
    
    setTimeout(() => {
      if (this.inputItemEditFirstName) {
        this.inputItemEditFirstName.nativeElement.value = this.user.first_name;
      }

      if (this.inputItemEditLastName) {
        this.inputItemEditLastName.nativeElement.value = this.user.last_name;
      }

      if (this.inputItemEditEmail) {
        this.inputItemEditEmail.nativeElement.value = this.user.email;
      }

      if (this.inputItemEditAddress) {
        this.inputItemEditAddress.nativeElement.value = this.user.address;
      }

      if (this.inputItemEditPhone) {
        this.inputItemEditPhone.nativeElement.value = this.user.phone;
      }

      if (this.selectItemEditRole) {
        this.selectItemEditRole.nativeElement.value = this.user.id_role.name;
      }

      if (this.selectItemEditUserStatus) {
        this.selectItemEditUserStatus.nativeElement.value = this.user.id_user_status.name;
      }

      if (this.selectItemEditFaculty) {
        this.selectItemEditFaculty.nativeElement.value = this.userFaculty.id_faculty.name;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    if (!this.userFaculty) {
      this.isOnProfessor = false;
    } else {
      this.isOnProfessor = true;
    }

    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.addressError = '';
    this.phoneError = '';
    this.roleError = '';
    this.userStatusError = '';
    this.facultyError = '';
    this.enableEditItem = false;
  }

  public checkField(p1: string): string {

    if (p1.trim() === '') {
      return "No proporcionado";
    }

    return p1;
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

  public ngOnInputValidatePhone(): void {
    Utils.validatePhoneNumber(this.inputItemEditPhone.nativeElement)
  }

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.selectItemEditRole.nativeElement) {
      const role = this.selectItemEditRole.nativeElement.value;
      
      if (role === 'careerdirector' || role === 'professor') {
        this.isOnProfessor = true;
      } else {
        this.isOnProfessor = false;
      }
    }
  }
}
