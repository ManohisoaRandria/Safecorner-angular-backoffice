import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router'; 

import * as L from "node_modules/leaflet";

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { SocieteDesinfection } from '../../../modele/societe'; 
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../components/dialog-confirm-update/dialog-confirm-update.component';

@Component({
  selector: 'app-update-societe-desinfection',
  templateUrl: './update-societe-desinfection.component.html',
  styleUrls: ['./update-societe-desinfection.component.css']
})
export class UpdateSocieteDesinfectionComponent implements OnInit {
  private id:string="";
  erreur: string = "";
  success: string = "";
  private map: any;
  private marker: any = null;
  loading:boolean = false;
  societeDesinfection:SocieteDesinfection;
  nom:string = "";
  lieu:string = "";
  description:string="";
  email:string = "";
  tel:string = "";
  lat: number;
  lng: number;
  constructor(private insertService: InsertService,
              private api:ApiService,
              private route:ActivatedRoute,
              private router:Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.societeDesinfectionSubject.subscribe((societe: SocieteDesinfection[])=>{
      this.societeDesinfection = societe.find(element => element.id == this.id);
      if(this.societeDesinfection == undefined){
        this.router.navigate(['societe-desinfection']);
      }
      this.nom = this.societeDesinfection.nom;
      this.lieu = this.societeDesinfection.lieu;
      this.email = this.societeDesinfection.email;
      this.tel = this.societeDesinfection.tel;
      this.description = this.societeDesinfection.description;
      var coord = JSON.parse(this.societeDesinfection.coordonnee);
      this.lat = coord.coordinates[0];
      this.lng = coord.coordinates[1];
    });

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
    this.map.setView([this.lat,this.lng], 18);
    this.marker = L.marker([this.lat,this.lng]);
    this.marker.addTo(this.map);
  }

  //AUTRE FONCTION
  onAddCoordSociete() {
    this.lat = this.marker._latlng.lat;
    this.lng = this.marker._latlng.lng;
  }

  //INSERTION SOCIETE DESINFECTION
  onUpdateSociete(form: NgForm) {
    // dialog pour confirmer l'update
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
      width:"300px",
      data:{
        titre:"Confirm UPDATE",
        contenu:"Are you sure you want to change the disinfection company "+this.societeDesinfection.nom
      }
    });

    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.loading = true;
        this.insertService.UpdateSocieteDesinfection(this.id,form.value.nom,
          form.value.description,
          form.value.lieu,
          form.value.email,
          form.value.tel,
          form.value.lat,
          form.value.lng).then((res: any) => {
            this.erreur = "";
            this.success = res['message'];
            this.loading = false;
          }).catch((error) => {
            this.success = "";
            console.log(error);
            this.erreur = error['error']['message'];
          });
      }
    });
  }
}
