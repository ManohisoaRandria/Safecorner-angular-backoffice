import { NgForm } from '@angular/forms';
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
  @ViewChild('fperso') form:NgForm;
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
    this.loading=true;
    //maka anle protocole rehetra amnio societe io
    this.getService.getProtocolesBySociete(this.id).then(res=>{
      console.log(res);
      this.protocolesPerso=res['perso'];
      this.protocolesClient=res['client'];
      this.loading=false;
      console.log(this.protocolesPerso);
      console.log(this.form.controls);
      // this.protocolesPerso.forEach(el=>{
      //   this.form.controls[el.id].setValue(el.duree);
      //   this.form.controls[el.id].updateValueAndValidity();
      // })
      // console.log(this.form);
    }).catch(err=>{
      this.loading=false;
      console.log(err);
    })

  }
  addDefaultValue(fperso:NgForm){
    this.protocolesPerso.forEach(el=>{
      fperso.controls[el.id].setValue(el.duree);
      fperso.controls[el.id].updateValueAndValidity();
    })

  }
  onModifPerso(fperso:NgForm){

  }
  onModifClient(fclient:NgForm){

  }
  goToInsert() {
    this.router.navigate(['/add-protocole-societe', this.id]);
  }

}
