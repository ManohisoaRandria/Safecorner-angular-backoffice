import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private api: ApiService,private spinner: NgxSpinnerService, private auth: AuthService) { }

  ngOnInit() {
    let tok = this.auth.getAccTok();
    let decode = jwt_decode(tok);
    this.api.setUserName(decode['data'].nom);
  }

}
