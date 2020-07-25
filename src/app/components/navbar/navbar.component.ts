import { Subscription } from 'rxjs';
import { GetService } from './../../services/get.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  public focus;
  public listTitles: any[];
  public location: Location;
  recherche:boolean=false;
  userName:string='';
  subs:Subscription;
  constructor(
    private auth: AuthService,
    location: Location,
    private element: ElementRef,
    private router: Router,
    private api:ApiService,
    private get:GetService) {
    this.location = location;
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.subs=this.api.userNameSubject.subscribe((res:string)=>{
        this.userName=res;
    })
  }

  logout(){
    this.auth.logout();
  }
  onSearch(form:NgForm){
    this.api.setLoadingAllSociete(true);
    this.get.rechercheSociete(form.value.querySearch).then(res=>{
      this.api.setLoadingAllSociete(false);
    }).catch(err=>{
      this.api.setLoadingAllSociete(false);
    })
  }
  submit(form:NgForm){form.ngSubmit.emit();}
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
