import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';
import { SoftSkill } from 'src/app/entitys/soft_skills';
import { SoftSkillService } from 'src/app/service/soft-skill.service';

@Component({
  selector: 'app-add-soft-skill',
  templateUrl: './add-soft-skill.component.html',
  styleUrls: ['./add-soft-skill.component.css']
})
export class AddSoftSkillComponent implements OnInit {

  default:SoftSkill;

  iconDataBase64: string | null = null;

  iconBase64: string = "";

  constructor(private softSkillService:SoftSkillService,private referencia: MatDialogRef<AddSoftSkillComponent>) { 
    this.default= new SoftSkill('Titulo',0,100,100,null)
  }

  ngOnInit(): void {}


  protected obtenerArchivo(event:any):void{
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivoCapturado);
    reader.onload = () => {
      this.iconBase64 = reader.result as string; 
      this.iconDataBase64 = this.iconBase64.replace(/^data:image\/\w+;base64,/, "");
    }
  }

  protected guardarSoftSkill(titulo:string,alto:string,ancho:string){

    const ss_titulo = titulo;
    const ss_numeroOrden= -1;
    const ss_alto = Number(alto);
    const ss_ancho = Number(ancho);
    const ss_icon = this.iconDataBase64;
  
    const newSoftSkill:SoftSkill = new SoftSkill(ss_titulo,ss_numeroOrden,ss_alto,ss_ancho,ss_icon)

    this.softSkillService.save(newSoftSkill).subscribe({
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
