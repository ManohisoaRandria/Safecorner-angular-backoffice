import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

import { Societe } from '../../../modele/societe';
import { Protocole } from '../../../modele/protocole';
import { ApiService } from '../../../services/api.service'; 
import { GetService } from '../../../services/get.service'; 

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
              private getService:GetService) { }

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

}
