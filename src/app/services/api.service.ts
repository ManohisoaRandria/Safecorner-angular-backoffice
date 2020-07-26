import { Stats } from './../modele/stats';
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
  private loadingSociete:boolean=false;
  private stats:Stats=new Stats(0,0,0);
  statsSubject=new BehaviorSubject(new Stats(0,0,0));
  loadingSocieteSubject=new BehaviorSubject(false);
  societeSubject=new BehaviorSubject([]);
  protocoleSubject=new BehaviorSubject([]);
  userNameSubject=new BehaviorSubject("");
  societeDesinfectionSubject=new BehaviorSubject([]);
  categorieSocieteSubject=new BehaviorSubject([]);
  CategorieProtocoleSubject=new BehaviorSubject([]);
  initSociete: boolean = false;
  initStats: boolean = false;
  initSocieteDesinfection: boolean = false;
  initProtocole: boolean = false;
  emitloadingSociete(){
    this.loadingSocieteSubject.next(this.loadingSociete);
  }
  emitSociete(){
    this.societeSubject.next(this.societes);
  }
  emitStats(){
    this.statsSubject.next(this.stats);
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
setLoadingAllSociete(socsload:boolean){
  this.loadingSociete=socsload;
  this.emitloadingSociete();
}
setAllSocieteDesinfection(socs:SocieteDesinfection[]){
  this.societesDesinfection=socs;
  this.emitSocieteDesinfection();
}
setAllProtocole(proto:Protocole[]){
  this.protocoles=proto;
  this.emitProtocole();
}
setStats(stat:Stats){
  this.stats=stat;
  this.emitStats();
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
