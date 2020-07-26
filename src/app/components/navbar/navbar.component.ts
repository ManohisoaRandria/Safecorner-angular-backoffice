import { Subscription } from 'rxjs';
import { GetService } from './../../services/get.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmLogoutComponent } from '../dialog-confirm-logout/dialog-confirm-logout.component';
import { NgxSpinnerService } from "ngx-spinner";

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
    private dialog:MatDialog,
    private get:GetService,private spinner: NgxSpinnerService) {
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
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmLogoutComponent,{
      width:"300px",
      data:{
        titre:"Confirm Logout",
        contenu:"Are you sure you want to logout "+this.userName
      }
    });
    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.spinner.show();
        this.auth.logout().then(res=>{
          this.spinner.hide();
          this.router.navigate(['/login']);
        }).catch(err=>{
          this.spinner.hide();
        });
      }
    });

  }
  onSearch(form:NgForm){
    if(this.getTitle()=='Societe'){
      this.api.setLoadingAllSociete(true);
      this.get.rechercheSociete(form.value.querySearch).then(res=>{
        this.api.setLoadingAllSociete(false);
      }).catch(err=>{
        this.api.setLoadingAllSociete(false);
      })
    }

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
