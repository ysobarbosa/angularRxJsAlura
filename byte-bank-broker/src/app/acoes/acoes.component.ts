import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acoes} from './modelo/acoes'
import {AcoesService} from './acoes.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoes$ = this.acoesService.getAcoes(); // não fez requisição a api
  
  // acoes: Acoes;
  // private subscription: Subscription;

  constructor(private acoesService: AcoesService) {}

  // ngOnInit() {
  //   this.subscription = this.acoesService.getAcoes().subscribe((acoes) => {
  //     this.acoes = acoes;
  //   })
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
