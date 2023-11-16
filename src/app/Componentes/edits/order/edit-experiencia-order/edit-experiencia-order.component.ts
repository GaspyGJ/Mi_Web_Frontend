import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Experiencia } from 'src/app/entitys/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-edit-experiencia-order',
  templateUrl: './edit-experiencia-order.component.html',
  styleUrls: ['./edit-experiencia-order.component.css']
})
export class EditExperienciaOrderComponent implements OnInit {

  experiencias:Experiencia[];

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditExperienciaOrderComponent>, private experienciaService: ExperienciaService, private rutaActiva: ActivatedRoute) { 
    this.experiencias = this.params.experiencias;
  }
  ngOnInit(): void {}

  
  DropeoExperiencia(event: CdkDragDrop<any>) {
    const anterior: number = event.previousIndex;
    const actual: number = event.currentIndex;
    moveItemInArray(this.experiencias, anterior, actual);
  }


  aceptar(){

    let listaLI = document.getElementsByClassName("li_e");

    for (let i=0; i<listaLI.length; i++) {
      for(let j=0; j<this.experiencias.length;j++){
        if( listaLI[i].id == this.experiencias[j].id?.toString() ){
          this.experiencias[j].numeroOrden=i;
        }
      }
    }
    
    this.experiencias.sort( (e1, e2) => e1.numeroOrden - e2.numeroOrden);

    this.experiencias.forEach(experiencia => {

      let experienciaU= new Experiencia(experiencia.titulo,experiencia.numeroOrden,experiencia.descripcion,experiencia.anioInicio,experiencia.anioFin,
        experiencia.tipoExperiencia,experiencia.tegnologiasUtilizadas,experiencia.link);

       experienciaU.id= experiencia.id;
  
      this.experienciaService.save(experienciaU).subscribe({
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
