import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../architecture/service/auth.service';
import { Utils } from '../../utils';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showComponent: boolean = true;
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.router.events.subscribe(() => {
      this.showComponent = this.router.url !== '/login' && this.router.url !== '/register';
    });

    console.log(await this.authService.verify())

    if (await this.authService.verify()) {
      this.isLogged = true;
      console.log("Usuario logeado")
    } else {
      this.isLogged = false;
      console.log("Usuario no esta logeado")
    }
  }

  ngOnLogin(): void {
    this.router.navigate(['/login'])
  }

  ngOnRegister(): void {
    this.router.navigate(['/register'])
  }

  ngOnLoggout(): void {
    Utils.clearStorage();
    window.location.reload();
  }
}
