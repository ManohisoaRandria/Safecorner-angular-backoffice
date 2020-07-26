import { Injectable, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Societe,SocieteDesinfection } from '../modele/societe';
import { ApiService } from './api.service';
import { GetService } from '../services/get.service';
import { triggerAsyncId } from 'async_hooks';

@Injectable({
    providedIn: 'root'
  })
export class InsertService {

    constructor(private authService:AuthService,
                private http:HttpClient,
                private api: ApiService,
                private getService: GetService) {
    }

    //insert categorie societe
    CategorieSociete(descritpion:String){
        return new Promise((resolve, reject) => {
            let data = {
              "description": descritpion,
            }
            this.http.post(this.authService.getBASE_URL() + 'categorieSociete', data).subscribe(res => {
              this.getService.getCategorieSociete();
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }
    //insert protocole
    Protocole(nom:String,descritpion:String){
        return new Promise((resolve, reject) => {
            let data = {
                "nom":nom,
                "description": descritpion,
            }
            this.http.post(this.authService.getBASE_URL() + 'protocoles', data).subscribe(res => {
              this.getService.getAllProtocole().then(res=>{
                this.getService.getStats();
                resolve(res);
              });
            }, error => {
              reject(error);
            })
        });
    }

    //insert Societe
    Societe(nom:String,idCategorieSociete:String,descritpion:String,lieu:String,email:String,tel:String,coordLat,coordLong){
        return new Promise((resolve, reject) => {
            let data = {
                "nom":nom,
                "idCategorieSociete":idCategorieSociete,
                "description": descritpion,
                "lieu":lieu,
                "email":email,
                "tel":tel,
                "coordLat":coordLat,
                "coordLong":coordLong
            }
            this.http.post(this.authService.getBASE_URL() + 'societe',data).subscribe(res => {
              let societe=new Societe(res['data'].id,
                res['data'].nom, res['data'].idCategorieSociete,
                res['data'].description, res['data'].lieu,
                res['data'].dateCreation, res['data'].email,
                res['data'].tel, res['data'].coordonnee,0);
                this.api.addSociete(societe);
                this.getService.getStats();
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }
    //add protocole choisi
    AddProtocoleSociete(idSociete:String,idCategorieProtocole:String,protocoleChoisi:any){
        return new Promise((resolve, reject) => {
            let data = {
                "idSociete":idSociete,
                "idCategorieProtocole":idCategorieProtocole,
                "protocoleChoisi":protocoleChoisi
            }
            this.http.post(this.authService.getBASE_URL() + 'addProtocoleChoisi',data).subscribe(res => {
              this.getService.getAllSociete();
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }
    //update/delete protocole choisi
    ModifProtocoleSociete(idSociete:String,protocoleChoisi:any,idCategorieProtocole:String,fafana?:string){
      return new Promise((resolve, reject) => {
          let data = fafana?{
              "societe":idSociete,
              "idCategorieProtocole":idCategorieProtocole,
              "protocoleChoisi":protocoleChoisi,
              "delete":"true"
          }:{
            "societe":idSociete,
            "idCategorieProtocole":idCategorieProtocole,
            "protocoleChoisi":protocoleChoisi,
            "delete":"false"
          };
          this.http.put(this.authService.getBASE_URL() + 'protocoleChoisi',data).subscribe(res => {
            resolve(res);
          }, error => {
            reject(error);
          })
      });
    }
    //insert historique descente
    historiqueDescente(idSociete:String,description:String,nombreProtocole:number){
      return new Promise((resolve, reject) => {
          let data = {
              "idSociete":idSociete,
              "description": description,
              "nombreProtocole":nombreProtocole
          }
          this.http.post(this.authService.getBASE_URL() + 'historiqueDescente', data).subscribe(res => {
            this.getService.getAllSociete();
            resolve(res);
          }, error => {
            reject(error);
          })
      });
  }
  //insert Societe desinfection
  SocieteDesinfection(nom:String,descritpion:String,lieu:String,email:String,tel:String,coordLat,coordLong){
    return new Promise((resolve, reject) => {
        let data = {
            "nom":nom,
            "description": descritpion,
            "lieu":lieu,
            "email":email,
            "tel":tel,
            "coordLat":coordLat,
            "coordLong":coordLong
        }
        this.http.post(this.authService.getBASE_URL() + 'societeDesinfect',data).subscribe(res => {
          let societeD=new SocieteDesinfection(res['data'].id,
            res['data'].nom,
            res['data'].description, res['data'].lieu,
            res['data'].dateCreation, res['data'].email,
            res['data'].tel, res['data'].coordonnee);
            //mila manao saddSocieteDesinfection
            this.api.addSocieteDesinfection(societeD);
            this.getService.getStats();
          resolve(res);
        }, error => {
          reject(error);
        })
    });
  }
  //update societe
  UpdateSociete(id:String,nom:String,idCategorieSociete:String,descritpion:String,lieu:String,email:String,tel:String,coordLat,coordLong){
    return new Promise((resolve, reject) => {
      let data = {
          "id":id,
          "nom":nom,
          "idCategorieSociete":idCategorieSociete,
          "description": descritpion,
          "lieu":lieu,
          "email":email,
          "tel":tel,
          "coordLat":coordLat,
          "coordLong":coordLong
      }
      this.http.put(this.authService.getBASE_URL() + 'societe',data).subscribe(res => {
        this.getService.getAllSociete();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //update societe desinfection
  UpdateSocieteDesinfection(id:String,nom:String,descritpion:String,lieu:String,email:String,tel:String,coordLat,coordLong){
    return new Promise((resolve, reject) => {
      let data = {
          "id":id,
          "nom":nom,
          "description": descritpion,
          "lieu":lieu,
          "email":email,
          "tel":tel,
          "coordLat":coordLat,
          "coordLong":coordLong
      }
      this.http.put(this.authService.getBASE_URL() + 'societeDesinfect',data).subscribe(res => {
        this.getService.getAllSocieteDesinfection();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //insert prestation
  Prestation(idSocieteDesinfection:String,nom:String,prix:number,descritpion:String){
    return new Promise((resolve, reject) => {
      let data = {
          "societe":idSocieteDesinfection,
          "nom":nom,
          "prix":prix,
          "description": descritpion
      }
      this.http.post(this.authService.getBASE_URL() + 'prestation',data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  deleteSociete(id:String){
    return new Promise((resolve, reject) => {
      this.http.delete(this.authService.getBASE_URL() + 'societe?id='+id).subscribe(res => {
        this.getService.getAllSociete();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //update prestation
  UpdatePrestation(id:String,nom:String,prix:number,idSocieteDesinfection:String,description:String){
    return new Promise((resolve, reject) => {
      let data = {
          "id":id,
          "nom":nom,
          "prix":prix,
          "idSocieteDesinfection":idSocieteDesinfection,
          "description": description
      }
      this.http.put(this.authService.getBASE_URL() + 'prestation',data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  deleteSocieteDesinfection(id:String){
    return new Promise((resolve, reject) => {
      this.http.delete(this.authService.getBASE_URL() + 'societeDesinfect?id='+id).subscribe(res => {
        this.getService.getAllSocieteDesinfection();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  deletePrestation(id:String){
    return new Promise((resolve, reject) => {
      this.http.delete(this.authService.getBASE_URL() + 'prestation?id='+id).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //delete categorieSociete
  deleteCategorieSociete(id:String){
    return new Promise((resolve, reject) => {
      this.http.delete(this.authService.getBASE_URL() + 'categorieSociete?id='+id).subscribe(res => {
        this.getService.getCategorieSociete();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //delete protocole
  deleteProtocole(id:String){
    return new Promise((resolve, reject) => {
      this.http.delete(this.authService.getBASE_URL() + 'protocole?id='+id).subscribe(res => {
        this.getService.getAllProtocole();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //update protocole
  UpdateProtocole(id:String,nom:String,description:String){
    return new Promise((resolve, reject) => {
      let data = {
          "id":id,
          "nom":nom,
          "description": description
      }
      this.http.put(this.authService.getBASE_URL() + 'protocole',data).subscribe(res => {
        this.getService.getAllProtocole();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  //update Categorie societe
  UpdateCategorieSociete(id:String,description:String){
    return new Promise((resolve, reject) => {
      let data = {
          "id":id,
          "description": description
      }
      this.http.put(this.authService.getBASE_URL() + 'categorieSociete',data).subscribe(res => {
        this.getService.getCategorieSociete();
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
}

