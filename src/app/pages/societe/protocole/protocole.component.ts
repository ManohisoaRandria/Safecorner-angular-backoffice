import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ViewportScroller } from '@angular/common';

import { Societe } from '../../../modele/societe';
import { Protocole } from '../../../modele/protocole';
import { ApiService } from '../../../services/api.service'; 
import { GetService } from '../../../services/get.service'; 
import { MatDialog} from '@angular/material/dialog';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';

@Component({
  selector: 'app-protocole',
  templateUrl: './protocole.component.html',
  styleUrls: ['./protocole.component.css']
})
export class ProtocoleComponent implements OnInit {
  private id:string = "";
  societe:Societe;
  loading:boolean = false;
  protocoleClient:Protocole[];
  protocolePerso:Protocole[];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private api:ApiService,
              private getService:GetService,
              private dialog:MatDialog,
              private scrollElem:ViewportScroller) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.societeSubject.subscribe((societe: Societe[]) => {
      this.societe = societe.find(element => element.id == this.id);
      if (this.societe == undefined) {
        this.router.navigate(['societe']);
      }
    });
    //maka an le protocole client sy perso
    this.loading = true;
    this.getService.getProtocolesBySociete(this.id).then((res:any)=>{
      this.protocolePerso = res.perso;
      this.protocoleClient = res.client;
      this.loading = false;
    }).catch(err=>{
      console.log(err);
    })
  }

  // affciher la desription de la protocole
  onAfficheDescription(event){
    const target = event.target as HTMLInputElement;
    var protocole:any = null;
    if(target.name == "client"){
      protocole = this.protocoleClient.find(element => element.id == target.id);
    }else{
      protocole = this.protocolePerso.find(element => element.id == target.id);
    }
    if(protocole != null){
      this.dialog.open(DialogAfficheComponent, {
        width: '500px',
        data:{
          titre:"Descritpion:",
          contenu:protocole.description
        }
      });
    }
  }

  //scroll element
  onScrollElement(idelem:string){
    this.scrollElem.scrollToAnchor(idelem);
  }

}
