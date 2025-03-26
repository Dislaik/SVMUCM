import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted-model-request-course',
  standalone: false,
  templateUrl: './restricted-model-request-course.component.html',
  styleUrl: './restricted-model-request-course.component.css'
})
export class RestrictedModelRequestCourseComponent {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public close(): void {
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }

  @HostListener('document:hidden.bs.modal', ['$event']) onModalClick(event: Event) {
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }
}
