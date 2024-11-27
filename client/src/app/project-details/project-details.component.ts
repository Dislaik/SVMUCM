import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from '../architecture/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../architecture/service/project.service';
import { Utils } from '../utils';
import { CityService } from '../architecture/service/city.service';
import { CareerService } from '../architecture/service/career.service';
import { City } from '../architecture/model/city';
import { Career } from '../architecture/model/career';
import { ProjectStatus } from '../architecture/model/project-status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  title: string = "Detalles del proyecto";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  existsQuotation: boolean = false;


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
  //projectStatus: ProjectStatus[];
  cities: City[];
  careers: Career[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private projectService: ProjectService,
    // private projectStatusService: ProjectStatusService,
    private cityService: CityService,
    private careerService: CareerService,
    // private quotationService: QuotationService,
    // private userService: UserService,
    // private projectUserService: ProjectUserService,
    // private quotationStatusService: QuotationStatusService,
    // private volunteerStudentService: VolunteerStudentService,
    // private projectVolunteerStudentService: ProjectVolunteerStudentService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.ngOnGetProject();
    this.getAllCities();
    this.getAllCareers();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Mis proyectos', url: '/project'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
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

  public ngOnGoQuotation(): void {

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
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const description = this.inputItemEditDescription.nativeElement.value;
    const startDate = this.inputItemEditStartDate.nativeElement.value;
    const endDate = this.inputItemEditEndDate.nativeElement.value;
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
      this.descriptionError = 'Debe ingresar una descripción';
    } else {
      this.descriptionError = '';
      success+= 1;
    }

    todayDate.setHours(0, 0, 0, 0);

    if (startDate.trim() === '') {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else if (new Date(startDate) < todayDate) {
      this.startDateError = 'La fecha de inicio no puede ser una fecha anterior o igual a la de hoy';
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
      this.project.start_date = new Date(startDate + "T00:00:00");
      this.project.end_date = new Date(endDate + "T00:00:00");
      this.project.id_city = city;
      this.project.id_career = career;

      const response = await this.projectService.update(this.project.id, this.project);

      if (response.ok) {

        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        console.log(response.error);
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.descriptionError = '';
    this.startDateError = '';
    this.endDateError = '';
  }



  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  
}
