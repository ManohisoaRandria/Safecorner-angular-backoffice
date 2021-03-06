import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  messageErreur:string='';
loading:boolean=false;
  constructor(private auth: AuthService,private router:Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(form:NgForm) {
    this.messageErreur='';
    this.loading=true;
    this.auth.login(form.value.nom,form.value.mdp).then(res => {
      form.reset();
      this.loading=false;
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.loading=false;
      if(err.error.message=="not allowed to connect, please logout on another sessions"){
        this.messageErreur="Connection à 5 device atteint, veuillez vous connecter des autres sessions pour continuer";
      } else{
        this.messageErreur="Invalid Username or Password."
      }
    });
  }

}
