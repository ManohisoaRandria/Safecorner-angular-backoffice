import { Protocole } from 'src/app/modele/protocole';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CategorieSociete } from '../modele/categorie-societe';
import { Societe,SocieteDesinfection } from '../modele/societe';
import { CategorieProtocole } from '../modele/categorie-protocole';
import { HistoriqueDescente } from '../modele/historique-descente';
import { Prestation } from '../modele/prestation';
import { Stats } from '../modele/stats';

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
            element.description, element.lieux,
            element.dateCreation, element.email,
            element.tel,element.coordonne,element.points);
        });
        this.api.setAllSociete(societes);
        resolve(societes);
      }, error => {
        reject(error);
      })
    });
  }
  getStats() {
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'numberData').subscribe(res => {
        let stats=new Stats(res['data']['societe'],res['data']['societeDesinfection'],res['data']['protocole']);
        this.api.setStats(stats);
        resolve(stats);
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
        if(res['data']['protocoles']['Personnel']){
          protocolePerso = res['data']['protocoles']['Personnel'].map((element) => {
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
  getProtocolesBySocieteByCategorieProtocole(id:string,categProtocole:string){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'protocoles?societe='+id+'&type='+categProtocole).subscribe(res => {
        let protocole:Protocole[]=[];

        if(res['data']['protocoles']){
          protocole = res['data']['protocoles'].map((element) => {
            return new Protocole(element.protocole.id,
              element.protocole.nom,element.protocole.description,element.protocole.dateCreation,element.dureeLimiteDeChangement);
          });
        }
        resolve(protocole);
      }, error => {
        reject(error);
      })
    });
  }
  getHistoriqueDescente(idSociete:String,mois:number,annee:number){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'historiqueDescente?idSociete='+idSociete+'&mois='+mois+'&annee='+annee).subscribe(res => {
        let histo = res['data']['historiqueDescente'].map((element) => {
          return new HistoriqueDescente(
            element.id
            ,element.idSociete
            ,element.description
            ,element.points
            ,element.dateCreation);
        });
        resolve(histo);
      }, error => {
        reject(error);
      })
    });
  }
  getAllSocieteDesinfection() {
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'societeDesinfect?all=true').subscribe(res => {
        let societesD = res['data'].map((element) => {
          return new SocieteDesinfection(element.id,
            element.nom,
            element.description, element.lieux,
            element.dateCreation, element.email,
            element.tel,element.coordonne);
        });
        this.api.setAllSocieteDesinfection(societesD);
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //get prestation by societe
  getPrestations(idSocieteDesinfection:String){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'prestations?societe='+idSocieteDesinfection).subscribe(res => {
        let prestation = res['data']['prestations'].map((element) => {
          return new Prestation(element.id,
            element.nom,
            element.description,
            element.idSocieteDesinfection,
            element.prix);
        });
        resolve(prestation);
      }, error => {
        reject(error);
      })
    });
  }
  rechercheSociete(q:string){
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'search?cat=all&q='+q).subscribe(res => {
        let societes = res['data'].map((element) => {
          return new Societe(element.id,
            element.nom, element.idCategorieSociete,
            element.description, element.lieux,
            element.dateCreation, element.email,
            element.tel,element.coordonne,element.points);
        });
        this.api.setAllSociete(societes);
        resolve();
      }, error => {
        reject(error);
      })
    });
  }
  //get all protocole
  getAllProtocole() {
    return new Promise((resolve, reject) => {
      this.http.get(this.auth.getBASE_URL() + 'allProtocole?all=true&page=0&limit=0').subscribe(res => {
        let protocole = res['data'].map((element) => {
          return new Protocole(element.id,
            element.nom,
            element.description,
            element.dateCreation);
        });
        this.api.setAllProtocole(protocole);
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
}
