import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { ApiService } from '../../../services/api.service';
import { GetService } from '../../../services/get.service';
import { InsertService } from '../../../services/insert.service';
import { Societe } from '../../../modele/societe';
import { Protocole } from '../../../modele/protocole';
import { NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HistoriqueDescente } from 'src/app/modele/historique-descente';

@Component({
  selector: 'app-descente',
  templateUrl: './descente.component.html',
  styleUrls: ['./descente.component.css']
})
export class DescenteComponent implements OnInit,OnDestroy {
  private id: string = "";
  erreur = "";
  success = "";
  societe: Societe;
  loading: boolean = false;
  loadingHistoDescente: boolean = false;
  nombreApplique: number = 0;
  protocoleClient: Protocole[];
  protocolePerso: Protocole[];
subs:Subscription;
  mois: number;
  annee: number;
  lesMois = [
    { name: "Janvier", value: 1 },
    { name: "Février", value: 2 },
    { name: "Mars", value: 3 },
    { name: "Avril", value: 4 },
    { name: "Mai", value: 5 },
    { name: "Juin", value: 6 },
    { name: "Juillet", value: 7 },
    { name: "Août", value: 8 },
    { name: "Septembre", value: 9 },
    { name: "Octobre", value: 10 },
    { name: "Novembre", value: 11 },
    { name: "Décembre", value: 12 }
  ];
  lesAnnees = [];
  historiqueDescentes: HistoriqueDescente[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private getService: GetService,
    private insertService: InsertService,
    private scrollElem:ViewportScroller) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subs=this.api.societeSubject.subscribe((societe: Societe[]) => {
      this.societe = societe.find(element => element.id == this.id);
      if (this.societe == undefined) {
        this.router.navigate(['societe']);
      }
    });
    //maka anle protocole rehetra amnio societe io
    this.loading = true;
    this.getService.getProtocolesBySociete(this.id).then((res: any) => {
      this.protocolePerso = res.perso;
      this.protocoleClient = res.client;
      this.loading = false;
      //maka an le histo descente am volou
      this.loadingHistoDescente = true;
      this.getService.getHistoriqueDescente(this.societe.id, this.mois, this.annee).then((res: HistoriqueDescente[]) => {
        this.historiqueDescentes = res;
        this.loadingHistoDescente = false;
      }).catch(err => {
        // console.log(err);
        this.loadingHistoDescente = false;
      });
    }).catch(err => {
      this.loading = false;
      // console.log(err);
    })
    var date = new Date();// date angalana an le historique amty mois sy annee ty
    this.mois = date.getMonth() + 1;
    this.annee = date.getFullYear();
    //initialisation des annee
    for (var i = this.annee; i >= 2018; i--) {
      this.lesAnnees.push(i);
    }

  }

  onApplique($event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.nombreApplique++;
    } else {
      if (this.nombreApplique > 0) {
        this.nombreApplique--;
      }
    }
  }

  //insertion de l'historique de la descente
  onInsertHistoDescente(form: NgForm) {
    if (form.value.description != "") {
      this.loading = true;
      this.onScrollElement("insertDescente");
      this.insertService.historiqueDescente(this.societe.id, form.value.description, this.nombreApplique).then((res: any) => {
        this.erreur = "";
        this.success = res['message'];
        this.nombreApplique = 0;
        //mila averina alaina le historique descente
        this.loadingHistoDescente = true;
        this.getService.getHistoriqueDescente(this.societe.id, this.mois, this.annee).then((res: HistoriqueDescente[]) => {
          this.historiqueDescentes = res;
          this.loadingHistoDescente = false;
        }).catch(err => {
          this.loadingHistoDescente = false;
          // console.log(err);
        });
        //mamerina ny form
        form.reset();
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.success = "";
        // console.log(error);
        this.erreur = error['error']['message'];
      }
      );
    } else {
      this.erreur = "Invalid description.";
    }
  }

  //Affciher historique
  onAfficheHistorique(form: NgForm) {
    this.loadingHistoDescente = true;
    this.getService.getHistoriqueDescente(this.societe.id, form.value.mois, form.value.annee).then((res: HistoriqueDescente[]) => {
      this.historiqueDescentes = res;
      this.loadingHistoDescente = false;
    }).catch(err => {
      this.loadingHistoDescente = false;
      // console.log(err);
    });
  }

  //scroll element
  onScrollElement(idelem:string){
    this.scrollElem.scrollToAnchor(idelem);
  }
}
