import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../architecture/service/auth.service';
import { Utils } from '../../utils';
import { UserService } from '../../architecture/service/user.service';
import { User } from '../../architecture/model/user';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: User = new User();
  requestCourseModal: HTMLElement;
  showComponent: boolean = true;
  isLogged: boolean = false;
  currentPage: string = '';

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.requestCourseModal = document.getElementById('restricted-model-request-course');
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.router.url;
        this.showComponent = this.router.url !== '/login' && this.router.url !== '/register';
        this.isLogged = Utils.getStorage('isLogged') || false;
        
        if (await this.authService.verify()) {
          this.isLogged = true;
          this.user = await this.userService.getByUsername(Utils.getUsernameByBrowser());
        } else {
          this.isLogged = false;
        }
      }
    });
  }

  ngOnLogin(): void {
    this.router.navigate(['/login'])
  }

  ngOnRegister(): void {
    this.router.navigate(['/register'])
  }

  ngOnLoggout(): void {
    Utils.clearStorage();
    window.location.reload();
    this.user = null;
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonNavHome = this.elementReference.nativeElement.querySelector('#nav-home');
    const buttonNavCourse = this.elementReference.nativeElement.querySelector('#nav-courses');
    const buttonNavRequestCourse = this.elementReference.nativeElement.querySelector('#nav-request-course');

    if (event.target === buttonNavHome) {
      this.router.navigate(['/'])
    } else if (event.target === buttonNavCourse) {
      this.router.navigate(['/course'])
    } else if (event.target === buttonNavRequestCourse) {
      if (this.isLogged) {
        this.router.navigate(['/request-course'])
      } else {
        const modal = new bootstrap.Modal(this.requestCourseModal);

        modal.show();
      }
    }
  }
}
