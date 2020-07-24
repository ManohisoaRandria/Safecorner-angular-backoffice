import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../../../../services/transferData.service';
import { InsertService } from '../../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prestation } from '../../../../modele/prestation';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../../components/dialog-confirm-update/dialog-confirm-update.component';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modify-prestation',
  templateUrl: './modify-prestation.component.html',
  styleUrls: ['./modify-prestation.component.css']
})
export class ModifyPrestationComponent implements OnInit {
  private prestation:Prestation;
  erreur: string = "";
  success: string = "";
  loading:boolean = false;
  nom:string;
  prix:number;
  description:string;
  constructor(private transData:TransferDataService,
              private router:Router,
              private insertService:InsertService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.prestation = this.transData.getData();
    if(this.prestation == null){
      this.router.navigate(['/societe-desinfection']);
    }else{
      this.nom = this.prestation.nom;
      this.description = this.prestation.description;
      this.prix = this.prestation.prix;
    }
    console.log(this.prestation);
  }

 
  //INSERTION PRESTATION
  onUpdatePrestation(form:NgForm) {
    // dialog pour confirmer l'update
    var dialogConfirmUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
      width:"300px",
      data:{
        titre:"Confirm UPDATE",
        contenu:"Are you sure you want to change the service "+this.prestation.nom
      }
    });

    dialogConfirmUpdate.afterClosed().subscribe(result=>{
      if(result){
        this.loading = true;
        this.insertService.UpdatePrestation(this.prestation.id,form.value.nom,
          form.value.prix,
          this.prestation.idSocieteDesinfection,form.value.description).then((res: any) => {
            this.erreur = "";
            this.success = res['message'];
            this.loading = false;
          }).catch((error) => {
            this.success = "";
            console.log(error);
            this.erreur = error['error']['message'];
            this.loading = false;
          });
    } 
    });
  }
}
