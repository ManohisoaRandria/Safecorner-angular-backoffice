import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertService } from '../../../services/insert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocieteDesinfection } from '../../../modele/societe';
import { Prestation } from '../../../modele/prestation';
import { ApiService } from 'src/app/services/api.service';
import { GetService } from '../../../services/get.service';
import { TransferDataService } from '../../../services/transferData.service';
import { MatDialog} from '@angular/material/dialog';
import { DialogAfficheComponent } from '../../../components/dialog-affiche/dialog-affiche.component';
import { DialogConfirmDeleteComponent } from '../../../components/dialog-confirm-delete/dialog-confirm-delete.component';
import { ViewportScroller } from '@angular/common';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit,OnDestroy {
  private id: string = "";
  erreur: string = "";
  success: string = "";
  loadingInsertPrestation: boolean = false;
  loadingGetPrestation: boolean = true;

  societeDesinfection: SocieteDesinfection;
  prestations: Prestation[];
  subsD:Subscription;
  //animation bloc insert societe
  classIconActive: string = "ni ni-bold-down icon_activation_insert_societe";
  classBloc: string = "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial";
  constructor(private insertService: InsertService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private getService: GetService,
    private transData: TransferDataService,
    private dialog:MatDialog,
    private scrollElem:ViewportScroller) { }
  ngOnDestroy(): void {
    this.subsD.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subsD=this.api.societeDesinfectionSubject.subscribe((societe: SocieteDesinfection[]) => {
      this.societeDesinfection = societe.find(element => element.id == this.id);
      if (this.societeDesinfection == undefined) {
        this.router.navigate(['societe-desinfection']);
      }
    });
    this.loadingGetPrestation = true;
    this.getService.getPrestations(this.id).then((res: Prestation[]) => {
      this.prestations = res;
      this.loadingGetPrestation = false;
    }).catch((err) => {
    });
  }

  onAnimeBlocInsert() {
    if (this.classBloc == "bloc_form_insert_societe bloc_form_insert_societe_non_active_initial" ||
      this.classBloc == "bloc_form_insert_societe bloc_form_insert_societe_non_active") {
      this.classBloc = "bloc_form_insert_societe bloc_form_insert_societe_active";
      this.classIconActive = "ni ni-bold-up icon_activation_insert_societe";
    } else {
      this.classBloc = "bloc_form_insert_societe bloc_form_insert_societe_non_active";
      this.classIconActive = "ni ni-bold-down icon_activation_insert_societe";
    }
  }

  onInsertPrestation(form: NgForm) {
    this.loadingInsertPrestation = true;
    this.insertService.Prestation(this.id,
      form.value.nom,
      form.value.prix,
      form.value.descritpion).then((res: any) => {
        this.erreur = "";
        this.success = res['message'];
        form.reset();
        //mila averina alaina le prestation rehetra
        this.loadingInsertPrestation = true;
        this.getService.getPrestations(this.id).then((res: Prestation[]) => {
          this.prestations = res;
          this.loadingInsertPrestation = false;
        }).catch((err) => {
        });
        this.loadingInsertPrestation = false;
      }).catch((error) => {
        this.success = "";
        this.erreur = error['error']['message'];
      }
      );
  }

  //makany am update prestation: mila manofoka an le prestation am transferData
  onGoUpdatePrestation(event) {
    const target = event.target as HTMLInputElement;
    var prestation = this.prestations.find(element => element.id == target.id);
    this.transData.setData(prestation);
    this.router.navigate(['/modify-prestation']);
  }
  //delete
  onDelete(id) {
    var prestation = this.prestations.find(element => element.id == id);
    //confirmation par dialog
    var dialogConfirmDelete = this.dialog.open(DialogConfirmDeleteComponent,{
      width:"500px",
      data:{
        titre:"Confrim DELETE",
        contenu:'Are you sure to delete the service '+prestation.nom,
        valeurIn:prestation.nom
      }
    });
    //rehefa mclose le dialog
    dialogConfirmDelete.afterClosed().subscribe(result => {
      if(result != ''){
        if(prestation.nom == result){
          this.loadingGetPrestation = true;
          this.insertService.deletePrestation(id).then(res => {
            this.getService.getPrestations(this.id).then((res2: Prestation[]) => {
              this.prestations = res2;
              this.loadingGetPrestation = false;
              this.erreur = "";
              this.success = "deleted";
            }).catch((err) => {
            });
          }).catch(err => {
            this.success = "";
            this.erreur = err['error']['message'];
          })
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

  // affciher la desription de la prestation
  onAfficheDescription(event){
    const target = event.target as HTMLInputElement;
    var prestation = this.prestations.find(element => element.id == target.id);
    this.dialog.open(DialogAfficheComponent, {
      width: '500px',
      data:{
        titre:"Descritpion:",
        contenu:prestation.description
      }
    });
  }

  //scroll element
  onScrollElement(idelem:string){
    this.scrollElem.scrollToAnchor(idelem);
  }

}
