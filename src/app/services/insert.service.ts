import { Injectable, OnInit} from '@angular/core'; 
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class InsertService {

    constructor(private authService:AuthService,
                private http:HttpClient) {
    }

    //insert categorie societe
    CategorieSociete(descritpion:String){
        return new Promise((resolve, reject) => {
            let data = {
              "description": descritpion,
            }
            this.http.post(this.authService.getBASE_URL() + 'categorieSociete', data).subscribe(res => {
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }

    //insert categorie protocole
    CategorieProtocole(descritpion:String){
        return new Promise((resolve, reject) => {
            let data = {
              "description": descritpion,
            }
            this.http.post(this.authService.getBASE_URL() + 'categorieProtocole', data).subscribe(res => {
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
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }

    //insert protocole
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
              resolve(res);
            }, error => {
              reject(error);
            })
        });
    }
}