import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-simulations',
  templateUrl: './list-simulations.component.html',
  styleUrls: ['./list-simulations.component.css'],
})
export class ListSimulationsComponent {
  url = 'http://localhost:3000/desa';
  rut = '';
  trx = <any>[];

  constructor(private http: HttpClient) {}

  async getAllByRut() {
    try {
      const response: any = await lastValueFrom(this.http.get(`${this.url}/${this.rut}`));
      this.trx = response.map((el: any) => {
        const trx = JSON.parse(el.json_TRX);

        return {
          total: trx.request.MontoDelCredito,
          cuotas: trx.request.NumeroCuotas,
          valorCuota: trx.response.valorCuota,
        };
      });
    } catch (error) {
      alert('Error al obtener las simulaciones');
    }
  }
}
