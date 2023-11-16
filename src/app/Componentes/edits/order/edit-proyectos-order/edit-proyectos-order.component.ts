import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/entitys/proyecto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyectos-order',
  templateUrl: './edit-proyectos-order.component.html',
  styleUrls: ['./edit-proyectos-order.component.css']
})
export class EditProyectosOrderComponent implements OnInit {

  proyectos:Proyecto[];

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditProyectosOrderComponent>, private proyectosService: ProyectoService, private rutaActiva: ActivatedRoute) { 
    this.proyectos = this.params.proyectos;
  }
  ngOnInit(): void {}

  DropeoProyecto(event: CdkDragDrop<any>) {
    const anterior: number = event.previousIndex;
    const actual: number = event.currentIndex;

    moveItemInArray(this.proyectos, anterior, actual);
  
  }

  aceptar(){

    let listaLI = document.getElementsByClassName("li_e");

    for (let i=0; i<listaLI.length; i++) {
      for(let j=0; j<this.proyectos.length;j++){
        if( listaLI[i].id == this.proyectos[j].id?.toString() ){
          this.proyectos[j].numeroOrden=i;
        }
      }
    }
    
    this.proyectos.sort( (e1, e2) => e1.numeroOrden - e2.numeroOrden);

    this.proyectos.forEach(proyecto => {
      let proyectoU= new Proyecto(proyecto.titulo,proyecto.numeroOrden,proyecto.descripcion,proyecto.gitHubWeb,proyecto.direccionWeb,proyecto.imagenes);

      proyectoU.id= proyecto.id;
  
      this.proyectosService.save(proyectoU).subscribe({
        next:(dato)=>{
          window.alert(dato.message);
          this.referencia.close("Cerrando");
        },
        error:(error)=>{
          window.alert("ERROR, revisar entradas");
          console.error(error);
        }
      });

    });
  }

}
