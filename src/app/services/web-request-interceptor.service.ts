import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptorService implements HttpInterceptor {
  private HAH = 'keyBackOfficeRFTenc-api';
  constructor(private auth: AuthService) { }
  test:Boolean=false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tabTest = req.url.split('' + this.auth.getBASE_URL());
    if (tabTest.length == 2) {
      console.log(req.url.split('' + this.auth.getBASE_URL()));

      if (tabTest[1] != 'user/login') {
        //refa requette tsotra de tokony tsisy refreshtoken fa access token ihany
        if (tabTest[1] != 'user/logout') {
          req = this.setAccessHeader(req);
          return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 401 && !this.test) {
                //refresh token
                return this.refreshAccessToken().pipe(
                  switchMap(()=>{
                   req = this.setAccessHeader(req);
                    return next.handle(req);
                  }),
                  catchError(()=>{
                    this.auth.logout();
                    return empty();
                  })
                )
              }
              this.test=false;
              return throwError(err);
            })
          );
        } else {
          //rehefa logout sy refreshtoken ihany no tokony hisy header refresh token
          //ary tsy apina access-token tsony
          this.test=false;
          req = this.setRefreshHeader(req);
          return next.handle(req);
        }
      } else {
        //refa login de tokoiny tsy mandefa anle header misy token
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        })
        this.test=false;
        return next.handle(req);
      }
    } else {
      //raha tsis inin fa url de base
      return next.handle(req);
    }
  }
  refreshAccessToken(){
    this.test=true;
    return this.auth.getNewAccessToken().pipe(
      tap(()=>{
        this.test=false;
        console.log('token refreshed');
      })
    )
  }
  setAccessHeader(req: HttpRequest<any>) {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
        .set(this.auth.AT, this.auth.getAccTok())
    })
    return req;
  }
  setRefreshHeader(req: HttpRequest<any>) {
    let reft = this.auth.decRefTok(this.auth.getRefTok());
    let tab = reft.split('LngamRL');
    console.log(tab);
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
        .set(tab[0], tab[1])
    })
    return req;
  }



}
