import { Component, Inject, OnInit } from '@angular/core';
import { HardSkill } from 'src/app/entitys/hard_skill';
import { HardSkillService } from 'src/app/service/hard-skill.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';


@Component({
  selector: 'app-edit-hard-skill',
  templateUrl: './edit-hard-skill.component.html',
  styleUrls: ['./edit-hard-skill.component.css']
})
export class EditHardSkillComponent implements OnInit {

  hardSkill: HardSkill | null = null;

  id: number;

  iconDataBase64: string | null = null;

  iconBase64: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditHardSkillComponent>, private hardSkillService: HardSkillService) {
    this.id = Number(this.params.id)

    this.hardSkillService.getById(this.id).subscribe(dato => {
      this.hardSkill = dato;

      this.iconDataBase64 = this.hardSkill.icon;
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

  protected actualizar( titulo:string ,alto: string, ancho: string) {

    const hs_titulo = titulo;
    const hs_numeroOrden= -1;
    const hs_alto = Number(alto);
    const hs_ancho = Number(ancho);
    const hs_icon = this.iconDataBase64;

    let hardSkill =new HardSkill(hs_titulo,hs_numeroOrden,hs_alto,hs_ancho,hs_icon);

    hardSkill.id = this.hardSkill!.id;

    this.hardSkillService.save(hardSkill).subscribe({
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
