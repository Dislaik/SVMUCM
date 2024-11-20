import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Career } from '../architecture/model/career';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../architecture/service/career.service';
import { FacultyService } from '../architecture/service/faculty.service';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { ToastrService } from 'ngx-toastr';
import { Headquarter } from '../architecture/model/headquarter';
import { Faculty } from '../architecture/model/faculty';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-career-details',
  standalone: false,
  templateUrl: './manage-career-details.component.html',
  styleUrl: './manage-career-details.component.css'
})
export class ManageCareerDetailsComponent  implements OnInit {
  title: string = "Detalles de la carrera";
  id: number;
  pages: string;  
  isViewLoaded: boolean = false;
  enableEditItem: boolean;

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;
  labelError: string = '';
  @ViewChild('selectItemEditHeadquarter') selectItemEditHeadquarter: ElementRef;
  @ViewChild('selectItemEditFaculty') selectItemEditFaculty: ElementRef;


  career: Career;
  headquarters: Headquarter[];
  faculties: Faculty[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private careerService: CareerService,
    private headquarterService: HeadquarterService,
    private facultyService: FacultyService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getAllHeadquarters();
    this.getAllFaculties();
    this.getCareer();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Carreras', url: '/panel/manage/career'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getAllHeadquarters(): Promise<void> {
    const response = await this.headquarterService.getAll();

    if (response.ok) {
      this.headquarters = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getAllFaculties(): Promise<void> {
    const response = await this.facultyService.getAll();

    if (response.ok) {
      this.faculties = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async getCareer(): Promise<void> {
    const response = await this.careerService.getById(this.id);

    if (response.ok) {
      this.career = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.career.label;
      }

      if (this.selectItemEditHeadquarter) {
        this.selectItemEditHeadquarter.nativeElement.value = this.career.id_headquarter.name;
      }

      if (this.selectItemEditFaculty) {
        this.selectItemEditFaculty.nativeElement.value = this.career.id_faculty.name;
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const label = this.inputItemEditLabel.nativeElement.value;
    const headquarter = this.headquarters.find(headquarter => headquarter.name === this.selectItemEditHeadquarter.nativeElement.value);
    const faculty = this.faculties.find(faculty => faculty.name === this.selectItemEditFaculty.nativeElement.value); 
    let success = 0;

    if (label.trim() === '') {
      this.labelError = 'Debe ingresar una etiqueta';
    } else {
      this.labelError = '';
      success+= 1;
    }

    if (success === 1) {
      this.career.label = label;
      this.career.id_headquarter = headquarter;
      this.career.id_faculty = faculty;

      const response = await this.careerService.update(this.career.id, this.career);

      if (response.ok) {
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        console.log(response.error)
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
  }

  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta carrera?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.careerService.delete(this.career.id)

        if (response.ok) {
          Swal.fire('Carrera eliminada', '', 'success');

          this.router.navigate(['/panel/manage/career']);
        } else {
          Swal.fire(response.error, '', 'warning');
        }
      }
    }); 
  }
}
