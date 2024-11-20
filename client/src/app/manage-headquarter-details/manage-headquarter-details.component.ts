import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Headquarter } from '../architecture/model/headquarter';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadquarterService } from '../architecture/service/headquarter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-headquarter-details',
  standalone: false,
  templateUrl: './manage-headquarter-details.component.html',
  styleUrl: './manage-headquarter-details.component.css'
})
export class ManageHeadquarterDetailsComponent implements OnInit {
  title: string = "Detalles de la sede";
  id: number;
  pages: string;

  @ViewChild('inputItemEditLabel') inputItemEditLabel: ElementRef;

  headquarter: Headquarter;
  isViewLoaded: boolean = false;
  enableEditItem: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private headquarterService: HeadquarterService
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.getHeadquarter();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      3: {page: 'Gestionar', url: '/panel/manage'},
      4: {page: 'Sedes', url: '/panel/manage/headquarter'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async getHeadquarter(): Promise<void> {
    const response = await this.headquarterService.getById(this.id);

    if (response.ok) {
      this.headquarter = response.message;
      this.isViewLoaded = true;
    } else {
      console.log(response.error);
    }
  }

  public async ngOnEditItemSave(): Promise<void> {
    const label = this.inputItemEditLabel.nativeElement.value;

    this.headquarter.label = label;

    const response = await this.headquarterService.update(this.headquarter.id, this.headquarter);

    if (response.ok) {
      this.toastr.success('Se han guardado los cambios con exito');
      this.enableEditItem = false;
    } else {
      console.log(response.error)
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;
    setTimeout(() => {
      if (this.inputItemEditLabel) {
        this.inputItemEditLabel.nativeElement.value = this.headquarter.label;
      }
    });
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
  }
}
