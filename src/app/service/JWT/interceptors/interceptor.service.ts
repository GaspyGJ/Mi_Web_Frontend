
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  /*El interceptor es un servicio que agrega a cada peticion hacia el backend 
  el TOKEN del usuario*/

  constructor(private tokenService: TokenService) { }

  //Implementacion de la Iterfaz
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptRequest = request;
    const token = this.tokenService.getToken();
    if (token != '') {//si es vacio significa que el usuario no tiene token
      //introdusco el token en la request
      interceptRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(interceptRequest);
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];