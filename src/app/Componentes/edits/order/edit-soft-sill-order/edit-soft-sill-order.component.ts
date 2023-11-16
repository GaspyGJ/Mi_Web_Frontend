import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoftSkill } from 'src/app/entitys/soft_skills';
import { SoftSkillService } from 'src/app/service/soft-skill.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-soft-sill-order',
  templateUrl: './edit-soft-sill-order.component.html',
  styleUrls: ['./edit-soft-sill-order.component.css']
})
export class EditSoftSillOrderComponent implements OnInit {


  softSkills: SoftSkill[];

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditSoftSillOrderComponent>, private softSkillService: SoftSkillService, private rutaActiva: ActivatedRoute) { 
    this.softSkills = this.params.softSkills;
  }

  ngOnInit(): void {}

  DropeoSoftSkill(event: CdkDragDrop<any[]>) {
    const anterior: number = event.previousIndex;
    const actual: number = event.currentIndex;
    moveItemInArray(this.softSkills, anterior, actual);
  }

  aceptar(){

    let listaP = document.getElementsByClassName("p-lista");

    for (let i=0; i<listaP.length; i++) {
      for(let j=0; j<this.softSkills.length;j++){
        if( listaP[i].id == this.softSkills[j].id?.toString() ){
          this.softSkills[j].numeroOrden=i;
        }
      }
    }
  
    this.softSkills.forEach(softSkill => {
      
      let softSkillU = new SoftSkill(softSkill.titulo,
        softSkill.numeroOrden,
        softSkill.altoIcon,
        softSkill.anchoIcon,
        softSkill.icon!.replace(/^data:image\/\w+;base64,/, ""));

      softSkillU.id = softSkill.id;
  
      this.softSkillService.save(softSkillU).subscribe({
        next:(dato)=>{
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
