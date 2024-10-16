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

@Component({
  selector: 'app-request-course',
  standalone: false,
  templateUrl: './request-course.component.html',
  styleUrl: './request-course.component.css'
})
export class RequestCourseComponent implements OnInit{
  @ViewChild('requestCourseName') requestCourseName: ElementRef;
  @ViewChild('requestCourseHeadquarter') requestCourseHeadquarter: ElementRef;
  @ViewChild('requestCourseDuration') requestCourseDuration: ElementRef;
  @ViewChild('requestCourseMode') requestCourseMode: ElementRef;
  @ViewChild('requestCourseDayMonday') requestCourseDayMonday: ElementRef;
  @ViewChild('requestCourseDayTuesday') requestCourseDayTuesday: ElementRef;
  @ViewChild('requestCourseDayWednesday') requestCourseDayWednesday: ElementRef;
  @ViewChild('requestCourseDayThursday') requestCourseDayThursday: ElementRef;
  @ViewChild('requestCourseDayFriday') requestCourseDayFriday: ElementRef;
  @ViewChild('requestCourseDaySaturday') requestCourseDaySaturday: ElementRef;
  @ViewChild('requestCourseDaySunday') requestCourseDaySunday: ElementRef;
  @ViewChild('requestCourseReason') requestCourseReason: ElementRef;
  user: User;
  headquarter: Headquarter[];
  courseDuration: CourseDuration[];
  courseMode: CourseMode[];

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService,
    private headquarterService: HeadquarterService,
    private courseDurationService: CourseDurationService,
    private courseModeService: CourseModeService,
    private requestCourseService: RequestCourseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getByUsername(Utils.getUsernameByBrowser());

    const headquarter = await this.headquarterService.getAll();

    if (headquarter.ok) {
      this.headquarter = headquarter.message;
    } else {
      console.log(headquarter.error)
    }

    const courseDuration = await this.courseDurationService.getAll();

    if (courseDuration.ok) {
      this.courseDuration = courseDuration.message;
    } else {
      console.log(courseDuration.error);
    }

    const courseMode = await this.courseModeService.getAll();

    if (courseMode.ok) {
      this.courseMode = courseMode.message;
    } else {
      console.log(courseDuration.error);
    }
  }

  async ngOnSubmitRequestCourse(object): Promise<void> {
    const requestCourse = await this.requestCourseService.create(object)

    if (requestCourse.ok) {
      console.log(requestCourse.message)
    } else {
      console.log(requestCourse.error)
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonSubmit = this.elementReference.nativeElement.querySelector('#request-course-submit')

    if (event.target === buttonSubmit) {
      const daysStingify = this.scheduleAvailability(
        this.requestCourseDayMonday.nativeElement.checked,
        this.requestCourseDayTuesday.nativeElement.checked,
        this.requestCourseDayWednesday.nativeElement.checked,
        this.requestCourseDayThursday.nativeElement.checked,
        this.requestCourseDayFriday.nativeElement.checked,
        this.requestCourseDaySaturday.nativeElement.checked,
        this.requestCourseDaySunday.nativeElement.checked
      )

      const headquarter = this.headquarter.find(hq => hq.name === this.requestCourseHeadquarter.nativeElement.value);


      const requestCourse = new RequestCourse(
        this.requestCourseName.nativeElement.value,
        headquarter,
        this.requestCourseDuration.nativeElement.value,
        this.requestCourseMode.nativeElement.value,
        daysStingify,
        this.user,
        this.requestCourseReason.nativeElement.value
      )

      this.ngOnSubmitRequestCourse(requestCourse);
    }
  }

  scheduleAvailability(p1: boolean, p2: boolean, p3: boolean, p4: boolean, p5: boolean, p6: boolean, p7: boolean): string {
    const days = {
      monday: p1,
      tuesday: p2,
      wednesday: p3,
      thursday: p4,
      friday: p5,
      saturday: p6,
      sunday: p7
    }

    return JSON.stringify(days);
  }
}
