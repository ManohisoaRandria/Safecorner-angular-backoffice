import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  erreur: string = "";
  success: string = "";
  loading:boolean = true;

  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBloc: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor() { }

  ngOnInit(): void {
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
    console.log(form.value);
  }

}
