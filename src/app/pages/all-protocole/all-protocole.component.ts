import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';

@Component({
  selector: 'app-all-protocole',
  templateUrl: './all-protocole.component.html',
  styleUrls: ['./all-protocole.component.css']
})
export class AllProtocoleComponent implements OnInit {
  // element Insert Protocole
  messageErreurInsertProtocole:string = "";
  messageSuccessInsertProtocole:string = "";
  nomProtocole:string = "";
  descriptionInsertProtocole:string = "";
  loading:boolean = false;
  //animation bloc insert societe
  classIconActiveProto: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocProto: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService:InsertService) { }

  ngOnInit(): void {
  }

  onAnimeBlocInsertProto() {
    if (this.classBlocProto == "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial" ||
      this.classBlocProto == "bloc_form_insert_societe bloc_form_insert_societe_non_active") {
      this.classBlocProto = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActiveProto = "ni ni-bold-up icon_activation_insert_societe";
    } else {
      this.classBlocProto = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActiveProto = "ni ni-bold-down icon_activation_insert_societe";
    }
  }

  //insertion protocole
  onInsertProtocole(){
    this.loading = true;
    this.insertService.Protocole(this.nomProtocole,this.descriptionInsertProtocole).then((res:any)=>{
        this.messageErreurInsertProtocole = "";
        this.messageSuccessInsertProtocole = res['message'];
        this.loading = false;
      }).catch((error)=>{
        this.messageSuccessInsertProtocole = "";
        this.messageErreurInsertProtocole = error['error']['message'];
        this.loading = false;
      }
    );
  }
}
