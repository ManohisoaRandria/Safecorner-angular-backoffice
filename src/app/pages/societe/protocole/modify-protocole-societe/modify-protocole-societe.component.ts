import { NgForm, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Societe } from '../../../../modele/societe';
import { ApiService } from 'src/app/services/api.service';
import { InsertService } from 'src/app/services/insert.service';
import { Protocole } from 'src/app/modele/protocole';

@Component({
  selector: 'app-modify-protocole-societe',
  templateUrl: './modify-protocole-societe.component.html',
  styleUrls: ['./modify-protocole-societe.component.css']
})
export class ModifyProtocoleSocieteComponent implements OnInit {

  id: string = "";
  societe: Societe;
  loading:boolean=false;
  protocolesPerso:Protocole[]=[];
  protocolesClient:Protocole[]=[];
  protocolePersoChoisi:Protocole[]=[];
  protocoleClientChoisi:Protocole[]=[];
delete:string='Delete';
update:string='Update';
  constructor(private router: Router,
    private api: ApiService,
    private insertService: InsertService,
    private getService:GetService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.api.societeSubject.subscribe((societe: Societe[]) => {
      this.societe = societe.find(element => element.id == this.id);
      if (this.societe == undefined) {
        this.router.navigate(['societe']);
      }
    });

    //maka anle protocole rehetra amnio societe io
    this.loadData();

  }
  loadData(){
    this.loading=true;
    this.getService.getProtocolesBySociete(this.id).then(res=>{
      this.protocolesPerso=res['perso'];
      this.protocolesClient=res['client'];
      this.loading=false;

    }).catch(err=>{
      this.loading=false;
      console.log(err);
    })
  }
  onAddCheckPerso($event,fperso:NgForm){
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.protocolePersoChoisi.push(this.protocolesPerso.find(element=> element.id == target.value));
      //manampy validators requred dynamiquement
      fperso.controls[target.value].setValidators(Validators.required);
      //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
      fperso.controls[target.value].updateValueAndValidity();
      console.log(this.protocolePersoChoisi);
    }else{
      var index = this.protocolePersoChoisi.indexOf(this.protocolePersoChoisi.find(element=> element.id == target.value));
        this.protocolePersoChoisi.splice(index, 1);
        //manala validators requred dynamiquement
        fperso.controls[target.value].clearValidators();
        //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
        fperso.controls[target.value].updateValueAndValidity();
    }
  }
  onAddCheckClient($event,fclient:NgForm){
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.protocoleClientChoisi.push(this.protocolesClient.find(element=> element.id == target.value));
      //manampy validators requred dynamiquement
      fclient.controls[target.value].setValidators(Validators.required);
      //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
      fclient.controls[target.value].updateValueAndValidity();
      console.log(this.protocoleClientChoisi);
    }else{
      var index = this.protocoleClientChoisi.indexOf(this.protocoleClientChoisi.find(element=> element.id == target.value));
        this.protocoleClientChoisi.splice(index, 1);
        //manala validators requred dynamiquement
        fclient.controls[target.value].clearValidators();
        //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
        fclient.controls[target.value].updateValueAndValidity();
    }
  }

  onModifPerso(fperso:NgForm){
    console.log(fperso.value);
    // var protoChoisi = [];
    // if(this.protocolePersoChoisi.length >= 1){
    //   this.protocolePersoChoisi.forEach(element => {
    //     protoChoisi.push({
    //       "idProtocole":element.id,
    //       "duree":+fperso.value[element.id]
    //     });
    //   });
    //   this.loading=true;
    //   this.insertService.AddProtocoleSociete(this.societe.id,form.value.categorie,
    //     protoChoisi).then((res: any) => {

    //       fperso.reset();

    //       this.loading=false;
    //     }).catch((error) => {
    //       this.success = "";
    //       this.erreur = error['error']['message'];
    //       this.loading=false;
    //     }
    //   );
    // }
  }
  onModifClient(fclient:NgForm){

  }
  goToInsert() {
    this.router.navigate(['/add-protocole-societe', this.id]);
  }

}
