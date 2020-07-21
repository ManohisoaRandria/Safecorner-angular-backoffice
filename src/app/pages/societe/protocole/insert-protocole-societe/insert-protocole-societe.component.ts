import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Protocole } from 'src/app/modele/protocole';
import { Subscription, empty } from 'rxjs';  
import { ApiService} from '../../../../services/api.service';
import { Societe } from '../../../../modele/societe';
import { CategorieProtocole } from '../../../../modele/categorie-protocole';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';
import { InsertService } from '../../../../services/insert.service';
import { GetService } from '../../../../services/get.service';
import { resolve } from 'path';

@Component({
  selector: 'app-insert-protocole-societe',
  templateUrl: './insert-protocole-societe.component.html',
  styleUrls: ['./insert-protocole-societe.component.css']
})
export class InsertProtocoleSocieteComponent implements OnInit {
id:string="";
erreur = "";
success = "";
protocoleChoisi:Protocole[];
societe:Societe;
protocoles: Protocole[] = [];
protocoleSubscription: Subscription;
CategorieProtocole: CategorieProtocole[] = [];
CategorieProtocoleSubscription: Subscription;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private api:ApiService,
              private insertService:InsertService,
              private getService:GetService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.societeSubject.subscribe((societe: Societe[])=>{
      this.societe = societe.find(element => element.id == this.id);  
      if(this.societe == undefined){
        this.router.navigate(['societe']);
      }
    });
    this.protocoleChoisi = [];
    this.CategorieProtocoleSubscription = this.api.CategorieProtocoleSubject.subscribe(
      (catep: CategorieProtocole[]) => {
        this.CategorieProtocole = catep;
        console.log(this.CategorieProtocole);
      }
    );
  }

  goToUpdate(){
    this.router.navigate(['/modif-protocole-societe',this.id]);
  }

  onAddCheck($event){
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.protocoleChoisi.push(this.protocoles.find(element=> element.id == target.value));
      console.log(this.protocoleChoisi);
    }else{
      var index = this.protocoleChoisi.indexOf(this.protocoleChoisi.find(element=> element.id == target.value));
        this.protocoleChoisi.splice(index, 1);
        console.log(this.protocoleChoisi);
    }
  }

  //set Protocoles
  setProtocole(idSociete,idCategorieSociete){
    this.getService.getOutProtocoleSociete(idSociete,idCategorieSociete).then((res:Protocole[])=>{
      this.protocoles = res;
      console.log(this.protocoles);
    }).catch(err=>{
      console.log(err);
      this.router.navigate(['societe']);    
    });
  }

  //onChangeProtocole
  onChangeProtocole(event){
    const target = event.target as HTMLInputElement;
    this.setProtocole(this.societe.id,target.value);
  }

  //add protocole
  onAddProtocole(form: NgForm){
    var protoChoisi = [];
    if(this.protocoleChoisi.length >= 1){
      this.protocoleChoisi.forEach(element => {
        protoChoisi.push({
          "idProtocole":element.id,
          "duree":+form.value[element.id]
        });
      });
      this.insertService.AddProtocoleSociete(this.societe.id,form.value.categorie,
        protoChoisi).then((res: any) => {
          this.erreur = "";
          this.success = res['message'];
          form.reset();
          this.protocoleChoisi = [];
          this.protocoles = [];
        }).catch((error) => {
          this.success = "";
          this.erreur = error['error']['message'];
        }
      );
    }else{ this.erreur = "Choisissez un ou plusieurs protocole(s).";}
  }
}
