import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form = new FormGroup({
    RutCliente: new FormControl(''),
    MontoDelCredito: new FormControl(0),
    NumeroCuotas: new FormControl(0),
  });
  url = 'http://localhost:3000/desa/gettasa';
  response: any;

  constructor(private http: HttpClient) {}

  async save() {
    try {
      this.response = await lastValueFrom(
        this.http.post(this.url, this.form.value)
      );
    } catch (error) {
      alert('Error al calcular las cuotas');
    }
  }
}
