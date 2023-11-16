import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Experiencia } from 'src/app/entitys/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { years } from 'src/app/Util/anios';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.css']
})
export class AddExperienciaComponent implements OnInit {

  
  default:Experiencia;

  yearsList = years;

  constructor(private experienciaService:ExperienciaService , private referencia: MatDialogRef<AddExperienciaComponent>) { 
      this.default = new Experiencia("Titulo Ejemplo 1",-1,"Descripcion Ejemplo 1","2022","2022","Pasantia","C++ , JS , HTML , CSS","")
  }

  ngOnInit(): void {
    
  }

  protected guardarExperiencia(titulo:string,descripcion:string,anioStart:string,anioEnd:string,tipoExperiencia:string,tegnologiasUtilizadas:string,link:string){

    const experiencia:Experiencia = new Experiencia(titulo,-1,descripcion,anioStart,anioEnd,tipoExperiencia,tegnologiasUtilizadas,link);

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
