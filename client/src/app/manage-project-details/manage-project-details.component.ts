import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from '../architecture/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../architecture/service/project.service';
import { APU } from '../architecture/model/apu';
import { ProjectAPU } from '../architecture/model/project-apu';
import { APUService } from '../architecture/service/apu.service';
import { ProjectAPUService } from '../architecture/service/project-apu.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-project-details',
  standalone: false,
  templateUrl: './manage-project-details.component.html',
  styleUrl: './manage-project-details.component.css'
})
export class ManageProjectDetailsComponent implements OnInit {
  title: string = "Detalles del proyecto";
  id: number;
  pages: string;

  @ViewChild('modalAddAPU') modalAddAPU: ElementRef;
  modalAddAPUInstance: any;

  project: Project;
  apus: APU[];
  projectAPUs: ProjectAPU[];
  isProjectLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private apuService: APUService,
    private projectAPUService: ProjectAPUService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  ngOnInit(): void {
    this.createBreadCrumb();
    this.getProject();
    this.ngOnGetAllAPUs();
    this.ngOnGetAPUsByProjectId();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Proyectos', url: '/panel/manage/project'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getProject(): Promise<void> {
    const result = await this.projectService.getById(this.id);

    if (result.ok) {
      this.project = result.message;
      this.isProjectLoaded = true;
    } else {
      console.log(result.error);
    }
  }

  private async ngOnGetAllAPUs(): Promise<void> {
    const response = await this.apuService.getAll();

    if (response.ok) {
      this.apus = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetAPUsByProjectId(): Promise<void> {
    const response = await this.projectAPUService.getByProjectId(this.id);

    if (response.ok) {
      this.projectAPUs = response.message;
    } else {
      console.log(response.error)
    }
  }

  public ngOnClickOpenModal(): void {
    this.modalAddAPUInstance = new bootstrap.Modal(this.modalAddAPU.nativeElement);
    this.modalAddAPUInstance.show();
  }

  public ngOnClickSelectAPU(apu: APU): void {
    const projectAPU = new ProjectAPU(this.project, apu);

    this.ngOnAddAPU(projectAPU);
  }

  private async ngOnAddAPU(projectAPU: ProjectAPU): Promise<void> {
    console.log(projectAPU)
    const response = await this.projectAPUService.create(projectAPU)

    if (response.ok) {
      this.modalAddAPUInstance.hide()
      this.projectAPUs.push(response.message);
    } else {
      console.log(response.error);
    }
  }

  ngOnDeleteProject(): void {

  }

  ngOnEditProject(): void {
    console.log("Edit project")
  }
}
