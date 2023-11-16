import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Educacion } from 'src/app/entitys/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/JWT/token-service.service';
import { AddEducacionComponent } from '../../adds/add-educacion/add-educacion.component';
import { EditEducacionComponent } from '../../edits/edit-educacion/edit-educacion.component';
import { EditEducacionOrderComponent } from '../../edits/order/edit-educacion-order/edit-educacion-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {

  isLogged = false;
  isLoad = false;
  isError = false;

  educaciones: Educacion[] = [];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private matDialog: MatDialog,
    private educacionService: EducacionService
  ) {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.obtenerEducaciones();
  }

  ngOnInit(): void {
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

  public obtenerEducaciones() {
    this.educacionService.get().subscribe(
      {
        next: (dato) => {
          this.educaciones = dato;
          this.educaciones.sort((e1, e2) => e1.numeroOrden - e2.numeroOrden);
          this.educaciones.forEach((element) => {
            if (element.anioFin == '') {
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

  protected abrirPdf(id: number) {
    const educacion = this.educaciones.find(edu => edu.id === id);
    if (educacion !== undefined && educacion.certificado != null && educacion.id == id) {
      var pdfWindow = window.open('', '_blank');
      if (pdfWindow) {
        pdfWindow.document
          .write('<style> body{margin:0px; padding:0px} iframe{ width:100%; height:100%; zoom:0}</style> <iframe src="data:application/pdf;base64,' + educacion.certificado + '"/>');
      }
    }
  }

  protected addEducacion() {
    const popup = this.matDialog.open(AddEducacionComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerEducaciones();
    });
  }

  protected editEducacion(id: number | null) {
    if (id === null) {
      window.alert('Id is null');
      return;
    }
    const popup = this.matDialog.open(EditEducacionComponent, {
      data: {
        id: id,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      height: '75%',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerEducaciones();
    });
  }

  protected editOrdenEducation() {
    const popup = this.matDialog.open(EditEducacionOrderComponent, {
      data: {
        educaciones: this.educaciones,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerEducaciones();
    });
  }

  protected dropEducacion(id: number | null) {
    if (id === null) {
      window.alert('Id is null');
      return;
    }
    if (window.confirm('Seguro que desea eliminar?')) {
      this.educacionService.delete(id).subscribe((dato) => {
        let index_for_deleting = this.educaciones.findIndex(
          (element) => element.id === id
        );
        this.educaciones.splice(index_for_deleting, 1);
        window.alert('Eliminado');
      });
    }
  }
}
