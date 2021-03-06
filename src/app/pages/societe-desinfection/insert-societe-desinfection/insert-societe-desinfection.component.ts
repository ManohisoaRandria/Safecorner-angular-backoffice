import { Societe,SocieteDesinfection } from './../../../modele/societe';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { ViewportScroller } from '@angular/common';

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { CategorieSociete } from 'src/app/modele/categorie-societe';
import { Protocole } from '../../../modele/protocole';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmDeleteComponent } from '../../../components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-insert-societe-desinfection',
  templateUrl: './insert-societe-desinfection.component.html',
  styleUrls: ['./insert-societe-desinfection.component.css']
})
export class InsertSocieteDesinfectionComponent implements OnInit ,OnDestroy{
  erreur: string = "";
  success: string = "";
  private map: any;
  private marker: any = null;
  private markerInit:any = null;
  private iconMarker:any[] = [
    L.icon({
      iconUrl: '../../../../assets/img/marker/Marker.png',
      // shadowUrl: 'leaf-shadow.png',
      iconSize:     [40,40], // size of the icon
      iconAnchor:   [22,45]
    }),
    L.icon({
      iconUrl: '../../../../assets/img/marker/Marker-init.png',
      // shadowUrl: 'leaf-shadow.png',
      iconSize:     [40,40], // size of the icon
      iconAnchor:   [22,45]
    }),
  ];

  loadingInsertSocieteDesinfection:boolean = false;
  loadingAllSocieteDesinf:boolean = false;
  societesDesinfection: SocieteDesinfection[] = [];
  societeDesinfectionSubscription: Subscription;
  lat: number;
  lng: number;
  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocSociete: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService: InsertService,
    private api: ApiService,
    private getService: GetService,
    private dialog:MatDialog,
    private scrollElem:ViewportScroller) { }
  ngOnDestroy(): void {
    this.societeDesinfectionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.societeDesinfectionSubscription = this.api.societeDesinfectionSubject.subscribe(
      (societes: SocieteDesinfection[]) => {
        this.societesDesinfection = societes;
      }
    );
    this.showMap();
    //MOUS EVENT
    this.map.on('click', (e) => { //ajouter des marker sur la map
      if (this.marker != null) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng,{icon: this.iconMarker[0]});
      this.marker.bindPopup("<p>lat: " + e.latlng.lat + "</p><p>lng: " + e.latlng.lng + "</p>").openPopup();
      this.marker.addTo(this.map);
    });
    if (!this.api.initSocieteDesinfection) {
      //maka anle societe desinfection rehetra am volou
      this.loadingAllSocieteDesinf=true;
      this.getService.getAllSocieteDesinfection().then((res) => {
        this.api.initSocieteDesinfection = true;
        this.loadingAllSocieteDesinf=false;
      }).catch(err => {
        this.loadingAllSocieteDesinf=false;
      });
    }
  }
  refreshSocieteDesinfection(){
    this.loadingAllSocieteDesinf=true;
    this.getService.getAllSocieteDesinfection().then(res=>{
      this.loadingAllSocieteDesinf=false;
    });
  }

  onAnimeBlocInsertSociete() {
    if (this.classBlocSociete == "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial" ||
      this.classBlocSociete == "bloc_form_insert_societe bloc_form_insert_societe_non_active") {
      this.classBlocSociete = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActive = "ni ni-bold-up icon_activation_insert_societe";
    } else {
      this.classBlocSociete = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActive = "ni ni-bold-down icon_activation_insert_societe";
    }
  }

  //FONCTON POUR LA MAP
  //affciher map
  showMap() {
    this.map = L.map("map-canvas2").setView([-18.916193244957622, 47.52146212491431], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete() {
    // afficher la dernier position choisi
    if(this.markerInit != null){
      this.map.removeLayer(this.markerInit);
    }
    this.markerInit = L.marker(this.marker._latlng,{icon: this.iconMarker[1]});
    this.markerInit.bindPopup("chosen position").openPopup();
    this.markerInit.addTo(this.map);
    // effacer la marker de choix
    this.map.removeLayer(this.marker);
    // ajouter au formulaire
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng;
  }


  //INSERTION SOCIETE DESINFECRION
  onInsertSocieteDesinfection(form: NgForm) {
    this.loadingInsertSocieteDesinfection = true;
    this.onScrollElement("insertSocieteD");
    this.insertService.SocieteDesinfection(form.value.nom,
      form.value.description,
      form.value.lieu,
      form.value.email,
      form.value.tel,
      form.value.lat,
      form.value.lng).then((res: any) => {
        this.erreur = "";
        this.success = res['message'];
        form.reset();
        this.loadingInsertSocieteDesinfection = false;
      }).catch((error) => {
        this.success = "";
        this.erreur = error['error']['message'];
        this.loadingInsertSocieteDesinfection = false;
      }
      );
  }
  //delete
  onDelete(id){
    var societe = this.societesDesinfection.find(element => element.id == id);
    //confirmation par dialog
    var dialogConfirmDelete = this.dialog.open(DialogConfirmDeleteComponent,{
      width:"500px",
      data:{
        titre:"Confrim DELETE",
        contenu:'Are you sure to delete the disinfection company '+societe.nom,
        valeurIn:societe.nom
      }
    });
    //rehefa mclose le dialog
    dialogConfirmDelete.afterClosed().subscribe(result => {
      if(result != ''){
        if(societe.nom == result){
          this.insertService.deleteSocieteDesinfection(id).then(res=>{
            this.erreur = "";
            this.success = "deleted";
          }).catch(err=>{
            this.success = "";
            this.erreur = err['error']['message'];
          })
        }else{
          // ra diso le nsoranany
          this.dialog.open(DialogAfficheComponent,{
            width:"200px",
            data:{
              titre:"Error",
              contenu:"you must write the code indicated"
            }
          }
          );
        }
      }
    });
  }

   //scroll element
   onScrollElement(idelem:string){
    this.scrollElem.scrollToAnchor(idelem);
  }

}
