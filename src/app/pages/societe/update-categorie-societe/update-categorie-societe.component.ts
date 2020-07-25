import { Component, OnInit } from '@angular/core';
import { CategorieSociete } from '../../../modele/categorie-societe';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../components/dialog-confirm-update/dialog-confirm-update.component';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';

import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-categorie-societe',
  templateUrl: './update-categorie-societe.component.html',
  styleUrls: ['./update-categorie-societe.component.css']
})
export class UpdateCategorieSocieteComponent implements OnInit {
  private id:string;
  categorieSociete:CategorieSociete;
  erreur: string = "";
  success: string = "";
  loading:boolean = false;
  description:string = "";

  constructor(private insertService:InsertService,
              private dialog:MatDialog,
              private route:ActivatedRoute,
              private api:ApiService,
              private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.api.categorieSocieteSubject.subscribe((CS: CategorieSociete[])=>{
      this.categorieSociete = CS.find(element => element.id == this.id);
      if(this.categorieSociete == undefined){
        this.router.navigate(['/societe']);
      }
      this.description = this.categorieSociete.description
    });
  }

  // UPDATE CATEGORIE SOCIETE
  onUpdateCategorieSociete(form:NgForm){
    // dialog pour confirmer l'update
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
      width:"300px",
      data:{
        titre:"Confirm UPDATE",
        contenu:"Are you sure you want to change the categorie societe "+this.categorieSociete.description
      }
    });

    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.loading = true;
        this.insertService.UpdateCategorieSociete(this.id,
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
