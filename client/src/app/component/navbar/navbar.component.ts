import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  ngOnInit(): void {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.showComponent = this.router.url !== '/login' && this.router.url !== '/register';
        this.isLogged = Utils.getStorage('isLogged') || false;
        
        if (await this.authService.verify()) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });
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
