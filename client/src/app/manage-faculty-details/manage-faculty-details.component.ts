import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Faculty } from '../architecture/model/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../architecture/service/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../utils';
import { UserService } from '../architecture/service/user.service';
import { User } from '../architecture/model/user';

@Component({
  selector: 'app-manage-faculty-details',
  standalone: false,
  templateUrl: './manage-faculty-details.component.html',
  styleUrl: './manage-faculty-details.component.css'
})
export class ManageFacultyDetailsComponent implements OnInit {
  title: string = "Detalles de la facultad";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;

  faculty: Faculty;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getFaculty();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Facultades', url: '/panel/faculty'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getUserByBrowser(): Promise<void> {
    const browserUser = Utils.getUsernameByBrowser();
    const response = await this.userService.getByUsername(browserUser);

    if (response.ok) {
      this.browserUser = response.message;
    } else {
      console.log(response.error)
    }
  }

  async getFaculty(): Promise<void> {
    const response = await this.facultyService.getById(this.id);

    if (response.ok) {
      this.faculty = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const label = this.inputItemEditLabel.nativeElement.value;

    this.faculty.label = label;

    const response = await this.facultyService.update(this.faculty.id, this.faculty);

    if (response.ok) {
      this.toastr.success('Se han guardado los cambios con exito');
      this.enableEditItem = false;
    } else {
      console.log(response.error)
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.faculty.label;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
  }

  public haveRole(p1: any[]) {
    return Utils.haveRole(this.browserUser, p1)
  }

}
