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
// Import library module
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthGuardService } from './services/auth-guard.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAfficheComponent } from './components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmUpdateComponent } from './components/dialog-confirm-update/dialog-confirm-update.component';
import { DialogConfirmDeleteComponent } from './components/dialog-confirm-delete/dialog-confirm-delete.component';
import { LoginGuardService } from './services/login-guard.service';
import { DialogConfirmLogoutComponent } from './components/dialog-confirm-logout/dialog-confirm-logout.component';
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
    MatDialogModule,
    MatBadgeModule
  ]
  ,
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DialogAfficheComponent,// le dialog pour afficher
    DialogConfirmDeleteComponent,// le dialog pour confirner le delete
    DialogConfirmUpdateComponent, // le dialog pour confirner l'update
    DialogConfirmLogoutComponent
  ],
  entryComponents: [
    DialogAfficheComponent,// mila apetraka ato mba aafan le angular maka ni info rehetra momba an le dialog
    DialogConfirmUpdateComponent,
    DialogConfirmDeleteComponent,
    DialogConfirmLogoutComponent
  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:WebRequestInterceptorService,multi:true},
    AuthGuardService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
