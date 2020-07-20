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

  constructor(private auth: AuthService,private router:Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(form:NgForm) {
    this.messageErreur='';
    this.auth.login(form.value.nom,form.value.mdp).then(res => {
      console.log(res);
      form.reset();
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.messageErreur=err.error.message;
    });
  }

}
