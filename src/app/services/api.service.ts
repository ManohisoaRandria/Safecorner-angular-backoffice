import { Injectable } from '@angular/core';
import { Societe } from '../modele/societe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private societes:Societe[]=[];
  societeSubject=new BehaviorSubject([]);

  emitSociete(){
    this.societeSubject.next(this.societes);
  }

  constructor() { }
}
