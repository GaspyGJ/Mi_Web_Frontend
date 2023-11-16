import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../entitys/experiencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  API:string = environment._API;

  constructor(private http: HttpClient){}

  public get(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.API+'/get/experiencias');
  }

  public save(experiencia:Experiencia): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/experiencia',experiencia);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete<any>(this.API+`/delete/experiencia/${id}`);
  }

  public getById(id:number): Observable<Experiencia>{
    return this.http.get<any>(this.API+`/get/experiencia/${id}`);
  }
}
