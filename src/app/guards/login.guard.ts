import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private interactions: InteractionService,
    private router: Router
  ) {
  }

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getUid()
      .then(
        res => {
          if (res === 'JmodEyYHNFU9ECWn1LvT7X22Ztp2') {
            this.interactions.presentToast('Inicio correcto. Bienvenido Profesor.');
            //console.log(res)

            return true
          } else {
            //console.log(res)
            this.interactions.presentToast('Lo sentimos. No cuentas con los permisos para acceder.');
            this.router.navigate(['/login'])
            return false
          }
        }
      )
      .catch(error => {
        console.error(error)
        return false
      })
  }
}
