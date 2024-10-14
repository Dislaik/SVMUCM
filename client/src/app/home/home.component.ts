import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../architecture/service/auth.service';
import { Utils } from '../utils';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {'class': 'container-base'}
})
export class HomeComponent implements OnInit{
  requestCourseModal: HTMLElement;
  totalParticipants = 0;
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.requestCourseModal = document.getElementById('restricted-model-request-course');
    this.isLogged = Utils.getStorage('isLogged') || false;

    if (await this.authService.verify()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonRequestCourse = this.elementReference.nativeElement.querySelector('#buttonRequestCourse')

    if (event.target === buttonRequestCourse) {
      if (this.isLogged) {
        this.router.navigate(['/request-course'])
      } else {
        const modal = new bootstrap.Modal(this.requestCourseModal);

        modal.show();
      }
    }
  }
}
