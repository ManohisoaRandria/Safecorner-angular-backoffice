import { Component, OnInit } from '@angular/core';

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

@Component({
  selector: 'app-insert-societe',
  templateUrl: './insert-societe.component.html',
  styleUrls: ['./insert-societe.component.css']
})
export class InsertSocieteComponent implements OnInit {
  private map:any;
  private marker:any = null;
  nom = "";
  lieu:string = "";
  descritpion:string = "";
  email:string = "";
  tel:string = "";
  categorie:string = "";
  lat:number = 0;
  lng:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showMap();

    //MOUS EVENT
    this.map.on('click',(e)=>{ //ajouter des marker sur la map
      if(this.marker != null){
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng);
      console.log(this.marker);
      this.marker.bindPopup("<p>lat: "+e.latlng.lat+"</p><p>lng: "+e.latlng.lng+"</p>").openPopup();
      this.marker.addTo(this.map);
    });
  }

  //animation bloc insert societe
  classIconActive:string = "ni ni-bold-down"; 
  classBlocSociete:string = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
  onAnimeBlocInsertSociete(){
    if(this.classBlocSociete == "bloc_form_insert_societe bloc_form_insert_societe_non_active"){
      this.classBlocSociete = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActive = "ni ni-bold-up";
    }else{
      this.classBlocSociete = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActive = "ni ni-bold-down";
    }
  }

  //FONCTON POUR LA MAP
  //affciher map
  showMap() {
    this.map = L.map("map-canvas").setView([-18.916193244957622,47.52146212491431], 14);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "SafeCorner",
      minZoom: 5
    }).addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete(){
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng; 
  }

}

