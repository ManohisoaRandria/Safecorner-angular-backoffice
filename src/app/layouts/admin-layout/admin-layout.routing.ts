import { ModifyProtocoleSocieteComponent } from './../../pages/societe/protocole/modify-protocole-societe/modify-protocole-societe.component';
import { InsertProtocoleSocieteComponent } from './../../pages/societe/protocole/insert-protocole-societe/insert-protocole-societe.component';
import { InsertSocieteComponent } from './../../pages/societe/insert-societe/insert-societe.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'societe',           component: InsertSocieteComponent },
    { path: 'add-protocole-societe',           component: InsertProtocoleSocieteComponent },
    { path: 'modify-protocole-societe',           component: ModifyProtocoleSocieteComponent },
];
