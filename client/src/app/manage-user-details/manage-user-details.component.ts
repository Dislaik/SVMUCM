import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';

@Component({
  selector: 'app-manage-user-details',
  standalone: false,
  templateUrl: './manage-user-details.component.html',
  styleUrl: './manage-user-details.component.css'
})
export class ManageUserDetailsComponent implements OnInit {
  title: string = "Detalles de usuario";
  id: number;
  pages: string;

  user: User;
  isUserLoaded: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();

    this.getUser();

  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Usuarios', url: '/panel/manage/user'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  async getUser(): Promise<void> {
    const result = await this.userService.getById(this.id);
    console.log(result)
    if (result.ok) {
      this.user = result.message;
      this.isUserLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  ngOnDeleteUser(): void {

  }

  ngOnEditUser(): void {
    
  }

}
