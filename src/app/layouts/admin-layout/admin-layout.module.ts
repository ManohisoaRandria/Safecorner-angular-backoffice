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
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatProgressBarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    InsertSocieteComponent,
    InsertProtocoleSocieteComponent,
    ModifyProtocoleSocieteComponent
  ]
})

export class AdminLayoutModule {}
