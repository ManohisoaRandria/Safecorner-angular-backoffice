import { WebRequestInterceptorService } from './services/web-request-interceptor.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DescenteComponent } from './pages/societe/descente/descente.component';
import { InsertComponent } from './pages/insert/insert.component';
import { AuthGuardService } from './services/auth-guard.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProtocoleComponent } from './pages/societe/protocole/protocole.component';
import { UpdateSocieteComponent } from './pages/societe/update-societe/update-societe.component';
import { InsertSocieteDesinfectionComponent } from './pages/societe-desinfection/insert-societe-desinfection/insert-societe-desinfection.component';
import { PrestationComponent } from './pages/societe-desinfection/prestation/prestation.component';
import { UpdateSocieteDesinfectionComponent } from './pages/societe-desinfection/update-societe-desinfection/update-societe-desinfection.component';
import { InsertPrestationComponent } from './pages/societe-desinfection/prestation/insert-prestation/insert-prestation.component';
import { ModifyPrestationComponent } from './pages/societe-desinfection/prestation/modify-prestation/modify-prestation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAfficheComponent } from './components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmUpdateComponent } from './components/dialog-confirm-update/dialog-confirm-update.component';
import { DialogConfirmDeleteComponent } from './components/dialog-confirm-delete/dialog-confirm-delete.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DescenteComponent,
    InsertComponent,
    ProtocoleComponent,
    UpdateSocieteComponent,
    InsertSocieteDesinfectionComponent,
    PrestationComponent,
    UpdateSocieteDesinfectionComponent,
    InsertPrestationComponent,
    ModifyPrestationComponent,
    DialogAfficheComponent,// le dialog pour afficher 
    DialogConfirmDeleteComponent,// le dialog pour confirner le delete
    DialogConfirmUpdateComponent,// le dialog pour confirner l'update
  ],
  entryComponents: [
    DialogAfficheComponent,// mila apetraka ato mba aafan le angular maka ni info rehetra momba an le dialog
    DialogConfirmUpdateComponent,
    DialogConfirmDeleteComponent
  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:WebRequestInterceptorService,multi:true},
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
