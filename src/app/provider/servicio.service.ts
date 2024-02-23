import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public api = 'http://127.0.0.1:8000/api/productos/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) {
  }
  
  // Editar
  BD_POST(model: string, data: any) {
    return this.http.post(this.api + model, data);
  }

  // Agregar
  BD_PUT(model: string, data: any) {
    return this.http.put(this.api + model, data);
  }

  // Obtener
  BD_GET(model: string,  pagina: number, limit: number) {
    return this.http.get(this.api + model + '/' + pagina + '/' + limit);
  }

  // Eliminar
  BD_DELETE(model: string, data: any) {
    return this.http.delete(this.api + model + data);
  }

}
