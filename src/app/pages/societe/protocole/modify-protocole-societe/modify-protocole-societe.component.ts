import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Societe } from '../../../../modele/societe';
import { ApiService } from 'src/app/services/api.service';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-modify-protocole-societe',
  templateUrl: './modify-protocole-societe.component.html',
  styleUrls: ['./modify-protocole-societe.component.css']
})
export class ModifyProtocoleSocieteComponent implements OnInit {

  id: string = "";
  societe: Societe;
  constructor(private router: Router,
    private api: ApiService,
    private insertService: InsertService,
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

  }
  goToInsert() {
    this.router.navigate(['/add-protocole-societe', this.id]);
  }

}
