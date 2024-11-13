import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-student-volunteer',
  standalone: false,
  templateUrl: './manage-student-volunteer.component.html',
  styleUrl: './manage-student-volunteer.component.css'
})
export class ManageStudentVolunteerComponent implements OnInit {
  title: string = "Alumnos Voluntarios";
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
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

}
