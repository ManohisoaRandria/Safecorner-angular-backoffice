import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import * as jwt_decode from "jwt-decode";
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: String = 'https://safe-corner-api.herokuapp.com/api/v1/';
  private HAH = 'keyBackOfficeRFTenc-api';
  AT = 'sc-access-token';
  private RF = 'sc-refresh-token';
  constructor(private router: Router, private http: HttpClient) { }
  login(nom: String, mdp: String) {
    return new Promise((resolve, reject) => {
      let data = {
        "nom": nom,
        "mdp": mdp
      }
      this.http.post(this.BASE_URL + 'user/login', data).subscribe(res => {
        let refreshToken = res['data'][this.RF];
        let accessToken = res['data'][this.AT];
        this.setAccTok(accessToken);
        this.setRefTok(this.encRefTok(refreshToken));
        resolve(jwt_decode(accessToken));
      }, error => {
        reject(error);
      })
    });
  }
  //test
  recherche() {
    return new Promise((resolve, reject) => {

      this.http.get(this.BASE_URL + 'search?cat=CS0001').subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }
  isAuth(){
    if(!localStorage.getItem('ngam') && !localStorage.getItem('ngam')){
      return false;
    }
    return true;
  }
  logout() {
    this.http.post(this.BASE_URL + 'user/logout', {}).subscribe(res => {
      localStorage.removeItem('ngam');
      localStorage.removeItem('ngamAt');
      //redirection makany am login
      console.log("logged out");
      this.router.navigate(['/login']);
    },
      err => {
        console.log(err);
      }
    )
  }
  getNewAccessToken(){
    let reft = this.decRefTok(this.getRefTok());
    let tab = reft.split('LngamRL');
    return this.http.get(this.BASE_URL + 'user/acces-token',{
      headers:{
        'sc-refresh-token':tab[1],
      }
    }).pipe(
      tap((res)=>{
        this.setAccTok(res['data']['token']);
      })
    );
  }
  encRefTok(reftok: string): string {
    return CryptoJS.AES.encrypt(this.RF + 'LngamRL' + reftok, this.HAH).toString();
  }
  decRefTok(enc: string): string {
    return CryptoJS.AES.decrypt(enc, this.HAH).toString(CryptoJS.enc.Utf8);
  }
  setRefTok(reftok: string) {
    localStorage.setItem('ngam', reftok);
  }
  getRefTok(): string {
    return localStorage.getItem('ngam');
  }
  setAccTok(acctok: string) {
    localStorage.setItem('ngamAt', acctok);
  }
  getAccTok(): string {
    return localStorage.getItem('ngamAt');
  }

  //get set Base_URL
  public getBASE_URL(){
    return this.BASE_URL;
  }

  public setBASE_URL(valeur:String){
    this.BASE_URL = valeur;
  }
}
