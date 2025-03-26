import { Component, ComponentRef, ElementRef, HostListener, inject, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../architecture/service/auth.service';
import { Utils } from '../../app.utils';
import { UserService } from '../../architecture/service/user.service';
import { User } from '../../architecture/model/user';
import { jwtDecode } from 'jwt-decode';
import { RestrictedModelRequestCourseComponent } from '../restricted-model-request-course/restricted-model-request-course.component';

declare var bootstrap: any;

@Component({
  selector: 'nav.navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('home') home: ElementRef;
  @ViewChild('requestProject') requestProject: ElementRef;
  @ViewChild('projects') projects: ElementRef;

  @ViewChild('panel') panel: ElementRef;

  @Input() panelView: boolean;

  private componentRef!: ComponentRef<RestrictedModelRequestCourseComponent>;
  private viewContainerRef = inject(ViewContainerRef);
  modalInstance: any;




  user: User = new User();
  isLogged: boolean = false;
  isOnPanel: boolean = false;
  isOnManage: boolean = false;
  currentPage: string = '';

  name: string;
  image: string;

  constructor(
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.ngOnChangeNavbarActive(null);
        this.ngOnUserBrowser();
      }
    });
    this.ngOnUserBrowser();
  }

  private showModal(): void {
    this.componentRef = this.viewContainerRef.createComponent(RestrictedModelRequestCourseComponent);

    document.body.appendChild(this.componentRef.location.nativeElement);

    setTimeout(() => {
      const modalElement = this.componentRef.location.nativeElement.querySelector('.modal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
      }
    });
  }

  private ngOnUserBrowser(): void {
    this.isLogged = Utils.getStorage('isLogged') || false;
    const token = Utils.getStorage('keyToken');

    if (token) {
      const decoded = jwtDecode(token);

      this.name = decoded['firstName'] + ' ' + decoded['lastName'];
      this.image = decoded['image'];
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public ngAfterViewInit(): void {
    this.ngOnChangeNavbarActive(null);
  }

  public ngOnChangeNavbarActive(navigation: string | null): void {
    const url = Utils.parseURL(this.router.url);
    if (!this.panelView) {
      const home = this.home.nativeElement as HTMLElement;
      const requestProject = this.requestProject.nativeElement as HTMLElement;
      const projects = this.projects.nativeElement as HTMLElement;

      home.classList.remove('active');
      requestProject.classList.remove('active');
      projects.classList.remove('active');

      if (url[0] === '/') {
        home.classList.add('active');
      } else if ( url[0] === '/request-project') {
        requestProject.classList.add('active');
      } else if (url[0] === '/project') {
        projects.classList.add('active');
      }


      if (navigation === 'request-project' && !this.isLogged) {
        this.showModal();
      } else if (navigation === 'project' && !this.isLogged) {
        this.showModal();
      }

    } else {
      const panel = this.panel.nativeElement as HTMLElement;

      panel.classList.remove('active');

      if (url[0] === '/panel') {
        panel.classList.add('active');
      }
    }
  }
  
  public ngOnClickLogout(): void {
    Utils.clearStorage();
    this.name = '';
    this.image = '';
    this.isLogged = false;

    if (this.router.url == '/') {
      location.reload();
    } else {
      this.router.navigate(['/'])
    }
  }
}
