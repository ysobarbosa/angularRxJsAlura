import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acoes} from './modelo/acoes'
import {AcoesService} from './acoes.service'
import { merge, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(() => console.log("Fluxo inicial")));
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(() => console.log("Fluxo do filtro")),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
    );
  // acoes$ = this.acoesService.getAcoes(); // não fez requisição a api
  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

    //controle de acções do fluxo
  
  
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
