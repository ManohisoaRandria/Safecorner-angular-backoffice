import { NgForm, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Societe } from '../../../../modele/societe';
import { ApiService } from 'src/app/services/api.service';
import { InsertService } from 'src/app/services/insert.service';
import { Protocole } from 'src/app/modele/protocole';
import { CategorieProtocole } from 'src/app/modele/categorie-protocole';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmUpdateComponent } from '../../../../components/dialog-confirm-update/dialog-confirm-update.component';

@Component({
  selector: 'app-modify-protocole-societe',
  templateUrl: './modify-protocole-societe.component.html',
  styleUrls: ['./modify-protocole-societe.component.css']
})
export class ModifyProtocoleSocieteComponent implements OnInit,OnDestroy {

  id: string = "";
  categProt:string="";
  erreur = "";
success = "";
  societe: Societe;
  updatePerso: boolean = false;
  deletePerso: boolean = false;
  loading: boolean = false;
  protocolesPerso: Protocole[] = [];
  protocolePersoChoisi: Protocole[] = [];
  CategorieProtocole: CategorieProtocole[] = [];
  CategorieProtocoleSubscription: Subscription;
  subs: Subscription;

  constructor(private router: Router,
    private api: ApiService,
    private insertService: InsertService,
    private getService: GetService,
    private route: ActivatedRoute,
    private dialog:MatDialog) { }
  ngOnDestroy(): void {
    this.CategorieProtocoleSubscription.unsubscribe();
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subs=this.api.societeSubject.subscribe((societe: Societe[]) => {
      this.societe = societe.find(element => element.id == this.id);
      if (this.societe == undefined) {
        this.router.navigate(['societe']);
      }
    });
    this.CategorieProtocoleSubscription = this.api.CategorieProtocoleSubject.subscribe(
      (catep: CategorieProtocole[]) => {
        this.CategorieProtocole = catep;
        // console.log(this.CategorieProtocole);
      }
    );

  }
   //onChangeProtocole
   onChangeProtocole(event){
    const target = event.target as HTMLInputElement;
    let tab=target.value.split(' ');
    this.categProt=tab[1];
    this.setProtocole(this.societe.id,tab[0]);
  }
   //set Protocoles
   setProtocole(idSociete,typeCategorieSociete){
    this.loading=true;
    this.getService.getProtocolesBySocieteByCategorieProtocole(idSociete,typeCategorieSociete).then((res:Protocole[])=>{
      this.protocolesPerso = res;
      this.loading=false;
    }).catch(err=>{
      this.loading=false;
      this.erreur=err;
      this.router.navigate(['societe']);
    });
  }
  onAddCheckPerso($event, fperso: NgForm) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.protocolePersoChoisi.push(this.protocolesPerso.find(element => element.id == target.value));
      //manampy validators requred dynamiquement
      fperso.controls[target.value].setValidators(Validators.required);
      //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
      fperso.controls[target.value].updateValueAndValidity();
      // console.log(this.protocolePersoChoisi);
    } else {
      var index = this.protocolePersoChoisi.indexOf(this.protocolePersoChoisi.find(element => element.id == target.value));
      this.protocolePersoChoisi.splice(index, 1);
      //manala validators requred dynamiquement
      fperso.controls[target.value].clearValidators();
      //tsmaints apina anty raha tsy zany tsy miova le izy refa en execution
      fperso.controls[target.value].updateValueAndValidity();
    }
  }

  onModifPerso(fperso: NgForm) {
    this.resetError();
    if (this.updatePerso) {
      var dialogConfUpdate = this.dialog.open(DialogConfirmUpdateComponent,{
        width:"300px",
        data:{
          titre:"Confirm UPDATE",
          contenu:"Are you sure you want to modify these protocols?"
        }
      });

      dialogConfUpdate.afterClosed().subscribe(result=>{
        if(result){
          this.resetUpdateDelete();
          let protoChoisi = [];
          if (this.protocolePersoChoisi.length >= 1) {
            this.protocolePersoChoisi.forEach(element => {
              protoChoisi.push({
                "idProtocole": element.id,
                "duree": +fperso.value[element.id]
              });
            });
            this.loading = true;
            this.insertService.ModifProtocoleSociete(this.societe.id, protoChoisi,fperso.value.categorie.split(' ')[0]).then((res: any) => {
              fperso.reset();
              this.loading = false;
              this.protocolePersoChoisi = [];
              this.protocolesPerso = [];
              this.success=" update successfull";
            }).catch((error) => {
              this.erreur=error;
              this.loading = false;
            });
          }
        }
      });
    } else if (this.deletePerso) {
      var dialogConfDelete = this.dialog.open(DialogConfirmUpdateComponent,{
        width:"300px",
        data:{
          titre:"Confirm DELETE",
          contenu:"Are you sure you want to delete these protocols?"
        }
      });

      dialogConfDelete.afterClosed().subscribe(result=>{
        if(result){
          this.resetUpdateDelete();
          let protoChoisi = [];
          if (this.protocolePersoChoisi.length >= 1) {
            this.protocolePersoChoisi.forEach(element => {
              protoChoisi.push({
                "idProtocole": element.id,
                "duree": +fperso.value[element.id]
              });
            });
            this.loading = true;
            this.insertService.ModifProtocoleSociete(this.societe.id, protoChoisi,fperso.value.categorie.split(' ')[0],"true").then((res: any) => {
              fperso.reset();
              this.loading = false;
              this.protocolePersoChoisi = [];
              this.protocolesPerso = [];
              this.success=" delete successfull";
              this.erreur = "";
            }).catch((error) => {
              this.erreur=error;
              this.loading = false;
              this.success = "";
            }
            );
          }
        }
      });
    }

  }
  resetUpdateDelete() {
    this.updatePerso = false;
    this.deletePerso = false;
  }
  resetError() {
    this.erreur = '';
    this.success = '';
  }

  updatePersoClick() {
    this.updatePerso = true;
  }
  deletePersoClick() {
    this.deletePerso = true;
  }

  goToInsert() {
    this.router.navigate(['/add-protocole-societe', this.id]);
  }

}
