import { Injectable } from '@angular/core';

//Nombres de variables para la sessionStorage
const TOKEN_KEY = 'AuthToken'; //refiere al --> TOKEN
const USERNAME_KEY = 'AuthUserName'; //refiere al --> NOMBRE DEL USUARIO DEL TOKEN
const AUTHORITIES_KEY = 'AuthAuthorities'; //refiere al --> PRIVILEGIOS DEL USUARIO

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /*El rol de "ROLE_USER" en el PortFolio no es utilizado.
  se utiliza solo el "ROLE_ADMIN" para la edicion.
  todo el contenido restante puede verse sin necesidad de logeo
  */
  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    // elimino el TOKEN anterior (si es q existe)
    window.sessionStorage.removeItem(TOKEN_KEY);
    //le agrego a la variable TOKEN el valor (token)
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string{ 
    // obtengo el token de la session actual , si no existe token retorno cadena vacia
    return sessionStorage.getItem(TOKEN_KEY) || "";
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }
  public getUserName(): string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    //JSON.stringify --> convierte el parametro a una cadena de texto
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) { // si el usuario tiene privilegios
      //JSON.parse --> inverso de JSON.stringify
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) || '').
      forEach( (authority:string)=>{ //authority --> es c/valor retornado por get.Item
        this.roles.push(authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}