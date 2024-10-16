import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
  username: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  repeatPassword: HTMLInputElement;
  usernameError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  repeatPasswordError: string = '';


  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.username = this.elementReference.nativeElement.querySelector('#inputTextRUN');
    this.firstName = this.elementReference.nativeElement.querySelector('#inputTextFirstName');
    this.lastName = this.elementReference.nativeElement.querySelector('#inputTextLastName');
    this.email = this.elementReference.nativeElement.querySelector('#inputTextEmail');
    this.password = this.elementReference.nativeElement.querySelector('#inputTextPassword');
    this.repeatPassword = this.elementReference.nativeElement.querySelector('#inputTextRepeatPassword');
  }

  async ngOnRegister(object): Promise<void> {
    const response = await this.authService.register(object)

    console.log(response)

    if (response.ok) {
      Utils.setStorage('keyToken', response.token);
      Utils.setStorage('isLogged', true);
      this.router.navigate(['/']);
    } else {
      if (response.error.username) {
        this.usernameError = response.error.username.error;
        this.username.style.border = '2px solid red';
      } else {
        this.usernameError = '';
        this.username.style.border = '';
      }

      if (response.error.firstName) {
        this.firstNameError = response.error.firstName.error;
        this.firstName.style.border = '2px solid red';
      } else {
        this.firstNameError = '';
        this.firstName.style.border = '';
      }

      if (response.error.lastName) {
        this.lastNameError = response.error.lastName.error;
        this.lastName.style.border = '2px solid red';
      } else {
        this.lastNameError = '';
        this.lastName.style.border = '';
      }

      if (response.error.email) {
        this.emailError = response.error.email.error;
        this.email.style.border = '2px solid red';
      } else {
        this.emailError = '';
        this.email.style.border = '';
      }

      if (response.error.password) {
        this.passwordError = response.error.password.error;
        this.password.style.border = '2px solid red';
      } else {
        this.passwordError = '';
        this.password.style.border = '';
      }

      if (response.error.repeatPassword) {
        this.repeatPasswordError = response.error.repeatPassword.error;
        this.repeatPassword.style.border = '2px solid red';
      } else {
        this.repeatPasswordError = '';
        this.repeatPassword.style.border = '';
      }

      if (response.fatalError) {
        console.log(response.fatalError) //Crear un mensaje de que hubo error fatal
      }
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    
    if (event.target === this.username) {

      Utils.formatRUN(this.username);
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const buttonRegisterSubmit = this.elementReference.nativeElement.querySelector('#buttonRegisterSubmit')

    if (event.target === buttonRegisterSubmit) {
      const register = new Register(
        this.username.value.toLowerCase(),
        this.password.value,
        this.repeatPassword.value,
        this.email.value.toLowerCase(),
        this.firstName.value,
        this.lastName.value
      );

      this.ngOnRegister(register);
    }
  }
}