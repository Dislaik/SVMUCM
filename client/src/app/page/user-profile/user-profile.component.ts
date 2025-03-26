import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../architecture/model/user';
import { UserService } from '../../architecture/service/user.service';
import { Utils } from '../../app.utils';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  title: string = "Mi perfil";
  pages: string;

  @ViewChild('modalChangePassword') modalChangePassword: ElementRef;
  modalChangePasswordInstance: any;

  @ViewChild('inputPassword', {static: false}) inputPassword: ElementRef; 
  passwordError: string = '';
  @ViewChild('inputRepeatPassword', { static: false}) inputRepeatPassword: ElementRef;
  repeatPasswordError: string = '';

  @ViewChild('inputUserEditFirstName', { static: false }) inputUserEditFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputUserEditLastName', { static: false }) inputUserEditLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('inputUserEditEmail', { static: false }) inputUserEditEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputUserEditAddress', { static: false }) inputUserEditAddress: ElementRef;
  addressError: string = '';
  @ViewChild('inputUserEditPhone', { static: false }) inputUserEditPhone: ElementRef;
  phoneError: string = '';

  user: User;
  userCreateAt: string;
  isUserLoaded: boolean = false;
  enableEditInfo: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getUserBrowser();

  }

  public ngOnEditUserProfile(): void {
    this.enableEditInfo = true;
    setTimeout(() => {
      if (this.inputUserEditFirstName) {
        this.inputUserEditFirstName.nativeElement.value = this.user.first_name;
      }

      if (this.inputUserEditLastName) {
        this.inputUserEditLastName.nativeElement.value = this.user.last_name;
      }

      if (this.inputUserEditEmail) {
        this.inputUserEditEmail.nativeElement.value = this.user.email;
      }

      if (this.inputUserEditAddress) {
        this.inputUserEditAddress.nativeElement.value = this.user.address;
      }

      if (this.inputUserEditPhone) {
        this.inputUserEditPhone.nativeElement.value = this.user.phone;
      }
    });
  }

  public ngOnEditUserProfileCancel():void {
    this.enableEditInfo = false;
  }

  public ngOnCreateModalChangePassword(): void {
    this.modalChangePasswordInstance = new bootstrap.Modal(this.modalChangePassword.nativeElement);
    this.modalChangePasswordInstance.show();
  }

  public async ngOnModelChangePassword(): Promise<void> {
    const password = this.inputPassword.nativeElement.value;
    const repeatPassword = this.inputRepeatPassword.nativeElement.value;
    let success = 0

    if (password.trim() === '') {
      this.passwordError = 'Debe ingresar una contraseña';
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

    if (repeatPassword.trim() === '') {
      this.repeatPasswordError = 'Debe repetir su contraseña';
    } else if (password != repeatPassword) {
      this.repeatPasswordError = 'Las contraseñas no coinciden';
    } else {
      this.repeatPasswordError = '';
      success+= 1;
    }


    if (success === 2) {
      this.user.password = password;

      Swal.fire({
        title: '¿Estas seguro que quieres cambiar tu contraseña?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.userService.update(this.user.id, this.user)

          if (response.ok) {
            Swal.fire('¡Cambios realizados con exito!', '', 'success');
            this.modalChangePasswordInstance.hide()
            this.enableEditInfo = false;
          } else {
            console.log(response.error)
          }
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se han guardado', '', 'info');
        }
      }); 
    }
  }

  public async ngOnEditUserProfileSave(): Promise<void> {
    const firstName = this.inputUserEditFirstName.nativeElement.value;
    const lastName = this.inputUserEditLastName.nativeElement.value;
    const email = this.inputUserEditEmail.nativeElement.value;
    const address = this.inputUserEditAddress.nativeElement.value;
    const phone = this.inputUserEditPhone.nativeElement.value;
    let success = 0;

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

    if (success === 5) {
      this.user.first_name = firstName;
      this.user.last_name = lastName;
      this.user.email = email;
      this.user.address = address;
      this.user.phone = phone;

      Swal.fire({
        title: '¿Estas seguro que quieres guardar los cambios?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.userService.update(this.user.id, this.user)

          if (response.ok) {
            Swal.fire('¡Cambios guardados!', '', 'success');
            this.enableEditInfo = false;
          } else {
            console.log(response.error)
          }
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se han guardado', '', 'info');
        }
      }); 
    }
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public checkField(p1: string): string {

    if (p1.trim() === '') {
      return "No proporcionado";
    }

    return p1;
  }

  public ngOnInputValidatePhone(): void {
    Utils.validatePhoneNumber(this.inputUserEditPhone.nativeElement)
  }


  private async getUserBrowser(): Promise<void> {
    const result = await this.userService.getByUsername(Utils.getUsernameByBrowser());

    if (result.ok) {
      this.user = result.message;
      this.userCreateAt = this.UTCToChileTime(this.user.created_at, true);
      this.isUserLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputPassword.nativeElement.value = '';
    this.inputRepeatPassword.nativeElement.value = '';
    this.passwordError = '';
    this.repeatPasswordError = '';
  }
}
