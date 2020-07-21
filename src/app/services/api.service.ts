import { Societe } from './../modele/societe';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { CategorieSociete } from '../modele/categorie-societe';
import { Protocole } from '../modele/protocole';
import { CategorieProtocole } from '../modele/categorie-protocole';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private societes:Societe[]=[];
  private categorieSociete:CategorieSociete[]=[];
  private protocoles:Protocole[]=[];
  private categorieProtocole:CategorieProtocole[]=[];
  societeSubject=new BehaviorSubject([]);
  categorieSocieteSubject=new BehaviorSubject([]);
  protocolesSubject=new BehaviorSubject([]);
  CategorieProtocoleSubject=new BehaviorSubject([]);
  init: boolean = false;
  emitSociete(){
    this.societeSubject.next(this.societes);
  }
  emitCategorieSociete(){
    this.categorieSocieteSubject.next(this.categorieSociete);
  }
  emitProtocole(){
    this.protocolesSubject.next(this.protocoles);
  }
  emitCategorieProtocole(){
    this.CategorieProtocoleSubject.next(this.categorieProtocole);
  }
addSociete(societe:Societe){
  this.societes.push(societe);
  this.emitSociete();
}
setAllSociete(socs:Societe[]){
  this.societes=socs;
  this.emitSociete();
}
addCategorieSociete(categorieSociete:Societe){
  this.categorieSociete.push(categorieSociete);
  this.emitCategorieSociete();
}
setAllCategorieSociete(categs:Societe[]){
  this.categorieSociete=categs;
  this.emitCategorieSociete();
}
setAllProtocole(proto:Protocole[]){
  this.protocoles=proto;
  this.emitProtocole();
}
setAllCategorieProtocole(catep:CategorieProtocole[]){
  this.categorieProtocole=catep;
  this.emitCategorieProtocole();
}
  constructor() { }
}
