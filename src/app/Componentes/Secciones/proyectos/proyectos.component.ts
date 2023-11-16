import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Proyecto } from 'src/app/entitys/proyecto';
import { TokenService } from 'src/app/service/JWT/token-service.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { AddProyectoComponent } from '../../adds/add-proyecto/add-proyecto.component';
import { EditProyectoComponent } from '../../edits/edit-proyecto/edit-proyecto.component';
import { EditProyectosOrderComponent } from '../../edits/order/edit-proyectos-order/edit-proyectos-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  isLogged = false;
  isLoad = false;
  isError = false;

  proyectos: Proyecto[] = [];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private matDialog: MatDialog,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.obtenerProyectos();
    if (this.tokenService.getToken()) {
      //esta logeado
      this.isLogged = true;
    }
    this.addAnimacionIn();
  }

  addAnimacionIn() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.add('container-seccion-animacion-in');
  }
  volver() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.remove('container-seccion-animacion-in');
    element[0].classList.add('container-seccion-animacion-out');
    setTimeout(() => {
      this.router.navigate(['/navegacion']);
    }, 1000);
  }

  public obtenerProyectos() {
    this.proyectoService.get().subscribe(
      {
        next: (dato) => {
          this.proyectos = dato;

          this.proyectos.sort((p1, p2) => p1.numeroOrden - p2.numeroOrden);

          this.isLoad = true;
        },
        error: () => {
          this.isLoad = true;
          this.isError = true
        }
      }
    )
  }

  protected addProyecto() {
    const popup = this.matDialog.open(AddProyectoComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerProyectos();
    });
  }

  protected editProyecto(id: number | null) {
    const popup = this.matDialog.open(EditProyectoComponent, {
      data: {
        id: id,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerProyectos();
    });
  }

  protected editOrdenProyectos() {
    const popup = this.matDialog.open(EditProyectosOrderComponent, {
      data: {
        proyectos: this.proyectos,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerProyectos();
    });
  }

  protected dropProyecto(id: number | null) {
    if (id === null) {
      window.alert('Id is null');
      return;
    }
    if (window.confirm('Seguro que desea eliminar?')) {
      this.proyectoService.delete(id).subscribe(() => {
        let index_for_deleting = this.proyectos.findIndex(
          (element) => element.id === id
        );
        this.proyectos.splice(index_for_deleting, 1);
        window.alert('Eliminado');
      });
    }
  }
}
