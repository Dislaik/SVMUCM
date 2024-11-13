import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Utils } from '../utils';
import { User } from '../architecture/model/user';
import { AuthService } from '../architecture/service/auth.service';
import { Register } from '../architecture/dto/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  @ViewChild('inputUsername') inputUsername: ElementRef;
  @ViewChild('inputFirstName') inputFirstName: ElementRef;
  @ViewChild('inputLastName') inputLastName: ElementRef;
  @ViewChild('inputAddress') inputAddress: ElementRef;
  @ViewChild('inputPhone') inputPhone: ElementRef;
  @ViewChild('inputEmail') inputEmail: ElementRef;
  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild('inputRepeatPassword') inputRepeatPassword: ElementRef;
  usernameError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  addressError: string = '';
  phoneError: string = '';
  emailError: string = '';
  passwordError: string = '';
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
    const register = new Register(username.toLowerCase(), password, repeatPassword, email.toLowerCase(), firstName, lastName, address, phone);

    this.ngOnCreateUser(register);
  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputUsername.nativeElement);
  }

  private async ngOnCreateUser(object: Register) {
    const response = await this.authService.register(object);

    if (response.ok) {
      Utils.setStorage('keyToken', response.token);
      Utils.setStorage('isLogged', true);
      this.router.navigate(['/']);
    } else {
      if (response.error.username) {
        this.usernameError = response.error.username;
        this.inputUsername.nativeElement.style.border = '2px solid red';
      } else {
        this.usernameError = '';
        this.inputUsername.nativeElement.style.border = '';
      }

      if (response.error.firstName) {
        this.firstNameError = response.error.firstName;
        this.inputFirstName.nativeElement.style.border = '2px solid red';
      } else {
        this.firstNameError = '';
        this.inputFirstName.nativeElement.style.border = '';
      }

      if (response.error.lastName) {
        this.lastNameError = response.error.lastName;
        this.inputLastName.nativeElement.style.border = '2px solid red';
      } else {
        this.lastNameError = '';
        this.inputLastName.nativeElement.style.border = '';
      }

      if (response.error.email) {
        this.emailError = response.error.email;
        this.inputEmail.nativeElement.style.border = '2px solid red';
      } else {
        this.emailError = '';
        this.inputEmail.nativeElement.style.border = '';
      }

      if (response.error.address) {
        this.addressError = response.error.address;
        this.inputAddress.nativeElement.style.border = '2px solid red';
      } else {
        this.addressError = '';
        this.inputAddress.nativeElement.style.border = '';
      }

      if (response.error.phone) {
        this.phoneError = response.error.phone;
        this.inputPhone.nativeElement.style.border = '2px solid red';
      } else {
        this.phoneError = '';
        this.inputPhone.nativeElement.style.border = '';
      }

      if (response.error.password) {
        this.passwordError = response.error.password;
        this.inputPassword.nativeElement.style.border = '2px solid red';
      } else {
        this.passwordError = '';
        this.inputPassword.nativeElement.style.border = '';
      }

      if (response.error.repeatPassword) {
        this.repeatPasswordError = response.error.repeatPassword;
        this.inputRepeatPassword.nativeElement.style.border = '2px solid red';
      } else {
        this.repeatPasswordError = '';
        this.inputRepeatPassword.nativeElement.style.border = '';
      }

      if (response.fatalError) {
        console.log(response.fatalError) //Crear un mensaje de que hubo error fatal
      }
    }
  }
}