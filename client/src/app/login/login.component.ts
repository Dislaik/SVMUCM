import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../architecture/service/auth.service';
import { Utils } from '../utils';
import { Login } from '../architecture/dto/login';
import { Router } from '@angular/router';
import { RecoveryPasswordService } from '../architecture/service/recovery-password.service';
import { RecoveryPassword } from '../architecture/dto/recovery-password';
import { RecoveryPasswordConfirm } from '../architecture/dto/recovery-password-confirm';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @ViewChild('modalRecoveryPassword') modalRecoveryPassword: ElementRef;
  modalRecoveryPasswordInstance: any;
  @ViewChild('modalRecoveryPasswordConfirm') modalRecoveryPasswordConfirm: ElementRef;
  modalRecoveryPasswordConfirmInstance: any;

  @ViewChild('timestampText') timestampText: ElementRef;
  timestamp: number = 60 * 3;
  timestampInterval: any;
  emailTarget: string = '';

  @ViewChild('inputUsername') inputUsername: ElementRef;
  usernameError: string = '';
  @ViewChild('inputPassword') inputPassword: ElementRef;
  passwordError: string = '';
  @ViewChild('inputEmail') inputEmail: ElementRef;
  emailError: string = '';
  @ViewChild('inputCode1') inputCode1: ElementRef;
  @ViewChild('inputCode2') inputCode2: ElementRef;
  @ViewChild('inputCode3') inputCode3: ElementRef;
  @ViewChild('inputCode4') inputCode4: ElementRef;
  @ViewChild('inputCode5') inputCode5: ElementRef;
  codeError: string = '';
  

  

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private recoveryPasswordService: RecoveryPasswordService,
  ){}

  public ngOnInit(): void {

  }

  public ngOnFormatUsername(): void {
    Utils.formatRUN(this.inputUsername.nativeElement);
  }

  public ngOnCreateModalRecoveryPassword(): void {
    this.modalRecoveryPasswordInstance = new bootstrap.Modal(this.modalRecoveryPassword.nativeElement);

    this.modalRecoveryPasswordInstance.show();
  }

  public ngOnModelRecoveryPassword(): void {
    const email = this.inputEmail.nativeElement.value;
    let success = 0;

    if (email.trim() === '') { 
      this.emailError = 'Debe ingresar su correo electronico';
    } else if (!email.includes('@') || !email.includes('.')) {
      this.emailError = 'El correo electronico debe ser uno valido';
    } else {
      this.emailError = '';
      success+= 1;
    }

    if (success === 1) {
      const recoveryPassword = new RecoveryPassword(email);
      this.emailTarget = email;
      this.ngOnRecoveryPassword(recoveryPassword);
    }
  }

  private async ngOnRecoveryPassword(email: RecoveryPassword): Promise<void> {
    const response = await this.recoveryPasswordService.sendPasswordRecovery(email);

    if (response.ok) {
      this.modalRecoveryPasswordInstance.hide();
      this.modalRecoveryPasswordConfirmInstance = new bootstrap.Modal(this.modalRecoveryPasswordConfirm.nativeElement);

      this.modalRecoveryPasswordConfirmInstance.show();
      
      clearInterval(this.timestampInterval);
      this.timestamp = 60 * 3;
      this.timestampInterval = setInterval(() => this.updateTimer(), 1000);
    } else {
      if (response.message) {
        this.toastr.error(response.message);
      }
    }
  }

  private updateTimer(): void {
    if (!this.timestamp) return;
  
    const minutes: number = Math.floor(this.timestamp / 60);
    const seconds: number = this.timestamp % 60;
  
    this.timestampText.nativeElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    this.timestamp--;

    if (this.timestamp === 0) {
      this.timestampText.nativeElement.innerText = 'El tiempo se ha agotado';
      clearInterval(this.timestampInterval);
      return;
    }
  }

  public ngOnModelRecoveryPasswordConfirm(): void {
    const code1 = this.inputCode1.nativeElement.value;
    const code2 = this.inputCode2.nativeElement.value;
    const code3 = this.inputCode3.nativeElement.value;
    const code4 = this.inputCode4.nativeElement.value;
    const code5 = this.inputCode5.nativeElement.value;
  
    const code = `${code1} ${code2} ${code3} ${code4} ${code5}`;
    const recoveryPasswordConfirm = new RecoveryPasswordConfirm(this.emailTarget, code);

    this.ngOnRecoveryPasswordConfirm(recoveryPasswordConfirm);
  }

  private async ngOnRecoveryPasswordConfirm(recoveryPasswordConfirm: RecoveryPasswordConfirm): Promise<void> {
    const response = await this.recoveryPasswordService.sendPasswordRecoveryConfirm(recoveryPasswordConfirm);

    if (response.ok) {
      this.modalRecoveryPasswordConfirmInstance.hide();
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (response.message) {
        this.codeError = response.message;
      }
    }
  }


  public ngOnLoginSubmit(): void {
    const username = this.inputUsername.nativeElement.value.toLowerCase();
    const password = this.inputPassword.nativeElement.value;
    let success = 0;

    if (username.trim() === '') {
      this.usernameError = 'Debe ingresar un RUN'
    } else if (/[a-jl-zA-JL-Z]/.test(username)) {
      this.usernameError = 'El formato del RUN es inválido'
    } else if (Utils.cleanRUN(username).length < 8 || Utils.cleanRUN(username).length > 12) {
      this.usernameError = 'El RUN debe tener entre 8 y 12 caracteres'
    } else if (!Utils.validateRUN(username)) {
      this.usernameError = 'El RUN ingresado no es válido';
    } else {
      this.usernameError = '';
      success+= 1;
    }

    if (password.trim() === '') {
      this.passwordError = 'Debe ingresar su contraseña';
    } else {
      this.passwordError = '';
      success+= 1;
    }

    if (success === 2) {
      const login = new Login(username, password);
      this.ngOnLogin(login);
    }
  }

  private async ngOnLogin(login: Login): Promise<void> {
    const response = await this.authService.login(login)

    if (response.ok) {
      Utils.setStorage('keyToken', response.message);
      Utils.setStorage('isLogged', true);
      this.router.navigate(['/']);
    } else {
      if (response.error.error.username) {
        this.usernameError = response.error.error.username;
      } else {
        this.usernameError = '';
      }

      if (response.error.error.password) {
        this.passwordError = response.error.error.password;
      } else {
        this.passwordError = '';
      }
    }
  }

  public ngOnOnlyNumbers(p1: Event): void {
    const element = p1.target as HTMLInputElement;

    Utils.onlyNumbers(element)
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.inputEmail.nativeElement.value = '';
    this.inputCode1.nativeElement.value = '';
    this.inputCode2.nativeElement.value = '';
    this.inputCode3.nativeElement.value = '';
    this.inputCode4.nativeElement.value = '';
    this.inputCode5.nativeElement.value = '';
    this.emailError = '';
    this.codeError = '';
    this.timestampText.nativeElement.innerText = '03:00'
  }
}