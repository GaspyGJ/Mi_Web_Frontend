import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../entitys/proyecto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  API:string = environment._API;

  constructor(private http: HttpClient){}


  public get(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.API+'/get/proyectos');
  }

  public save(experiencia:Proyecto): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/proyecto',experiencia);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete<any>(this.API+`/delete/proyecto/${id}`);
  }

  public getById(id:number): Observable<Proyecto>{
    return this.http.get<any>(this.API+`/get/proyecto/${id}`);
  }
}
