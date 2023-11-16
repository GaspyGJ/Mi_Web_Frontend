import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../entitys/educacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  API:string = environment._API;

  constructor(private http: HttpClient){}

  public get(): Observable<Educacion[]>{
    return this.http.get<Educacion[]>(this.API+'/get/educaciones');
  }

  public save(educacion:Educacion): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/educacion',educacion);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete<any>(this.API+`/delete/educacion/${id}`);
  }

  public getById(id:number): Observable<Educacion>{
    return this.http.get<any>(this.API+`/get/educacion/${id}`);
  }
}
