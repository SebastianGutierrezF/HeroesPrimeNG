import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permisoIcon',
  standalone: true
})
export class PermisoIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'view':
        return '<i class="pi pi-eye" style="font-size: 1rem"></i>';
      case 'view list':
        return '<i class="pi pi-list" style="font-size: 1rem"></i>';
      case 'create':
        return '<i class="pi pi-plus" style="font-size: 1rem"></i>';
      case 'update':
        return '<i class="pi pi-pencil" style="font-size: 1rem"></i>';
      case 'delete':
        return '<i class="pi pi-trash" style="font-size: 1rem"></i>';
      case 'access':
        return '<i class="pi pi-sign-in" style="font-size: 1rem"></i>';
      case 'admin':
        return '<i class="pi pi-cog" style="font-size: 1rem"></i>';
    }
    return "";
  }

}
