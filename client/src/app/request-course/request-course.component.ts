import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../architecture/service/auth.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { CourseDurationService } from '../architecture/service/course-duration.service';
import { CourseModeService } from '../architecture/service/course-mode.service';

@Component({
  selector: 'app-request-course',
  standalone: false,
  templateUrl: './request-course.component.html',
  styleUrl: './request-course.component.css',
  host: {'class': 'container-base'}
})
export class RequestCourseComponent implements OnInit{
  headquarter: HTMLSelectElement;
  headquarterList: [];
  courseDurationList: [];
  courseModeList: [];
  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private headquarterService: HeadquarterService,
    private courseDurationService: CourseDurationService,
    private courseModeService: CourseModeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.headquarter = this.elementReference.nativeElement.querySelector('#request-course-headquarter');

    const headquarter = await this.headquarterService.getAll();

    if (headquarter.ok) {
      this.headquarterList = headquarter.message;
    } else {
      console.log(headquarter.error)
    }

    const courseDuration = await this.courseDurationService.getAll();

    if (courseDuration.ok) {
      this.courseDurationList = courseDuration.message;
    } else {
      console.log(courseDuration.error);
    }

    const courseMode = await this.courseModeService.getAll();

    if (courseMode.ok) {
      this.courseModeList = courseMode.message;
    } else {
      console.log(courseDuration.error);
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonSubmit = this.elementReference.nativeElement.querySelector('#request-course-submit')

    if (event.target === buttonSubmit) {
      console.log("asd")

    }
  }
}
