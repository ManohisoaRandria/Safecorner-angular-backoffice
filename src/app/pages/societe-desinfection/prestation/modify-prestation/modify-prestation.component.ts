import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../../../../services/transferData.service';
import { InsertService } from '../../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prestation } from '../../../../modele/prestation';

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
              private insertService:InsertService) { }

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
    }
    );
  }
}
