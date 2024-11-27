import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit{
  @Input()
  listPages: string;
  @Input()
  titlePage: string;
  breadcrumbPages: { [i: number]: { page: string; url: string } };
  constructor(
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.breadcrumbPages = JSON.parse(this.listPages);
  }
}
