import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { PermisosUsuarioComponent } from './pages/permisos-usuario/permisos-usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'heroes',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'permisos',
        component: PermisosComponent
      },
      {
        path: 'permisosUsuario',
        component: PermisosUsuarioComponent
      },
      {
        path: '**',
        redirectTo: 'permisosUsuario',
        pathMatch: 'full'
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
