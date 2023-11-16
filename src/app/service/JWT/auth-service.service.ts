
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../../entitys/JWT/login-usuario';
import { NuevoUsuario } from '../../entitys/JWT/nuevo-usuario';
import { JwtDTO } from '../../entitys/JWT/jwt-dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  /* Se conceta con el backend mediantes consultas HTTP POST para el servicio de logeo  y creacion de usuario*/
  API:string = environment._API;
  constructor(private httpClient: HttpClient){}

  //para crear un nuevo usuario (no utilizado en este proyectp)
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.API + '/auth/nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.API + '/auth/login', loginUsuario);
  }

}