import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/entitys/JWT/login-usuario';
import { AuthServiceService } from 'src/app/service/JWT/auth-service.service';
import { TokenService } from 'src/app/service/JWT/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  isLogged = false;
  isLoginFails = false;
  dialogTitle = "No se pudo ingresar";
  dialogDescription = "";
  loginUsuario: LoginUsuario | null = null;
  roles: string[] = [];

  //mjsError: string;

  constructor(private router: Router, private tokenService: TokenService,
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) { // lo mismo que this.tokenService.getToken()!=""
      this.isLogged = true;
      this.isLoginFails = false;
      this.roles = this.tokenService.getAuthorities();
    }
    this.addAnimacionIn();
  }

  addAnimacionIn() {
    const element = document.getElementsByClassName("container-seccion");
    element[0].classList.add("container-seccion-animacion-in")
  }
  volver() {
    const element = document.getElementsByClassName("container-seccion");
    element[0].classList.remove("container-seccion-animacion-in");
    element[0].classList.add("container-seccion-animacion-out");
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000)
  }

  onLogin(nombreUsuario: string, password: string): void {
    //los parametros del LoginUsuario son los del formulario con [(NgModel)]

    this.isLoading = true;

    this.loginUsuario = new LoginUsuario(nombreUsuario, password);

    this.authService.login(this.loginUsuario).subscribe({
      next: (dato) => {

        this.isLogged = true;
        this.isLoginFails = false;
        this.isLoading = false;
        this.tokenService.setToken(dato.token);
        this.tokenService.setUserName(dato.nombreUsuario);
        this.tokenService.setAuthorities(dato.authorities);
        this.roles = dato.authorities;
        this.dialogTitle = "Ingresado correctamente"
        this.dialogDescription = "Perfecto, espero que seas Gaspy :)"
        this.openDialog();
        this.router.navigate(["/"]);

      },
      error: (e) => {
        this.isLogged = false;
        this.isLoginFails = true;
        this.isLoading = false;
        //console.log(e);
        this.dialogTitle = "No se pudo ingresar";
        this.dialogDescription = e.error.message;
        console.error(e);
        this.openDialog();
      }

    });
  }

  closeDialog() {
    const dialog = <HTMLDialogElement>document.getElementById("dialog-login");
    dialog.close();
  }
  openDialog() {
    const dialog = <HTMLDialogElement>document.getElementById("dialog-login");
    dialog.showModal();
  }
}