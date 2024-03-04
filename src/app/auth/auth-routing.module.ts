import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PermisosComponent } from './pages/permisos/permisos.component';

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
        path: '**',
        redirectTo: 'permisos',
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
