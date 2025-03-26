import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../architecture/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../architecture/service/project.service';
import { APU } from '../../architecture/model/apu';
import { ProjectAPU } from '../../architecture/model/project-apu';
import { Utils } from '../../app.utils';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ProjectStatus } from '../../architecture/model/project-status';
import { City } from '../../architecture/model/city';
import { ProjectStatusService } from '../../architecture/service/project-status.service';
import { CityService } from '../../architecture/service/city.service';
import { CareerService } from '../../architecture/service/career.service';
import { Career } from '../../architecture/model/career';
import { QuotationService } from '../../architecture/service/quotation.service';
import { Quotation } from '../../architecture/model/quotation';
import { QuotationStatusService } from '../../architecture/service/quotation-status.service';
import { QuotationStatus } from '../../architecture/model/quotation-status';
import { User } from '../../architecture/model/user';
import { UserService } from '../../architecture/service/user.service';
import { ProjectUserService } from '../../architecture/service/project-user.service';
import { ProjectUser } from '../../architecture/model/project-user';
import { ProjectVolunteerStudent } from '../../architecture/model/project-volunteer-student';
import { ProjectVolunteerStudentService } from '../../architecture/service/project-volunteer-student.service';
import { VolunteerStudent } from '../../architecture/model/volunteer-student';
import { VolunteerStudentService } from '../../architecture/service/volunteer-student.service';
import { Region } from '../../architecture/model/region';
import { RegionService } from '../../architecture/service/region.service';
import { Headquarter } from '../../architecture/model/headquarter';
import { Faculty } from '../../architecture/model/faculty';
import { HeadquarterService } from '../../architecture/service/headquarter.service';
import { FacultyService } from '../../architecture/service/faculty.service';
import { UserFaculty } from '../../architecture/model/user-faculty';
import { UserFacultyService } from '../../architecture/service/user-faculty.service';

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
  @ViewChild('inputSearchProfessor') inputSearchProfessor: ElementRef;

  @ViewChild('modalAddVolunteerStudent') modalAddVolunteerStudent: ElementRef;
  modalAddVolunteerStudentInstance: any;
  @ViewChild('modalListVolunteerStudent') modalListVolunteerStudent: ElementRef;
  @ViewChild('inputSearchVolunteerStudent') inputSearchVolunteerStudent: ElementRef;

  professors: User[]; // remove
  userFaculty: UserFaculty[];

  buttonProfessors: any[] = [];
  projectUsers: ProjectUser[];
  projectUsersAUX: ProjectUser[];

  volunteerStudents: VolunteerStudent[];
  buttonVolunteerStudents: any[] = [];
  buttonVolunteerStudentsAUX: any[] = [];
  
  projectVolunterStudents: ProjectVolunteerStudent[];
  projectVolunterStudentsAUX: ProjectVolunteerStudent[];

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditDescription') inputItemEditDescription: ElementRef;
  descriptionError: string = '';
  @ViewChild('selectItemEditProjectStatus') selectItemEditProjectStatus: ElementRef;
  @ViewChild('inputItemEditStartDate') inputItemEditStartDate: ElementRef;
  startDateError: string = '';
  @ViewChild('inputItemEditEndDate') inputItemEditEndDate: ElementRef;
  endDateError: string = '';
  @ViewChild('selectItemEditRegion') selectItemEditRegion: ElementRef;
  @ViewChild('selectItemEditCity') selectItemEditCity: ElementRef;
  @ViewChild('selectItemEditHeadquarter') selectItemEditHeadquarter: ElementRef;
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;
  @ViewChild('selectItemEditCareer') selectItemEditCareer: ElementRef;
  careerError: string = '';


  project: Project;
  projectStatus: ProjectStatus[];
  regions: Region[];
  cities: City[];
  headquarters: Headquarter[];
  faculties: Faculty[];
  careers: Career[];
  apus: APU[];
  projectAPUs: ProjectAPU[];
  quotation: Quotation;
  quotationStatus: QuotationStatus[];
  apuResources: {};

  citiesAUX: Region[];
  careersAUX: Career[];


  isOnFilter: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private projectService: ProjectService,
    private projectStatusService: ProjectStatusService,
    private regionService: RegionService,
    private cityService: CityService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService,
    private careerService: CareerService,
    private quotationService: QuotationService,
    private projectUserService: ProjectUserService,
    private quotationStatusService: QuotationStatusService,
    private volunteerStudentService: VolunteerStudentService,
    private projectVolunteerStudentService: ProjectVolunteerStudentService,
    private userFacultyService: UserFacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.ngOnCreateBreadCrumb();
    this.ngOnGetUserByBrowser();
    this.ngOnGetProject();
    this.ngOnGetAllProjectStatus();
    this.ngOnGetAllRegions();
    this.ngOnGetAllCities();
    this.ngOnGetAllHeadquarters();
    this.ngOnGetAllFaculties();
    this.ngOnGetAllCareers()
    this.ngOnGetAllQuotationStatus()
    this.ngOnGetQuotationByProjectId();
    this.ngOnGetAllProfessors();
    this.ngGetAllVolunteerStudents();
    this.ngOnGetProfessorsByProjectId();
    this.ngOnGetVolunteerStudentsByProjectId();
    this.apuResources = {}
  }

  private ngOnCreateBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Proyectos', url: '/panel/project'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async ngOnGetUserByBrowser(): Promise<void> {
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

  private async ngOnGetAllRegions(): Promise<void> {
    const response = await this.regionService.getAll();

    if (response.ok) {
      this.regions = response.message;
    } else {
      console.log(response.error);
    }
  }


  private async ngOnGetAllCities(): Promise<void> {
    const response = await this.cityService.getAll();

    if (response.ok) {
      this.cities = response.message;
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

  private async ngOnGetAllQuotationStatus(): Promise<void> {
    const response = await this.quotationStatusService.getAll();

    if (response.ok) {
      this.quotationStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetQuotationByProjectId(): Promise<void> {
    const response = await this.quotationService.getByProjectId(this.id);

    if (response.ok) {
      this.quotation = response.message;

      if (this.quotation) {
        this.existsQuotation = true;
        console.log(this.existsQuotation)
      }
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllProfessors(): Promise<void> {
    const response = await this.userFacultyService.getAll();

    if (response.ok) {
      this.userFaculty = response.message;
      console.log(this.userFaculty)
    } else {
      console.log(response.error);
    }

    // const response = await this.userService.getAll();

    // if (response.ok) {
    //   const users = response.message;
    //   this.professors = users.filter(user => user.id_role.name === 'professor' || user.id_role.name === 'careerdirector');
    // } else {
    //   console.log(response.error);
    // }
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

      if (this.selectItemEditRegion) {
        this.selectItemEditRegion.nativeElement.value = this.project.id_city.id_region.name;
      }


      if (this.selectItemEditCity) {
        this.citiesAUX = this.cities.filter(city => city.id_region.name === this.selectItemEditRegion.nativeElement.value);

        setTimeout(() => {
          this.selectItemEditCity.nativeElement.value = this.project.id_city.name;
        });
      }

      if (this.selectItemEditHeadquarter) {
        this.selectItemEditHeadquarter.nativeElement.value = this.project.id_career.id_headquarter.name;
      }

      if (this.selectItemEditFaculty) {
        this.selectItemEditFaculty.nativeElement.value = this.project.id_career.id_faculty.name;
      }

      if (this.selectItemEditCareer) {
        this.careersAUX = this.careers.filter(career => career.id_headquarter.name === this.selectItemEditHeadquarter.nativeElement.value && career.id_faculty.name === this.selectItemEditFaculty.nativeElement.value);

        setTimeout(() => {
          this.selectItemEditCareer.nativeElement.value = this.project.id_career.name;
        });
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
    const startDate = new Date(`${this.inputItemEditStartDate.nativeElement.value}T00:00:00`);
    const endDate = new Date(`${this.inputItemEditEndDate.nativeElement.value}T00:00:00`);
    const city = this.cities.find(city => city.name === this.selectItemEditCity.nativeElement.value);  
    const career = this.careers.find(career => career.name === this.selectItemEditCareer.nativeElement.value);
    const todayDate = new Date();
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

    todayDate.setHours(0, 0, 0, 0);

    if (startDate.toString() === 'Invalid Date') {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else if (startDate <= todayDate) {
      this.startDateError = 'La fecha de inicio no puede ser una fecha anterior o igual a la de hoy';
    } else {
      this.startDateError = '';
      success+= 1;
    }

    if (endDate.toString() === 'Invalid Date') {
      this.endDateError = 'Debe especificar una fecha de termino';
    } else if (startDate > endDate) {
      this.endDateError = 'La fecha de termino no puede ser una fecha anterior a la fecha de inicio';
    } else {
      this.endDateError = '';
      success+= 1;
    }

    if (career === undefined) {
      this.careerError = 'No hay carreras disponibles, elige otra sede o facultad'
    } else {
      this.careerError = '';
      success+= 1;
    }

    if (success === 5) {
      this.project.name = name;
      this.project.description = description;
      this.project.id_projectStatus = projectStatus;
      this.project.start_date = startDate
      this.project.end_date = endDate
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
          Swal.fire('El proyecto no puede ser eliminado debido a tablas relacionadas', '', 'warning');
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
    this.careerError = '';
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
            Swal.fire('El proyecto no puede ser eliminada debido a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public ngOnCreateQuotation(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres generar una cotización?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const quotationStatus = this.quotationStatus.find(status => status.name === 'waiting'); 
        const quotation = new Quotation(this.project, quotationStatus, new Date(), new Date(), 0, new Date());
        const response = await this.quotationService.create(quotation)

        if (response.ok) {
          Swal.fire('¡Cotización generada!', '', 'success');
          this.quotation = response.message;
          this.router.navigate(['/panel/quotation/' + this.quotation.id]);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('El proyecto no puede ser eliminado debido a tablas relacionadas', '', 'warning');
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

  public ngOnModalAddProfessor(userFaculty: UserFaculty) : void {
    const projectUser = new ProjectUser(this.project, userFaculty.id_user, userFaculty.id_faculty);
    const buttonElement = this.buttonProfessors.find(button => Number(button.getAttribute('data-professor-id')) === userFaculty.id_user.id);

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
      if (Number(element.getAttribute('data-professor-id')) === userId) {
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
    const compare = this.buttonProfessors.filter(item1 => this.projectUsersAUX.some(item2 => Number(item1.getAttribute('data-professor-id')) === item2.id_user.id));

    compare.forEach(button => {
      button.disabled = false;
    });

    if (p1) {
      this.projectUsersAUX = [...this.projectUsers];
    }
  }

  ///////// SEARCH FILTER VOLUNTEER STUDENT START /////////

  public ngOnSearchVolunteerStudent(): void {
    const search = this.inputSearchVolunteerStudent.nativeElement.value;

    if (search === '') {

      this.ngOnResetFilterVolunteerStudent();
      this.toastr.info('Se ha eliminado el filtrado');
    } else {
      this.buttonVolunteerStudents.forEach(element => {
        const buttonContainer = element.parentElement as HTMLElement;

        if (buttonContainer.style.display == 'none') {
          buttonContainer.style.display = '';
        }
      });

      const volunteerStudentFiltred = this.ngOnFilterVolunteerStudent(search);
      const buttonVolunteerStudentsFiltred = this.buttonVolunteerStudents.filter(item1 => !volunteerStudentFiltred.some(item2 => Number(item1.getAttribute('data-volunteer-student-id')) === item2.id));

      buttonVolunteerStudentsFiltred.forEach(element => {
        const buttonContainer = element.parentElement as HTMLElement;
        buttonContainer.style.display = 'none';
      });
      console.log(buttonVolunteerStudentsFiltred)
      this.toastr.info('Se ha aplicado el filtrado');
      this.isOnFilter = true;
    }
  }


  public ngOnClearSearchVolunteerStudent(): void {
    this.ngOnResetFilterVolunteerStudent();
    this.toastr.info('Se ha eliminado el filtrado');
  }

  private ngOnFilterVolunteerStudent(p1: string): any[] {
    return this.volunteerStudents.filter(volunteerStudent =>
      volunteerStudent.first_name.toLowerCase().includes(p1.toLowerCase()) ||
      volunteerStudent.last_name.toLowerCase().includes(p1.toLowerCase()) ||
      volunteerStudent.id_career.label.toLowerCase().includes(p1.toLowerCase())
    );
  }

  private ngOnResetFilterVolunteerStudent(): void {
    this.buttonVolunteerStudents.forEach(element => {
      this.inputSearchVolunteerStudent.nativeElement.value = '';
      const buttonContainer = element.parentElement as HTMLElement;

      if (buttonContainer.style.display == 'none') {
        buttonContainer.style.display = '';
      }
    });
    this.isOnFilter = false;
  }


  ///////// SEARCH FILTER VOLUNTEER STUDENT END /////////


    ///////// SEARCH FILTER PROFESSOR START /////////

    public ngOnSearchProfessor(): void {
      const search = this.inputSearchProfessor.nativeElement.value;
  
      if (search === '') {
  
        this.ngOnResetFilterProfessor();
        this.toastr.info('Se ha eliminado el filtrado');
      } else {
        this.buttonProfessors.forEach(element => {
          const buttonContainer = element.parentElement as HTMLElement;
  
          if (buttonContainer.style.display == 'none') {
            buttonContainer.style.display = '';
          }
        });
  
        const professorFiltred = this.ngOnFilterProfessor(search);
        const buttonProfessorsFiltred = this.buttonProfessors.filter(item1 => !professorFiltred.some(item2 => Number(item1.getAttribute('data-professor-id')) === item2.id_user.id));
  
        buttonProfessorsFiltred.forEach(element => {
          const buttonContainer = element.parentElement as HTMLElement;
          buttonContainer.style.display = 'none';
        });
        console.log(buttonProfessorsFiltred)
        this.toastr.info('Se ha aplicado el filtrado');
        this.isOnFilter = true;
      }
    }
  
  
    public ngOnClearSearchProfessor(): void {
      this.ngOnResetFilterProfessor();
      this.toastr.info('Se ha eliminado el filtrado');
    }
  
    private ngOnFilterProfessor(p1: string): any[] {
      return this.userFaculty.filter(userFaculty =>
        userFaculty.id_user.first_name.toLowerCase().includes(p1.toLowerCase()) ||
        userFaculty.id_user.last_name.toLowerCase().includes(p1.toLowerCase()) ||
        userFaculty.id_faculty.label.toLowerCase().includes(p1.toLowerCase())
      );
    }
  
    private ngOnResetFilterProfessor(): void {
      this.buttonProfessors.forEach(element => {
        this.inputSearchProfessor.nativeElement.value = '';
        const buttonContainer = element.parentElement as HTMLElement;
  
        if (buttonContainer.style.display == 'none') {
          buttonContainer.style.display = '';
        }
      });
      this.isOnFilter = false;
    }
  
  
    ///////// SEARCH FILTER PROFESSOR END /////////


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
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }

  public filteredVolunteerStudents(): VolunteerStudent[] {
    if (this.volunteerStudents) {
      return this.volunteerStudents.filter(student => student.id_user_status.name === 'active');
    }
    return [];
  }

  public filteredProfessors(): UserFaculty[] {
    if (this.userFaculty) {
      return this.userFaculty.filter(userFaculty => userFaculty.id_user.id_user_status.name === 'active');
    }
    return [];
  }

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.selectItemEditRegion.nativeElement) {
      const citiesFilter = this.cities.filter(city => city.id_region.name === this.selectItemEditRegion.nativeElement.value);

      this.citiesAUX = citiesFilter;
    }

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

  @HostListener('document:show.bs.modal', ['$event']) onModalClick(event: Event) {
    const compare = this.buttonVolunteerStudents.filter(item1 => this.projectVolunterStudentsAUX.some(item2 => Number(item1.getAttribute('data-volunteer-student-id')) === item2.id_volunteer_student.id));
    const compare2 = this.buttonProfessors.filter(item1 => this.projectUsersAUX.some(item2 => Number(item1.getAttribute('data-professor-id')) === item2.id_user.id));
    
    compare2.forEach(button => {
      button.disabled = true;
    });

    compare.forEach(button => {
      button.disabled = true;
    });

    this.ngOnResetFilterVolunteerStudent();
  }
}