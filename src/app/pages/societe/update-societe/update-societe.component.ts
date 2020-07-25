import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../components/dialog-confirm-update/dialog-confirm-update.component';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';
import { ViewportScroller } from '@angular/common';

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { CategorieSociete } from 'src/app/modele/categorie-societe';
import { Societe } from '../../../modele/societe';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-societe',
  templateUrl: './update-societe.component.html',
  styleUrls: ['./update-societe.component.css']
})
export class UpdateSocieteComponent implements OnInit,OnDestroy {
  private id:string="";
  erreur: string = "";
  success: string = "";
  private map: any;
  private marker: any = null;
  loadingUpdateSociete:boolean = false;
  societe:Societe;
  categSocieteSubscription: Subscription;
  subs:Subscription;
  categSociete: CategorieSociete[] = [];
  nom:string = "";
  lieu:string = "";
  description:string="";
  email:string = "";
  tel:string = "";
  categorie:string = "";
  lat: number;
  lng: number;
  constructor(private insertService: InsertService,
              private api:ApiService,
              private route:ActivatedRoute,
              private router:Router,
              private dialog:MatDialog,
              private scrollElem:ViewportScroller) { }
  ngOnDestroy(): void {
    this.categSocieteSubscription.unsubscribe();
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.subs=this.api.societeSubject.subscribe((societe: Societe[])=>{
      this.societe = societe.find(element => element.id == this.id);
      if(this.societe == undefined){
        this.router.navigate(['societe']);
      }
      this.nom = this.societe.nom;
      this.lieu = this.societe.lieu;
      this.email = this.societe.email;
      this.tel = this.societe.tel;
      this.description = this.societe.description;
      this.categorie = this.societe.idCategorieSociete
      var coord = JSON.parse(this.societe.coordonnee);
      this.lat = coord.coordinates[0];
      this.lng = coord.coordinates[1];
    });
    this.categSocieteSubscription = this.api.categorieSocieteSubject.subscribe(
      (catep: CategorieSociete[]) => {
        this.categSociete = catep;
      }
    );

    this.showMap();
    //MOUS EVENT
    this.map.on('click', (e) => { //ajouter des marker sur la map
      if (this.marker != null) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng);
      this.marker.bindPopup("<p>lat: " + e.latlng.lat + "</p><p>lng: " + e.latlng.lng + "</p>").openPopup();
      this.marker.addTo(this.map);
    });
  }

  //FONCTON POUR LA MAP
  //affciher map
  showMap() {
    this.map = L.map("map-canvas-update").setView([-18.916193244957622, 47.52146212491431], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
    this.map.setView([this.lat,this.lng], 18);
    this.marker = L.marker([this.lat,this.lng]);
    this.marker.addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete() {
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng;
  }

  //INSERTION SOCIETE
  onUpdateSociete(form: NgForm) {
    // dialog pour confirmer l'update
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
      width:"300px",
      data:{
        titre:"Confirm UPDATE",
        contenu:"Are you sure you want to change the company "+this.societe.nom
      }
    });

    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.loadingUpdateSociete = true;
        this.onScrollElement("updateSociete");
        this.insertService.UpdateSociete(this.id,form.value.nom,
          form.value.categorie,
          form.value.description,
          form.value.lieu,
          form.value.email,
          form.value.tel,
          form.value.lat,
          form.value.lng).then((res: any) => {
            this.loadingUpdateSociete = false;
            this.erreur = "";
            this.success = res['message'];
          }).catch((error) => {
            this.loadingUpdateSociete = false;
            this.erreur = error['error']['message'];
            this.success = "";
          });
      }
    });
  }

   //scroll element
   onScrollElement(idelem:string){
    this.scrollElem.scrollToAnchor(idelem);
  }

}
