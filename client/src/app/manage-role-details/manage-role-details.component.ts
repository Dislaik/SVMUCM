import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../architecture/model/role';
import { RoleService } from '../architecture/service/role.service';
import { ToastrService } from 'ngx-toastr';

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

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;

  role: Role;
  isViewLoaded: boolean = false;
  enableEditItem: boolean;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getRole();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Roles', url: '/panel/manage/role'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
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

    this.role.label = label;

    const response = await this.roleService.update(this.role.id, this.role);

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
        this.inputItemEditLabel.nativeElement.value = this.role.label;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
  }

}
