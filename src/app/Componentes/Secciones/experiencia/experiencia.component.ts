import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Experiencia } from 'src/app/entitys/experiencia';
import { TokenService } from 'src/app/service/JWT/token-service.service';
import { AddExperienciaComponent } from '../../adds/add-experiencia/add-experiencia.component';
import { EditExperienciaComponent } from '../../edits/edit-experiencia/edit-experiencia.component';
import { EditExperienciaOrderComponent } from '../../edits/order/edit-experiencia-order/edit-experiencia-order.component';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  isLogged = false;
  isLoad = false;
  isError = false;

  experiencias: Experiencia[] = []

  constructor(private router: Router, private tokenService: TokenService, private matDialog: MatDialog, private experienciaService: ExperienciaService) {
    this.obtenerExperiencias();

    if (this.tokenService.getToken()) {
      //esta logeado
      this.isLogged = true;
    }
  }

  ngOnInit(): void {
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
      this.router.navigate(['/navegacion']);
    }, 1000)
  }

  public obtenerExperiencias() {
    this.experienciaService.get().subscribe(
      {
        next: (dato) => {
          this.experiencias = dato;

          this.experiencias.sort((e1, e2) => e1.numeroOrden - e2.numeroOrden);

          this.experiencias.forEach(element => {
            if (element.anioFin == "") {
              element.anioFin = 'Actualidad';
            }
          });
          this.isLoad = true;
        },
        error: () => {
          this.isLoad = true;
          this.isError = true
        }
      }
    )
  }

  protected addExperiencia() {
    const popup = this.matDialog.open(AddExperienciaComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%'
    });

    popup.afterClosed().subscribe(i => {
      this.obtenerExperiencias();
    })
  }

  protected editExperiencia(id: number | null) {
    const popup = this.matDialog.open(EditExperienciaComponent, {
      data: {
        'id': id,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%'
    });

    popup.afterClosed().subscribe(i => {
      this.obtenerExperiencias();
    })
  }

  protected editOrdenExperiencia() {

    const popup = this.matDialog.open(EditExperienciaOrderComponent, {
      data: {
        'experiencias': this.experiencias,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe(i => {
      this.obtenerExperiencias();
    })

  }


  protected dropExperiencia(id: number | null) {
    if (id === null) {
      window.alert("Id is null");
      return;
    }
    if (window.confirm("Seguro que desea eliminar?")) {
      this.experienciaService.delete(id).subscribe({
        next: (response) => {
          let index_for_deleting = this.experiencias.findIndex(element => element.id === id);
          this.experiencias.splice(index_for_deleting, 1);
          window.alert(response.message);
        },
        error: (error) => {
          window.alert(error.message);
          console.error(error)
        }
      });
    }
  }

}