import { Component, OnInit } from '@angular/core';
import { Protocole } from '../../../modele/protocole';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../components/dialog-confirm-update/dialog-confirm-update.component';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';

import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-protocole',
  templateUrl: './update-protocole.component.html',
  styleUrls: ['./update-protocole.component.css']
})
export class UpdateProtocoleComponent implements OnInit {
  private id:string;
  protocole:Protocole;
  erreur: string = "";
  success: string = "";
  loading:boolean = false;
  nom:string = "";
  description:string = "";

  constructor(private insertService:InsertService,
              private dialog:MatDialog,
              private route:ActivatedRoute,
              private api:ApiService,
              private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.protocoleSubject.subscribe((proto: Protocole[])=>{
      this.protocole = proto.find(element => element.id == this.id);
      if(this.protocole == undefined){
        this.router.navigate(['/all-protocole']);
      }
      this.nom = this.protocole.nom;
      this.description = this.protocole.description
    });
  }

  // UPDATE PROTOCOLE
  onUpdateProtocole(form: NgForm){
    // dialog pour confirmer l'update
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
      width:"300px",
      data:{
        titre:"Confirm UPDATE",
        contenu:"Are you sure you want to change the protocole "+this.protocole.nom
      }
    });

    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.loading = true;
        this.insertService.UpdateProtocole(this.id,
          form.value.nom,
          form.value.description
          ).then((res: any) => {
            this.success = res['message'];
            this.loading = false;
          }).catch((error) => {
            this.dialog.open(DialogAfficheComponent,{
              width:"300px",
              data:{
                titre:"Error",
                contenu:error['error']['message']
              }
            });
            this.loading = false;
          });
      }
    });
  }

}
