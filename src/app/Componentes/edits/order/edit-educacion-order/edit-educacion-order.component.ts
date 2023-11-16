import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Educacion } from 'src/app/entitys/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-educacion-order',
  templateUrl: './edit-educacion-order.component.html',
  styleUrls: ['./edit-educacion-order.component.css']
})
export class EditEducacionOrderComponent implements OnInit {

  educaciones:Educacion[];

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditEducacionOrderComponent>, private educacionService: EducacionService, private rutaActiva: ActivatedRoute) { 
    this.educaciones = this.params.educaciones;
  }

  ngOnInit(): void {}

  DropeoEducacion(event: CdkDragDrop<any>) {
    const anterior: number = event.previousIndex;
    const actual: number = event.currentIndex;
    moveItemInArray(this.educaciones, anterior, actual);
  }

  aceptar(){
    let listaLI = document.getElementsByClassName("li_e");

    for (let i=0; i<listaLI.length; i++) {
      for(let j=0; j<this.educaciones.length;j++){
        if( listaLI[i].id == this.educaciones[j].id?.toString() ){
          this.educaciones[j].numeroOrden=i;
        }
      }
    }
    
    this.educaciones.sort( (e1, e2) => e1.numeroOrden - e2.numeroOrden);

    this.educaciones.forEach(educacion => {
      
      let educacionU = new Educacion(educacion.titulo, educacion.numeroOrden, educacion.descripcion,educacion.anioInicio,educacion.anioFin, educacion.estado);

      educacionU.id= educacion.id;
      educacionU.certificado=educacion.certificado;

      if(educacionU.anioFin==="Actualidad"){
        educacionU.anioFin=""
      }
  
      this.educacionService.save(educacionU).subscribe({
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
