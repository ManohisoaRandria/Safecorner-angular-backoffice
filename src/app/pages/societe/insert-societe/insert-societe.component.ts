import { Societe } from './../../../modele/societe';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { ViewportScroller } from '@angular/common';

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { CategorieSociete } from 'src/app/modele/categorie-societe';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmDeleteComponent } from '../../../components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-insert-societe',
  templateUrl: './insert-societe.component.html',
  styleUrls: ['./insert-societe.component.css']
})
export class InsertSocieteComponent implements OnInit ,OnDestroy{
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

  societes: Societe[] = [];
  societeSubscription: Subscription;
  categSocieteSubscription: Subscription;
  categSociete: CategorieSociete[] = [];
  subs:Subscription;
  lat: number;
  lng: number;
  //loading
  loadingInsertSociete:boolean = false;
  loadingAllSociete:boolean = false;
  loadingInsertCategorieSociete:boolean = false;
  loadingDeleteCategorieSociete:boolean = false;
  //element Insert Categorie Societe
  messageErreurInsertCategorieSociete:string = "";
  messageSuccessInsertCategorieSociete:string = "";
  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocSociete: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  //animation bloc insert categorie
  classIconActiveCategorie: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocSocieteCategorie: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService: InsertService,
     private api: ApiService,
     private getService: GetService,
     private dialog:MatDialog,
     private scrollElem:ViewportScroller) { }
  ngOnDestroy(): void {
    this.societeSubscription.unsubscribe();
    this.categSocieteSubscription.unsubscribe();
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.societeSubscription = this.api.societeSubject.subscribe(
      (societes: Societe[]) => {
        this.societes = societes;
        this.setEtoiles();
      }
    );
    this.categSocieteSubscription = this.api.categorieSocieteSubject.subscribe(
      (categSocietes: CategorieSociete[]) => {
        this.categSociete = categSocietes;
      }
    );
    this.subs=this.api.loadingSocieteSubject.subscribe((res:boolean)=>{
      this.loadingAllSociete=res;
    })
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
    if (!this.api.initSociete) {
      this.api.setLoadingAllSociete(true);
      //maka anle societe rehetra am volou
      this.getService.getAllSociete().then((res) => {
        //refa azo le societe de alaina ndray le categorie societe
        this.getService.getCategorieSociete().then((res) => {
          //avieo maka an le categorie protocole
          this.getService.getCategorieProtocole().then((res) => {
            // console.log("categorie,societe,cate protocole ok");
            this.api.initSociete = true;
            this.api.setLoadingAllSociete(false);
          }).catch((err) => {
            // console.log(err);
            this.api.setLoadingAllSociete(false);
          });
        }).catch(err => {
          // console.log(err);
          this.api.setLoadingAllSociete(false);
        });
      }).catch(err => {
        // console.log(err);
        this.api.setLoadingAllSociete(false);
      });

    }

  }
  setEtoiles(){
    this.societes.forEach(ele=>{
      ele.etoile=this.getEtoilesSequence(ele.points);
    })
  }
  getEtoilesSequence(num){
    let numExact=Math.floor(num);
    let tab=[];
    while (true) {
      if(numExact<=0)break;
      if(numExact>=2)tab.push('F');
      else if(numExact==1)tab.push('H');
      numExact-=2;
    }
    if(tab.length<5){
      let ambony=5-tab.length;
      for (let index = 0; index < ambony; index++) {
        tab.push('E');
      }
    }
    return tab;
  }
  refreshSociete() {
    this.api.setLoadingAllSociete(true);
    this.getService.getAllSociete().then(res=>{
      this.api.setLoadingAllSociete(false);
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

  //fomction animation des bloc
  onAnimeBlocInsertCategorie(){
    if (this.classBlocSocieteCategorie == "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial" ||
      this.classBlocSocieteCategorie == "bloc_form_insert_societe bloc_form_insert_societe_non_active") {
      this.classBlocSocieteCategorie = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActiveCategorie = "ni ni-bold-up icon_activation_insert_societe";
    } else {
      this.classBlocSocieteCategorie = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActiveCategorie = "ni ni-bold-down icon_activation_insert_societe";
    }
  }

  //FONCTON POUR LA MAP
  //affciher map
  showMap() {
    this.map = L.map("map-canvas").setView([-18.916193244957622, 47.52146212491431], 14);
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


  //INSERTION SOCIETE
  onInsertSociete(form: NgForm) {
    this.loadingInsertSociete = true;
    this.onScrollElement("insertSociete");
    this.insertService.Societe(form.value.nom,
      form.value.categorie,
      form.value.description,
      form.value.lieu,
      form.value.email,
      form.value.tel,
      form.value.lat,
      form.value.lng).then((res: any) => {
        this.erreur = "";
        this.success = res['message'];
        form.reset();
        this.loadingInsertSociete = false;
      }).catch((error) => {
        this.loadingInsertSociete = false;
        this.success = "";
        // console.log(error);
        this.erreur = error['error']['message'];
      }
      );
  }
  //delete societe
  onDeleteSociete(id: String) {
    var societe = this.societes.find(element => element.id == id);
    //confirmation par dialog
    var dialogConfirmDelete = this.dialog.open(DialogConfirmDeleteComponent,{
      width:"500px",
      data:{
        titre:"Confrim DELETE",
        contenu:'Are you sure to delete the company '+societe.nom,
        valeurIn:societe.nom
      }
    });
    //rehefa mclose le dialog
    dialogConfirmDelete.afterClosed().subscribe(result => {
      if(result != ''){
        if(societe.nom == result){
          this.erreur = "";
          this.success = "";
          this.insertService.deleteSociete(id).then(res => {
            this.success = "societe deleted";
          }).catch(err => {
            this.erreur = err;
          });
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

  //insertion categorie societe
  onInsertCategorieSociete(form:NgForm){
    this.loadingInsertCategorieSociete = true;
    this.insertService.CategorieSociete(form.value.description).then((res:any)=>{
        this.messageErreurInsertCategorieSociete = "";
        this.messageSuccessInsertCategorieSociete = res['message'];
        this.loadingInsertCategorieSociete = false;
      }).catch((error)=>{
        this.messageSuccessInsertCategorieSociete = "";
        this.messageErreurInsertCategorieSociete = error['error']['message'];
        this.loadingInsertCategorieSociete = false;
      }
    );
  }

  // delete categorie
  onDeleteCategorie(id:String){
    var categSociete = this.categSociete.find(element => element.id == id);
    //confirmation par dialog
    var dialogConfirmDelete = this.dialog.open(DialogConfirmDeleteComponent,{
      width:"500px",
      data:{
        titre:"Confrim DELETE",
        contenu:'Are you sure to delete the categorie societe '+categSociete.description,
        valeurIn:categSociete.description
      }
    });
    //rehefa mclose le dialog
    dialogConfirmDelete.afterClosed().subscribe(result => {
      if(result != ''){
        if(categSociete.description == result){
          // this.erreur = "";
          // this.success = "";
          this.loadingDeleteCategorieSociete=true;
          this.insertService.deleteCategorieSociete(id).then(res => {
            this.loadingDeleteCategorieSociete=false;
          }).catch(err => {
            this.loadingDeleteCategorieSociete=false;
            // this.erreur = err;
            this.dialog.open(DialogAfficheComponent,{
              width:"300px",
              data:{
                titre:"Error",
                contenu:err['error']['message']
              }
            });
          });
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
