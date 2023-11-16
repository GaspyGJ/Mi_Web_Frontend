import { Component, Inject, OnInit } from '@angular/core';
import { SoftSkill } from 'src/app/entitys/soft_skills';
import { SoftSkillService } from 'src/app/service/soft-skill.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';

@Component({
  selector: 'app-edit-soft-skill',
  templateUrl: './edit-soft-skill.component.html',
  styleUrls: ['./edit-soft-skill.component.css']
})
export class EditSoftSkillComponent implements OnInit {

  softSkill: SoftSkill | null = null;

  id: number;

  iconDataBase64: string | null = null;

  iconBase64: string = "";
  
  constructor(@Inject(MAT_DIALOG_DATA) public params:any, private referencia:MatDialogRef<EditSoftSkillComponent>, private softSkillService: SoftSkillService) {
    this.id= Number(this.params.id);

    this.softSkillService.getById(this.id).subscribe(dato => {
      this.softSkill = dato;
      
      this.iconDataBase64 = this.softSkill.icon;
      if(this.iconDataBase64){
        this.iconBase64 = "data:image/png;base64,"+this.iconDataBase64;
      } 
    })
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

  protected actualizar(titulo:string,alto:string,ancho:string) {

    const ss_titulo = titulo;
    const ss_numeroOrden= -1;
    const ss_alto = Number(alto);
    const ss_ancho = Number(ancho);
    const ss_icon = this.iconDataBase64;

    let softSkill = new SoftSkill(ss_titulo,ss_numeroOrden,ss_alto,ss_ancho,ss_icon)
    softSkill.id = this.softSkill!.id;

    this.softSkillService.save(softSkill).subscribe({
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
