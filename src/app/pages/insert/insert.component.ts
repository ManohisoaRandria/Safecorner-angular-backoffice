import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
//element Insert Categorie Societe
messageErreurInsertCategorieSociete:string = "";
descriptionInsertCategorieSociete:string = "";
// element Insert Categorie Protocole
messageErreurInsertCategorieProtocole:string = "";
descriptionInsertCategorieProtocole:string = "";
// element Insert Protocole
messageErreurInsertProtocole:string = "";
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
  constructor(private http:HttpClient) { }

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
    var data = {
      "description":this.descriptionInsertCategorieSociete
    }
    this.http.post('http://localhost/safecorner-api/api/v1/categorieSociete',data).subscribe(res => {
      //console.log(res);
    }, error => {
      //console.log(error);
    });
  }
}
