import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { RegionService } from '../architecture/service/region.service';
import { Region } from '../architecture/model/region';
import { Headquarter } from '../architecture/model/headquarter';
import { Faculty } from '../architecture/model/faculty';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { FacultyService } from '../architecture/service/faculty.service';

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
  regions: Region[];
  cities: City[];
  headquarters: Headquarter[];
  faculties: Faculty[];
  careers: Career[];

  citiesAUX: City[];
  careersAUX: Career[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private projectService: ProjectService,
    // private projectStatusService: ProjectStatusService,
    private regionService: RegionService,
    private cityService: CityService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService,
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
    this.ngOnGetAllRegions();
    this.ngOnGetAllCities();
    this.ngOnGetAllHeadquarters();
    this.ngOnGetAllFaculties();
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

  private async getAllCareers(): Promise<void> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      this.careers = response.message;
    } else {
      console.log(response.error);
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
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const description = this.inputItemEditDescription.nativeElement.value;
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
      this.descriptionError = 'Debe ingresar una descripción';
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
      this.project.start_date = startDate
      this.project.end_date = endDate
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
}
