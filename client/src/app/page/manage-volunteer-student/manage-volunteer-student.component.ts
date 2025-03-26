import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerStudent } from '../../architecture/model/volunteer-student';
import { ToastrService } from 'ngx-toastr';
import { VolunteerStudentService } from '../../architecture/service/volunteer-student.service';
import { Utils } from '../../app.utils';
import { UserStatusService } from '../../architecture/service/user-status.service';
import { UserStatus } from '../../architecture/model/user-status';
import { User } from '../../architecture/model/user';
import { UserService } from '../../architecture/service/user.service';
import { Headquarter } from '../../architecture/model/headquarter';
import { Faculty } from '../../architecture/model/faculty';
import { Career } from '../../architecture/model/career';
import { HeadquarterService } from '../../architecture/service/headquarter.service';
import { FacultyService } from '../../architecture/service/faculty.service';
import { CareerService } from '../../architecture/service/career.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-volunteer-student',
  standalone: false,
  templateUrl: './manage-volunteer-student.component.html',
  styleUrl: './manage-volunteer-student.component.css'
})
export class ManageVolunteerStudentComponent implements OnInit {
  title: string = "Alumnos voluntarios";
  pages: string;
  isViewLoaded: boolean = false;
  browserUser: User;

  @ViewChild('modalCreateItem') modalCreateItem: ElementRef;
  modalCreateItemInstance: any;
  @ViewChild('inputSearchItem') inputSearchItem: ElementRef;


  @ViewChild('inputRUN') inputRUN: ElementRef;
  runError: string = '';
  @ViewChild('inputEmail') inputEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputFirstName') inputFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputLastName') inputLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('selectItemEditHeadquarter') selectItemEditHeadquarter: ElementRef;
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;
  @ViewChild('selectItemEditCareer') selectItemEditCareer: ElementRef;
  careerError: string = '';



  volunteerStudents: VolunteerStudent[];
  userStatus: UserStatus[];

  headquarters: Headquarter[];
  faculties: Faculty[];
  careers: Career[];

  careersAUX: Career[];


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
  isOnFilter: boolean;
  //// PAGINATION VARIABLES ////

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private userStatusService: UserStatusService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService,
    private careerService: CareerService,
    private volunteerStudentService: VolunteerStudentService
  ){}

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getAllUserStatus();
    this.ngOnGetAllHeadquarters();
    this.ngOnGetAllFaculties();
    this.ngOnGetAllCareers();
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

  private async getAllUserStatus(): Promise<void> {
    const response = await this.userStatusService.getAll();

    if (response.ok) {
      this.userStatus = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetAllHeadquarters(): Promise<void> {
    const response = await this.headquarterService.getAll();

    if (response.ok) {
      this.headquarters = response.message;
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

  private async ngOnGetAllCareers(): Promise<void> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      this.careers = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllVolunteerStudents(): Promise<VolunteerStudent[]> {
    const response = await this.volunteerStudentService.getAll();

    if (response.ok) {
      return response.message
    } else {
      console.log(response.error)
    }

    return [];
  }

  ///// PAGINATION START /////

  private async ngOnCreatePagination(p1: number, p2: number): Promise<void> {
    this.volunteerStudents = await this.getAllVolunteerStudents();
    this.paginationItems = this.volunteerStudents;
    this.pagination = p1;
    this.paginationRow = p2;
    this.ngOnStartPagination(this.paginationItems);
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
    this.paginationItems = this.volunteerStudents;
    this.ngOnStartPagination(this.paginationItems);
    this.ngOnNavigationStartEndPages();
  }

  public ngOnSearchItem(): void {
    const search = this.inputSearchItem.nativeElement.value;

    if (search === '') {
      this.pagination = 1;
      this.paginationItems = this.volunteerStudents;
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
    return this.volunteerStudents.filter(student =>
      String(student.id).toLowerCase().includes(p1.toLowerCase()) ||
      student.run.toLowerCase().includes(p1.toLowerCase()) ||
      student.first_name.toLowerCase().includes(p1.toLowerCase()) ||
      student.last_name.toLowerCase().includes(p1.toLowerCase()) ||
      student.email.toLowerCase().includes(p1.toLowerCase()) ||
      student.id_user_status.label.toLowerCase().includes(p1.toLowerCase()) ||
      student.id_career.label.toLowerCase().includes(p1.toLowerCase())
    );
  }

  public ngOnItemDetails(p1: any): void {
    this.router.navigate(['/panel/volunteer-student', p1.id]);
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

  public ngOnCreateModalItem(): void {
    this.modalCreateItemInstance = new bootstrap.Modal(this.modalCreateItem.nativeElement);

    this.modalCreateItemInstance.show();
  }

  public ngOnModelCreateItem(): void {
    const run = this.inputRUN.nativeElement.value.toLowerCase();
    const email = this.inputEmail.nativeElement.value
    const firstName = this.inputFirstName.nativeElement.value;
    const lastName = this.inputLastName.nativeElement.value;
    const status = this.userStatus.find(status => status.name === 'active');
    const career = this.careers.find(career => career.name === this.selectItemEditCareer.nativeElement.value);
    let success = 0;

    if (run.trim() === '') {
      this.runError = 'Debe ingresar un RUN'
    } else if (/[a-jl-zA-JL-Z]/.test(run)) {
      this.runError = 'El formato del RUN es inválido'
    } else if (Utils.cleanRUN(run).length < 8 || Utils.cleanRUN(run).length > 12) {
      this.runError = 'El RUN debe tener entre 8 y 12 caracteres'
    } else if (!Utils.validateRUN(run)) {
      this.runError = 'El RUN ingresado no es válido';
    } else {
      this.runError = '';
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

    if (success === 5) {
      const volunteerStudent = new VolunteerStudent(run, email, firstName, lastName, status, career, new Date());

      this.ngOnCreateItem(volunteerStudent);
    }
  }

  private async ngOnCreateItem(p1: VolunteerStudent): Promise<void> {
    const response = await this.volunteerStudentService.create(p1);

    if (response.ok) {
      this.modalCreateItemInstance.hide();
      this.volunteerStudents.push(response.message);
      this.ngOnShowPage(this.paginationItems, this.pagination);
      this.toastr.success('Se ha creado al alumno con exito');
    } else {
      if (Object.keys(response.error.error).length > 0) {
        this.runError = response.error.error.run;
        this.emailError = response.error.error.email;
      }
    }
  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputRUN.nativeElement);
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

  @HostListener('document:show.bs.modal', ['$event']) onModalClickShow(event: Event) {
    
    this.careersAUX = this.careers.filter(career => career.id_headquarter.name === this.selectItemEditHeadquarter.nativeElement.value && career.id_faculty.name === this.selectItemEditFaculty.nativeElement.value);
    this.selectItemEditCareer.nativeElement.value = this.careersAUX[0].name;
    this.selectItemEditCareer.nativeElement.disabled = false;
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClickHidden(event: Event) {
    this.inputRUN.nativeElement.value = '';
    this.inputEmail.nativeElement.value = '';
    this.inputFirstName.nativeElement.value = '';
    this.inputLastName.nativeElement.value = '';
    this.selectItemEditHeadquarter.nativeElement.value = this.headquarters[0].name;
    this.selectItemEditFaculty.nativeElement.value = this.faculties[0].name;
    this.runError = '';
    this.emailError = '';
    this.firstNameError = '';
    this.lastNameError = '';
  }
}
