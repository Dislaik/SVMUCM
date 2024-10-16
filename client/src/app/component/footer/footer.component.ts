import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  showComponent: boolean = true;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.showComponent = this.router.url !== '/login' && this.router.url !== '/register';
      }
    });
  }
}
