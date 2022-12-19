import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  isLog = false;
  uid: any = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  async canActivate() {
    const user = await this.auth.stateUser().subscribe(
      res => {
        if (res?.uid != null) {
          console.log(res.uid)
          return false
        } else {
          console.log(res)
          return true
        }

      }
    )
    if (user != null) {
      console.log(user)
      return true
    } return false
  }
}