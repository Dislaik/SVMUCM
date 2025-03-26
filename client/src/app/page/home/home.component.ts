import { Component, ComponentRef, ElementRef, HostListener, inject, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../architecture/service/auth.service';
import { Utils } from '../../app.utils';
import { Router } from '@angular/router';
import { UserService } from '../../architecture/service/user.service';
import { RestrictedModelRequestCourseComponent } from '../../component/restricted-model-request-course/restricted-model-request-course.component';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  totalParticipants: number = 0;
  isLogged: boolean = false;

  private componentRef!: ComponentRef<RestrictedModelRequestCourseComponent>;
  private viewContainerRef = inject(ViewContainerRef);
  modalInstance: any;

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService
  ) {}
  
  public ngOnInit(): void {
    this.isLogged = Utils.getStorage('isLogged') || false;
    this.ngOnGetCountCommunityUser();
  }

  private async ngOnGetCountCommunityUser(): Promise<void> {
    const response = await this.userService.getCountByRole(7);

    if (response.ok) {
      this.totalParticipants = response.message;
    } else {
      console.log(response.error)
    }
  }

  public showModal(): void {
    if (this.isLogged) {
      this.router.navigate(['/request-project'])

      return;
    }

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
}
