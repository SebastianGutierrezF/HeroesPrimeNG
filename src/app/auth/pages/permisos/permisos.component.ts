import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-fields';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent {
  constructor(
    private fb: FormBuilder
  ) {}
  columns = [
    {field: 'nombre', header: 'Permiso', sort: true, image: false, hasSeverity: false},
    {field: 'accion', header: 'Accion', sort: false, image: false, hasSeverity: true},
  ];

  globalFilterFields = ['nombre', 'clave', 'accion'];

  formGroup: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    clave: ['', Validators.required],
    accion: ['', Validators.required]
  });

  formFields: FormField[] = [
    {for: 'nombre', id: 'nombre', kind: 'input', type: 'text', label: 'Nombre'},
    {for: 'clave', id: 'clave', kind: 'input', type: 'text', label: 'Clave'},
    {for: 'accion', id: 'accion', kind: 'dropdown', label: 'Accion'}
  ];

  categorias: string[] = ['create', 'update', 'delete', 'view', 'view list', 'admin', 'access'];
  
}
