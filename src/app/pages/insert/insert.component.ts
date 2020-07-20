import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InsertService } from '../../services/insert.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
//element Insert Categorie Societe
messageErreurInsertCategorieSociete:string = "";
messageSuccessInsertCategorieSociete:string = "";
descriptionInsertCategorieSociete:string = "";
// element Insert Categorie Protocole
messageErreurInsertCategorieProtocole:string = "";
messageSuccessInsertCategorieProtocole:string = "";
descriptionInsertCategorieProtocole:string = "";
// element Insert Protocole
messageErreurInsertProtocole:string = "";
messageSuccessInsertProtocole:string = "";
nomProtocole:string = "";
descriptionInsertProtocole:string = "";

//animation bloc insert societe
animationClass:any = [
  {
    id:"categorieSociete",
    iconActive:"ni ni-bold-down icon_activation_insert",
    blocActive:"bloc_form_insert bloc_form_insert_non_active_initial"
  },
  {
    id:"categorieProtocole",
    iconActive:"ni ni-bold-down icon_activation_insert",
    blocActive:"bloc_form_insert bloc_form_insert_non_active_initial"
  },
  {
    id:"Protocole",
    iconActive:"ni ni-bold-down icon_activation_insert",
    blocActive:"bloc_form_insert bloc_form_insert_non_active_initial"
  }
];
  constructor(private http:HttpClient,
              private insertService:InsertService) { }

  ngOnInit(): void {
  }

  //fomction animation des bloc
  onAnimeBlocInsert(){
    const target = event.target as HTMLInputElement;
    this.animationClass.forEach(anime => {
      if(anime.id == target.id){
        if((anime.blocActive == "bloc_form_insert bloc_form_insert_non_active_initial")||anime.blocActive == "bloc_form_insert bloc_form_insert_non_active"){
          anime.blocActive = "bloc_form_insert bloc_form_insert_active";
          anime.iconActive = "ni ni-bold-up icon_activation_insert";
        }else{
          anime.blocActive = "bloc_form_insert bloc_form_insert_non_active";
          anime.iconActive = "ni ni-bold-down icon_activation_insert";
        }
      }
    });
  }

  //insertion categorie societe
  onInsertCategorieSociete(){
    this.insertService.CategorieSociete(this.descriptionInsertCategorieSociete).then((res:any)=>{
        this.messageErreurInsertCategorieSociete = "";
        this.messageSuccessInsertCategorieSociete = res['message'];
      }).catch((error)=>{
        this.messageSuccessInsertCategorieSociete = "";
        this.messageErreurInsertCategorieSociete = error['error']['message'];
      }
    );
  }

  //insertion categorie protocole
  onInsertCategorieProtocole(){
    this.insertService.CategorieProtocole(this.descriptionInsertCategorieProtocole).then((res:any)=>{
        this.messageErreurInsertCategorieProtocole = "";
        this.messageSuccessInsertCategorieProtocole = res['message'];
      }).catch((error)=>{
        this.messageSuccessInsertCategorieProtocole = "";
        this.messageErreurInsertCategorieProtocole = error['error']['message'];
      }
    );
  }

  //insertion protocole
  onInsertProtocole(){
    this.insertService.Protocole(this.nomProtocole,this.descriptionInsertProtocole).then((res:any)=>{
        this.messageErreurInsertProtocole = "";
        this.messageSuccessInsertProtocole = res['message'];
      }).catch((error)=>{
        this.messageSuccessInsertProtocole = "";
        this.messageErreurInsertProtocole = error['error']['message'];
      }
    );
  }
}
