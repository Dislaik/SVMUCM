import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  standalone: false,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  title: string = 'Gestionar';
  pages: string;

  constructor(){}

  ngOnInit(): void {
    this.createBreadCrumb();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: this.title, url: '/panel/manage'}
    };
    this.pages = JSON.stringify(arrayPages);
  }


}
