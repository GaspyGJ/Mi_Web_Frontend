import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/*Material */
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/*CDK*/
import { DragDropModule } from '@angular/cdk/drag-drop';


/*ADDS*/
import { AddHardSkillComponent } from './Componentes/adds/add-hard-skill/add-hard-skill.component';
import { AddSoftSkillComponent } from './Componentes/adds/add-soft-skill/add-soft-skill.component';
import { AddProyectoComponent } from './Componentes/adds/add-proyecto/add-proyecto.component';
import { AddEducacionComponent } from './Componentes/adds/add-educacion/add-educacion.component';
import { AddExperienciaComponent } from './Componentes/adds/add-experiencia/add-experiencia.component';

/*EDITS*/
import { EditProyectoComponent } from './Componentes/edits/edit-proyecto/edit-proyecto.component';
import { EditAboutMeComponent } from './Componentes/edits/edit-about-me/edit-about-me.component';
import { EditHardSkillComponent } from './Componentes/edits/edit-hard-skill/edit-hard-skill.component';
import { EditSoftSkillComponent } from './Componentes/edits/edit-soft-skill/edit-soft-skill.component';
import { EditEducacionComponent } from './Componentes/edits/edit-educacion/edit-educacion.component';
import { EditExperienciaComponent } from './Componentes/edits/edit-experiencia/edit-experiencia.component';
import { EditSoftSillOrderComponent } from './Componentes/edits/order/edit-soft-sill-order/edit-soft-sill-order.component';
import { EditHardSkillOrderComponent } from './Componentes/edits/order/edit-hard-skill-order/edit-hard-skill-order.component';
import { EditEducacionOrderComponent } from './Componentes/edits/order/edit-educacion-order/edit-educacion-order.component';
import { EditExperienciaOrderComponent } from './Componentes/edits/order/edit-experiencia-order/edit-experiencia-order.component';
import { EditProyectosOrderComponent } from './Componentes/edits/order/edit-proyectos-order/edit-proyectos-order.component';
import { EducacionComponent } from './Componentes/Secciones/educacion/educacion.component';
import { ExperienciaComponent } from './Componentes/Secciones/experiencia/experiencia.component';
import { HabilidadesComponent } from './Componentes/Secciones/habilidades/habilidades.component';
import { ProyectosComponent } from './Componentes/Secciones/proyectos/proyectos.component';
import { ContactoComponent } from './Componentes/Secciones/contacto/contacto.component';
import { LoginComponent } from './Componentes/Secciones/login/login.component';
import { interceptorProvider } from './service/JWT/interceptors/interceptor.service';
import { HomeComponent } from './Componentes/Secciones/home/home.component';
import { Card3DComponent } from './Componentes/card3-d/card3-d.component';

import { NgParticlesModule } from "ng-particles";
import { BentoComponent } from './Componentes/bento/bento.component';
import { NavegacionComponent } from './Componentes/Secciones/navegacion/navegacion.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "navegacion", component: NavegacionComponent },
  { path: "educacion", component: EducacionComponent },
  { path: "experiencia", component: ExperienciaComponent },
  { path: "habilidades", component: HabilidadesComponent },
  { path: "proyectos", component: ProyectosComponent },
  { path: "contacto", component: ContactoComponent },  
  //{path:'**', component: NombreComponentePaginaError}
];


@NgModule({
  declarations: [
    AppComponent,
    /*ADDS*/
    AddHardSkillComponent,
    AddSoftSkillComponent,
    AddExperienciaComponent,
    AddEducacionComponent,
    AddProyectoComponent,
    /*EDITS*/
    EditSoftSillOrderComponent,
    EditHardSkillOrderComponent,
    EditEducacionOrderComponent,
    EditExperienciaOrderComponent,
    EditProyectosOrderComponent,
    EditAboutMeComponent,
    EditHardSkillComponent,
    EditSoftSkillComponent,
    EditExperienciaComponent,
    EditEducacionComponent,
    EditProyectoComponent,
    /*SECCIONES */
    EducacionComponent,
    ExperienciaComponent,
    HabilidadesComponent,
    ProyectosComponent,
    ContactoComponent,
    LoginComponent,
    HomeComponent,
    Card3DComponent,
    BentoComponent,
    NavegacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /*Material */
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    /*CDK*/
    DragDropModule,
    /*particles*/
    NgParticlesModule,
    /*Routes*/
    RouterModule.forRoot(routes)
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
