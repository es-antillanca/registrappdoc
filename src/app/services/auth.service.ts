import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Usuario } from '../models/models';

import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public userLog!: Usuario;
  public isLogged = false;

  constructor(
    private auth: AngularFireAuth,
  ) {

  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut()
  }

  stateUser() {
    return this.auth.authState
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null
    }
  }

}
