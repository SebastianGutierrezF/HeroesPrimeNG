import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.style.scss'
})
export class RegistroComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  nuevoProducto: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    categoria: ['', Validators.required],
    genero: ['', Validators.required],
    url: ['', Validators.required]
  })
  submitted = false;
  categorias = ["DC Comics", "Marvel"];

  ngOnInit(): void {
    if (this.config.data) {
      this.nuevoProducto.patchValue(this.config.data);
    }
  }

  hideDialog() {
    this.submitted = false;
    this.ref.close(this.submitted);
  }

  saveProduct() {
    const data = this.nuevoProducto.value;
    this.ref.close(data);
    this.submitted = true;
  }

}
