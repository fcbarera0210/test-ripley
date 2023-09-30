import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListSimulationsComponent } from './list-simulations/list-simulations.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'list', component: ListSimulationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
