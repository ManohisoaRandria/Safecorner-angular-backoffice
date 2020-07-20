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
    var info = {
      description:this.descriptionInsertCategorieSociete
    }
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'sc-acces-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1OTQ0NDkzMTIsImp0aSI6IllXTmpaWE56TFRJd01qQXRNRGN0TVRFZ01EZzZNelk2TVRJPSIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvc2FmZWNvcm5lIiwibmJmIjoxNTk0NDQ5MzEyLCJleHAiOjE1OTQ0NDk2MTIsImRhdGEiOnsiaWQiOiJVMDAwMiIsIm5vbSI6IlRhaGlhbmEifX0.9TQlqyDe9NYRfpD_4noKTA8gizAkBjWsVmP15mRFd0gezZA6vL8EiOhbv6w3n9rGQYBmG-CegbSSM_ZZZdpX5Q',
      'sc-refresh-token': 'Mkh5L3UUoVhuMJPyZ8Z4Smb2nVul0QOg5LBUCgPXU5XDKs31vNkHkWCJhumYygbwT+dsbM+k68SaGXuYalvokMXMUFEP0dmwKaa6bfpN5h6/0dXOVN7Wsy/Kt75KOFy1meXmPXWWydfRp6i+bl8YrPY8y8gvuq4kG3645fs26xNO5q/QCb1hTqSaT+25NYUXPxYX3ZYmaZbXH90sVtGR5aPYi495QYQXkKX/cnWYDCFPoVYuApNRX2dEylXxDMGaIlFQ39Vtog1NpqWvj11gp7ePoy0PZR5gXgGF4PO8IgSQ3Ycwf7UxIoggxbZeeXXEqppuO90odPzIzmzWnGV8AQ0w8GHnkkBAgiGv5ig2fR1gVBHWCs9GnRzMK9yT9Do0OcV1xibr9G1Nm5DUWqYLKhdjlVB5lmM1jioCeSnPX0LqbqrnxqvWWWwiMqEyZLx/GiIljL6R/dd5n2583rpUIeTCTg==',
    });
    const requestOptions = {
      headers: header
    };
    this.http.post('http://localhost:80/safecorner-api/api/v1/categorieSociete',JSON.stringify(info),requestOptions).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
