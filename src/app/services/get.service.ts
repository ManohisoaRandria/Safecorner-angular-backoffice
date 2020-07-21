import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CategorieSociete } from '../modele/categorie-societe';
import { Societe } from '../modele/societe';
import { Protocole } from '../modele/protocole';
import { CategorieProtocole } from '../modele/categorie-protocole';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient, private auth: AuthService, private api: ApiService) { }

  getAllSociete() {
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'search?cat=all').subscribe(res => {
        let societes = res['data'].map((element) => {
          return new Societe(element.id,
            element.nom, element.idCategorieSociete,
            element.description, element.lieu,
            element.dateCreation, element.email,
            element.tel, element.coordonnee,element.points);
        });
        this.api.setAllSociete(societes);
        resolve(societes);
      }, error => {
        reject(error);
      })
    });
  }
  getCategorieSociete(){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'categorieSociete').subscribe(res => {
        let categsocietes = res['data'].map((element) => {
          return new CategorieSociete(element.id,
            element.description);
        });
        this.api.setAllCategorieSociete(categsocietes);
        resolve(categsocietes);
      }, error => {
        reject(error);
      })
    });
  }
  getCategorieProtocole(){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'categorieProtocole').subscribe(res => {
        let cateP = res['data'].map((element) => {
          return new CategorieProtocole(element.id,element.description);
        });
        this.api.setAllCategorieProtocole(cateP);
        resolve(cateP);
      }, error => {
        reject(error);
      })
    });
  }
  getOutProtocoleSociete(idSociete:String,idCategorieProtocole:String){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'outProtocoleSociete?idSociete='+idSociete+'&idCategorieProtocole='+idCategorieProtocole).subscribe(res => {
        let protocole = res['data'].map((element) => {
          return new Protocole(element.id,
            element.nom,element.description,element.dateCreation);
        });
        resolve(protocole);
      }, error => {
        reject(error);
      })
    });
  }
  getProtocolesBySociete(id:string){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'protocoles?societe='+id+'&type=all').subscribe(res => {
        let protocolePerso=[];
        let protocoleClient=[];
        if(res['data']['protocoles']['Perso']){
          protocolePerso = res['data']['protocoles']['Perso'].map((element) => {
            return new Protocole(element.protocole.id,
              element.protocole.nom,element.protocole.description,element.protocole.dateCreation,element.dureeLimiteDeChangement);
          });
        }
       if(res['data']['protocoles']['Client']){
        protocoleClient = res['data']['protocoles']['Client'].map((element) => {
          return new Protocole(element.protocole.id,
            element.protocole.nom,element.protocole.description,element.protocole.dateCreation,element.dureeLimiteDeChangement);
        });
       }

        resolve({
          'perso':protocolePerso,
          'client':protocoleClient
        });
      }, error => {
        reject(error);
      })
    });
  }
}
