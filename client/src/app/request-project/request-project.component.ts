import { Component, ElementRef, HostListener, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../architecture/service/auth.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { CourseDurationService } from '../architecture/service/course-duration.service';
import { CourseModeService } from '../architecture/service/course-mode.service';
import { RequestCourse } from '../architecture/model/request-course';
import { RequestCourseService } from '../architecture/service/request-course.service';
import { Utils } from '../utils';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { Headquarter } from '../architecture/model/headquarter';
import { CourseDuration } from '../architecture/model/course-duration';
import { CourseMode } from '../architecture/model/course-mode';
import { Region } from '../architecture/model/region';
import { City } from '../architecture/model/city';
import { CityService } from '../architecture/service/city.service';
import { RegionService } from '../architecture/service/region.service';
import { Faculty } from '../architecture/model/faculty';
import { Career } from '../architecture/model/career';
import { FacultyService } from '../architecture/service/faculty.service';
import { CareerService } from '../architecture/service/career.service';
import { Project } from '../architecture/model/project';
import { ProjectStatusService } from '../architecture/service/project-status.service';
import { ProjectService } from '../architecture/service/project.service';
import { ProjectStatus } from '../architecture/model/project-status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-project',
  standalone: false,
  templateUrl: './request-project.component.html',
  styleUrl: './request-project.component.css'
})
export class RequestProjectComponent implements OnInit{
  title: string = "Crear solicitud de proyecto";
  pages: string;

  @ViewChild('inputRequestProjectName') inputRequestProjectName: ElementRef;
  nameError: string = '';
  @ViewChild('selectRequestProjectHeadquarter') selectRequestProjectHeadquarter: ElementRef;
  headquarterError: string = '';
  @ViewChild('selectRequestProjectFaculty') selectRequestProjectFaculty: ElementRef;
  facultyError: string = '';
  @ViewChild('selectRequestProjectCareer') selectRequestProjectCareer: ElementRef;
  careerError: string = '';
  @ViewChild('selectRequestProjectRegion') selectRequestProjectRegion: ElementRef;
  regionError: string = '';
  @ViewChild('selectRequestProjectCity') selectRequestProjectCity: ElementRef;
  cityError: string = '';
  @ViewChild('inputRequestProjectStartDate') inputRequestProjectStartDate: ElementRef;
  startDateError: string = '';
  @ViewChild('inputRequestProjectEndDate') inputRequestProjectEndDate: ElementRef;
  endDateError: string = '';
  @ViewChild('textareaRequestProjectDescription') textareaRequestProjectDescription: ElementRef;
  descriptionError: string = '';
  @ViewChild('buttonRequestProjectSubmit') buttonRequestProjectSubmit: ElementRef;

  user: User;
  headquarters: Headquarter[];
  faculties: Faculty[];
  careers: Career[]
  regions: Region[];
  cities: City[];
  projectStatus: ProjectStatus[];

  constructor(
    private router: Router,
    private userService: UserService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService,
    private careerService: CareerService,
    private regionService: RegionService,
    //private requestProjectService: RequestCourseService, // CHANGE
    private cityService: CityService,
    private projectStatusService: ProjectStatusService,
    private projectService: ProjectService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();
    this.getAllHeadquarter();
    this.getAllRegions();
    this.getAllFaculties();
    this.getAllProjectStatus();

    // this.user = await this.userService.getByUsername(Utils.getUsernameByBrowser());
    // this.cities = await this.cityService.getAll();
    // console.log(this.cities); 
    // const headquarter = await this.headquarterService.getAll();

    // if (headquarter.ok) {
    //   this.headquarter = headquarter.message;
    // } else {
    //   console.log(headquarter.error)
    // }

    // const courseDuration = await this.courseDurationService.getAll();

    // if (courseDuration.ok) {
    //   this.courseDuration = courseDuration.message;
    // } else {
    //   console.log(courseDuration.error);
    // }

    // const courseMode = await this.courseModeService.getAll();

    // if (courseMode.ok) {
    //   this.courseMode = courseMode.message;
    // } else {
    //   console.log(courseDuration.error);
    // }
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getAllHeadquarter(): Promise<void> {
    const headquarter = await this.headquarterService.getAll();

    if (headquarter.ok) {
      this.headquarters = headquarter.message;
    } else {
      console.log(headquarter.error)
    }
  }

  async getAllFaculties(): Promise<void> {
    const faculties = await this.facultyService.getAll();

    if (faculties.ok) {
      this.faculties = faculties.message;
    } else {
      console.log(faculties.error)
    }
  }

  async getCareersByHeadquarterAndFacultyName(headquarterName: string, facultyName: string, cb: any): Promise<void> {
    const result = await this.careerService.getByHeadquarterAndFacultyName(headquarterName, facultyName);

    if (result.ok) {
      this.careers = result.message;

      cb(this.careers.length);
    } else {
      console.log(result.error)
    }
  }


  async getAllRegions(): Promise<void> {
    const regions = await this.regionService.getAll();

    if (regions.ok) {
      this.regions = regions.message;
    } else {
      console.log(regions.error)
    }
  }

  async getCitiesByRegionName(name: string, cb: any): Promise<void> {
    const cities = await this.cityService.getByRegionName(name);

    if (cities.ok) {
      this.cities = cities.message;

      cb(this.cities.length);
    } else {
      console.log(cities.error)
    }
  }

  async getAllProjectStatus(): Promise<void> {
    const status = await this.projectStatusService.getAll();

    if (status.ok) {
      this.projectStatus = status.message;
    } else {
      console.log(status.error)
    }
  }

  

  async ngOnCreateRequestProject(): Promise<void> {
    const nameValue = this.inputRequestProjectName.nativeElement.value;
    const headquarterValue = this.selectRequestProjectHeadquarter.nativeElement.value;
    const facultyValue = this.selectRequestProjectFaculty.nativeElement.value;
    const careerValue = this.selectRequestProjectCareer.nativeElement.value;
    const regionValue = this.selectRequestProjectRegion.nativeElement.value;
    const cityValue = this.selectRequestProjectCity.nativeElement.value;
    const startDateValue = this.inputRequestProjectStartDate.nativeElement.value;
    const endDateValue = this.inputRequestProjectEndDate.nativeElement.value;
    const descriptionValue = this.textareaRequestProjectDescription.nativeElement.value;
    const todayDate = new Date();
    let success = 0;



    if (Utils.isBlank(nameValue)) {
      this.nameError = 'Debe especificar un nombre a su proyecto';
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (Utils.isBlank(headquarterValue)) {
      this.headquarterError = 'Debe seleccionar una sede';
    } else {
      this.headquarterError = '';
      success+= 1;
    }

    if (Utils.isBlank(facultyValue)) {
      this.facultyError = 'Debe seleccionar una facultad';
    } else {
      this.facultyError = '';
      success+= 1;
    }

    if (Utils.isBlank(careerValue)) {
      this.careerError = 'Debe seleccionar una carrera';
    } else {
      this.careerError = '';
      success+= 1;
    }

    if (Utils.isBlank(regionValue)) {
      this.regionError = 'Debe seleccionar una región';
    } else {
      this.regionError = '';
      success+= 1;
    }

    if (Utils.isBlank(cityValue)) {
      this.cityError = 'Debe seleccionar una ciudad';
    } else {
      this.cityError = '';
      success+= 1;
    }

    todayDate.setHours(0, 0, 0, 0);

    if (Utils.isBlank(startDateValue)) {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else if (new Date(startDateValue) < todayDate) {
      this.startDateError = 'La fecha de inicio no puede ser una fecha anterior o igual a la de hoy';
    } else {
      this.startDateError = '';
      success+= 1;
    }

    if (Utils.isBlank(endDateValue)) {
      this.endDateError = 'Debe especificar una fecha de termino';
    } else if (new Date(startDateValue) > new Date(endDateValue) ) {
      this.endDateError = 'La fecha de termino no puede ser una fecha anterior a la fecha de inicio';
    } else {
      this.endDateError = '';
      success+= 1;
    }

    if (Utils.isBlank(descriptionValue)) {
      this.descriptionError = 'Debe especificar una descripción de su proyecto';
    } else {
      this.descriptionError = '';
      success+= 1;
    }

    if (success == 9) {
      Swal.fire({
        title: '¿Estas seguro que quieres crear una nueva solicitud?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await this.userService.getByUsername(Utils.getUsernameByBrowser());

          if (result.ok) {
            const user = result.message;
            const career = this.careers.find(career => career.name === careerValue);
            const city = this.cities.find(city => city.name === cityValue);
            const status = this.projectStatus.find(status => status.name === 'created');

            const project = new Project(nameValue, descriptionValue, user, startDateValue, endDateValue, career, city, status);

            await this.projectService.create(project)
            this.router.navigate(['/project']);
          } else {
            console.log(result.error)
          }
          
          Swal.fire('¡Solicitud creada!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se han guardado', '', 'info');
        }
      }); 
    }
  }

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.selectRequestProjectHeadquarter.nativeElement || event.target === this.selectRequestProjectFaculty.nativeElement) {
      const valueHeadquarter = this.selectRequestProjectHeadquarter.nativeElement.value;
      const valueFaculty = this.selectRequestProjectFaculty.nativeElement.value;

      if (valueHeadquarter !== '' && valueFaculty !== '') {
        this.getCareersByHeadquarterAndFacultyName(valueHeadquarter, valueFaculty, (i) => {
          const selectCareer = this.selectRequestProjectCareer.nativeElement;

          if (i > 0) {
            selectCareer.disabled = false;
            selectCareer.classList.remove('disabled')
          } else {
            selectCareer.disabled = true;
            selectCareer.classList.add('disabled')
          }
        });
      }
    }


    if (event.target === this.selectRequestProjectRegion.nativeElement) {
      this.getCitiesByRegionName(this.selectRequestProjectRegion.nativeElement.value, (i) => {
        const selectCity = this.selectRequestProjectCity.nativeElement;

        if (i > 0) {
          selectCity.disabled = false;
          selectCity.classList.remove('disabled')
        } else {
          selectCity.disabled = true;
          selectCity.classList.add('disabled')
        }
      });
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {

    if (event.target === this.buttonRequestProjectSubmit.nativeElement) {
      this.ngOnCreateRequestProject();
    }
    
    
    // const buttonSubmit = this.elementReference.nativeElement.querySelector('#request-course-submit')

    // if (event.target === buttonSubmit) {
    //   const daysStingify = this.scheduleAvailability(
    //     this.requestCourseDayMonday.nativeElement.checked,
    //     this.requestCourseDayTuesday.nativeElement.checked,
    //     this.requestCourseDayWednesday.nativeElement.checked,
    //     this.requestCourseDayThursday.nativeElement.checked,
    //     this.requestCourseDayFriday.nativeElement.checked,
    //     this.requestCourseDaySaturday.nativeElement.checked,
    //     this.requestCourseDaySunday.nativeElement.checked
    //   )

    //   const headquarter = this.headquarter.find(hq => hq.name === this.requestCourseHeadquarter.nativeElement.value);


    //   const requestCourse = new RequestCourse(
    //     this.requestProjectName.nativeElement.value,
    //     headquarter,
    //     this.requestCourseDuration.nativeElement.value,
    //     this.requestCourseMode.nativeElement.value,
    //     daysStingify,
    //     this.user,
    //     this.requestCourseReason.nativeElement.value
    //   )

    //   this.ngOnSubmitRequestCourse(requestCourse);
    // }
  }

  // scheduleAvailability(p1: boolean, p2: boolean, p3: boolean, p4: boolean, p5: boolean, p6: boolean, p7: boolean): string {
  //   const days = {
  //     monday: p1,
  //     tuesday: p2,
  //     wednesday: p3,
  //     thursday: p4,
  //     friday: p5,
  //     saturday: p6,
  //     sunday: p7
  //   }

  //   return JSON.stringify(days);
  // }
}
