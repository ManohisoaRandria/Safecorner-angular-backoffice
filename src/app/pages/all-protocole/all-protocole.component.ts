import { Component, OnInit } from '@angular/core';
import { InsertService } from '../../services/insert.service';
import { Protocole } from '../../modele/protocole';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { GetService } from '../../services/get.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAfficheComponent }  from '../../components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmDeleteComponent } from '../../components/dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-all-protocole',
  templateUrl: './all-protocole.component.html',
  styleUrls: ['./all-protocole.component.css']
})
export class AllProtocoleComponent implements OnInit {
  protocoles: Protocole[] = [];
  protocoleSubscription: Subscription;
  // element Insert Protocole
  messageErreurInsertProtocole:string = "";
  messageSuccessInsertProtocole:string = "";
  nomProtocole:string = "";
  descriptionInsertProtocole:string = "";
  loading:boolean = false;
  //animation bloc insert societe
  classIconActiveProto: string = "ni ni-bold-down icon_activation_insert_societe";
  classBlocProto: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService:InsertService,
              private api:ApiService,
              private getService:GetService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.protocoleSubscription = this.api.protocoleSubject  .subscribe(
      (proto: Protocole[]) => {
        this.protocoles = proto;
      }
    );
    if (!this.api.initProtocole) {
      //maka anle protocole rehetra am volou
      this.getService.getAllProtocole().then((res) => {
        console.log("protocole ok");
        this.api.initProtocole = true;
      }).catch(err => {
        console.log(err);
      });

    }
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

  // affciher la desription de la protocole
  onAfficheDescription(event){
    const target = event.target as HTMLInputElement;
    var protocole:any = null;
    protocole = this.protocoles.find(element => element.id == target.id);
    this.dialog.open(DialogAfficheComponent, {
      width: '500px',
      data:{
        titre:"Descritpion:",
        contenu:protocole.description
      }
    });
  }

  //delete societe
  onDeleteSociete(id: String) {
    var protocole = this.protocoles.find(element => element.id == id);
    //confirmation par dialog
    var dialogConfirmDelete = this.dialog.open(DialogConfirmDeleteComponent,{
      width:"500px",
      data:{
        titre:"Confrim DELETE",
        contenu:'Are you sure to delete the protocole '+protocole.nom,
        valeurIn:protocole.nom
      }
    });
    //rehefa mclose le dialog
    dialogConfirmDelete.afterClosed().subscribe(result => {
      if(result != ''){
        if(protocole.nom == result){
          // this.erreur = "";
          // this.success = "";
          this.insertService.deleteProtocole(id).then(res => {
          }).catch(err => {
            // this.erreur = err;
            this.dialog.open(DialogAfficheComponent,{
              width:"300px",
              data:{
                titre:"Error",
                contenu:err['error']['message']
              }
            });
          });
        }else{
          // ra diso le nsoranany
          this.dialog.open(DialogAfficheComponent,{
            width:"200px",
            data:{
              titre:"Error",
              contenu:"you must write the code indicated"
            }
          }
          );
        }
      }
    });
  }
}
