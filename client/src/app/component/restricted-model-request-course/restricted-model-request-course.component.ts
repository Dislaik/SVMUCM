import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted-model-request-course',
  standalone: false,
  templateUrl: './restricted-model-request-course.component.html',
  styleUrl: './restricted-model-request-course.component.css'
})
export class RestrictedModelRequestCourseComponent implements OnInit{
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

}
