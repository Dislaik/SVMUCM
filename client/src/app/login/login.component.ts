import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('inputUsername') inputUsername: ElementRef;
  usernameError: string = '';
  @ViewChild('inputPassword') inputPassword: ElementRef;
  passwordError: string = '';

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService
  ){}

  ngOnInit(): void {

  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputUsername.nativeElement);
  }

  public ngOnLoginSubmit(): void {
    const username = this.inputUsername.nativeElement.value.toLowerCase();
    const password = this.inputPassword.nativeElement.value;
    const login = new Login(username, password);

    this.ngOnLogin(login);
  }

  private async ngOnLogin(object: Login): Promise<void> {
    const response = await this.authService.login(object)

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

      if (response.error.password) {
        this.passwordError = response.error.password;
        this.inputPassword.nativeElement.style.border = '2px solid red';
      } else {
        this.passwordError = '';
        this.inputPassword.nativeElement.style.border = '';
      }
      if (response.fatalError) {
        console.log(response.fatalError) //Crear un mensaje de que hubo error fatal
      }
    }
  }
}