import { Component, ElementRef, HostListener, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../architecture/service/auth.service';
import { UserService } from '../../architecture/service/user.service';
import { User } from '../../architecture/model/user';
import { Utils } from '../../app.utils';
import { Role } from '../../architecture/model/role';
import { RoleService } from '../../architecture/service/role.service';
import { UserStatus } from '../../architecture/model/user-status';
import { UserStatusService } from '../../architecture/service/user-status.service';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from '../../architecture/model/faculty';
import { FacultyService } from '../../architecture/service/faculty.service';
import { UserFacultyService } from '../../architecture/service/user-faculty.service';
import { UserFaculty } from '../../architecture/model/user-faculty';

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
  isViewLoaded: boolean = false;
  browserUser: User;

  @ViewChild('modalCreateItem') modalCreateItem: ElementRef;
  modalCreateItemInstance: any;
  @ViewChild('inputSearchItem') inputSearchItem: ElementRef;

  @ViewChild('inputUsername') inputUsername: ElementRef;
  usernameError: String = '';
  @ViewChild('inputModalCreateItemPassword') inputModalCreateItemPassword: ElementRef;
  passwordError: string = '';
  @ViewChild('inputModalCreateItemEmail') inputModalCreateItemEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputModalCreateItemFirstName') inputModalCreateItemFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputModalCreateItemLastName') inputModalCreateItemLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('inputModalCreateItemAddress') inputModalCreateItemAddress: ElementRef;
  @ViewChild('inputModalCreateItemPhone') inputModalCreateItemPhone: ElementRef;
  @ViewChild('selectModalCreateItemRole') selectModalCreateItemRole: ElementRef;
  roleError: string = '';
  @ViewChild('selectModalCreateItemFaculty') selectModalCreateItemFaculty: ElementRef;
  facultyError: string = '';

  
  roles: Role[];
  userStatus: UserStatus[];
  users: User[];
  faculties: Faculty[];

  //// PAGINATION VARIABLES ////
  pagination: number;
  paginationItems: any[]
  paginationShowItems: any[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];
  paginationListShow: number[];
  paginationRow: number;
  isNavigationContainFirstPage: boolean;
  isNavigationContainLastPage: boolean;
  isOnFilter: boolean = false;
  //// PAGINATION VARIABLES ////

  isOnProfessor: boolean = false;


  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private userStatusService: UserStatusService,
    private facultyService: FacultyService,
    private userFacultyService: UserFacultyService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllRoles();
    this.getAllUserStatus();
    this.ngOnGetAllFaculties();
    this.ngOnCreatePagination(1, 10);
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: this.title, url: this.router.url},
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

  private async getAllUsers(): Promise<User[]> {
    const response = await this.userService.getAll();

    if (response.ok) {
      return response.message;
    } else {
      console.log(response.error)
    }

    return [];
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

  ///// PAGINATION START /////

  private async ngOnCreatePagination(p1: number, p2: number): Promise<void> {
    this.users = await this.getAllUsers();
    this.paginationItems = this.users;
    this.pagination = p1;
    this.paginationRow = p2;
    this.ngOnStartPagination(this.users);
    this.isNavigationContainFirstPage = false;
    
    if (this.paginationMax < 4) {
      this.isNavigationContainLastPage = true;
    } else {
      this.isNavigationContainLastPage = false;
    }

    this.isOnFilter = false;
    this.isViewLoaded = true;
  }

  private ngOnStartPagination(p1: any[]): void {
    this.ngOnShowPage(p1, this.pagination)
    this.paginationMax = this.getTotalPages(p1, this.paginationRow)
    this.paginationList = this.createRange(this.paginationMax);
    this.paginationListShow = this.paginationList.slice(0, 3);
  }

  public ngOnClearSearchItem(): void {
    this.inputSearchItem.nativeElement.value = '';
    this.pagination = 1;
    this.toastr.info('Se ha eliminado el filtrado');
    this.isOnFilter = false;
    this.paginationItems = this.users;
    this.ngOnStartPagination(this.paginationItems);
    this.ngOnNavigationStartEndPages();
  }

  public ngOnSearchItem(): void {
    const search = this.inputSearchItem.nativeElement.value;

    if (search === '') {
      this.pagination = 1;
      this.paginationItems = this.users;
      this.ngOnStartPagination(this.paginationItems);
      this.ngOnNavigationStartEndPages();
      this.toastr.info('Se ha eliminado el filtrado');
      this.isOnFilter = false;
    } else {
      this.pagination = 1;
      this.paginationItems = this.ngOnFilterPaginationItems(search);
      this.ngOnStartPagination(this.paginationItems);
      this.ngOnNavigationStartEndPages();
      this.toastr.info('Se ha aplicado el filtrado');
      this.isOnFilter = true;
    }

    this.ngOnNavigationStartEndPages();
  }

  private ngOnFilterPaginationItems(p1: string): any[] {
    return this.users.filter(user =>
      String(user.id).toLowerCase().includes(p1.toLowerCase()) ||
      user.username.toLowerCase().includes(p1.toLowerCase()) ||
      user.first_name.toLowerCase().includes(p1.toLowerCase()) ||
      user.last_name.toLowerCase().includes(p1.toLowerCase()) ||
      user.id_role.label.toLowerCase().includes(p1.toLowerCase()) ||
      user.id_user_status.label.toLowerCase().includes(p1.toLowerCase()) ||
      String(user.created_at).toLowerCase().includes(p1.toLowerCase()) ||
      user.email.toLowerCase().includes(p1.toLowerCase())
    );
  }

  public ngOnItemDetails(p1: any): void {
    this.router.navigate(['/panel/user', p1.id]);
  }

  public ngOnPaginationNext(): void {
    this.pagination += 1;

    this.ngOnShowPage(this.paginationItems, this.pagination)
    if (this.pagination >= 3 && this.pagination < this.paginationMax) {
      const newPaginationList = this.paginationListShow.map(page => page + 1);
      this.paginationListShow = newPaginationList
    }

    this.ngOnNavigationStartEndPages();
  }

  public ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.ngOnShowPage(this.paginationItems, this.pagination)
    
    if (this.pagination >= 2 && this.pagination !== this.paginationMax - 1) {
      const newPaginationList = this.paginationListShow.map(page => page - 1);
      this.paginationListShow = newPaginationList
    }

    this.ngOnNavigationStartEndPages();
  }

  public ngOnPaginationItem(p1: number): void {
    this.ngOnShowPage(this.paginationItems, p1)

    if (p1 === 1) {
      const firstElement = this.paginationListShow[0];
      const asd = firstElement - 1;
      const newPaginationList = this.paginationListShow.map(page => page - asd);

      this.paginationListShow = newPaginationList;
    } else if (this.pagination > p1) {
      if (p1 >= 2 && p1 !== this.paginationMax - 1) {
        const newPaginationList = this.paginationListShow.map(page => page - 1);
        this.paginationListShow = newPaginationList
      }
    } else if (p1 === this.paginationMax) {
      const lastElement = this.paginationListShow[this.paginationListShow.length - 1];
      const asd = this.paginationMax - lastElement; 
      const newPaginationList = this.paginationListShow.map(page => page + asd);

      this.paginationListShow = newPaginationList
    } else {
      if (p1 >= 3 && p1 < this.paginationMax) {
        const newPaginationList = this.paginationListShow.map(page => page + 1);
        this.paginationListShow = newPaginationList
      }
    }

    this.ngOnNavigationStartEndPages();

    this.pagination = p1;
  }

  private ngOnShowPage(p1: any[], p2: number): void {
    const start = (p2 - 1) * this.paginationRow;
    const end = start + this.paginationRow;
    
    this.paginationShowItems = p1.slice(start, end);
    this.paginationLengh = this.paginationShowItems.length;
  }

  private ngOnNavigationStartEndPages(): void {
    if (this.paginationListShow.includes(this.paginationMax)) {
      this.isNavigationContainLastPage = true;
    } else {
      this.isNavigationContainLastPage = false;
    }

    if (this.paginationListShow.includes(1)) {
      this.isNavigationContainFirstPage = true;
    } else {
      this.isNavigationContainFirstPage = false;
    }
  }

  private getTotalPages(p1: any[], p2: number): number {
    if (p1.length === 0) {
      return 1;
    }
    
    return Math.ceil(p1.length / p2);
  }

  private createRange(number){
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  ///// PAGINATION END /////

  ///// MODAL START ///// 

  public ngOnCreateModalItem(): void {
    this.modalCreateItemInstance = new bootstrap.Modal(this.modalCreateItem.nativeElement);

    this.modalCreateItemInstance.show();

    if (this.browserUser.id_role.name === 'dean') {
      const toRemove = ['admin', 'externalrelationscoordinator', 'externalrelations', 'dean'];
      this.roles = this.roles.filter(role => !toRemove.includes(<string>role.name));
    } else if (this.browserUser.id_role.name === "externalrelationscoordinator") {
      const toRemove = ['admin', 'externalrelationscoordinator'];
      this.roles = this.roles.filter(role => !toRemove.includes(<string>role.name));
    }
  } 

  public ngOnModelCreateItem(): void {
    const username = this.inputUsername.nativeElement.value.toLowerCase();
    const password = this.inputModalCreateItemPassword.nativeElement.value
    const email = this.inputModalCreateItemEmail.nativeElement.value.toLowerCase();
    const firstName = this.inputModalCreateItemFirstName.nativeElement.value;
    const lastName = this.inputModalCreateItemLastName.nativeElement.value;
    const address = this.inputModalCreateItemAddress.nativeElement.value;
    const phone = this.inputModalCreateItemPhone.nativeElement.value;
    const role = <Role>this.roles.find(role => role.name === this.selectModalCreateItemRole.nativeElement.value);
    const userStatus = <UserStatus>this.userStatus.find(status => status.id === 1);
    let faculty;
    let success = 0;

    if (this.selectModalCreateItemFaculty) {
      faculty = <Faculty>this.faculties.find(faculty => faculty.name === this.selectModalCreateItemFaculty.nativeElement.value);
    }

    if (username.trim() === '') {
      this.usernameError = 'Debe ingresar un RUN'
    } else if (/[a-jl-zA-JL-Z]/.test(username)) {
      this.usernameError = 'El formato del RUN es inválido'
    } else if (Utils.cleanRUN(username).length < 8 || Utils.cleanRUN(username).length > 12) {
      this.usernameError = 'El RUN debe tener entre 8 y 12 caracteres'
    } else if (!Utils.validateRUN(username)) {
      this.usernameError = 'El RUN ingresado no es válido';
    } else {
      this.usernameError = '';
      success+= 1;
    }

    if (password === '') {
      this.passwordError = 'Debe ingresar una contraseña';
    } else {
      this.passwordError = '';
      success+= 1;
    }

    if (email.trim() === '') { 
      this.emailError = 'Debe ingresar un correo electronico';
    } else if (!email.includes('@') || !email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (firstName === '') {
      this.firstNameError = 'Debe ingresar nombres';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (lastName === '') {
      this.lastNameError = 'Debe ingresar apellidos';
    } else {
      this.lastNameError = '';
      success+= 1;
    }

    if (!role) {
      this.roleError = 'Debe seleccionar un rol';
    } else {
      this.roleError = '';
      success+= 1;
    }

    if (this.isOnProfessor && !faculty) {
      this.facultyError = 'Debe seleccionar una facultad';

      return
    } else {
      this.facultyError = '';
    }

    if (success === 6) {
      const user = new User(username, password, email, firstName, lastName, address, phone, null, role, userStatus);
      this.ngOnCreateItem(user, faculty);
    }
  }

  private async ngOnCreateItem(user: User, faculty: Faculty): Promise<void> {
    const response = await this.userService.create(user);

    if (response.ok) {
      const user = response.message;
      this.modalCreateItemInstance.hide();
      this.users.push(user);
      this.ngOnShowPage(this.paginationItems, this.pagination);
      this.toastr.success('Se ha creado el usuario con exito');

      if (this.isOnProfessor) {
        const userFaculty = new UserFaculty(user, faculty)
        this.ngOnCreateUserFaculty(userFaculty);
      }
    } else {
      if (Object.keys(response.error.error).length > 0) {
        this.usernameError = response.error.error.username;
        this.emailError = response.error.error.email;
      }
    }
  }

  private async ngOnCreateUserFaculty(userFaculty: UserFaculty): Promise<void> {
    const response = await this.userFacultyService.create(userFaculty);

    if (response.ok) {
      console.log(response.message);
    } else {
      console.log(response.error)
    }
  }

  ///// MODAL END /////

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputUsername.nativeElement);
  }

  public ngOnInputValidatePhone(): void {
    Utils.validatePhoneNumber(this.inputModalCreateItemPhone.nativeElement)
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

    if (event.target === this.selectModalCreateItemRole.nativeElement) {
      const role = this.selectModalCreateItemRole.nativeElement.value;
      
      if (role === 'careerdirector' || role === 'professor') {
        this.isOnProfessor = true;
      } else {
        this.isOnProfessor = false;
      }
    }
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputUsername.nativeElement.value = '';
    this.inputModalCreateItemPassword.nativeElement.value = '';
    this.inputModalCreateItemEmail.nativeElement.value = '';
    this.inputModalCreateItemFirstName.nativeElement.value = '';
    this.inputModalCreateItemLastName.nativeElement.value = '';
    this.inputModalCreateItemAddress.nativeElement.value = '';
    this.inputModalCreateItemPhone.nativeElement.value = '';
    this.selectModalCreateItemRole.nativeElement.value = '';
    this.usernameError = '';
    this.passwordError = '';
    this.emailError = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.roleError = '';
  }
}
