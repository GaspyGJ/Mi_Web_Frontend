import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Archivo } from 'src/app/entitys/Archivo';
import { HardSkill } from 'src/app/entitys/hard_skill';
import { HardSkillService } from 'src/app/service/hard-skill.service';

@Component({
  selector: 'app-add-hard-skill',
  templateUrl: './add-hard-skill.component.html',
  styleUrls: ['./add-hard-skill.component.css']
})
export class AddHardSkillComponent implements OnInit {

  

  default:HardSkill;

  iconDataBase64: string | null = null;

  iconBase64: string = "";

  constructor(private hardSkillService:HardSkillService , private referencia: MatDialogRef<AddHardSkillComponent>) { 
    this.default= new HardSkill('Titulo',0,100,100,null)
  }

  ngOnInit(): void {}


  protected obtenerArchivo(event:any):void{
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.iconBase64 = reader.result as string; 
      this.iconDataBase64 = this.iconBase64.replace(/^data:image\/\w+;base64,/, "");
    }
    reader.readAsDataURL(archivoCapturado);
  }

  protected guardarHardSkill(titulo:string, alto: string, ancho: string):void{
   
    const hs_titulo = titulo;
    const hs_numeroOrden= -1;
    const hs_alto = Number(alto);
    const hs_ancho = Number(ancho);
    const hs_icon = this.iconDataBase64;

    const newHardSkill:HardSkill = new HardSkill(hs_titulo,hs_numeroOrden,hs_alto,hs_ancho,hs_icon);

    console.log(newHardSkill)

    this.hardSkillService.save(newHardSkill).subscribe({
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