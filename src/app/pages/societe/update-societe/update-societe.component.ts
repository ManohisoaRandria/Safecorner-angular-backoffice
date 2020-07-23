import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router'; 

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
export class UpdateSocieteComponent implements OnInit {
  private id:string="";
  erreur: string = "";
  success: string = "";
  private map: any;
  private marker: any = null;

  societe:Societe;
  categSocieteSubscription: Subscription;
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
              private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.societeSubject.subscribe((societe: Societe[])=>{
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
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
    // this.marker = L.marker([-18.916193244957622,47.52146212491431]);
    // this.marker.addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete() {
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng;
  }

  //INSERTION SOCIETE
  onUpdateSociete(form: NgForm) {
    // this.insertService.Societe(form.value.nom,
    //   form.value.categorie,
    //   form.value.description,
    //   form.value.lieu,
    //   form.value.email,
    //   form.value.tel,
    //   form.value.lat,
    //   form.value.lng).then((res: any) => {
    //     this.erreur = "";
    //     this.success = res['message'];
    //     form.reset();
    //   }).catch((error) => {
    //     this.success = "";
    //     console.log(error);
    //     this.erreur = error['error']['message'];
    //   }
    //   );
  }

}
