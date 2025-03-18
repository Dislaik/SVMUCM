import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../architecture/service/auth.service';
import { Utils } from '../utils';
import { Router } from '@angular/router';
import { UserService } from '../architecture/service/user.service';

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
  totalParticipants: number = 0;
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.ngOnGetCountCommunityUser();

    this.requestCourseModal = document.getElementById('restricted-model-request-course');
    this.isLogged = Utils.getStorage('isLogged') || false;

    if (await this.authService.verify()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  private async ngOnGetCountCommunityUser(): Promise<void> {
    const response = await this.userService.getCountByRole(7);

    if (response.ok) {
      this.totalParticipants = response.message;
    } else {
      console.log(response.error)
    }
  }
  

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonRequestCourse = this.elementReference.nativeElement.querySelector('#buttonRequestCourse')

    if (event.target === buttonRequestCourse) {
      if (this.isLogged) {
        this.router.navigate(['/request-project'])
      } else {
        const modal = new bootstrap.Modal(this.requestCourseModal);

        modal.show();
      }
    }
  }
}
