import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../architecture/service/auth.service';
import { Utils } from '../utils';
import { Router } from '@angular/router';

declare var bootstrap: any; // Declarar bootstrap para evitar errores de TypeScript


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
    this.isLogged = Utils.getStorage('isLogged') || false;
    this.requestCourseModal = this.elementReference.nativeElement.querySelector('#exampleModal');

    if (await this.authService.verify()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonRegisterSubmit = this.elementReference.nativeElement.querySelector('#buttonRequestCourse')

    if (event.target === buttonRegisterSubmit) {
      console.log(this.isLogged);
      if (this.isLogged) {
        this.router.navigate(['/request-course'])
      } else {
        const modal = new bootstrap.Modal(this.requestCourseModal);

        modal.show();
      }
    }
  }
}
