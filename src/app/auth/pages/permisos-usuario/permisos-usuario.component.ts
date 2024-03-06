import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectItem, ScrollerOptions } from 'primeng/api';
import { Permiso } from 'src/app/interfaces/permiso';
import { ServicioService } from 'src/app/provider/servicio.service';

@Component({
  selector: 'app-permisos-usuario',
  templateUrl: './permisos-usuario.component.html',
  styleUrl: './permisos-usuario.component.css'
})
export class PermisosUsuarioComponent {
  sourcePermisos!: Permiso[];

  targetPermisos!: Permiso[];

  usuarios: SelectItem[] = [];

  selectedUser: string | undefined;

  loading: boolean = false;

  loadLazyTimeout = null;

  options: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.lazyLoadUsers.bind(this)
  };

  constructor(
    private servicio: ServicioService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.lazyLoadUsers({first: 0, last: 10});
  }

  getPermisos() {
    this.servicio.get(`permisosUsuario/${this.selectedUser}`).subscribe((data: any) => {
      if (data.estatus) {
        this.sourcePermisos = data.disponibles;
        this.targetPermisos = data.asignados;        
      }
    })
  }

  lazyLoadUsers(event: any) {    
    this.loading = true;
    this.servicio.post('usuarios', event).subscribe((data: any) => {
      if (data.estatus) {
        if (data.data.length > 0) {      
          data.data.forEach((user: any) => {
            this.usuarios.push({ label: user.name, value: user.id })
          });
        }
      }
      this.loading = false;
    })
  }

  quitarPermisos(event: any) {
    event.items.forEach((item: any) => {
      this.servicio.delete(`permisosUsuario/${this.selectedUser}/${item.id}`).subscribe((data: any) => {
        this.getPermisos();
      })
    });
  }
  
  agregarPermisos(event: any) {
    event.items.forEach((item: any) => {
      this.servicio.put('permisosUsuario', {id_user: this.selectedUser, id_permiso: item.id, estatus: 1}).subscribe((data: any) => {
        this.getPermisos();
      })
    });
  }

}
