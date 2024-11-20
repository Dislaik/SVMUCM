import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { Utils } from '../utils';
import { Role } from '../architecture/model/role';
import { RoleService } from '../architecture/service/role.service';
import { UserStatus } from '../architecture/model/user-status';
import { UserStatusService } from '../architecture/service/user-status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-user-details',
  standalone: false,
  templateUrl: './manage-user-details.component.html',
  styleUrl: './manage-user-details.component.css'
})
export class ManageUserDetailsComponent implements OnInit {
  title: string = "Detalles de usuario";
  id: number;
  pages: string;

  @ViewChild('inputItemEditPassword') inputItemEditPassword: ElementRef;
  passwordError: string = '';
  @ViewChild('inputItemEditFirstName') inputItemEditFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputItemEditLastName') inputItemEditLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('inputItemEditEmail') inputItemEditEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputItemEditAddress') inputItemEditAddress: ElementRef;
  addressError: string = '';
  @ViewChild('inputItemEditPhone') inputItemEditPhone: ElementRef;
  phoneError: string = '';
  @ViewChild('selectItemEditRole') selectItemEditRole: ElementRef;
  roleError: string = '';
  @ViewChild('selectItemEditUserStatus') selectItemEditUserStatus: ElementRef;
  userStatusError: string = '';


  user: User;
  roles: Role[];
  userStatus: UserStatus[];
  isViewLoaded: boolean;
  enableEditItem: boolean;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private roleService: RoleService,
    private userStatusService: UserStatusService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.isViewLoaded = false;
    this.createBreadCrumb();
    this.getAllRoles();
    this.getAllUserStatus();
    this.getItem();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Usuarios', url: '/panel/manage/user'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }
  
  private async getAllRoles(): Promise<void> {
    const response = await this.roleService.getAll();

    if (response.ok) {
      this.roles = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllUserStatus(): Promise<void> {
    const response = await this.userStatusService.getAll();

    if (response.ok) {
      this.userStatus = response.message;
    } else {
      console.log(response.error)
    }
  }

  async getItem(): Promise<void> {
    const response = await this.userService.getById(this.id);

    if (response.ok) {
      this.user = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }
  
  public async ngOnEditItemSave(): Promise<void> {
    const password = this.inputItemEditPassword.nativeElement.value;
    const firstName = this.inputItemEditFirstName.nativeElement.value;
    const lastName = this.inputItemEditLastName.nativeElement.value;
    const email = this.inputItemEditEmail.nativeElement.value;
    const address = this.inputItemEditAddress.nativeElement.value;
    const phone = this.inputItemEditPhone.nativeElement.value;
    const role = this.roles.find(role => role.name === this.selectItemEditRole.nativeElement.value);
    const userStatus = this.userStatus.find(status => status.name === this.selectItemEditUserStatus.nativeElement.value);
    let success = 0;

    if (password.trim() === '') {
      success+= 1;
    } else if (password.lenght < 8 || password.lenght > 32) {
      this.passwordError = 'La contraseña debe tener una longitud de entre 8 a 32 caracteres';
    } else if (!/[a-zA-Z]/.test(password)) {
      this.passwordError = 'La contraseña debe contener al menos una letra';
    } else if (!/[0-9]/.test(password)) {
      this.passwordError = 'La contraseña debe contener al menos un número';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.passwordError = 'La contraseña debe contener al menos un símbolo';
    } else {
      this.passwordError = '';
      success+= 1;
    }


    if (firstName.trim() === '') {
      this.firstNameError = 'Debe ingresar sus nombres';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (lastName.trim() === '') {
      this.lastNameError = 'Debe ingresar sus apellidos';
    } else {
      this.lastNameError = '';
      success+= 1;
    }


    if (email.trim() === '') { 
      this.emailError = 'Debe ingresar su correo electronico';
    } else if (!email.includes('@') || !email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (address.trim() === '') {
      this.addressError = 'Debe ingresar un correo electronico';
    } else {
      this.addressError = '';
      success+= 1;
    }

    if (phone.trim() === '') {
      this.phoneError = 'Debe ingresar un correo electronico';
    } else {
      this.phoneError = '';
      success+= 1;
    }

    if (success === 6) {
      if (password !== '') {
        this.user.password = password;
      }

      this.user.first_name = firstName;
      this.user.last_name = lastName;
      this.user.email = email;
      this.user.address = address;
      this.user.phone = phone;
      this.user.id_role = role;
      this.user.id_user_status = userStatus;

      const response = await this.userService.update(this.user.id, this.user);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        console.log(response.error)
      }
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditFirstName) {
        this.inputItemEditFirstName.nativeElement.value = this.user.first_name;
      }

      if (this.inputItemEditLastName) {
        this.inputItemEditLastName.nativeElement.value = this.user.last_name;
      }

      if (this.inputItemEditEmail) {
        this.inputItemEditEmail.nativeElement.value = this.user.email;
      }

      if (this.inputItemEditAddress) {
        this.inputItemEditAddress.nativeElement.value = this.user.address;
      }

      if (this.inputItemEditPhone) {
        this.inputItemEditPhone.nativeElement.value = this.user.phone;
      }

      if (this.selectItemEditRole) {
        this.selectItemEditRole.nativeElement.value = this.user.id_role.name;
      }

      if (this.selectItemEditUserStatus) {
        this.selectItemEditUserStatus.nativeElement.value = this.user.id_user_status.name;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
  }

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

}
