import { Component, ElementRef, HostListener, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../architecture/service/auth.service';
import { UserService } from '../architecture/service/user.service';
import { User } from '../architecture/model/user';
import { Utils } from '../utils';
import { Role } from '../architecture/model/role';
import { RoleService } from '../architecture/service/role.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-user',
  standalone: false,
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{
  title: string = "Usuarios";
  pages: string;

  @ViewChild('buttonCreateUser') buttonCreateUser: ElementRef;
  @ViewChild('modalCreateUser') modalCreateUser: ElementRef;
  modalCreateUserInstance: any;

  @ViewChild('inputModalCreateUserUsername') inputModalCreateUserUsername: ElementRef;
  usernameError: String = '';
  @ViewChild('inputModalCreateUserPassword') inputModalCreateUserPassword: ElementRef;
  passwordError: string = '';
  @ViewChild('inputModalCreateUserEmail') inputModalCreateUserEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputModalCreateUserFirstName') inputModalCreateUserFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputModalCreateUserLastName') inputModalCreateUserLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('selectModalCreateUserRole') selectModalCreateUserRole: ElementRef;
  roleError: string = '';
  @ViewChild('buttonModalCreateUserCreate') buttonModalCreateUserCreate: ElementRef;

  roles: Role[];
  users: User[];

  pagination: number;
  paginationShowUsers: User[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  userRoles: string = 'community';

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    this.getAllRoles();

    this.pagination = 1;
    this.users = await this.userService.getAll();
    this.showPage(this.users, this.pagination, 10)
    this.paginationMax = this.getTotalPages(this.users, 10)
    this.paginationList = this.createRange(this.paginationMax);
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getAllRoles(): Promise<void> {
    const roles = await this.roleService.getAll();

    if (roles.ok) {
      this.roles = roles.message;
    } else {
      console.log(roles.error)
    }
  }

  ngOnUserDetails(user): void {
    this.router.navigate(['/panel/manage/user', user.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.showPage(this.users, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.showPage(this.users, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.showPage(this.users, index, 10)
    this.pagination = index;
    console.log(index);
  }

  showPage(list: User[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowUsers = list.slice(start, end);
    this.paginationLengh = this.paginationShowUsers.length;
  }

  getTotalPages(p1: User[], p2: number): number {
    return Math.ceil(p1.length / p2);
  }

  createRange(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  async ngOnCreateUser(user: User): Promise<void> {
    let success = 0;

    if (user.username.trim() === '') {
      this.usernameError = 'Debe ingresar un RUN'
    } else if (/[a-jl-zA-JL-Z]/.test(user.username)) {
      this.usernameError = 'El formato del RUN es inválido'
    } else if (Utils.cleanRUN(user.username).length < 8 || Utils.cleanRUN(user.username).length > 12) {
      this.usernameError = 'El RUN debe tener entre 8 y 12 caracteres'
    } else if (!Utils.validateRUN(user.username)) {
      this.usernameError = 'El RUN ingresado no es válido';
    } else {
      this.usernameError = '';
      success+= 1;
    }

    if (user.password === '') {
      this.passwordError = 'Debe ingresar una contraseña';
    } else {
      this.passwordError = '';
      success+= 1;
    }

    if (user.email.trim() === '') { 
      this.emailError = 'Debe ingresar un correo electronico';
    } else if (!user.email.includes('@') || !user.email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (user.first_name === '') {
      this.firstNameError = 'Debe ingresar nombres';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (user.last_name === '') {
      this.lastNameError = 'Debe ingresar apellidos';
    } else {
      this.lastNameError = '';
      success+= 1;
    }

    if (user.id_role.name === '') {
      this.roleError = 'Debe seleccionar un rol';
    } else {
      this.roleError = '';
      success+= 1;
    }
    
    if (success === 6) {
      const userCreated = await this.userService.create(user);

      if (userCreated.ok) {
        this.modalCreateUserInstance.hide();
        this.users.push(userCreated.message);
        console.log(this.users);
        this.showPage(this.users, this.pagination, 10);
      } else {

        if (Object.keys(userCreated.error).length > 0) {
          this.usernameError = userCreated.error.username;
          this.emailError = userCreated.error.email;
        }
      }
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    let username = this.inputModalCreateUserUsername.nativeElement as HTMLInputElement;

    if (event.target === username) {

      Utils.formatRUN(username);
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    if (this.buttonCreateUser && event.target === this.buttonCreateUser.nativeElement) {
      this.modalCreateUserInstance = new bootstrap.Modal(this.modalCreateUser.nativeElement);

      this.modalCreateUserInstance.show();
    }

    if (this.buttonModalCreateUserCreate && event.target === this.buttonModalCreateUserCreate.nativeElement) {
      const username = this.inputModalCreateUserUsername.nativeElement.value.toLowerCase();
      const password = this.inputModalCreateUserPassword.nativeElement.value
      const email = this.inputModalCreateUserEmail.nativeElement.value.toLowerCase();
      const firstName = this.inputModalCreateUserFirstName.nativeElement.value;
      const lastName = this.inputModalCreateUserLastName.nativeElement.value;
      const role = <Role>this.roles.find(role => role.name === this.selectModalCreateUserRole.nativeElement.value);
      //const user = new User(username, password, email, firstName, lastName, role);

      //this.ngOnCreateUser(user); DISLAIK
    }
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputModalCreateUserUsername.nativeElement.value = '';
    this.inputModalCreateUserPassword.nativeElement.value = '';
    this.inputModalCreateUserEmail.nativeElement.value = '';
    this.inputModalCreateUserFirstName.nativeElement.value = '';
    this.inputModalCreateUserLastName.nativeElement.value = '';
    this.selectModalCreateUserRole.nativeElement.value = '';
    this.usernameError = '';
    this.passwordError = '';
    this.emailError = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.roleError = '';
  }
}
