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
  @ViewChild('selectRequestProjectHeadquarter') selectRequestProjectHeadquarter: ElementRef;
  @ViewChild('selectRequestProjectFaculty') selectRequestProjectFaculty: ElementRef;
  @ViewChild('selectRequestProjectCareer') selectRequestProjectCareer: ElementRef;
  @ViewChild('selectRequestProjectRegion') selectRequestProjectRegion: ElementRef;
  @ViewChild('selectRequestProjectCity') selectRequestProjectCity: ElementRef;
  @ViewChild('inputRequestProjectStartDate') inputRequestProjectStartDate: ElementRef;
  @ViewChild('inputRequestProjectEndDate') inputRequestProjectEndDate: ElementRef;
  @ViewChild('textareaRequestProjectDescription') textareaRequestProjectDescription: ElementRef;
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

  async getCareersByHeadquarterAndFacultyName(headquarterName: string, facultyName: string): Promise<void> {
    const careers = await this.careerService.getByHeadquarterAndFacultyName(headquarterName, facultyName);

    if (careers.ok) {
      this.careers = careers.message;
    } else {
      console.log(careers.error)
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

  async getCitiesByRegionName(name: string): Promise<void> {
    const cities = await this.cityService.getByRegionName(name);

    if (cities.ok) {
      this.cities = cities.message;
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

  

  async ngOnCreateRequestProject(object): Promise<void> {
    console.log(object);
    const project = await this.projectService.create(object)

    if (project.ok) {
      console.log(project.message)
    } else {
      console.log(project.error)
    }
  }

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.selectRequestProjectHeadquarter.nativeElement || event.target === this.selectRequestProjectFaculty.nativeElement) {
      const valueHeadquarter = this.selectRequestProjectHeadquarter.nativeElement.value;
      const valueFaculty = this.selectRequestProjectFaculty.nativeElement.value;

      if (valueHeadquarter !== '' && valueFaculty !== '') {
        this.getCareersByHeadquarterAndFacultyName(valueHeadquarter, valueFaculty);
      }
      
    }


    if (event.target === this.selectRequestProjectRegion.nativeElement) {
      this.getCitiesByRegionName(this.selectRequestProjectRegion.nativeElement.value);
    }
  }

  @HostListener('click', ['$event']) async onClick(event: Event) {

    if (event.target === this.buttonRequestProjectSubmit.nativeElement) {
      const name = this.inputRequestProjectName.nativeElement.value;
      const user = await this.userService.getByUsername(Utils.getUsernameByBrowser());
      //const headquarter = this.selectRequestProjectHeadquarter.nativeElement.value;
      //const faculty = this.selectRequestProjectFaculty.nativeElement.value;
      //const career = this.selectRequestProjectCareer.nativeElement.value;
      const career = this.careers.find(career => career.name === this.selectRequestProjectCareer.nativeElement.value);
      //const region = this.selectRequestProjectRegion.nativeElement.value;
      //const city = this.selectRequestProjectCity.nativeElement.value;
      const city = this.cities.find(city => city.name === this.selectRequestProjectCity.nativeElement.value);
      const startDate = this.inputRequestProjectStartDate.nativeElement.value;
      const endDate = this.inputRequestProjectEndDate.nativeElement.value;
      const description = this.textareaRequestProjectDescription.nativeElement.value;
      console.log(this.projectStatus)
      const status = this.projectStatus.find(status => status.name === 'created');
      console.log(status);

      const project = new Project(name, description, user, startDate, endDate, career, city, status);

      this.ngOnCreateRequestProject(project);


      ///CONFIRMATION HERE
      // Swal.fire({
      //   title: '¿Quieres guardar los cambios?',
      //   showDenyButton: true,
      //   showCancelButton: true,
      //   confirmButtonText: 'Guardar',
      //   denyButtonText: 'No guardar',
      //   customClass: {
      //     popup: 'no-padding-fix'
      //   }
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     Swal.fire('¡Guardado!', '', 'success');
      //   } else if (result.isDenied) {
      //     Swal.fire('Los cambios no se han guardado', '', 'info');
      //   }
      // }); 
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
