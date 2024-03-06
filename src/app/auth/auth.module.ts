import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PickListModule } from 'primeng/picklist';
import { PaginatorComponent } from '../shared/paginator/paginator.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { CommonModule } from '@angular/common';
import { PermisosUsuarioComponent } from './pages/permisos-usuario/permisos-usuario.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistroComponent,
        PermisosComponent,
        PermisosUsuarioComponent
    ],
    providers: [
        ConfirmationService,
        MessageService,
        DialogService
    ],
    exports: [RegistroComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
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
        PaginatorComponent,
        PickListModule
    ]
})
export class AuthModule { }
