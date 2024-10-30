import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  title: string = "Mis proyectos";
  pages: string;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.createBreadCrumb();
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }
}
