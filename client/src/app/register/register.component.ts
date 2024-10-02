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

  async ngOnRegister(object) {
    const result = await this.authService.register(object);

    if (!result.error) {
      Utils.setStorage('token', result.token);
      this.router.navigate(['/']);
    } else {
      console.log(result.error);
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
      const register = new Register(this.username.value, this.password.value, this.email.value, this.firstName.value, this.lastName.value);

      this.ngOnRegister(register);
    }
  }
}