import { Societe } from './../../../modele/societe';
import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../../services/insert.service';

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { CategorieSociete } from 'src/app/modele/categorie-societe';
import { Protocole } from '../../../modele/protocole';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-insert-societe-desinfection',
  templateUrl: './insert-societe-desinfection.component.html',
  styleUrls: ['./insert-societe-desinfection.component.css']
})
export class InsertSocieteDesinfectionComponent implements OnInit {
  erreur: string = "";
  success: string = "";
  private map: any;
  private marker: any = null;

  // societes: Societe[] = [];
  // societeSubscription: Subscription;
  lat: number;
  lng: number;
  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocSociete: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService: InsertService, private api: ApiService, private getService: GetService) { }

  ngOnInit(): void {
    // this.societeSubscription = this.api.societeSubject.subscribe(
    //   (societes: Societe[]) => {
    //     this.societes = societes;
    //   }
    // );
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
    // if (!this.api.init) {
    //   //maka anle societe rehetra am volou
    //   this.getService.getAllSociete().then((res) => {
    //     console.log("societe desinfection");
    //     this.api.init = true;
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }

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
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete() {
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng;
  }


  //INSERTION SOCIETE
  onInsertSocieteDesinfection(form: NgForm) {
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
      }).catch((error) => {
        this.success = "";
        console.log(error);
        this.erreur = error['error']['message'];
      }
      );
  }
}
