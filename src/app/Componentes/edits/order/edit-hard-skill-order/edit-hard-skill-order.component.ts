import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardSkillService } from 'src/app/service/hard-skill.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HardSkill } from 'src/app/entitys/hard_skill';


@Component({
  selector: 'app-edit-hard-skill-order',
  templateUrl: './edit-hard-skill-order.component.html',
  styleUrls: ['./edit-hard-skill-order.component.css']
})
export class EditHardSkillOrderComponent implements OnInit {

  hardSkills:HardSkill[];

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditHardSkillOrderComponent>, private hardSkillService: HardSkillService, private rutaActiva: ActivatedRoute) { 
    this.hardSkills = this.params.hardSkills;
  }
  ngOnInit(): void {}

  DropeoHardSkill(event: CdkDragDrop<any>) {
    const anterior: number = event.previousIndex;
    const actual: number = event.currentIndex;
    moveItemInArray(this.hardSkills, anterior, actual);
  }

  aceptar(){

    let listaLI = document.getElementsByClassName("li_hs");

    for (let i=0; i<listaLI.length; i++) {
      for(let j=0; j<this.hardSkills.length;j++){
        if( listaLI[i].id == this.hardSkills[j].id?.toString() ){
          this.hardSkills[j].numeroOrden=i;
        }
      }
    }
    
    this.hardSkills.sort( (ss1, ss2) => ss1.numeroOrden - ss2.numeroOrden);
    this.hardSkills.forEach(hardSkill => {
      
      let hardSkillU = new HardSkill(hardSkill.titulo,
        hardSkill.numeroOrden,
        Number(hardSkill.altoIcon),
        Number(hardSkill.anchoIcon),
        hardSkill.icon!.replace(/^data:image\/\w+;base64,/, ""));

      hardSkillU.id = hardSkill.id;
  
      this.hardSkillService.save(hardSkillU).subscribe({
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
