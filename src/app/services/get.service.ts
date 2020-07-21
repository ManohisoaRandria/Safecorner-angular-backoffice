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
  getProtocoles(){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'allProtocole?all=true&page=0&limit=0').subscribe(res => {
        let protocole = res['data'].map((element) => {
          return new Protocole(element.id,
            element.nom,element.description,element.dateCreation);
        });
        this.api.setAllProtocole(protocole);
        resolve(protocole);
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
}
