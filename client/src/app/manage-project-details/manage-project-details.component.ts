import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from '../architecture/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../architecture/service/project.service';
import { APU } from '../architecture/model/apu';
import { ProjectAPU } from '../architecture/model/project-apu';
import { APUService } from '../architecture/service/apu.service';
import { ProjectAPUService } from '../architecture/service/project-apu.service';
import { APUResource } from '../architecture/model/apuresource';
import { APUResourceService } from '../architecture/service/apuresource.service';
import { Utils } from '../utils';

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
  apuResources: {};
  isProjectLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private apuService: APUService,
    private projectAPUService: ProjectAPUService,
    private apuResourceService: APUResourceService
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
    this.apuResources = {}
  }

  public async ngOnGetResourcesByAPUId(projectAPUs: ProjectAPU[]): Promise<void> {

    projectAPUs.forEach(async element => {
      const response = await this.apuResourceService.getByAPUId(element.id_apu.id);

      if (response.ok) {
        this.apuResources[String(element.id_apu.id)] = response.message;
      } else {
        console.log(response.error)
      }
    });
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

      this.ngOnGetResourcesByAPUId(this.projectAPUs);
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

  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
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
