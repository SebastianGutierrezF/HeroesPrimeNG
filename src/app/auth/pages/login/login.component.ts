import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../provider/servicio.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { TableLazyLoadEvent } from 'primeng/table';
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

  productDialog: boolean = false;

  products: Product[] = [];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  loading = false;

  total = 10;

  categorias = ["DC Comics", "Marvel"];

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  getData(event: TableLazyLoadEvent) {
    this.service.BD_POST('getAll', event).subscribe((data: any) => {
      if (data.data.length > 0) {
        this.products = data.data;
        this.total = data.count;
      }
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  showDialog() {
    this.ref = this.dialogService.open(RegistroComponent, {
      header: "Detalle heroe",
      data: this.product
    });
    this.ref.onClose.subscribe((data: any) => {
      this.product = data;
      this.saveProduct();
    });
  }

  deleteSelectedProducts() {
    let message = {};
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected heros?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProducts?.forEach(product => {
          this.service.BD_DELETE('', product.id).subscribe((data: any) => {
            if (data.estatus) {
              message = { severity: 'success', summary: 'Successful', detail: `${product.nombre} deleted`, life: 3000 };
            } else {
              message = { severity: 'warn', summary: 'Warning', detail: `${product.nombre} not deleted`, life: 3000 }
            }
            this.messageService.add(message);

            this.selectedProducts = null;
          })
        });
      },
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.nombre}`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.BD_DELETE('', product.id).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${product.nombre} deleted`, life: 3000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: `Failed to deleted ${product.nombre}`, life: 3000 });
          }
        })
      }
    });

  }

  editProduct(product: Product) {
    this.product = product;
    this.showDialog();
  }

  saveProduct() {
    if (this.product.nombre?.trim()) {
      if (this.product.id) {
        this.service.BD_PUT('update', this.product).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.product.nombre} edited`, life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to edit ${this.product.nombre}`, life: 3000 });
          }
          this.product = {};
        })
      } else {
        this.product.id = this.createId();
        this.service.BD_POST('', this.product).subscribe((data: any) => {
          if (data.estatus) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.product.nombre} created`, life: 3000 });
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

}
