import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/models';
import { resolve } from 'dns';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  private rol: string = '';
  private userLog!: Usuario;
  private users: Usuario[] = [];

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private router: Router,
  ) {

  }

  async canActivate(
  ): Promise<boolean> {
    return true

  }
}
