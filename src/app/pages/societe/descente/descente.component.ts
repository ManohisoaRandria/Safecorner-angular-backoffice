import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-descente',
  templateUrl: './descente.component.html',
  styleUrls: ['./descente.component.css']
})
export class DescenteComponent implements OnInit {
  private idSociete:string = "";
  nombreApplique:number = 0;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idSociete = this.route.snapshot.params['id'];
  }

  onApplique($event){
    if(event.target.checked){
      this.nombreApplique++;
    }else{
      if(this.nombreApplique > 0){
        this.nombreApplique--;
      }
    }
  }
}
