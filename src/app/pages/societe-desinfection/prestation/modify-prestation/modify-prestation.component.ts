import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../../../../services/transferData.service';
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

  nom:string;
  prix:number;
  description:string;
  constructor(private transData:TransferDataService,
              private router:Router) { }

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

  onUpdatePrestation(form:NgForm){
    
  }
}
