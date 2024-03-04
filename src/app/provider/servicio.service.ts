import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public api = 'http://127.0.0.1:8000/api/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) {
  }
  
  // Editar
  post(model: string, data: any) {
    return this.http.post(this.api + model, data, this.httpOptions);
  }

  // Agregar
  put(model: string, data: any) {
    return this.http.put(this.api + model, data, this.httpOptions);
  }

  // Obtener
  get(model: string,  pagina: number, limit: number) {
    return this.http.get(this.api + model + '/' + pagina + '/' + limit, this.httpOptions);
  }

  // Eliminar
  delete(model: string, data?: any) {
    return this.http.delete(this.api + model, {headers: this.httpOptions.headers, body: data});
  }

}
