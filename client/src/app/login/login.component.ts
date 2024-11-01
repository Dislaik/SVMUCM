import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../architecture/service/auth.service';
import { Utils } from '../utils';
import { Login } from '../architecture/dto/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: HTMLInputElement;
  password: HTMLInputElement;
  usernameError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.username = this.elementReference.nativeElement.querySelector('#inputTextRUN');
    this.password = this.elementReference.nativeElement.querySelector('#inputTextPassword');
  }

  async ngOnLogin(object): Promise<void> {
    const response = await this.authService.login(object)

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

      if (response.error.password) {
        this.passwordError = response.error.password.error;
        this.password.style.border = '2px solid red';
      } else {
        this.passwordError = '';
        this.password.style.border = '';
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
    const buttonSubmit = this.elementReference.nativeElement.querySelector('#buttonSubmit')

    if (event.target === buttonSubmit) {
      const login = new Login(this.username.value.toLowerCase(), this.password.value);

      this.ngOnLogin(login);
    }
  }

}