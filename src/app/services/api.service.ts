import { Societe } from './../modele/societe';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { CategorieSociete } from '../modele/categorie-societe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private societes:Societe[]=[];
  private categorieSociete:CategorieSociete[]=[];
  societeSubject=new BehaviorSubject([]);
  categorieSocieteSubject=new BehaviorSubject([]);
  init: boolean = false;
  emitSociete(){
    this.societeSubject.next(this.societes);
  }
  emitCategorieSociete(){
    this.categorieSocieteSubject.next(this.categorieSociete);
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
  constructor() { }
}
