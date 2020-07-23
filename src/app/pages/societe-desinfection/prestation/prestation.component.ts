import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { SocieteDesinfection } from '../../../modele/societe'; 
import { ApiService } from 'src/app/services/api.service';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  private id:string="";
  erreur: string = "";
  success: string = "";
  loadingInsertPrestation:boolean = false;
  loadingGetPrestation:boolean = true;

  societeDesinfection:SocieteDesinfection;
  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBloc: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService: InsertService,
              private api:ApiService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.societeDesinfectionSubject.subscribe((societe: SocieteDesinfection[])=>{
      this.societeDesinfection = societe.find(element => element.id == this.id);
      if(this.societeDesinfection == undefined){
        this.router.navigate(['societe-desinfection']);
      }
    });
  }

  onAnimeBlocInsert() {
    if (this.classBloc == "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial" ||
      this.classBloc == "bloc_form_insert_societe bloc_form_insert_societe_non_active") {
      this.classBloc = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActive = "ni ni-bold-up icon_activation_insert_societe";
    } else {
      this.classBloc = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActive = "ni ni-bold-down icon_activation_insert_societe";
    }
  }

  onInsertPrestation(form: NgForm) {
    this.loadingInsertPrestation = true;
    this.insertService.Prestation(this.id,
      form.value.prix,
      form.value.descritpion).then((res: any) => {
        this.erreur = "";
        this.success = res['message'];
        form.reset();
        this.loadingInsertPrestation = false;
      }).catch((error) => {
        this.success = "";
        console.log(error);
        this.erreur = error['error']['message'];
      }
      );
  }

}
