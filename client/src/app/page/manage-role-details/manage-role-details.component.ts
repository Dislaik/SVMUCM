import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../architecture/model/role';
import { RoleService } from '../../architecture/service/role.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../app.utils';
import { UserService } from '../../architecture/service/user.service';
import { User } from '../../architecture/model/user';

@Component({
  selector: 'app-manage-role-details',
  standalone: false,
  templateUrl: './manage-role-details.component.html',
  styleUrl: './manage-role-details.component.css'
})
export class ManageRoleDetailsComponent implements OnInit {
  title: string = "Detalles del rol";
  id: number;
  pages: string;
  browserUser: User;

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';

  role: Role;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roleService: RoleService,
    private userService: UserService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserByBrowser();
    this.getRole();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Roles', url: '/panel/role'},
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

  async getRole(): Promise<void> {
    const response = await this.roleService.getById(this.id);

    if (response.ok) {
      this.role = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const label = this.inputItemEditLabel.nativeElement.value;
    let success = 0;

    if (label.trim() === '') {
      this.labelError = 'Debe ingresar una etiqueta';
    } else {
      this.labelError = '';
      success+= 1;
    }

    if (success === 1) {
      const role = new Role(this.role.name, label)
      const response = await this.roleService.update(this.role.id, role);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.role = response.message;
        this.enableEditItem = false;
      } else {
        console.log(response.error)
      }
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.role.label;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.labelError = '';
    this.enableEditItem = false;
  }

  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }
}
