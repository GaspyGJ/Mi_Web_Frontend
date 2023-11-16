import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardSkill } from '../entitys/hard_skill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HardSkillService {

  API:string = environment._API;

  constructor(private http: HttpClient){}

  public get(): Observable<HardSkill[]>{
    return this.http.get<HardSkill[]>(this.API+'/get/hard/skills');
  }

  public save(hardSkill:HardSkill): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/hard/skill',hardSkill);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete<any>(this.API+`/delete/hard/skill/${id}`);
  }

  public getById(id:number): Observable<HardSkill>{
    return this.http.get<any>(this.API+`/get/hard/skill/${id}`);
  }
}
