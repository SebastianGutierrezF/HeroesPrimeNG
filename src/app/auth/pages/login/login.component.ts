
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../provider/servicio.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.style.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public service: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  products: Product[] = [];

  product!: Product;

  selectedProducts!: Product[] | null;

  statuses!: any[];

  loading = false;

  total = 0;

  ref: DynamicDialogRef | undefined;

  lastTableLazyLoadEvent?: TableLazyLoadEvent;

  busqueda = "";

  ngOnInit() {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  getData(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    this.loading = true;
    this.service.post('', event).subscribe((data: any) => {
      this.products = data.data;
      this.total = data.count;
      this.loading = false;
    });
  }

  showDialog(header: string) {
    this.ref = this.dialogService.open(RegistroComponent, {
      header: header,
      position: 'top',
      draggable: true,
      dismissableMask: true,
      maximizable: true, 
      data: this.product});
    this.ref.onClose.subscribe((data: any) => {
      if (!data) {
        this.product = {};
        return;
      } 
      this.product = data;
      this.saveProduct();
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Heroes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
          this.service.delete('', this.selectedProducts).subscribe((data: any) => {
            if (data.estatus) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Selected heroes deleted`, life: 3000 });
              this.selectedProducts = null;
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `Failed to deleted selected Heroes`, life: 3000 });
            }
            this.getData(this.lastTableLazyLoadEvent!);
          })
      }
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.nombre}`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete('' + product.id).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${product.nombre} deleted`, life: 3000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: `Failed to deleted ${product.nombre}`, life: 3000 });
          }
          this.getData(this.lastTableLazyLoadEvent!);
        })
      }
    });

  }

  editProduct(product: Product) {
    this.product = product;
    this.showDialog(`Editar ${product.nombre}`);
  }

  saveProduct() {
    if (this.product.nombre?.trim()) {
      if (this.product.id) {
        this.service.post('update', this.product).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.product.nombre} edited`, life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to edit ${this.product.nombre}`, life: 3000 });
          }
          this.getData(this.lastTableLazyLoadEvent!);
          this.product = {};
        })
      } else {
        this.product.id = this.createId();
        this.service.put('', this.product).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.product.nombre} created`, life: 3000 });
            this.getData(this.lastTableLazyLoadEvent!);
            this.product = {};
          }
        });
      }
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
    return event.target.value;
  }

  clearSearch(dt: Table) {
    dt.reset();
    this.busqueda = '';
  }

}
