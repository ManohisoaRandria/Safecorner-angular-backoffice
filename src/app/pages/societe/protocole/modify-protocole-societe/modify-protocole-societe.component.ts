import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-protocole-societe',
  templateUrl: './modify-protocole-societe.component.html',
  styleUrls: ['./modify-protocole-societe.component.css']
})
export class ModifyProtocoleSocieteComponent implements OnInit {

  id:string="";
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
  }
  goToInsert(){
    this.router.navigate(['/add-protocole-societe',this.id]);
  }

}
