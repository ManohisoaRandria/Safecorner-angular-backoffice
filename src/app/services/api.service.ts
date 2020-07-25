import { Societe,SocieteDesinfection } from './../modele/societe';
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
  private userName:string="";
  private societesDesinfection:SocieteDesinfection[]=[];
  private categorieSociete:CategorieSociete[]=[];
  private categorieProtocole:CategorieProtocole[]=[];
  private protocoles:Protocole[]=[];
  societeSubject=new BehaviorSubject([]);
  protocoleSubject=new BehaviorSubject([]);
  userNameSubject=new BehaviorSubject("");
  societeDesinfectionSubject=new BehaviorSubject([]);
  categorieSocieteSubject=new BehaviorSubject([]);
  CategorieProtocoleSubject=new BehaviorSubject([]);
  initSociete: boolean = false;
  initSocieteDesinfection: boolean = false;
  initProtocole: boolean = false;
  emitSociete(){
    this.societeSubject.next(this.societes);
  }
  emitProtocole(){
    this.protocoleSubject.next(this.protocoles);
  }
  emitUserName(){
    this.userNameSubject.next(this.userName);
  }
  emitSocieteDesinfection(){
    this.societeDesinfectionSubject.next(this.societesDesinfection);
  }
  emitCategorieSociete(){
    this.categorieSocieteSubject.next(this.categorieSociete);
  }
  emitCategorieProtocole(){
    this.CategorieProtocoleSubject.next(this.categorieProtocole);
  }
  setUserName(name:string){
    this.userName=name;
    this.emitUserName();
  }
addSociete(societe:Societe){
  this.societes.push(societe);
  this.emitSociete();
}
addSocieteDesinfection(societe:SocieteDesinfection){
  this.societesDesinfection.push(societe);
  this.emitSociete();
}
addProtocole(proto:Protocole){
  this.protocoles.push(proto);
  this.emitSociete();
}
setAllSociete(socs:Societe[]){
  this.societes=socs;
  this.emitSociete();
}
setAllSocieteDesinfection(socs:SocieteDesinfection[]){
  this.societesDesinfection=socs;
  this.emitSocieteDesinfection();
}
setAllProtocole(proto:Protocole[]){
  this.protocoles=proto;
  this.emitProtocole();
}
addCategorieSociete(categorieSociete:Societe){
  this.categorieSociete.push(categorieSociete);
  this.emitCategorieSociete();
}
setAllCategorieSociete(categs:Societe[]){
  this.categorieSociete=categs;
  this.emitCategorieSociete();
}
setAllCategorieProtocole(catep:CategorieProtocole[]){
  this.categorieProtocole=catep;
  this.emitCategorieProtocole();
}
  constructor() { }
}
