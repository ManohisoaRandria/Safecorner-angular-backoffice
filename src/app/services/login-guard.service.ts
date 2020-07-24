import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this.auth.isAuth())this.router.navigate(['/dashboard'])
    else return this.auth.isAuth();
  }
}
