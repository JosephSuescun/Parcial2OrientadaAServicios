import { ProductoInterface } from './../interface/producto-interface';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) {}

  baseUrl = environment.api +"/products";

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl)
  }

  getCategories(): Observable<any> {
    return this.http.get(`https://api.escuelajs.co/api/v1/categories`)
  }

  getOne(id : string){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  postProducto(producto: ProductoInterface): Observable<any> {
    return this.http.post(this.baseUrl, producto);
  }

  putProducto(id: string, producto: ProductoInterface): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  $modal = new EventEmitter<any>();
  $modalDelete = new EventEmitter<any>();
  $modalInput = new EventEmitter<any>();
  $modalCreate = new EventEmitter<any>();

  viewItem() {

  }


}
