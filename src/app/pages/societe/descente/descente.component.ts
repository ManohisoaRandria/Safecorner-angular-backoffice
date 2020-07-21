import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

import { ApiService } from '../../../services/api.service';
import { GetService } from '../../../services/get.service';
import { InsertService } from '../../../services/insert.service';
import { Societe } from '../../../modele/societe';
import { Protocole } from '../../../modele/protocole';
import { NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-descente',
  templateUrl: './descente.component.html',
  styleUrls: ['./descente.component.css']
})
export class DescenteComponent implements OnInit {
  private id:string = "";
  societe:Societe;
  nombreApplique:number = 0;
  protocoleClient:Protocole[];
  protocolePerso:Protocole[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private api:ApiService,
              private getService:GetService,
              private insertService:InsertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.societeSubject.subscribe((societe: Societe[]) => {
      this.societe = societe.find(element => element.id == this.id);
      if (this.societe == undefined) {
        this.router.navigate(['societe']);
      }
    });
    //maka anle protocole rehetra amnio societe io
    this.getService.getProtocolesBySociete(this.id).then((res:any)=>{
      this.protocolePerso = res.perso;
      this.protocoleClient = res.client;
    }).catch(err=>{
      console.log(err);
    })
  }

  onApplique($event){
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.nombreApplique++;
    }else{
      if(this.nombreApplique > 0){
        this.nombreApplique--;
      }
    }
  }

  //insertion de l'historique de la descente
  onInsertHistoDescente(form:NgForm){
    this.nombreApplique = 0;
    form.reset();
  }
}
