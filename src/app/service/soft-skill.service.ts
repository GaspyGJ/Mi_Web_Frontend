import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoftSkill } from '../entitys/soft_skills';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoftSkillService {

  API:string = environment._API;

  constructor(private http: HttpClient){}


  public get(): Observable<SoftSkill[]>{
    return this.http.get<SoftSkill[]>(this.API+'/get/soft/skills');
  }

  public save(softSkill:SoftSkill): Observable<any>{
    return this.http.post<any>(this.API+'/guardar/soft/skill',softSkill);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete<any>(this.API+`/delete/soft/skill/${id}`);
  }

  public getById(id:number): Observable<SoftSkill>{
    return this.http.get<any>(this.API+`/get/soft/skill/${id}`);
  }

}