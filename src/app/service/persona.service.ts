import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../entitys/persona';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  API:string = environment._API;

  constructor(private http: HttpClient){}

  public get(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.API+'/get/personas');
  }

  public save(persona:Persona): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/persona',persona);
  }

}
 