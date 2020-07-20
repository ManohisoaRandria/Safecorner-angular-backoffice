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
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatProgressBarModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DescenteComponent,
    InsertComponent
  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:WebRequestInterceptorService,multi:true},
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
