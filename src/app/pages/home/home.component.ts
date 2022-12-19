import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profesor, Seccion, Usuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isLog: boolean = false;
  uid = '';

  userLogged!: Usuario;
  secciones: Seccion[] = [];
  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,

    },
  }


  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private router: Router
  ) {
    this.auth.stateUser().subscribe(
      res => {
        if (res) {
          this.isLog = true;
          this.uid = res.uid;
          console.log(this.isLog)
        }
      }
    )

  }

  ngOnInit() {
    const uid: any = localStorage.getItem('uid')
    console.log(uid)
    const path = 'Usuarios/'
    this.firestore.getDoc<Profesor>(path, uid).subscribe(
      res => {
        if (res) {
          this.userLogged = res
        }
      }
    )
    this.getSeccionesProfesor(uid)
  }


  async logout() {
    localStorage.removeItem('uid')
    this.interaction.presentToast('Sesión finalizada');
    this.router.navigateByUrl('/login', { replaceUrl: true })
    const user = await this.auth.stateUser().subscribe(res => {
      if (res?.uid) {
        return true
      } else {
        return false
      }

    })
    user.unsubscribe();

    this.auth.logout();
  }

  async getSeccionesProfesor(uid: string) {
    await this.interaction.showLoading('Verificando datos...')
    const path = 'Secciones/'
    this.firestore.getCollectionQuery<Seccion>(path, 'idProfesor', '==', uid).subscribe(
      res => {
        this.secciones = res;
        this.interaction.closeLoading();
      }
    )
  }

  goSeccion(id: any) {
    this.router.navigate(['seccion/', id])
  }


}
