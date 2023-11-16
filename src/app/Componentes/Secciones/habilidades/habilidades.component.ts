import { Component, OnInit } from '@angular/core';
import { EditHardSkillOrderComponent } from '../../edits/order/edit-hard-skill-order/edit-hard-skill-order.component';
import { EditHardSkillComponent } from '../../edits/edit-hard-skill/edit-hard-skill.component';
import { AddHardSkillComponent } from '../../adds/add-hard-skill/add-hard-skill.component';
import { EditSoftSillOrderComponent } from '../../edits/order/edit-soft-sill-order/edit-soft-sill-order.component';
import { EditSoftSkillComponent } from '../../edits/edit-soft-skill/edit-soft-skill.component';
import { AddSoftSkillComponent } from '../../adds/add-soft-skill/add-soft-skill.component';
import { HardSkill } from 'src/app/entitys/hard_skill';
import { SoftSkill } from 'src/app/entitys/soft_skills';
import { TokenService } from 'src/app/service/JWT/token-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HardSkillService } from 'src/app/service/hard-skill.service';
import { SoftSkillService } from 'src/app/service/soft-skill.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  isLogged: boolean = false;
  isLoadHardSkill: boolean = false;
  isLoadSoftSkill: boolean = false;
  isErrorHardSkill: boolean = false;
  isErrorSoftSkill: boolean = false;

  hardSkills: HardSkill[] = [];
  softSkills: SoftSkill[] = [];

  constructor(
    private tokenService: TokenService,
    private matDialog: MatDialog,
    private router: Router,
    private hardSkillService: HardSkillService,
    private softSkillService: SoftSkillService
  ) {
    this.obtenerHardSkills();
    this.obtenerSoftSkills();

    if (this.tokenService.getToken()) {
      //esta logeado
      this.isLogged = true;
    }
  }

  ngOnInit(): void {
    this.addAnimacionIn();
  }

  addAnimacionIn() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.add('container-seccion-animacion-in');
  }
  volver() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.remove('container-seccion-animacion-in');
    element[0].classList.add('container-seccion-animacion-out');
    setTimeout(() => {
      this.router.navigate(['/navegacion']);
    }, 1000);
  }

  public obtenerHardSkills() {
    this.hardSkillService.get().subscribe(
      {
        next: (dato) => {
          this.hardSkills = dato;
          this.hardSkills.forEach((hs) => {
            hs.icon = 'data:image/png;base64,' + hs.icon;
          });
          this.hardSkills.sort((hs1, hs2) => hs1.numeroOrden - hs2.numeroOrden);
          this.isLoadHardSkill = true;
        },
        error: () => {
          this.isLoadHardSkill = true;
          this.isErrorHardSkill = true
        }
      }
    )

  }
  protected obtenerSoftSkills() {

    this.softSkillService.get().subscribe(
      {
        next: (dato) => {
          this.softSkills = dato;
          this.softSkills.forEach((ss) => {
            ss.icon = 'data:image/png;base64,' + ss.icon;
          });
          this.softSkills.sort((ss1, ss2) => ss1.numeroOrden - ss2.numeroOrden);

          this.isLoadSoftSkill = true;
        },
        error: () => {
          this.isLoadSoftSkill = true;
          this.isErrorSoftSkill = true
        }
      }
    )
  }

  //-- SOFT
  protected addSoftSkill() {
    const popup = this.matDialog.open(AddSoftSkillComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    popup.afterClosed().subscribe((i) => {
      this.obtenerSoftSkills();
    });
  }
  protected dropSoftSkill(id: number | null) {
    if (id === null) {
      window.alert('Id is null');
      return;
    }
    if (window.confirm('Seguro que desea eliminar?')) {
      this.softSkillService.delete(id).subscribe(() => {
        let index_for_deleting = this.softSkills.findIndex(
          (element) => element.id === id
        );
        this.softSkills.splice(index_for_deleting, 1);
        window.alert('Eliminado');
      });
    }
  }

  protected editSoftSkill(id: number | null) {
    const popup = this.matDialog.open(EditSoftSkillComponent, {
      data: {
        id: id,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerSoftSkills();
    });
  }
  protected editOrdenSoftSkill() {
    const popup = this.matDialog.open(EditSoftSillOrderComponent, {
      data: {
        softSkills: this.softSkills,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerSoftSkills();
    });
  }

  ///---- HARD

  protected addHardSkill() {
    const popup = this.matDialog.open(AddHardSkillComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerHardSkills();
    });
  }
  protected dropHardSkill(id: number | null) {
    if (id === null) {
      window.alert('Id is null');
      return;
    }
    if (window.confirm('Seguro que desea eliminar?')) {
      this.hardSkillService.delete(id).subscribe(() => {
        let index_for_deleting = this.hardSkills.findIndex(
          (element) => element.id === id
        );
        this.hardSkills.splice(index_for_deleting, 1);
        window.alert('Eliminado');
      });
    }
  }
  protected editHardSkill(id: number | null) {
    const popup = this.matDialog.open(EditHardSkillComponent, {
      data: {
        id: id,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerHardSkills();
    });
  }
  protected editOrdenHardSkill() {
    const popup = this.matDialog.open(EditHardSkillOrderComponent, {
      data: {
        hardSkills: this.hardSkills,
      },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    popup.afterClosed().subscribe((i) => {
      this.obtenerSoftSkills();
    });
  }
}
