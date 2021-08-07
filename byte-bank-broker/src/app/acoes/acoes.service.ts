import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, pluck, tap} from 'rxjs/operators';
import { Acao } from './modelo/acoes';
import { AcoesAPI } from './modelo/acoes';


@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) {

  }

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes', {params}).pipe(
      tap(data => console.log(data)),
      // map((api) => api.payload), O pluck pode ser usado no lugar de map para extrair a propriedade que queremos
      pluck('payload'),
      map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}

/* 
  Mario e sua equipe receberam da equipe do backend uma api de consulta de clientes, que entrega o seguinte json:

  {
    "clientes":[
        {
          "id":123,
          "nome":"Gabriel",
          "estado":"SP"
        },
        {
          "id":125,
          "nome":"Mario",
          "estado":"MG"
        }
    ],
    "diaDeProcessamento":”2020-02-02”
  }

  É requisitado que na interface apareçam apenas os clientes do estado de São Paulo.

  Resposta:
  clientes$.pipe(map((clientes)=>clientes.filter((cliente)=>cliente.estado === ‘SP’ )))

*/
