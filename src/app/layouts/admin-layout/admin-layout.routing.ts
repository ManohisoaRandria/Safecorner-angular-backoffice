import { ModifyProtocoleSocieteComponent } from './../../pages/societe/protocole/modify-protocole-societe/modify-protocole-societe.component';
import { InsertProtocoleSocieteComponent } from './../../pages/societe/protocole/insert-protocole-societe/insert-protocole-societe.component';
import { InsertSocieteComponent } from './../../pages/societe/insert-societe/insert-societe.component';
import { UpdateSocieteComponent } from '../../pages/societe/update-societe/update-societe.component';
import { DescenteComponent } from './../../pages/societe/descente/descente.component';
import { InsertComponent } from './../../pages/insert/insert.component';
import { ProtocoleComponent } from '../../pages/societe/protocole/protocole.component';
import { InsertSocieteDesinfectionComponent } from '../../pages/societe-desinfection/insert-societe-desinfection/insert-societe-desinfection.component';
import { UpdateSocieteDesinfectionComponent } from '../../pages/societe-desinfection/update-societe-desinfection/update-societe-desinfection.component';
import { ModifyPrestationComponent } from '../../pages/societe-desinfection/prestation/modify-prestation/modify-prestation.component';
import { PrestationComponent } from '../../pages/societe-desinfection/prestation/prestation.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { Protocole } from 'src/app/modele/protocole';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'societe',           component: InsertSocieteComponent },
    { path: 'societe-desinfection',           component: InsertSocieteDesinfectionComponent },
    { path: 'add-protocole-societe',           component: InsertProtocoleSocieteComponent },
    { path: 'add-protocole-societe/:id',           component: InsertProtocoleSocieteComponent },
    { path: 'modif-protocole-societe/:id',           component: ModifyProtocoleSocieteComponent },
    { path: 'descente-societe/:id',           component: DescenteComponent },
    { path: 'protocole/:id',           component: ProtocoleComponent },
    { path: 'update-societe/:id',           component: UpdateSocieteComponent },
    { path: 'prestation/:id',           component: PrestationComponent },
    { path: 'modify-prestation',           component: ModifyPrestationComponent },
    { path: 'update-societe-desinfection/:id',           component: UpdateSocieteDesinfectionComponent },
    { path: 'insert',           component: InsertComponent },
];
