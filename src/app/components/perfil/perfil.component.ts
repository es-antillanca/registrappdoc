import { Component, Input, OnInit } from '@angular/core';
import { Profesor, Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @Input() public userLogged!: Usuario;

  constructor() { }

  ngOnInit() { }

}
