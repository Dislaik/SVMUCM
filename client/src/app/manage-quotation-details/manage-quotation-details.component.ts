import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Quotation } from '../architecture/model/quotation';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuotationService } from '../architecture/service/quotation.service';
import { Utils } from '../utils';
import Swal from 'sweetalert2';
import { QuotationAPUResource } from '../architecture/model/quotation-apu-resource';
import { APU } from '../architecture/model/apu';
import { APUService } from '../architecture/service/apu.service';
import { APUResourceService } from '../architecture/service/apuresource.service';
import { QuotationAPUResourceService } from '../architecture/service/quotation-apu-resource.service';
import { QuotationAPU } from '../architecture/dto/quotation-apu';
import { QuotationStatus } from '../architecture/model/quotation-status';
import { QuotationStatusService } from '../architecture/service/quotation-status.service';
import { User } from '../architecture/model/user';
import { UserService } from '../architecture/service/user.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

declare var bootstrap: any;

@Component({
  selector: 'app-manage-quotation-details',
  standalone: false,
  templateUrl: './manage-quotation-details.component.html',
  styleUrl: './manage-quotation-details.component.css'
})
export class ManageQuotationDetailsComponent implements OnInit {
  title: string = "Detalles de la cotización";
  id: number;
  pages: string;
  isViewLoaded: boolean = false;
  enableEditItem: boolean = false;
  browserUser: User;

  @ViewChild('modalAddAPU') modalAddAPU: ElementRef;
  modalAddAPUInstance: any;

  @ViewChild('inputItemEditStartDate') inputItemEditStartDate: ElementRef;
  startDateError: string = '';
  @ViewChild('inputItemEditEndDate') inputItemEditEndDate: ElementRef;
  endDateError: string = '';
  @ViewChild('selectItemEditQuotationStatus') selectItemEditQuotationStatus: ElementRef;

  quotation: Quotation;
  quotationPriceWithoutIVA: number = 0;
  quotationPriceWithIVA: number = 0;
  quotationStatus: QuotationStatus[];
  quotationDays: number = 0;

  apus: APU[];
  buttonAPU: any[];
  quotationAPUResources: QuotationAPUResource[] = [];
  quotationAPUResourcesAUX: QuotationAPUResource[] = [];
  quotationAPU: QuotationAPU[] = [];



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private quotationService: QuotationService,
    private apuService: APUService,
    private apuResourceService: APUResourceService,
    private quotationAPUResourceService: QuotationAPUResourceService,
    private quotationStatusService: QuotationStatusService,
  ){
    this.activatedRoute.params.subscribe( params =>
      this.id = params['id']
    );
  }

  public ngOnInit(): void {
    this.createBreadCrumb();
    this.ngOnGetUserByBrowser();
    this.ngOnGetQuotation();
    this.ngOnGetAllAPUs();
    this.ngOnGetAllQuotationStatus();
    this.ngOnGetAPUByQuotationId();
  }

  private createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: 'Panel de administración', url: '/panel'},
      4: {page: 'Cotizaciones', url: '/panel/quotation'},
      5: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }

  private async ngOnGetUserByBrowser(): Promise<void> {
    const browserUser = Utils.getUsernameByBrowser();
    const response = await this.userService.getByUsername(browserUser);

    if (response.ok) {
      this.browserUser = response.message;
    } else {
      console.log(response.error)
    }
  }

  private async ngOnGetQuotation(): Promise<void> {
    const response = await this.quotationService.getById(this.id);

    if (response.ok) {
      this.quotation = response.message;
      this.isViewLoaded = true;

      const startDate = new Date(this.quotation.start_date)
      const endDate = new Date(this.quotation.end_date)
      const diferenciaEnMilisegundos = endDate.getTime() - startDate.getTime();
      const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

      this.quotationDays = Math.round(diferenciaEnDias);
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllAPUs(): Promise <void> {
    const response = await this.apuService.getAll();

    if (response.ok) {
      this.apus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAllQuotationStatus(): Promise <void> {
    const response = await this.quotationStatusService.getAll();

    if (response.ok) {
      this.quotationStatus = response.message;
    } else {
      console.log(response.error);
    }
  }

  private async ngOnGetAPUByQuotationId(): Promise<void> {
    const response = await this.quotationAPUResourceService.getByQuotationId(this.id);

    if (response.ok) {
      this.quotationAPUResources = response.message;
      this.quotationAPUResourcesAUX = structuredClone(this.quotationAPUResources);
      this.ngOnFormatQuotationAPUResource(this.quotationAPUResourcesAUX);
    } else {
      console.log(response.error)
    }
  }

  public ngOnEditItem(): void {
    this.enableEditItem = true;

    setTimeout(() => {

      if (this.selectItemEditQuotationStatus) {
        this.selectItemEditQuotationStatus.nativeElement.value = this.quotation.id_quotation_status.name
      }

      if (this.inputItemEditStartDate) {
        const date = this.UTCToChileTime(this.quotation.start_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditStartDate.nativeElement.value = dateInverted;
      }

      if (this.inputItemEditEndDate) {
        const date = this.UTCToChileTime(this.quotation.end_date, true);
        const [day, month, year] = date.split("-");
        const dateInverted = `${year}-${month}-${day}`;

        this.inputItemEditEndDate.nativeElement.value = dateInverted;
      }
    });
  }

  public async ngOnEditItemSave(): Promise<void> {
    const startDate = new Date(`${this.inputItemEditStartDate.nativeElement.value}T00:00:00`);
    const endDate = new Date(`${this.inputItemEditEndDate.nativeElement.value}T00:00:00`);
    const status = this.quotationStatus.find(status => status.name === this.selectItemEditQuotationStatus.nativeElement.value); 
    const todayDate = new Date();
    let success = 0


    todayDate.setHours(0, 0, 0, 0);

    if (startDate.toString() === 'Invalid Date') {
      this.startDateError = 'Debe especificar una fecha de inicio';
    } else if (startDate < todayDate) {
      this.startDateError = 'La fecha de emisión no puede ser una fecha anterior a la de hoy';
    } else {
      this.startDateError = '';
      success+= 1;
    }

    if (endDate.toString() === 'Invalid Date') {
      this.endDateError = 'Debe especificar una fecha de termino';
    } else if (new Date(this.quotation.created_at) > new Date(endDate) ) {
      this.endDateError = 'La fecha de vencimiento no puede ser una fecha igual o anterior a la fecha de emisión';
    } else {
      this.endDateError = '';
      success+= 1;
    }


    if (success === 2) {
      this.quotation.start_date = startDate;
      this.quotation.end_date = endDate;
      this.quotation.id_quotation_status = status;
      this.quotation.price = this.quotationPriceWithoutIVA;

      const response = await this.quotationService.update(this.quotation.id, this.quotation);

      if (response.ok) {

        for (let i = 0; i < this.quotationAPUResources.length; i++) {
          const element = this.quotationAPUResources[i];
          const response = await this.quotationAPUResourceService.delete(element.id);

          if (response.ok) {

          } else {
            console.log(response.error);
          }
        }
        this.quotationAPUResources = [];

        for (let i = 0; i < this.quotationAPUResourcesAUX.length; i++) {
          const element = this.quotationAPUResourcesAUX[i];
          const response = await this.quotationAPUResourceService.create(element);

          if (response.ok) {
            this.quotationAPUResources.push(response.message)
          } else {
            console.log(response.error);
          }
        }
        this.quotationAPUResourcesAUX = structuredClone(this.quotationAPUResources);
        
        this.toastr.success('Se han guardado los cambios con exito');
        this.enableEditItem = false;
      } else {
        console.log(response.error);
      }
    }
  }

  public ngOnEditItemCancel(): void {
    this.enableEditItem = false;
    this.endDateError = '';
    this.quotationPriceWithoutIVA = 0;
    this.quotationPriceWithIVA = 0;
    this.quotationAPUResourcesAUX = structuredClone(this.quotationAPUResources);
    this.ngOnFormatQuotationAPUResource(this.quotationAPUResources);
  }


  public ngOnDeleteItem(): void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar esta cotización?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // const response = await this.projectService.delete(this.project.id)

        // if (response.ok) {
        //   Swal.fire('Cotización eliminada', '', 'success');

        //   this.router.navigate(['/panel/project']);
        // } else {
        //   if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
        //     Swal.fire('La APU no puede ser eliminada debido a tablas relacionadas', '', 'warning');
        //   }
        // }
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
        // const quotationStatus = this.quotationStatus.find(status => status.name === 'active'); 
        // const quotation = new Quotation(this.project, quotationStatus, 10, new Date());
        // console.log(quotation)
        // const response = await this.quotationService.create(quotation)

        // if (response.ok) {
        //   Swal.fire('Cotización Creada', '', 'success');

        //   this.router.navigate(['/panel/quotation']);
        // } else {
        //   if (response.error.error.name == 'SequelizeForeignKeyConstraintError') {
        //     Swal.fire('La cotización no puede ser eliminada debido a tablas relacionadas', '', 'warning');
        //   }
        // }
      }
    }); 
  }


  public async ngOnModalAddAPU(p1: APU): Promise<void> {
    const response = await this.apuResourceService.getByAPUId(p1.id);

    if (response.ok) {
      const apuResource = response.message;
      let uniqueId = Utils.getUniqueId(1);

      apuResource.forEach(item => {
        const price = item.id_resource.price;
        const quotationAPUResource = new QuotationAPUResource(this.quotation, p1, item.id_resource, uniqueId, 1, price, price, new Date());
          console.log("asd")
        //this.quotationPriceWithoutIVA+=price;
        //this.quotationPriceWithIVA = this.quotationPriceWithoutIVA
        
        this.quotationAPUResourcesAUX.push(quotationAPUResource);
      });

      this.quotationPriceWithoutIVA = 0
      this.ngOnFormatQuotationAPUResource(this.quotationAPUResourcesAUX)
    } else {
      console.log(response.error);
    }
    
    this.modalAddAPUInstance.hide();
  }

  public async ngOnCreateModalAddAPU(): Promise<void> {
    this.modalAddAPUInstance = new bootstrap.Modal(this.modalAddAPU.nativeElement);
    this.modalAddAPUInstance.show();
  }


  public async ngOnRemoveAPU(index: any, p1: QuotationAPU): Promise<void> {
    const apuId = p1.id_apu.id;
    let uuid;

    
    for (let i = 0; i < this.quotationAPU.length; i++) {
      const element = this.quotationAPU[i];

      if (element.id_apu.id === apuId && index == i) {
        const quotationAPUResource = element.id_quotation_apu_resource;

        for (let j = 0; j < quotationAPUResource.length; j++) {
          const element = quotationAPUResource[j];
          uuid = element.uuid;
  
          this.quotationPriceWithoutIVA-= element.subtotal;
          this.quotationPriceWithIVA = this.quotationPriceWithoutIVA;
        }

        this.quotationAPU.splice(i, 1);
      }
    }

    const filteredArray = this.quotationAPUResourcesAUX.filter(item => item.uuid !== uuid);
    this.quotationAPUResourcesAUX = filteredArray;
  }


  public UTCToChileTime(p1: Date, p2: boolean): string {
    return Utils.convertToChileTime(p1, p2);
  }

  public numberToPrice(p1: number): string {
    if (p1 === 0) {
      return "Sin costos"
    }

    return '$' + Utils.stringToPrice(String(p1));
  }

  public checkDescription(p1: string): string {
    if (p1.trim() === '') {
      return "Sin descripción";
    }

    return p1;
  }

  public ngOnUtilsOnlyNumbers(event: Event, p1: QuotationAPUResource): void {
    let input = event.target as HTMLInputElement;

    if (Number(input.value) < 0) {
      input.value = '0';
    }

    p1.amount = Number(input.value);
    p1.subtotal = p1.amount * p1.price;

    this.quotationPriceWithoutIVA = 0;
    for (let i = 0; i < this.quotationAPU.length; i++) {
      const element = this.quotationAPU[i];
      const quotationAPUResource = element.id_quotation_apu_resource;
      
      for (let j = 0; j < quotationAPUResource.length; j++) {
        const element = quotationAPUResource[j];

        this.quotationPriceWithoutIVA+= element.subtotal;
      }
    }

    this.quotationPriceWithIVA = this.quotationPriceWithoutIVA;
  }

  public ngOnGeneratePDF(): void {
    const username = this.quotation.id_project.id_user.username;
    const firstName = this.quotation.id_project.id_user.first_name;
    const lastName = this.quotation.id_project.id_user.last_name;
    const projectName = this.quotation.id_project.name;
    const startDate = this.UTCToChileTime(this.quotation.created_at, true);
    const endDate = this.UTCToChileTime(this.quotation.end_date, true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.addImage('../../../assets/img/logoucm2.png', 'PNG', 10, 5, 60, 20);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('Cotización', 110, 20);
  
    doc.setFontSize(14);
    doc.text('Información General', 10, 34);
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 38, 200, 36);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    doc.text('Solicitante:', 10, 44);
    doc.text(username, pageWidth - 10, 44, { align: "right" });
    
    doc.text('Nombre del solicitante:', 10, 50);
    doc.text(firstName + ' ' + lastName, pageWidth - 10, 50, { align: "right" });
    
    doc.text('Nombre del proyecto:', 10, 56);
     doc.text(<string>projectName, pageWidth - 10, 56, { align: "right" });
    
    doc.text('Fecha de emisión:', 10, 62);
    doc.text(startDate, pageWidth - 10, 62, { align: "right" });
    
    doc.text('Fecha de vencimiento:', 10, 68);
    doc.text(endDate, pageWidth - 10, 68, { align: "right" });
  
    let dataTablePositionY = 80;
    for (let i = 0; i < this.quotationAPU.length; i++) {
      const apu = this.quotationAPU[i].id_quotation_apu_resource;
      const apuLabel = apu[0].id_apu.label;
      const data = [];
  
      doc.text(apuLabel, 15, dataTablePositionY + 5);
      doc.setFillColor(0, 0, 0);
      doc.circle(11, dataTablePositionY + 3.5, 1, 'F'); 
  
      dataTablePositionY += 8;
  
      for (let j = 0; j < apu.length; j++) {
        const resource = apu[j];
        data.push({
          label: this.truncateString(resource.id_resource.label),
          amount: resource.amount,
          price: this.numberToPrice(resource.price),
          subtotal: this.numberToPrice(resource.subtotal)
        });
      }
  
      autoTable(doc, {
        theme: 'plain',
        body: data,
        columns: [
          { header: 'Recurso', dataKey: 'label' },
          { header: 'Cantidad', dataKey: 'amount' },
          { header: 'Precio unitario', dataKey: 'price' },
          { header: 'Subtotal', dataKey: 'subtotal' },
        ],
        columnStyles: {
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 },
        },
        startY: dataTablePositionY,
        styles: {
          fontSize: 12,
          halign: 'center',
        },
        
        tableWidth: 'auto',
        margin: { left: 10, right: 10 },
        didDrawCell: (data) => {
          if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
            dataTablePositionY = data.cell.y + data.cell.height + 2;
          }
        }
      });
    }

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, dataTablePositionY, 200, dataTablePositionY);
    dataTablePositionY+= 6;
    doc.text('Valor sin IVA: ' + this.numberToPrice(this.quotationPriceWithoutIVA), 10, dataTablePositionY);
    doc.text('Valor con IVA: ' + this.numberToPrice(this.quotationPriceWithIVA * 1.19), 120, dataTablePositionY);

    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, '_blank');
  }

  private ngOnFormatQuotationAPUResource(p1: QuotationAPUResource[]): void {
    let groupByUUID = [];

    for (let i = 0; i < p1.length; i++) {
      const element = p1[i];
    
      if (!groupByUUID[element.uuid]) {
        groupByUUID[element.uuid] = [];
      }

      groupByUUID[element.uuid].push(element);

      this.quotationPriceWithoutIVA+=element.subtotal;
      this.quotationPriceWithIVA = this.quotationPriceWithoutIVA
    }
    
    this.quotationAPU = Object.entries(groupByUUID).map(([uuid, elements]) => {
      return new QuotationAPU(elements[0].id_apu, elements);
    });
  }

  public haveRole(p1: any[]) {
    
    if (this.browserUser) {
      if (Utils.haveRole(this.browserUser, p1)) {
        return true
      }
    }

    return false
  }

  private truncateString(str: string, maxLength: number = 30): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  @HostListener('change', ['$event']) onChange(event: Event) {

    if (event.target === this.inputItemEditStartDate.nativeElement || event.target === this.inputItemEditEndDate.nativeElement) {
      const startDate = new Date(this.inputItemEditStartDate.nativeElement.value)
      const endDate = new Date(this.inputItemEditEndDate.nativeElement.value)
      const diferenciaEnMilisegundos = endDate.getTime() - startDate.getTime();
      const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

      this.quotationDays = Math.round(diferenciaEnDias);
    }
  }
}
