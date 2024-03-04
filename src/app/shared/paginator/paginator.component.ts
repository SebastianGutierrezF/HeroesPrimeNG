import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../provider/servicio.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RegistroComponent } from '../../auth/pages/registro/registro.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';
import { PermisoIconPipe } from 'src/app/Pipes/permiso-icon.pipe';
import { FormField } from 'src/app/interfaces/form-fields';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    RatingModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    PermisoIconPipe
  ]
})
export class PaginatorComponent {
  constructor(
    public router: Router,
    public service: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  @Input() apiModel = "";
  @Input() header = "";
  @Input() globalFilterFields!: string[];
  @Input() cols!: any[];
  @Input() statuses!: any[];
  @Input() formFields!: FormField[];
  @Input() formGroup!: FormGroup;
  @Input() categorias!: string[];

  data: any[] = [];

  selected!: any;

  selectedData!: any[] | null;

  loading = false;

  total = 0;

  ref: DynamicDialogRef | undefined;

  lastTableLazyLoadEvent?: TableLazyLoadEvent;

  busqueda = "";

  dialogData!: any;


  ngOnInit() {
  }

  getData(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    this.loading = true;
    this.service.post(this.apiModel, event).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.count;
      this.loading = false;
    });
  }

  getSeverity(value: any) {
    switch (value) {
      case "view":
        return "primary";
      case "view list":
        return "primary";
      case "create":
        return "success";
      case "update":
        return "success";
      case "delete":
        return "danger";
      case "access":
        return "info";
      case "admin":
        return "warning";
    }
    return "";
  }

  showDialog(header: string) {
    this.dialogData = {
      data: this.selected,
      formFields: this.formFields,
      formGroup: this.formGroup,
      categorias: this.categorias
    }
    this.ref = this.dialogService.open(RegistroComponent, {
      header: header,
      position: 'top',
      draggable: true,
      maximizable: true,
      closable: false,
      data: this.dialogData
    });
    this.ref.onClose.subscribe((data: any) => {
      if (!data) {
        this.selected = {};
        return;
      }
      this.saveProduct(data);
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the selected ${this.header}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.service.delete(`${this.apiModel}/`, this.selectedData).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Selected ${this.header} deleted`, life: 3000 });
            this.selectedData = null;
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `Failed to deleted selected ${this.header}`, life: 3000 });
          }
          this.getData(this.lastTableLazyLoadEvent!);
        })
      }
    });
  }

  deleteProduct(data: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${data.nombre}`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(`${this.apiModel}/${data.id}`).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Data deleted`, life: 3000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: `Failed to deleted data`, life: 3000 });
          }
          this.getData(this.lastTableLazyLoadEvent!);
        })
      }
    });

  }

  editProduct(data: any) {
    this.selected = data;
    this.showDialog(`Editar ${data.nombre}`);
  }

  saveProduct(data: any) {
    if (this.selected?.nombre?.trim()) {
      this.service.post(`${this.apiModel}/update`, data).subscribe((response: any) => {
        if (response.estatus) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.selected.nombre} edited`, life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to edit ${this.selected.nombre}`, life: 3000 });
        }
        this.getData(this.lastTableLazyLoadEvent!);
        this.selected = {};
      })
    } else {
      data.id = this.createId();
      this.service.put(this.apiModel, data).subscribe((response: any) => {
        if (response.estatus) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${data.nombre} created`, life: 3000 });
          this.getData(this.lastTableLazyLoadEvent!);
          this.selected = {};
        }
      });
    }
  }

  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  filterSearch(event: any) {
    console.log(event.target.value);

    return event.target.value;
  }

  clearSearch(dt: Table) {
    dt.reset();
    this.busqueda = '';
  }
}
