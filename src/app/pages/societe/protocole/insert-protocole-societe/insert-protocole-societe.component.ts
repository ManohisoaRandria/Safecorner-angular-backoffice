import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insert-protocole-societe',
  templateUrl: './insert-protocole-societe.component.html',
  styleUrls: ['./insert-protocole-societe.component.css']
})
export class InsertProtocoleSocieteComponent implements OnInit {
id:string="";
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
  }
  goToUpdate(){
    this.router.navigate(['/modif-protocole-societe',this.id]);
  }

}
