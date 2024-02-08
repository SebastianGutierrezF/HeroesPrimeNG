
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../../provider/servicio.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  Formulario: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  submitted = false;
  modelo = 'login';
  products = [{name: "Bamboo Watch", image: "", price: "65", category: "Accesories", inventoryStatus: "INSTOCK"}];
  product = this.products[0];
  constructor(
    public router: Router,
    private fb: FormBuilder,
    public service: ServicioService
  ) { }

  ngOnInit() { }

  getSeverity(productInventoryStatus: any) {
    switch (productInventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warn";
      case "OUTOFSTOCK":
        return "error";
      default:
        return "info";
    }
  }

  onLoggedin() {
    this.submitted = true;
    if (this.Formulario.invalid) {
      return;
    }
    console.log(this.Formulario.value);
    this.service.BD_Service_Post(this.modelo, this.Formulario.value, 'login').subscribe((data: any) => {
      console.log(data);
      if (data) {
        console.log('Loggeado');
        this.router.navigate(['/principal']);
      } else {
        console.log('Error');
      }
    });

  }

}
