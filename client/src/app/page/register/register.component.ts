import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Utils } from '../../app.utils';
import { User } from '../../architecture/model/user';
import { AuthService } from '../../architecture/service/auth.service';
import { Register } from '../../architecture/dto/register';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  @ViewChild('inputUsername') inputUsername: ElementRef;
  usernameError: string = '';
  @ViewChild('inputFirstName') inputFirstName: ElementRef;
  firstNameError: string = '';
  @ViewChild('inputLastName') inputLastName: ElementRef;
  lastNameError: string = '';
  @ViewChild('inputAddress') inputAddress: ElementRef;
  addressError: string = '';
  @ViewChild('inputPhone') inputPhone: ElementRef;
  phoneError: string = '';
  @ViewChild('inputEmail') inputEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputPassword') inputPassword: ElementRef;
  passwordError: string = '';
  @ViewChild('inputRepeatPassword') inputRepeatPassword: ElementRef;
  repeatPasswordError: string = '';


  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService
  ){}

  ngOnInit(): void {

  }

  public ngOnCompleteRegister(): void {
    const username = this.inputUsername.nativeElement.value;
    const firstName = this.inputFirstName.nativeElement.value;
    const lastName = this.inputLastName.nativeElement.value;
    const address = this.inputAddress.nativeElement.value;
    const phone = this.inputPhone.nativeElement.value;
    const email = this.inputEmail.nativeElement.value;
    const password = this.inputPassword.nativeElement.value;
    const repeatPassword = this.inputRepeatPassword.nativeElement.value;
    let success = 0;
    
    if (username.trim() === '') {
      this.usernameError = 'Debe ingresar su RUN';
    } else if (/[a-jl-zA-JL-Z]/.test(username)) {
      this.usernameError = 'El formato del RUT es inválido';
    } else if (Utils.cleanRUN(username).length < 8 || Utils.cleanRUN(username).length > 12) {
      this.usernameError = 'El RUN debe tener entre 8 y 12 caracteres';
    } else if (!Utils.validateRUN(username)) {
      this.usernameError = 'El RUN ingresado no es válido';
    } else {
      this.usernameError = '';
      success+= 1;
    }
    
    if (firstName.trim() === '') {
      this.firstNameError = 'Debe ingresar su nombre';
    } else if (!/^[A-Za-z ]+$/.test(firstName)) {
      this.firstNameError = 'Su nombre solo pueden contener letras';
    } else {
      this.firstNameError = '';
      success+= 1;
    }

    if (lastName.trim() === '') {
      this.lastNameError = 'Debe ingresar su apellido';
    } else if (!/^[A-Za-z ]+$/.test(lastName)) {
      this.lastNameError = 'Su apellido solo pueden contener letras';
    } else {
      this.lastNameError = '';
      success+= 1;
    }

    if (address.trim() === '') {
      this.addressError = 'Debe ingresar su dirección';
    } else {
      this.addressError = '';
      success+= 1;
    }

    if (phone.trim() === '') {
      this.phoneError = 'Debe ingresar su número';
    } else {
      this.phoneError = '';
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

    if (password.trim() === '') {
      this.passwordError = 'Debe ingresar su contraseña';
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


    if (success === 8) {
      const register = new Register(username.toLowerCase(), password, repeatPassword, email.toLowerCase(), firstName, lastName, address, phone);

      this.ngOnCreateUser(register);
    }
  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputUsername.nativeElement);
  }

  private async ngOnCreateUser(object: Register) {
    const response = await this.authService.register(object);

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Te has registrado con éxito",
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          Utils.setStorage('keyToken', response.message);
          Utils.setStorage('isLogged', true);
          this.router.navigate(['/']);
        }
      });
    } else {
      if (response.error.error.username) {
        this.usernameError = response.error.error.username;
      } else {
        this.usernameError = '';
      }

      if (response.error.error.email) {
        this.emailError = response.error.error.email;
      } else {
        this.emailError = '';
      }
    }
  }

  public ngOnInputValidatePhone(): void {
    Utils.validatePhoneNumber(this.inputPhone.nativeElement)
  }
}