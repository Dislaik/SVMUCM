import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('navHome') navHome: ElementRef;
  @ViewChild('navRequestProject') navRequestProject: ElementRef;
  @ViewChild('navProject') navProject: ElementRef;

  @ViewChild('navPanel') navPanel: ElementRef;
  @ViewChild('navManage') navManage: ElementRef;
  @ViewChild('navPanelManageUser') navPanelManageUser: ElementRef;
  @ViewChild('navPanelManageRole') navPanelManageRole: ElementRef;
  @ViewChild('navPanelManageProject') navPanelManageProject: ElementRef;

  @ViewChild('modalRequestProjectGuest') modalRequestProjectGuest: ElementRef;
  modalRequestProjectGuestInstance: any;

  user: User = new User();
  requestCourseModal: HTMLElement;
  showComponent: boolean = true;
  isLogged: boolean = false;
  isOnPanel: boolean = false;
  isOnManage: boolean = false;
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
        this.isOnPanel = this.currentPage.split('/')[1] === 'panel';
        this.isOnManage = this.currentPage.split('/')[2] === 'manage';
        
        if (await this.authService.verify()) {
          this.isLogged = true;
          const result = await this.userService.getByUsername(Utils.getUsernameByBrowser());

          if (result.ok) {
            this.user = result.message;
          } else {
            console.log(result.error)
          }
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
    console.log("asdad")
    Utils.clearStorage();
    if (this.router.url == '/') {
      location.reload();
    } else {
      this.router.navigate(['/'])
    }
    this.user = null;
  }

  @HostListener('click', ['$event']) onClick(event: Event) {

    if (this.navHome && event.target === this.navHome.nativeElement) {
      this.router.navigate(['/']);
    } else if (this.navRequestProject && event.target === this.navRequestProject.nativeElement) {
      if (this.isLogged) {
        this.router.navigate(['/request-project']);
      } else {
        this.modalRequestProjectGuestInstance = new bootstrap.Modal(this.modalRequestProjectGuest.nativeElement);
        
        this.modalRequestProjectGuestInstance.show();
      }
    } else if (this.navProject && event.target === this.navProject.nativeElement) {
      this.router.navigate(['/project']);
    }

    if (this.navPanel && event.target === this.navPanel.nativeElement) {
      this.router.navigate(['/panel']);
    } else if (this.navManage && event.target === this.navManage.nativeElement) {
      this.router.navigate(['/panel/manage']);
    } else if (this.navPanelManageUser && event.target === this.navPanelManageUser.nativeElement) {
      this.router.navigate(['/panel/manage/user']);
    } else if (this.navPanelManageRole && event.target === this.navPanelManageRole.nativeElement) {
      this.router.navigate(['/panel/manage/role']);
    } else if (this.navPanelManageProject && event.target === this.navPanelManageProject.nativeElement) {
      this.router.navigate(['/panel/manage/project']);
    }
  }
}
