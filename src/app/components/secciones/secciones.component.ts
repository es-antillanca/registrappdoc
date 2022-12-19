import { Component, Input, OnInit, Output } from '@angular/core';
import { Seccion } from 'src/app/models/models';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent implements OnInit {

  @Input() secciones!: Seccion[];


  constructor() { }

  ngOnInit() { }

}
