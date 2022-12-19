import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/models/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public credentials: FormGroup;
  public userLog!: Usuario;

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private formBuilder: FormBuilder
  ) {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]]
    })
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(
      res => {
        if (res) {
          console.log(res)
        }
        else {
          console.log(null)
        }
      }
    )
  }

  async login() {
    let userLog = {
      email: '',
      password: ''
    }
    userLog = this.credentials.getRawValue();
    await this.interaction.showLoading('Verificando datos...')
    const res = await this.auth.login(userLog.email, userLog.password).catch(error => {
      console.log('error')
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario no encontrado');
    });
    if (res) {
      this.interaction.closeLoading();
      const useruid: any = res.user?.uid;
      localStorage.setItem('uid', useruid)
      this.router.navigateByUrl('/home', { replaceUrl: true })
    }
  }

  getUserData(uid: any) {
    const path = 'Usuarios';
    this.firestore.getDoc<Usuario>(path, uid).subscribe(res => {
      if (res) {
        this.userLog = res;
        return this.userLog;
      } else {
        return null;
      }
    })
  }

}
