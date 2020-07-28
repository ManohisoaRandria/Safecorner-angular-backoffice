import { ModifyProtocoleSocieteComponent } from './../../pages/societe/protocole/modify-protocole-societe/modify-protocole-societe.component';
import { InsertSocieteComponent } from './../../pages/societe/insert-societe/insert-societe.component';
import { InsertProtocoleSocieteComponent } from './../../pages/societe/protocole/insert-protocole-societe/insert-protocole-societe.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { DescenteComponent } from 'src/app/pages/societe/descente/descente.component';
import { ProtocoleComponent } from 'src/app/pages/societe/protocole/protocole.component';
import { UpdateSocieteComponent } from 'src/app/pages/societe/update-societe/update-societe.component';
import { InsertSocieteDesinfectionComponent } from 'src/app/pages/societe-desinfection/insert-societe-desinfection/insert-societe-desinfection.component';
import { PrestationComponent } from 'src/app/pages/societe-desinfection/prestation/prestation.component';
import { UpdateSocieteDesinfectionComponent } from 'src/app/pages/societe-desinfection/update-societe-desinfection/update-societe-desinfection.component';
import { ModifyPrestationComponent } from 'src/app/pages/societe-desinfection/prestation/modify-prestation/modify-prestation.component';
import { AllProtocoleComponent } from 'src/app/pages/all-protocole/all-protocole.component';
import { UpdateCategorieSocieteComponent } from 'src/app/pages/societe/update-categorie-societe/update-categorie-societe.component';
import { UpdateProtocoleComponent } from 'src/app/pages/all-protocole/update-protocole/update-protocole.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatProgressBarModule,
    MatBadgeModule
  ],

  declarations: [
    DashboardComponent,
    InsertSocieteComponent,
    InsertProtocoleSocieteComponent,
    ModifyProtocoleSocieteComponent,
    DescenteComponent,
    ProtocoleComponent,
    UpdateSocieteComponent,
    InsertSocieteDesinfectionComponent,
    PrestationComponent,
    UpdateSocieteDesinfectionComponent,
    ModifyPrestationComponent,
    AllProtocoleComponent,
    UpdateCategorieSocieteComponent,
    UpdateProtocoleComponent
  ]
})

export class AdminLayoutModule {}
