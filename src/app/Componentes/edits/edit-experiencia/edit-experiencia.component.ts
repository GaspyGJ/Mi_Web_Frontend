import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Experiencia } from 'src/app/entitys/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { years } from 'src/app/Util/anios';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  experiencia: Experiencia | null = null;

  id: number;

  yearsList =years;

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditExperienciaComponent>, private experienciaService: ExperienciaService) { 
    this.id = Number(this.params.id)

    this.experienciaService.getById(this.id).subscribe(dato => {
      this.experiencia = dato;
    })
  }

  ngOnInit(): void {}

  protected actualizar(titulo:string,descripcion:string,anioStart:string,anioEnd:string,
    tipoExperiencia:string,tegnologiasUtilizadas:string,link:string) {

    let experiencia = new Experiencia(titulo,-1,descripcion,anioStart,anioEnd,tipoExperiencia,tegnologiasUtilizadas,link);

    experiencia.id= this.experiencia!.id;

    this.experienciaService.save(experiencia).subscribe({
      next:(dato)=>{
        window.alert(dato.message);
        this.referencia.close("Cerrando");
      },
      error:(error)=>{
        window.alert("ERROR, revisar entradas");
        console.error(error);
      }
    });

  }

}