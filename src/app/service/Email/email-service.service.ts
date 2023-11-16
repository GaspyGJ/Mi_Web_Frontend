import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/entitys/Email/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  API:string = environment._API;
  constructor(private http: HttpClient){}

  public sendEmail(email: Email): Observable<any> {
    return this.http.post<any>(this.API + '/send-email', email);
  }

}
