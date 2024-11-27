import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Headquarter } from '../architecture/model/headquarter';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../utils';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';

@Component({
  selector: 'app-manage-headquarter-details',
  standalone: false,
  templateUrl: './manage-headquarter-details.component.html',
  styleUrl: './manage-headquarter-details.component.css'
})
export class ManageHeadquarterDetailsComponent implements OnInit {
  title: string = "Detalles de la sede";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;

  headquarter: Headquarter;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private headquarterService: HeadquarterService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getHeadquarter();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Sedes', url: '/panel/headquarter'},
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

  private async getHeadquarter(): Promise<void> {
    const response = await this.headquarterService.getById(this.id);

    if (response.ok) {
      this.headquarter = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const label = this.inputItemEditLabel.nativeElement.value;

    this.headquarter.label = label;

    const response = await this.headquarterService.update(this.headquarter.id, this.headquarter);

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
        this.inputItemEditLabel.nativeElement.value = this.headquarter.label;
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
