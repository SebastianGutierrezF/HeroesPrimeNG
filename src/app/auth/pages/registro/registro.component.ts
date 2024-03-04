import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormField } from 'src/app/interfaces/form-fields';

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
  
  formFields!: FormField[];
  formGroup: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    categoria: ['', Validators.required],
    genero: ['', Validators.required],
    url: ['', Validators.required]
  });
  categorias!: string[];
  submitted = false;

  ngOnInit(): void {
    if (this.config.data) {
      const dialogData = this.config.data;
      this.formGroup = dialogData.formGroup;
      this.formFields = dialogData.formFields;
      this.categorias = dialogData.categorias;
      this.formGroup.patchValue(dialogData.data);
    }
  }

  hideDialog() {
    this.submitted = false;
    this.formGroup.reset();
    this.ref.close(this.submitted);
  }
  
  submit() {
    const data = this.formGroup.value;
    this.formGroup.reset();
    this.ref.close(data);
    this.submitted = true;
  }

}
