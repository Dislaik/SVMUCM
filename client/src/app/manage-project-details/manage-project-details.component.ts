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
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ProjectStatus } from '../architecture/model/project-status';
import { City } from '../architecture/model/city';
import { ProjectStatusService } from '../architecture/service/project-status.service';
import { CityService } from '../architecture/service/city.service';
import { CareerService } from '../architecture/service/career.service';
import { Career } from '../architecture/model/career';
import { QuotationService } from '../architecture/service/quotation.service';
import { Quotation } from '../architecture/model/quotation';
import { QuotationStatusService } from '../architecture/service/quotation-status.service';
import { QuotationStatus } from '../architecture/model/quotation-status';

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
  isViewLoaded: boolean = false;
  enableEditItem: boolean;

  @ViewChild('modalAddAPU') modalAddAPU: ElementRef;
  modalAddAPUInstance: any;

  @ViewChild('inputItemEditName') inputItemEditName: ElementRef;
  nameError: string = '';
  @ViewChild('inputItemEditDescription') inputItemEditDescription: ElementRef;
  descriptionError: string = '';
  @ViewChild('selectItemEditProjectStatus') selectItemEditProjectStatus: ElementRef;
  @ViewChild('selectItemEditCity') selectItemEditCity: ElementRef;
  @ViewChild('selectItemEditCareer') selectItemEditCareer: ElementRef;
  @ViewChild('inputItemEditStartDate') inputItemEditStartDate: ElementRef;
  startDateError: string = '';
  @ViewChild('inputItemEditEndDate') inputItemEditEndDate: ElementRef;
  endDateError: string = '';


  project: Project;
  projectStatus: ProjectStatus[];
  cities: City[];
  careers: Career[];
  apus: APU[];
  projectAPUs: ProjectAPU[];
  quotation: Quotation;
  quotationStatus: QuotationStatus[];
  apuResources: {};
  isProjectLoaded: boolean = false;
  existsQuotation: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private projectService: ProjectService,
    private projectStatusService: ProjectStatusService,
    private cityService: CityService,
    private careerService: CareerService,
    private apuService: APUService,
    private projectAPUService: ProjectAPUService,
    private apuResourceService: APUResourceService,
    private quotationService: QuotationService,
    private quotationStatusService: QuotationStatusService,
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getProject();
    this.getAllProjectStatus();
    this.getAllCities();
    this.getAllCareers()
    this.getAllQuotationStatus()
    this.getQuotationByProjectId();
    //this.ngOnGetAllAPUs();
    //this.ngOnGetAPUsByProjectId();
    this.apuResources = {}
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
    const response = await this.projectService.getById(this.id);

    if (response.ok) {
      this.project = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  private async getAllProjectStatus(): Promise<void> {
    const response = await this.projectStatusService.getAll();

    if (response.ok) {
      this.projectStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllCities(): Promise<void> {
    const response = await this.cityService.getAll();

    if (response.ok) {
      this.cities = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllCareers(): Promise<void> {
    const response = await this.careerService.getAll();

    if (response.ok) {
      this.careers = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getAllQuotationStatus(): Promise<void> {
    const response = await this.quotationStatusService.getAll();

    if (response.ok) {
      this.quotationStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async getQuotationByProjectId(): Promise<void> {
    const response = await this.quotationService.getByProjectId(this.id);

    if (response.ok) {
      this.quotation = response.message;
      this.existsQuotation = true;
    } else {
      console.log(response.error);
    }
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


  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditName) {
        this.inputItemEditName.nativeElement.value = this.project.name;
      }

      if (this.inputItemEditDescription) {
        this.inputItemEditDescription.nativeElement.value = this.project.description;
      }

      if (this.selectItemEditProjectStatus) {
        this.selectItemEditProjectStatus.nativeElement.value = this.project.id_projectStatus.name;
      }

      if (this.inputItemEditStartDate) {
        const date = this.UTCToChileTime(this.project.start_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditStartDate.nativeElement.value = dateInverted;
      }

      if (this.inputItemEditEndDate) {
        const date = this.UTCToChileTime(this.project.end_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditEndDate.nativeElement.value = dateInverted;
      }

      if (this.selectItemEditCity) {
        this.selectItemEditCity.nativeElement.value = this.project.id_city.name
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const name = this.inputItemEditName.nativeElement.value;
    const description = this.inputItemEditDescription.nativeElement.value;
    const projectStatus = this.projectStatus.find(status => status.name === this.selectItemEditProjectStatus.nativeElement.value); 
    const startDate = this.inputItemEditStartDate.nativeElement.value;
    const endDate = this.inputItemEditEndDate.nativeElement.value;
    const city = this.cities.find(city => city.name === this.selectItemEditCity.nativeElement.value);  
    const career = this.careers.find(career => career.name === this.selectItemEditCareer.nativeElement.value);  
    const todayDate = new Date();
    let success = 0;

    if (name.trim() === '') {
      this.nameError = 'Debe ingresar un nombre';
    } else {
      this.nameError = '';
      success+= 1;
    }

    if (description.trim() === '') {
      this.descriptionError = 'Debe ingresar una etiqueta';
    } else {
      this.descriptionError = '';
      success+= 1;
    }

    todayDate.setHours(0, 0, 0, 0);

    if (startDate.trim() === '') {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else if (new Date(startDate) < todayDate) {
      this.startDateError = 'La fecha de inicio no puede ser una fecha anterior o igual a la de hoy';
    } else {
      this.startDateError = '';
      success+= 1;
    }

    if (endDate.trim() === '') {
      this.endDateError = 'Debe especificar una fecha de termino';
    } else if (new Date(startDate) > new Date(endDate) ) {
      this.endDateError = 'La fecha de termino no puede ser una fecha anterior a la fecha de inicio';
    } else {
      this.endDateError = '';
      success+= 1;
    }

    if (success === 4) {
      this.project.name = name;
      this.project.description = description;
      this.project.id_projectStatus = projectStatus;
      this.project.start_date = new Date(startDate + "T00:00:00");;
      this.project.end_date = new Date(endDate + "T00:00:00");;
      this.project.id_city = city;
      this.project.id_career = career;

      console.log(this.project.start_date)

      const response = await this.projectService.update(this.project.id, this.project);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
          Swal.fire('La APU no puede ser eliminada debio a tablas relacionadas', '', 'warning');
        }
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.nameError = '';
    this.descriptionError = '';
    this.startDateError = '';
    this.endDateError = '';
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.projectService.delete(this.project.id)

        if (response.ok) {
          Swal.fire('Proyecto eliminado', '', 'success');

          this.router.navigate(['/panel/manage/project']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('La APU no puede ser eliminada debio a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public ngOnCreateQuotation(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres crear una cotización?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const quotationStatus = this.quotationStatus.find(status => status.name === 'active'); 
        const quotation = new Quotation(this.project, quotationStatus, 10, new Date());
        console.log(quotation)
        const response = await this.quotationService.create(quotation)

        if (response.ok) {
          Swal.fire('Cotización Creada', '', 'success');

          this.router.navigate(['/panel/manage/quotation']);
        } else {
          if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
            Swal.fire('El proyecto no puede ser eliminado debio a tablas relacionadas', '', 'warning');
          }
        }
      }
    }); 
  }

  public ngOnGoQuotation(): void {
    this.router.navigate(['/panel/manage/quotation']);
  }





  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }




  public ngOnClickOpenModal(): void {
  //   this.modalAddAPUInstance = new bootstrap.Modal(this.modalAddAPU.nativeElement);
  //   this.modalAddAPUInstance.show();
  // }

  // public ngOnClickSelectAPU(apu: APU): void {
  //   const projectAPU = new ProjectAPU(this.project, apu);

  //   this.ngOnAddAPU(projectAPU);
  }

  

  // private async ngOnAddAPU(projectAPU: ProjectAPU): Promise<void> {
  //   console.log(projectAPU)
  //   const response = await this.projectAPUService.create(projectAPU)

  //   if (response.ok) {
  //     this.modalAddAPUInstance.hide()
  //     this.projectAPUs.push(response.message);
  //   } else {
  //     console.log(response.error);
  //   }
  // }

  

  // ngOnDeleteProject(): void {

  // }

  // ngOnEditProject(): void {
  //   console.log("Edit project")
  // }
}
