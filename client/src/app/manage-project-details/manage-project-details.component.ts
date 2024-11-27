import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Project } from '../architecture/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../architecture/service/project.service';
import { APU } from '../architecture/model/apu';
import { ProjectAPU } from '../architecture/model/project-apu';
import { APUService } from '../architecture/service/apu.service';
import { ProjectAPUService } from '../architecture/service/project-apu.service';
import { APUResource } from '../architecture/model/apuresource';
import { APUResourceService } from '../architecture/service/apuresource.service';
import { Utils } from '../utils';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ProjectStatus } from '../architecture/model/project-status';
import { City } from '../architecture/model/city';
import { ProjectStatusService } from '../architecture/service/project-status.service';
import { CityService } from '../architecture/service/city.service';
import { CareerService } from '../architecture/service/career.service';
import { Career } from '../architecture/model/career';
import { QuotationService } from '../architecture/service/quotation.service';
import { Quotation } from '../architecture/model/quotation';
import { QuotationStatusService } from '../architecture/service/quotation-status.service';
import { QuotationStatus } from '../architecture/model/quotation-status';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { ProjectUserService } from '../architecture/service/project-user.service';
import { ProjectUser } from '../architecture/model/project-user';
import { ProjectVolunteerStudent } from '../architecture/model/project-volunteer-student';
import { ProjectVolunteerStudentService } from '../architecture/service/project-volunteer-student.service';
import { VolunteerStudent } from '../architecture/model/volunteer-student';
import { VolunteerStudentService } from '../architecture/service/volunteer-student.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-project-details',
  standalone: false,
  templateUrl: './manage-project-details.component.html',
  styleUrl: './manage-project-details.component.css'
})
export class ManageProjectDetailsComponent implements OnInit {
  title: string = "Detalles del proyecto";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  existsQuotation: boolean = false;
  browserUser: User;

  //// GET PROFESSORS MODAL ////
  @ViewChild('modalAddProfessor') modalAddProfessor: ElementRef;
  modalAddProfessorInstance: any;
  @ViewChild('modalListProfessors') modalListProfessors: ElementRef;

  @ViewChild('modalAddVolunteerStudent') modalAddVolunteerStudent: ElementRef;
  modalAddVolunteerStudentInstance: any;
  @ViewChild('modalListVolunteerStudent') modalListVolunteerStudent: ElementRef;

  professors: User[];
  buttonProfessors: any[] = [];
  projectUsers: ProjectUser[];
  projectUsersAUX: ProjectUser[];

  volunteerStudents: VolunteerStudent[];
  buttonVolunteerStudents: any[] = [];
  projectVolunterStudents: ProjectVolunteerStudent[];
  projectVolunterStudentsAUX: ProjectVolunteerStudent[];

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditDescription') inputItemEditDescription: ElementRef;
  descriptionError: string = '';
  @ViewChild('selectItemEditProjectStatus') selectItemEditProjectStatus: ElementRef;
  @ViewChild('selectItemEditCity') selectItemEditCity: ElementRef;
  @ViewChild('selectItemEditCareer') selectItemEditCareer: ElementRef;
  @ViewChild('inputItemEditStartDate') inputItemEditStartDate: ElementRef;
  startDateError: string = '';
  @ViewChild('inputItemEditEndDate') inputItemEditEndDate: ElementRef;
  endDateError: string = '';


  project: Project;
  projectStatus: ProjectStatus[];
  cities: City[];
  careers: Career[];
  apus: APU[];
  projectAPUs: ProjectAPU[];
  quotation: Quotation;
  quotationStatus: QuotationStatus[];
  apuResources: {};


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private projectService: ProjectService,
    private projectStatusService: ProjectStatusService,
    private cityService: CityService,
    private careerService: CareerService,
    private quotationService: QuotationService,
    private projectUserService: ProjectUserService,
    private quotationStatusService: QuotationStatusService,
    private volunteerStudentService: VolunteerStudentService,
    private projectVolunteerStudentService: ProjectVolunteerStudentService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.ngOnGetProject();
    this.ngOnGetAllProjectStatus();
    this.getAllCities();
    this.getAllCareers()
    this.getAllQuotationStatus()
    this.getQuotationByProjectId();
    this.ngOnGetAllProfessors();
    this.ngGetAllVolunteerStudents();
    this.ngOnGetProfessorsByProjectId();
    this.ngOnGetVolunteerStudentsByProjectId();
    this.apuResources = {}
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Proyectos', url: '/panel/project'},
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

  private async ngOnGetProject(): Promise<void> {
    const response = await this.projectService.getById(this.id);

    if (response.ok) {
      this.project = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllProjectStatus(): Promise<void> {
    const response = await this.projectStatusService.getAll();

    if (response.ok) {
      this.projectStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllCities(): Promise<void> {
    const response = await this.cityService.getAll();

    if (response.ok) {
      this.cities = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllCareers(): Promise<void> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      this.careers = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllQuotationStatus(): Promise<void> {
    const response = await this.quotationStatusService.getAll();

    if (response.ok) {
      this.quotationStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getQuotationByProjectId(): Promise<void> {
    const response = await this.quotationService.getByProjectId(this.id);

    if (response.ok) {
      this.quotation = response.message;

      if (this.quotation) {
        this.existsQuotation = true;
      }
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllProfessors(): Promise<void> {
    const response = await this.userService.getAll();

    if (response.ok) {
      const users = response.message;
      this.professors = users.filter(user => user.id_role.name === 'professor' || user.id_role.name === 'careerdirector');
    } else {
      console.log(response.error);
    }
  }

  private async ngGetAllVolunteerStudents(): Promise<void> {
    const response = await this.volunteerStudentService.getAll();

    if (response.ok) {
      this.volunteerStudents = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetProfessorsByProjectId(): Promise<void> {
    const response = await this.projectUserService.getByProjectId(this.id);

    if (response.ok) {
      this.projectUsers = response.message;
      this.projectUsersAUX = [...this.projectUsers] // LITTLE HACK
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetVolunteerStudentsByProjectId(): Promise<void> {
    const response = await this.projectVolunteerStudentService.getByProjectId(this.id);

    if (response.ok) {
      this.projectVolunterStudents = response.message;
      this.projectVolunterStudentsAUX = [...this.projectVolunterStudents]
    } else {
      console.log(response.error)
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.project.name;
      }

      if (this.inputItemEditDescription) {
        this.inputItemEditDescription.nativeElement.value = this.project.description;
      }

      if (this.selectItemEditProjectStatus) {
        this.selectItemEditProjectStatus.nativeElement.value = this.project.id_projectStatus.name;
      }

      if (this.inputItemEditStartDate) {
        const date = this.UTCToChileTime(this.project.start_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditStartDate.nativeElement.value = dateInverted;
      }

      if (this.inputItemEditEndDate) {
        const date = this.UTCToChileTime(this.project.end_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditEndDate.nativeElement.value = dateInverted;
      }

      if (this.selectItemEditCity) {
        this.selectItemEditCity.nativeElement.value = this.project.id_city.name
      }
    });

    if (this.buttonProfessors.length === 0) {
      const HTMLElements = this.modalListProfessors.nativeElement as HTMLElement;

      for (let i = 0; i < HTMLElements.childNodes.length - 1; i++) {
        const element = HTMLElements.childNodes[i];
        this.buttonProfessors.push(element.childNodes[0] as HTMLButtonElement);
      }
    }

    if (this.buttonVolunteerStudents.length === 0) {
      const HTMLElements = this.modalListVolunteerStudent.nativeElement as HTMLElement;

      for (let i = 0; i < HTMLElements.childNodes.length - 1; i++) {
        const element = HTMLElements.childNodes[i];
        this.buttonVolunteerStudents.push(element.childNodes[0] as HTMLButtonElement);
      }
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const description = this.inputItemEditDescription.nativeElement.value;
    const projectStatus = this.projectStatus.find(status => status.name === this.selectItemEditProjectStatus.nativeElement.value); 
    const startDate = this.inputItemEditStartDate.nativeElement.value;
    const endDate = this.inputItemEditEndDate.nativeElement.value;
    const city = this.cities.find(city => city.name === this.selectItemEditCity.nativeElement.value);  
    const career = this.careers.find(career => career.name === this.selectItemEditCareer.nativeElement.value);  
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un nombre';
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (description.trim() === '') {
      this.descriptionError = 'Debe ingresar una etiqueta';
    } else {
      this.descriptionError = '';
      success+= 1;
    }

    if (startDate.trim() === '') {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else {
      this.startDateError = '';
      success+= 1;
    }

    if (endDate.trim() === '') {
      this.endDateError = 'Debe especificar una fecha de termino';
    } else if (new Date(startDate) > new Date(endDate) ) {
      this.endDateError = 'La fecha de termino no puede ser una fecha anterior a la fecha de inicio';
    } else {
      this.endDateError = '';
      success+= 1;
    }

    if (success === 4) {
      this.project.name = name;
      this.project.description = description;
      this.project.id_projectStatus = projectStatus;
      this.project.start_date = new Date(startDate + "T00:00:00");
      this.project.end_date = new Date(endDate + "T00:00:00");
      this.project.id_city = city;
      this.project.id_career = career;

      const response = await this.projectService.update(this.project.id, this.project);

      if (response.ok) {

        if (!this.compareListsUsers(this.projectUsersAUX, this.projectUsers)) {
          let removed = '';
          let added = '';

          for (let i = 0; i < this.projectUsers.length; i++) {
            const element = this.projectUsers[i];
            const response = await this.projectUserService.delete(element.id);

            if (response.ok) {
              if (i === this.projectUsers.length - 1) {
                removed += element.id_user.first_name + ' ';
              } else {
                removed += element.id_user.first_name + ', ';
              }
            } else {
              console.log(response.error)
            }            
          }
          // this.toastr.success('Se han eliminado los siguientes recursos [' + removed + '] de la APU');
          this.projectUsers = [];

          for (let i = 0; i < this.projectUsersAUX.length; i++) {
            const element = this.projectUsersAUX[i];
            const response = await this.projectUserService.create(element);
            
            if (response.ok) {
              if (i === this.projectUsersAUX.length - 1) {
                added += element.id_user.first_name + ' ';
              } else {
                added += element.id_user.first_name + ', ';
              }

              this.projectUsers.push(response.message)
            } else {
              console.log(response.error)
            }
          }
          // this.toastr.success('Se han agregado los siguientes recursos [' + removed + '] a la APU');
          this.projectUsersAUX = [...this.projectUsers];
        }

        if (!this.compareListsVolunteerStudents(this.projectVolunterStudentsAUX, this.projectVolunterStudents)) {
          let removed = '';
          let added = '';

          for (let i = 0; i < this.projectVolunterStudents.length; i++) {
            const element = this.projectVolunterStudents[i];
            const response = await this.projectVolunteerStudentService.delete(element.id);

            if (response.ok) {
              if (i === this.projectVolunterStudents.length - 1) {
                removed += element.id_volunteer_student.first_name + ' ';
              } else {
                removed += element.id_volunteer_student.first_name + ', ';
              }
            } else {
              console.log(response.error)
            }            
          }
          // this.toastr.success('Se han eliminado los siguientes recursos [' + removed + '] de la APU');
          this.projectVolunterStudents = [];

          for (let i = 0; i < this.projectVolunterStudentsAUX.length; i++) {
            const element = this.projectVolunterStudentsAUX[i];
            const response = await this.projectVolunteerStudentService.create(element);
            
            if (response.ok) {
              if (i === this.projectUsersAUX.length - 1) {
                added += element.id_volunteer_student.first_name + ' ';
              } else {
                added += element.id_volunteer_student.first_name + ', ';
              }

              this.projectVolunterStudents.push(response.message)
            } else {
              console.log(response.error)
            }
          }
          // this.toastr.success('Se han agregado los siguientes recursos [' + removed + '] a la APU');
          this.projectVolunterStudentsAUX = [...this.projectVolunterStudents];
        }

        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
          Swal.fire('El proyecto no puede ser eliminado debio a tablas relacionadas', '', 'warning');
        }
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.descriptionError = '';
    this.startDateError = '';
    this.endDateError = '';
    this.clearProjectUserAUX(true);
    this.clearProjectVolunteerStudentAUX(true);
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.projectService.delete(this.project.id)

        if (response.ok) {
          Swal.fire('Proyecto eliminado', '', 'success');

          this.router.navigate(['/panel/project']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('El proyecto no puede ser eliminada debio a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public ngOnCreateQuotation(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres crear una cotización?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const quotationStatus = this.quotationStatus.find(status => status.name === 'waiting'); 
        const quotation = new Quotation(this.project, quotationStatus, new Date(), new Date());
        const response = await this.quotationService.create(quotation)

        if (response.ok) {
          Swal.fire('Cotización Creada', '', 'success');
          this.quotation = response.message;
          this.router.navigate(['/panel/quotation/' + this.quotation.id]);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('El proyecto no puede ser eliminado debio a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public ngOnGoQuotation(): void {
    this.router.navigate(['/panel/quotation/' + this.quotation.id]);
  }

  public ngOnCreateModalAddProfessor(): void {
    this.modalAddProfessorInstance = new bootstrap.Modal(this.modalAddProfessor.nativeElement);
    this.modalAddProfessorInstance.show();
  }

  public ngOnModalAddProfessor(user: User) : void {
    const projectUser = new ProjectUser(this.project, user);
    const buttonElement = this.buttonProfessors.find(button => Number(button.getAttribute('data-user-id')) === user.id);

    buttonElement.disabled = true;
    this.projectUsersAUX.push(projectUser);
  }

  public ngOnCreateModalAddVolunteerStudent(): void {
    this.modalAddVolunteerStudentInstance = new bootstrap.Modal(this.modalAddVolunteerStudent.nativeElement);
    this.modalAddVolunteerStudentInstance.show();
  }

  public ngOnRemoveProfessor(projectUser: ProjectUser): void {
    const userId = projectUser.id_user.id;
    const index = this.projectUsersAUX.findIndex(element => element.id_user.id === userId);

    if (index !== -1) {
      this.projectUsersAUX.splice(index, 1);
    }

    this.buttonProfessors.forEach(element => {
      if (Number(element.getAttribute('data-user-id')) === userId) {
        element.disabled = false;
      }
    });
  }

  public ngOnModalAddVolunteerStudent(volunteerStudent: VolunteerStudent) : void {
    const projectVolunteerStudent = new ProjectVolunteerStudent(this.project, volunteerStudent);
    const buttonElement = this.buttonVolunteerStudents.find(button => Number(button.getAttribute('data-volunteer-student-id')) === volunteerStudent.id);

    buttonElement.disabled = true;
    this.projectVolunterStudentsAUX.push(projectVolunteerStudent);
  }

  public ngOnRemoveVolunteerStudent(projectVolunteerStudent: ProjectVolunteerStudent): void {
    const volunteerStudentId = projectVolunteerStudent.id_volunteer_student.id;
    const index = this.projectVolunterStudentsAUX.findIndex(element => element.id_volunteer_student.id === volunteerStudentId);

    if (index !== -1) {
      this.projectVolunterStudentsAUX.splice(index, 1);
    }

    this.buttonVolunteerStudents.forEach(element => {
      if (Number(element.getAttribute('data-volunteer-student-id')) === volunteerStudentId) {
        element.disabled = false;
      }
    });
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  private clearProjectUserAUX(p1: boolean): void {
    const compare = this.buttonProfessors.filter(item1 => this.projectUsersAUX.some(item2 => Number(item1.getAttribute('data-user-id')) === item2.id_user.id));

    compare.forEach(button => {
      button.disabled = false;
    });

    if (p1) {
      this.projectUsersAUX = [...this.projectUsers];
    }
  }

  private clearProjectVolunteerStudentAUX(p1: boolean): void {
    const compare = this.buttonVolunteerStudents.filter(item1 => this.projectVolunterStudentsAUX.some(item2 => Number(item1.getAttribute('data-volunteer-student-id')) === item2.id_volunteer_student.id));

    compare.forEach(button => {
      button.disabled = false;
    });

    if (p1) {
      this.projectVolunterStudentsAUX = [...this.projectVolunterStudents];
    }
  }

  private compareListsUsers(p1: any[], p2: any[]): boolean {
    if (p1.length !== p2.length) {
      return false;
    }
  
    for (let i = 0; i < p1.length; i++) {
      if (p1[i].id_user.id !== p2[i].id_user.id) {
        return false;
      }
    }

    return true
  }

  private compareListsVolunteerStudents(p1: any[], p2: any[]): boolean {
    if (p1.length !== p2.length) {
      return false;
    }
  
    for (let i = 0; i < p1.length; i++) {
      if (p1[i].id_volunteer_student.id !== p2[i].id_volunteer_student.id) {
        return false;
      }
    }

    return true
  }

  public haveRole(p1: any[]) {
    return Utils.haveRole(this.browserUser, p1)
  }

  @HostListener('document:show.bs.modal', ['$event']) onModalClick(event: Event) {
    const compare = this.buttonVolunteerStudents.filter(item1 => this.projectVolunterStudentsAUX.some(item2 => Number(item1.getAttribute('data-volunteer-student-id')) === item2.id_volunteer_student.id));
    const compare2 = this.buttonProfessors.filter(item1 => this.projectUsersAUX.some(item2 => Number(item1.getAttribute('data-user-id')) === item2.id_user.id));
    
    compare2.forEach(button => {
      button.disabled = true;
    });

    compare.forEach(button => {
      button.disabled = true;
    });
  }
}
